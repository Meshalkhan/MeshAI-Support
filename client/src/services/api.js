const base = import.meta.env.VITE_API_URL || '';

async function request(path, options = {}) {
  const url = `${base}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (res.status === 204) {
    return null;
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data.error || res.statusText || 'Request failed';
    throw new Error(msg);
  }
  return data;
}

export const api = {
  listChats: () => request('/api/chats'),
  createChat: () => request('/api/chats', { method: 'POST' }),
  getChat: (id) => request(`/api/chats/${id}`),
  deleteChat: (id) => request(`/api/chats/${id}`, { method: 'DELETE' }),
  sendMessage: (id, content) =>
    request(`/api/chats/${id}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    }),
};
