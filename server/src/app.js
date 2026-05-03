import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
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

/** Some serverless gateways forward `/api/chats` as `/chats`; mount both. */
function mountChats(app) {
  app.use('/api/chats', dbMiddleware, chatRoutes);
  app.use('/chats', dbMiddleware, chatRoutes);
}

function allowedOrigins() {
  const raw = process.env.CLIENT_URL || 'http://localhost:5173';
  const list = raw.split(',').map((s) => s.trim()).filter(Boolean);
  if (process.env.VERCEL_URL) {
    list.push(`https://${process.env.VERCEL_URL}`);
  }
  return [...new Set(list)];
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
    res.json({ ok: true, service: 'meshai-support-api' });
  });

  mountChats(app);

  app.use(errorHandler);

  return app;
}
