import { cn, isPlaceholder } from '@/lib/utils';

interface EditableValueProps {
  readonly value: string;
  readonly className?: string;
  /** Rendered instead of an empty gap when the value is still a placeholder. */
  readonly fallback?: string;
}

/**
 * Renders supplied content normally and unverified content as a visibly marked
 * placeholder, so nothing on the site can be mistaken for a verified claim.
 */
export function EditableValue({ value, className, fallback }: EditableValueProps) {
  if (!isPlaceholder(value)) {
    return <span className={className}>{value}</span>;
  }

  const label = fallback ?? value.replace(/^\[Add\s+/i, '').replace(/\]$/, '');

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border border-dashed border-gold-400/40 bg-gold-500/8 px-2 py-0.5 text-[0.78rem] font-medium text-gold-400',
        className
      )}
      title="This detail has not been supplied yet."
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-gold-400" />
      <span className="sr-only">Pending detail: </span>
      {label}
    </span>
  );
}
