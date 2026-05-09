export function loadEnv() {
  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT) || 3001,
    mongodbUri: process.env.MONGODB_URI?.trim() || '',
    openaiApiKey: process.env.OPENAI_API_KEY?.trim() || '',
    openaiModel: process.env.OPENAI_MODEL?.trim() || 'gpt-4o-mini',
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  };
}

export function isProduction() {
  return (process.env.NODE_ENV || 'development') === 'production';
}
