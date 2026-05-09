import {
  listChats as listChatsSvc,
  createChat as createChatSvc,
  getChatById,
  deleteChatById,
  appendUserMessageAndReply,
} from '../services/chatService.js';

export async function listChats(_req, res, next) {
  try {
    const chats = await listChatsSvc();
    res.json(chats);
  } catch (err) {
    next(err);
  }
}

export async function createChat(_req, res, next) {
  try {
    const chat = await createChatSvc();
    res.status(201).json(chat);
  } catch (err) {
    next(err);
  }
}

export async function getChat(req, res, next) {
  try {
    const result = await getChatById(req.params.id);
    if (result.error === 'invalid_id') {
      return res.status(400).json({ error: 'Invalid chat id' });
    }
    if (result.error === 'not_found') {
      return res.status(404).json({ error: 'Chat not found' });
    }
    res.json(result.chat);
  } catch (err) {
    next(err);
  }
}

export async function deleteChat(req, res, next) {
  try {
    const result = await deleteChatById(req.params.id);
    if (result.error === 'invalid_id') {
      return res.status(400).json({ error: 'Invalid chat id' });
    }
    if (result.error === 'not_found') {
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

    if (!content || typeof content !== 'string' || !content.trim()) {
      return res.status(400).json({ error: 'Message content is required' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const result = await appendUserMessageAndReply(id, content, apiKey);

    if (result.error === 'invalid_id') {
      return res.status(400).json({ error: 'Invalid chat id' });
    }
    if (result.error === 'not_found') {
      return res.status(404).json({ error: 'Chat not found' });
    }

    res.json(result.chat);
  } catch (err) {
    next(err);
  }
}
