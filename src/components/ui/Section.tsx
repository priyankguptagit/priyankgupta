import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from './Motion';

interface SectionProps {
  readonly id?: string;
  readonly children: ReactNode;
  readonly className?: string;
  readonly width?: 'default' | 'wide' | 'narrow';
  readonly as?: 'section' | 'div' | 'article';
}

const widths = {
  narrow: 'max-w-3xl',
  default: 'max-w-6xl',
  wide: 'max-w-[1200px]',
} as const;

export function Section({
  id,
  children,
  className,
  width = 'default',
  as: Tag = 'section',
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        'relative px-5 py-12 sm:px-6 md:py-16 lg:px-8 xl:px-12 xl:py-20',
        className
      )}
    >
      <Reveal className={cn('section-content mx-auto min-w-0 w-full', widths[width])}>
        {children}
      </Reveal>
    </Tag>
  );
}

interface SectionHeadingProps {
  readonly eyebrow?: string;
  readonly title: ReactNode;
  readonly description?: ReactNode;
  readonly align?: 'left' | 'center';
  readonly className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <header
      className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}
    >
      {eyebrow ? <p className="mb-3 font-mono text-xs text-aqua-300">{eyebrow}</p> : null}
      <h2 className="section-title leading-tight font-semibold text-white">{title}</h2>
      {description ? (
        <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-slate-300">
          {description}
        </p>
      ) : null}
    </header>
  );
}
