import 'dotenv/config';
import { createApp } from './app.js';
import { connectDB } from './config/db.js';
import { loadEnv } from './config/env.js';

async function main() {
  const env = loadEnv();
  if (!env.mongodbUri) {
    console.error('MONGODB_URI is required');
    process.exit(1);
  }
  await connectDB(env.mongodbUri);
  const app = createApp();
  app.listen(env.port, () => {
    console.log(`API listening on port ${env.port}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
