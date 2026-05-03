import 'dotenv/config';
import { createApp } from './app.js';
import { connectDB } from './config/db.js';

const port = Number(process.env.PORT) || 3001;

async function main() {
  await connectDB(process.env.MONGODB_URI);
  const app = createApp();
  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
