import mongoose from 'mongoose';
import { Chat } from '../models/Chat.js';
import { createOpenAIClient, getAssistantReply } from './openaiService.js';

export async function listChats() {
  return Chat.find().select('title updatedAt createdAt').sort({ updatedAt: -1 }).lean();
}

export async function createChat() {
  return Chat.create({ title: 'New conversation', messages: [] });
}

export async function getChatById(id) {
  if (!mongoose.isValidObjectId(id)) {
    return { error: 'invalid_id' };
  }
  const chat = await Chat.findById(id).lean();
  if (!chat) return { error: 'not_found' };
  return { chat };
}

export async function deleteChatById(id) {
  if (!mongoose.isValidObjectId(id)) {
    return { error: 'invalid_id' };
  }
  const result = await Chat.findByIdAndDelete(id);
  if (!result) return { error: 'not_found' };
  return { ok: true };
}

export async function appendUserMessageAndReply(id, content, apiKey) {
  if (!mongoose.isValidObjectId(id)) {
    return { error: 'invalid_id' };
  }
  const trimmed = content.trim();
  const chat = await Chat.findById(id);
  if (!chat) return { error: 'not_found' };

  const priorForModel = chat.messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const client = createOpenAIClient(apiKey);
  const reply = await getAssistantReply(client, priorForModel, trimmed);

  chat.messages.push({ role: 'user', content: trimmed });
  chat.messages.push({ role: 'assistant', content: reply });

  if (chat.title === 'New conversation' && trimmed.length > 0) {
    chat.title = trimmed.slice(0, 60) + (trimmed.length > 60 ? '…' : '');
  }

  await chat.save();
  return { chat: await Chat.findById(id).lean() };
}
