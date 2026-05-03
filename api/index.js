/**
 * CommonJS entry (this file is not under "type":"module") so Vercel recognizes
 * `api/index.js` as a Serverless Function. Dynamic import() loads the server's ESM app
 * without ERR_REQUIRE_ESM.
 */
let appPromise;

async function getApp() {
  if (!appPromise) {
    appPromise = import('../server/src/app.js').then((mod) => mod.createApp());
  }
  return appPromise;
}

module.exports = async (req, res) => {
  const app = await getApp();
  app(req, res);
};
