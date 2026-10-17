import type { ReactNode } from 'react';
import { Reveal } from '@/components/ui/Motion';

interface PageHeaderProps {
  readonly eyebrow: string;
  readonly title: ReactNode;
  readonly description?: ReactNode;
  readonly children?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <div className="page-header relative overflow-hidden border-b border-white/10 px-5 py-7 sm:px-8 lg:min-h-35 lg:py-6">
      <div aria-hidden="true" className="hero-grid absolute inset-0" />
      <Reveal className="relative mx-auto grid w-full max-w-6xl gap-x-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end">
        <p className="flex items-center gap-3 font-mono text-xs text-aqua-300 lg:col-span-2">
          <span aria-hidden="true" className="h-px w-7 bg-aqua-400" />
          {eyebrow}
        </p>
        <h1 className="mt-2 max-w-4xl text-[32px] leading-[1.15] font-semibold text-white sm:text-[36px]">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-[65ch] text-base leading-relaxed text-slate-300 lg:mt-0 lg:border-l lg:border-white/15 lg:pl-5">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-3 lg:col-span-2">{children}</div> : null}
      </Reveal>
    </div>
  );
}
