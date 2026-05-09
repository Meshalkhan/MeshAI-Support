import { Navbar } from '../components/Navbar.jsx';
import { Sidebar } from '../components/Sidebar.jsx';
import { MessageList } from '../components/MessageList.jsx';
import { ChatInput } from '../components/ChatInput.jsx';
import { AlertBanner } from '../components/ui/AlertBanner.jsx';

export function MainLayout({
  chats,
  activeId,
  messages,
  loadingList,
  loadingChat,
  sending,
  error,
  onClearError,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  onSend,
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-surface">
      <Navbar />

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <Sidebar
          chats={chats}
          activeId={activeId}
          loading={loadingList}
          onSelect={onSelectChat}
          onNew={onNewChat}
          onDelete={onDeleteChat}
        />

        <main className="flex min-h-0 min-w-0 flex-1 flex-col">
          {error && (
            <AlertBanner variant="error" onDismiss={onClearError}>
              {error}
            </AlertBanner>
          )}

          <MessageList
            messages={messages}
            sending={sending}
            loadingChat={loadingChat && !!activeId}
          />

          <ChatInput
            onSend={onSend}
            disabled={sending || loadingChat}
            placeholder={
              activeId
                ? 'Message MeshAI Support…'
                : 'Start a conversation…'
            }
          />
        </main>
      </div>
    </div>
  );
}
