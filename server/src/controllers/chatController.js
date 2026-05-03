import mongoose from 'mongoose';
import { Chat } from '../models/Chat.js';
import { createOpenAIClient, getAssistantReply } from '../services/openaiService.js';

function getClient() {
  return createOpenAIClient(process.env.OPENAI_API_KEY);
}

export async function listChats(_req, res, next) {
  try {
    const chats = await Chat.find()
      .select('title updatedAt createdAt')
      .sort({ updatedAt: -1 })
      .lean();
    res.json(chats);
  } catch (err) {
    next(err);
  }
}

export async function createChat(req, res, next) {
  try {
    const chat = await Chat.create({ title: 'New conversation', messages: [] });
    res.status(201).json(chat);
  } catch (err) {
    next(err);
  }
}

export async function getChat(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid chat id' });
    }
    const chat = await Chat.findById(id).lean();
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }
    res.json(chat);
  } catch (err) {
    next(err);
  }
}

export async function deleteChat(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid chat id' });
    }
    const result = await Chat.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: 'Chat not found' });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function sendMessage(req, res, next) {
  try {
    const { id } = req.params;
    const { content } = req.body || {};

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid chat id' });
    }
    if (!content || typeof content !== 'string' || !content.trim()) {
      return res.status(400).json({ error: 'Message content is required' });
    }

    const trimmed = content.trim();
    const chat = await Chat.findById(id);
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    const priorForModel = chat.messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const client = getClient();
    const reply = await getAssistantReply(client, priorForModel, trimmed);

    chat.messages.push({ role: 'user', content: trimmed });
    chat.messages.push({ role: 'assistant', content: reply });

    if (chat.title === 'New conversation' && trimmed.length > 0) {
      chat.title = trimmed.slice(0, 60) + (trimmed.length > 60 ? '…' : '');
    }

    await chat.save();

    const saved = await Chat.findById(id).lean();
    res.json(saved);
  } catch (err) {
    next(err);
  }
}
