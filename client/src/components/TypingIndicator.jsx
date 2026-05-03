export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl border border-border-subtle/80 bg-surface-muted px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="h-2 w-2 rounded-full bg-ink-muted animate-bounce-dot"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
