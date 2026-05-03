import mongoose from 'mongoose';

/** Reuse connection across hot reloads (local) and serverless invocations. */
let cached = globalThis.__meshaiMongoose;
if (!cached) {
  cached = globalThis.__meshaiMongoose = { conn: null, promise: null };
}

export async function connectDB(uri) {
  if (!uri) {
    throw new Error('MONGODB_URI is not set');
  }
  mongoose.set('strictQuery', true);

  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(uri).then((m) => m.connection);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
