import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes.js';
import { allowedOrigins } from './config/cors.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';
import { connectDB } from './config/db.js';

async function dbMiddleware(_req, res, next) {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    return res.status(503).json({
      error:
        'Database not configured. Set MONGODB_URI in Vercel project Environment Variables.',
    });
  }
  try {
    await connectDB(uri);
    next();
  } catch (e) {
    next(e);
  }
}

function mountChats(app) {
  app.use('/api/chats', dbMiddleware, chatRoutes);
  app.use('/chats', dbMiddleware, chatRoutes);
}

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin(origin, cb) {
        const ok = allowedOrigins();
        if (!origin) return cb(null, true);
        if (ok.includes(origin)) return cb(null, true);
        cb(null, false);
      },
      credentials: true,
    })
  );
  app.use(express.json({ limit: '1mb' }));

  app.get('/health', (_req, res) => {
    res.json({
      ok: true,
      service: 'meshai-support-api',
      env: process.env.NODE_ENV || 'development',
    });
  });

  mountChats(app);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
