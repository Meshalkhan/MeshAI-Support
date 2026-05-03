# MeshAI Support

AI-powered customer support SaaS platform using OpenAI GPT.

## Features

- AI chatbot with enterprise-style system prompt
- Context-aware conversations (full thread sent to the model)
- Chat history persisted in MongoDB
- Modern responsive UI with sidebar, navbar, and chat area
- Dark mode, loading states, and typing indicator
- Modular Express API and React components

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express
- **Data:** MongoDB (Mongoose)
- **AI:** OpenAI API


## Prerequisites

- Node.js 18+
- MongoDB connection string (Atlas or local)
- OpenAI API key

## Local development

1. Copy environment variables:

   ```bash
   copy .env.example .env
   ```

   Edit `.env` with `OPENAI_API_KEY`, `MONGODB_URI`, and optional `OPENAI_MODEL`.

2. Install dependencies (npm **workspaces** — installs `client` + `server`):

   ```bash
   npm install
   ```

3. Run API and web together:

   ```bash
   npm run dev
   ```

   - Client: `http://localhost:5173` (proxies `/api` to the API)
   - API: `http://localhost:3001`

Alternatively run `npm run dev --prefix server` and `npm run dev --prefix client` in two terminals.

## Environment variables

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | Required. OpenAI secret key |
| `OPENAI_MODEL` | Optional. Defaults to `gpt-4o-mini` |
| `MONGODB_URI` | Required. MongoDB connection URI |
| `CLIENT_URL` | CORS origin(s), comma-separated. Default `http://localhost:5173` |
| `PORT` | API port locally. Default `3001` |
| `VITE_API_URL` | Optional. Full API base URL for the client build (omit when API is same-origin) |

## Deploying on Vercel (single project)

1. Import the repo; **project root** = repository root (not `client/`).
2. In **Settings → Environment Variables**, add (at least for **Production**): `OPENAI_API_KEY`, `MONGODB_URI`, `CLIENT_URL` = your site origin (e.g. `https://mesh-ai-support.vercel.app`), optional `OPENAI_MODEL`.
3. **`vercel.json`** uses workspace install (`npm install`), builds the client workspace, outputs `client/dist`, and rewrites `/api/*` → `api/index.js`.
4. **MongoDB Atlas:** allow network access from your deployment (for serverless, opening `0.0.0.0/0` is common for demos).
5. Redeploy after changing env vars.

**`FUNCTION_INVOCATION_FAILED` on `/api/*`:** Usually missing runtime deps for the serverless bundle (fixed by root **workspaces** + `npm install` at root), missing env vars, or Mongo connection blocked. Check **Deployments → Functions → Logs** for the stack trace.

**HTTP 500 / 503 on `/api/chats`:** Confirm **`MONGODB_URI`** is set for **Production** (not only Preview). Atlas must allow inbound IPs (`0.0.0.0/0` for demos). The API also mounts **`/chats`** for serverless path quirks. **`CLIENT_URL`** can match your live URL; Vercel’s **`VERCEL_URL`** is accepted automatically for CORS when deployed.

If the API is hosted separately, set `VITE_API_URL` at build time and configure `CLIENT_URL` for CORS.

## API overview

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/api/chats` | List chats |
| POST | `/api/chats` | Create chat |
| GET | `/api/chats/:id` | Get chat with messages |
| DELETE | `/api/chats/:id` | Delete chat |
| POST | `/api/chats/:id/messages` | Append user message and assistant reply |

## Goal

Demonstrate AI integration, prompt engineering, full-stack architecture, session/context handling, and SaaS-quality chat UX.
