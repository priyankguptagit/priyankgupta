import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

const base =
  'action-button group relative inline-flex min-h-11 max-w-full items-center justify-center gap-2 rounded-lg text-center font-semibold transition-[background-color,color,box-shadow,transform,border-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-aqua-300 disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
    'primary-button border border-brand-400/40 bg-brand-600 text-on-accent hover:shadow-[0_0_24px_-8px_#3b82f6]',
  secondary: 'secondary-button border text-white',
  ghost:
    'ghost-button border border-transparent text-slate-300 hover:text-white hover:bg-white/5',
  outline:
    'outline-button border border-white/25 bg-transparent text-white hover:border-aqua-400/60 hover:bg-aqua-500/5',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'min-h-12 px-5 py-2.5 text-lg',
};

interface CommonProps {
  readonly variant?: Variant;
  readonly size?: Size;
  readonly className?: string;
  readonly children: ReactNode;
}

type ButtonLinkProps = CommonProps & {
  readonly href: string;
  readonly external?: boolean;
  readonly download?: boolean | string;
};

export function ButtonLink({
  href,
  external = false,
  download,
  variant = 'primary',
  size = 'md',
  className,
  children,
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        rel="noopener noreferrer"
        target="_blank"
        download={download}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} download={download}>
      {children}
    </Link>
  );
}

type ButtonProps = CommonProps & ComponentProps<'button'>;

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
