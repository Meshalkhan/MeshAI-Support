import { Router } from 'express';
import {
  listChats,
  createChat,
  getChat,
  deleteChat,
  sendMessage,
} from '../controllers/chatController.js';

const router = Router();

router.get('/', listChats);
router.post('/', createChat);
router.get('/:id', getChat);
router.delete('/:id', deleteChat);
router.post('/:id/messages', sendMessage);

export default router;
