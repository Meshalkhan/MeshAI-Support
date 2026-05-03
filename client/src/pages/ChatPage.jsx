import { useEffect } from 'react';
import { MainLayout } from '../layouts/MainLayout.jsx';
import { useChat } from '../hooks/useChat.js';

export function ChatPage() {
  const {
    chats,
    activeId,
    messages,
    loadingList,
    loadingChat,
    sending,
    error,
    selectChat,
    newChat,
    removeChat,
    send,
  } = useChat();

  useEffect(() => {
    if (!loadingList && chats.length && !activeId) {
      selectChat(chats[0]._id);
    }
  }, [loadingList, chats, activeId, selectChat]);

  return (
    <MainLayout
      chats={chats}
      activeId={activeId}
      messages={messages}
      loadingList={loadingList}
      loadingChat={loadingChat}
      sending={sending}
      error={error}
      onSelectChat={selectChat}
      onNewChat={newChat}
      onDeleteChat={removeChat}
      onSend={send}
    />
  );
}
