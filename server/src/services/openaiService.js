import OpenAI from 'openai';

const SYSTEM_PROMPT = `You are MeshAI Support, a professional AI customer support assistant for a SaaS product.
Be concise, accurate, and empathetic. If you lack information, ask a clarifying question or explain how to get help from human support.
Never invent account-specific details. Keep responses well structured with short paragraphs or bullet points when helpful.`;

export function createOpenAIClient(apiKey) {
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set');
  }
  return new OpenAI({ apiKey });
}

/**
 * @param {OpenAI} client
 * @param {{ role: string, content: string }[]} priorMessages
 * @param {string} userMessage
 */
export async function getAssistantReply(client, priorMessages, userMessage) {
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...priorMessages.map((m) => ({ role: m.role, content: m.content })),
    { role: 'user', content: userMessage },
  ];

  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    messages,
    temperature: 0.6,
    max_tokens: 1024,
  });

  const text = completion.choices[0]?.message?.content?.trim();
  if (!text) {
    throw new Error('Empty response from OpenAI');
  }
  return text;
}
