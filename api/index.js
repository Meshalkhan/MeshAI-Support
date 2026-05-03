/**
 * Vercel serverless entry: mounts the same Express app as local dev.
 */
import { createApp } from '../server/src/app.js';

const app = createApp();

export default app;
