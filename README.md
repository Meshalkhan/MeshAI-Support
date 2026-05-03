# MeshAI Support

AI-powered customer support SaaS platform using OpenAI GPT.

## Features

- AI chatbot with enterprise-style system prompt
- Context-aware conversations (full thread sent to the model)
- Chat history persisted in MongoDB
- Modern responsive UI with sidebar, navbar, and chat area
- Dark mode, loading states, and typing indicator
- Modular Express API and React components
- Deployment-ready for Vercel (static UI + serverless API)

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express
- **Data:** MongoDB (Mongoose)
- **AI:** OpenAI API

## Project layout

```
meshai-support/
├── client/          # React app
├── server/          # Express API (also imported by Vercel function)
├── api/             # Vercel serverless entry (exports Express app)
├── docs/            # Optional internal documentation
├── .env.example
└── README.md
```

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

2. Install dependencies:

   ```bash
   npm run install:all
   ```

   Or from repo root after adding dev deps:

   ```bash
   npm install
   npm run install:all
   ```

3. Run API and web together:

   ```bash
   npm install
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

## Deploying on Vercel

1. Connect the repository and use the root directory as the project root.
2. Set **Environment Variables** in Vercel: `OPENAI_API_KEY`, `MONGODB_URI`, `CLIENT_URL` (your production site URL, e.g. `https://your-app.vercel.app`), and optionally `OPENAI_MODEL`.
3. Build settings (can rely on `vercel.json`):

   - Install: installs both `server` and `client` dependencies (required for `/api`).
   - Build: `cd client && npm install && npm run build`
   - Output: `client/dist`

4. Deploy. Requests to `/api/*` are rewritten to `api/index.js`, which runs the Express app.

If the API is hosted separately, build the client with `VITE_API_URL` pointing at that API and configure `CLIENT_URL` on the server for CORS.

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
