import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from './Motion';

interface TimelineProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export function Timeline({ children, className }: TimelineProps) {
  return (
    <ol className={cn('timeline relative space-y-6 sm:space-y-7', className)}>
      {children}
    </ol>
  );
}

interface TimelineItemProps {
  readonly children: ReactNode;
  readonly marker?: ReactNode;
  readonly active?: boolean;
  readonly className?: string;
}

export function TimelineItem({
  children,
  marker,
  active = false,
  className,
}: TimelineItemProps) {
  return (
    <li className={cn('relative pl-12 sm:pl-16', className)}>
      <span
        aria-hidden="true"
        className={cn(
          'absolute top-1 left-0 grid size-8 place-items-center rounded-full text-xs font-semibold sm:size-10',
          active
            ? 'bg-linear-to-br from-brand-400 to-aqua-400 text-on-bright shadow-[0_0_24px_4px_rgb(46_224_224/0.35)]'
            : 'glass-strong text-brand-300'
        )}
      >
        {marker}
      </span>
      <Reveal>{children}</Reveal>
    </li>
  );
}
