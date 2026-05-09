export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled,
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50';
  const sizes = {
    sm: 'rounded-lg px-3 py-1.5 text-xs',
    md: 'rounded-xl px-5 py-2.5 text-sm',
    lg: 'rounded-xl px-6 py-3 text-base',
  };
  const variants = {
    primary:
      'bg-accent text-white shadow-md shadow-accent/25 hover:bg-accent/90',
    secondary:
      'border border-border-subtle/80 bg-surface text-ink-muted hover:border-accent/40 hover:text-ink',
    ghost: 'text-ink-muted hover:bg-border-subtle/30 hover:text-ink',
    danger: 'bg-red-600 text-white hover:bg-red-600/90',
  };
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${base} ${sizes[size] || sizes.md} ${variants[variant] || variants.primary} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
