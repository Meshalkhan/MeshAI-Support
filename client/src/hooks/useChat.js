import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api.js';

export function useChat() {
  const [chats, setChats] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingChat, setLoadingChat] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const refreshList = useCallback(async () => {
    setError(null);
    setLoadingList(true);
    try {
      const list = await api.listChats();
      setChats(list);
      return list;
    } catch (e) {
      setError(e.message);
      return [];
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    refreshList();
  }, [refreshList]);

  const selectChat = useCallback(async (id) => {
    if (!id) return;
    setActiveId(id);
    setError(null);
    setLoadingChat(true);
    try {
      const chat = await api.getChat(id);
      setMessages(chat.messages || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoadingChat(false);
    }
  }, []);

  const newChat = useCallback(async () => {
    setError(null);
    setSending(false);
    try {
      const chat = await api.createChat();
      setChats((prev) => [chat, ...prev]);
      setActiveId(chat._id);
      setMessages([]);
      return chat._id;
    } catch (e) {
      setError(e.message);
      return null;
    }
  }, []);

  const removeChat = useCallback(
    async (id) => {
      setError(null);
      try {
        await api.deleteChat(id);
        setChats((prev) => prev.filter((c) => c._id !== id));
        if (activeId === id) {
          setActiveId(null);
          setMessages([]);
        }
      } catch (e) {
        setError(e.message);
      }
    },
    [activeId]
  );

  const send = useCallback(
    async (text) => {
      if (!text.trim()) return;
      let id = activeId;
      if (!id) {
        id = await newChat();
        if (!id) return;
      }

      const userMsg = {
        _id: `local-${Date.now()}`,
        role: 'user',
        content: text.trim(),
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setSending(true);
      setError(null);

      try {
        const chat = await api.sendMessage(id, text.trim());
        setMessages(chat.messages || []);
        setChats((prev) => {
          const next = prev.filter((c) => c._id !== chat._id);
          return [
            {
              _id: chat._id,
              title: chat.title,
              updatedAt: chat.updatedAt,
              createdAt: chat.createdAt,
            },
            ...next,
          ];
        });
      } catch (e) {
        setMessages((prev) => prev.filter((m) => m._id !== userMsg._id));
        setError(e.message);
      } finally {
        setSending(false);
      }
    },
    [activeId, newChat]
  );

  return {
    chats,
    activeId,
    messages,
    loadingList,
    loadingChat,
    sending,
    error,
    setError,
    refreshList,
    selectChat,
    newChat,
    removeChat,
    send,
  };
}
