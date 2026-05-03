import { useTheme } from '../hooks/useTheme';

export function Navbar() {
  const { theme, toggle } = useTheme();

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border-subtle/60 bg-surface-muted/80 px-4 backdrop-blur-md transition-colors dark:bg-surface-muted/50">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 ring-1 ring-accent/25">
          <span className="font-display text-lg font-bold text-accent">M</span>
        </div>
        <div>
          <p className="font-display text-sm font-semibold tracking-tight text-ink">
            MeshAI Support
          </p>
          <p className="text-xs text-ink-muted">AI customer support</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggle}
          className="rounded-lg border border-border-subtle/80 bg-surface px-3 py-1.5 text-xs font-medium text-ink-muted transition hover:border-accent/40 hover:text-ink"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
        <div className="flex items-center gap-2 rounded-xl border border-border-subtle/70 bg-surface px-3 py-1.5">
          <span className="h-7 w-7 rounded-full bg-gradient-to-br from-accent to-purple-500 ring-2 ring-surface" />
          <div className="hidden text-left sm:block">
            <p className="text-xs font-medium text-ink">Demo user</p>
            <p className="text-[10px] text-ink-muted">Pro workspace</p>
          </div>
        </div>
      </div>
    </header>
  );
}
