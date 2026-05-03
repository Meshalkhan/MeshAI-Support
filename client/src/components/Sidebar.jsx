export function Sidebar({
  chats,
  activeId,
  loading,
  onSelect,
  onNew,
  onDelete,
}) {
  return (
    <aside className="flex w-full flex-col border-r border-border-subtle/60 bg-surface-muted/50 dark:bg-surface-muted/30 md:w-72 md:shrink-0">
      <div className="border-b border-border-subtle/50 p-3">
        <button
          type="button"
          onClick={onNew}
          className="w-full rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-accent/20 transition hover:bg-accent/90"
        >
          New chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scroll-thin p-2">
        <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
          Previous chats
        </p>
        {loading && (
          <div className="space-y-2 px-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-11 animate-pulse rounded-lg bg-border-subtle/40"
              />
            ))}
          </div>
        )}
        {!loading && chats.length === 0 && (
          <p className="px-2 text-sm text-ink-muted">No conversations yet.</p>
        )}
        <ul className="space-y-1">
          {chats.map((c) => {
            const active = c._id === activeId;
            return (
              <li key={c._id}>
                <div
                  className={`group flex items-center gap-1 rounded-lg transition ${
                    active
                      ? 'bg-accent/15 ring-1 ring-accent/30'
                      : 'hover:bg-border-subtle/30'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onSelect(c._id)}
                    className="min-w-0 flex-1 truncate px-3 py-2.5 text-left text-sm text-ink"
                    title={c.title}
                  >
                    {c.title || 'Untitled'}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(c._id);
                    }}
                    className="mr-1 rounded-md px-2 py-1 text-xs text-ink-muted opacity-0 transition hover:bg-red-500/10 hover:text-red-600 group-hover:opacity-100 dark:hover:text-red-400"
                    aria-label="Delete chat"
                  >
                    ×
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
