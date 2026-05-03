import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage.jsx';
import { TypingIndicator } from './TypingIndicator.jsx';

export function MessageList({ messages, sending, loadingChat }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sending, loadingChat]);

  if (loadingChat) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-ink-muted">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        <p className="text-sm">Loading conversation…</p>
      </div>
    );
  }

  return (
    <div className="scroll-thin flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-6">
      {messages.length === 0 && !sending && (
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded-2xl border border-border-subtle/70 bg-surface-muted/40 p-10 text-center dark:bg-surface-muted/25">
          <div className="rounded-2xl bg-accent/10 p-4 ring-1 ring-accent/20">
            <span className="font-display text-3xl font-bold text-accent">M</span>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">
              How can we help today?
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              Ask billing, product, or technical questions. MeshAI keeps context across this
              conversation for accurate answers.
            </p>
          </div>
        </div>
      )}

      {messages
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .map((m) => (
          <ChatMessage key={m._id || `${m.role}-${m.createdAt}`} role={m.role} content={m.content} />
        ))}

      {sending && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}
