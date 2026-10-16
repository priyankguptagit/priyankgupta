import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly interactive?: boolean;
  readonly padding?: 'default' | 'compact';
  readonly as?: 'div' | 'article' | 'li';
}

export function Card({
  children,
  className,
  interactive = false,
  padding = 'default',
  as: Tag = 'div',
}: CardProps) {
  return (
    <Tag
      className={cn(
        'premium-card relative min-w-0 rounded-lg border border-white/10',
        padding === 'default' && 'p-5 sm:p-6 lg:p-7',
        padding === 'compact' && 'p-4',
        interactive &&
          'transition-[border-color,box-shadow,transform] duration-200 hover:border-aqua-300 hover:shadow-md motion-safe:hover:-translate-y-0.5 focus-within:border-aqua-300',
        className
      )}
    >
      {children}
    </Tag>
  );
}
