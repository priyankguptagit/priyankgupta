import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly tone?: 'default' | 'accent' | 'muted' | 'warning';
}

const tones = {
  default: 'bg-white/6 text-slate-200 ring-white/12',
  accent: 'bg-brand-500/12 text-brand-300 ring-brand-400/25',
  muted: 'bg-white/[0.04] text-slate-400 ring-white/8',
  warning: 'bg-gold-500/10 text-gold-400 ring-gold-400/25',
} as const;

export function Badge({ children, className, tone = 'default' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset transition-colors',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
