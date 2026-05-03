export function ChatMessage({ role, content }) {
  const isUser = role === 'user';

  return (
    <div
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[min(100%,42rem)] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm transition-all ${
          isUser
            ? 'bg-accent text-white'
            : 'border border-border-subtle/80 bg-surface-muted text-ink'
        }`}
      >
        {!isUser && (
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-accent">
            MeshAI
          </p>
        )}
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}
