import { useCallback, useRef } from 'react';
import { Button } from './ui/Button.jsx';

export function ChatInput({ onSend, disabled, placeholder }) {
  const ref = useRef(null);

  const submit = useCallback(() => {
    const el = ref.current;
    if (!el || disabled) return;
    const value = el.value;
    if (!value.trim()) return;
    onSend(value);
    el.value = '';
    el.style.height = 'auto';
  }, [disabled, onSend]);

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submit();
      }
    },
    [submit]
  );

  const onInput = useCallback((e) => {
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, []);

  return (
    <div className="border-t border-border-subtle/60 bg-surface-muted/40 p-4 backdrop-blur-sm dark:bg-surface-muted/30">
      <div className="mx-auto flex max-w-4xl gap-2">
        <textarea
          ref={ref}
          rows={1}
          placeholder={placeholder}
          disabled={disabled}
          onKeyDown={onKeyDown}
          onInput={onInput}
          className="max-h-40 min-h-[44px] flex-1 resize-none rounded-xl border border-border-subtle/80 bg-surface px-4 py-2.5 text-sm text-ink shadow-sm outline-none ring-accent/0 transition placeholder:text-ink-muted focus:border-accent/50 focus:ring-2 focus:ring-accent/25 disabled:opacity-50"
        />
        <Button type="button" onClick={submit} disabled={disabled} className="shrink-0">
          Send
        </Button>
      </div>
    </div>
  );
}
