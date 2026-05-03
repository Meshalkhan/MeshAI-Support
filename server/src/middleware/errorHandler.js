export function errorHandler(err, _req, res, _next) {
  const status = err.status || err.statusCode || 500;

  const isMongo =
    err.name === 'MongoServerSelectionError' ||
    err.name === 'MongoNetworkError' ||
    err.name === 'MongoParseError';

  const message =
    status === 500 && process.env.NODE_ENV === 'production' && !isMongo
      ? 'Internal server error'
      : err.message || 'Internal server error';

  if (status >= 500 || isMongo) {
    console.error('[meshai-api]', err.name || 'Error', err.message);
  }

  const code = isMongo ? 503 : status;
  res.status(code).json({ error: message });
}
