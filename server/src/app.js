import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectDB } from './config/db.js';

async function dbMiddleware(_req, _res, next) {
  try {
    if (process.env.MONGODB_URI) {
      await connectDB(process.env.MONGODB_URI);
    }
    next();
  } catch (e) {
    next(e);
  }
}

export function createApp() {
  const app = express();

  const clientOrigin = process.env.CLIENT_URL || 'http://localhost:5173';
  app.use(
    cors({
      origin: clientOrigin.split(',').map((s) => s.trim()),
      credentials: true,
    })
  );
  app.use(express.json({ limit: '1mb' }));

  app.get('/health', (_req, res) => {
    res.json({ ok: true, service: 'meshai-support-api' });
  });

  app.use('/api/chats', dbMiddleware, chatRoutes);

  app.use(errorHandler);

  return app;
}
