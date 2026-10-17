import { ArrowDown, ArrowUpRight, Network } from 'lucide-react';
import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Motion';
import { Portrait } from '@/components/visuals/Portrait';
import { siteConfig } from '@/content/site';

export function Hero() {
  return (
    <section className="hero-band relative isolate overflow-hidden border-b border-white/10">
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />
      <div className="hero-layout relative mx-auto">
        <Reveal className="hero-intro relative z-10">
          <p className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-aqua-300 sm:text-base">
            <span aria-hidden="true" className="h-px w-10 bg-aqua-400" />
            <span>{siteConfig.name}</span>
            <span aria-hidden="true" className="text-slate-500">
              /
            </span>
            {siteConfig.role}
          </p>
          <h1 className="hero-title font-semibold leading-[1.12] text-white">
            {siteConfig.headline}
          </h1>
        </Reveal>
        <Reveal className="hero-portrait relative mx-auto w-full" delay={0.15}>
          <div className="hero-photo">
            <Portrait prominent />
          </div>
          <p className="hero-portrait-caption flex items-center gap-2 font-mono text-xs text-slate-400">
            <Network size={17} className="text-aqua-300" aria-hidden="true" />{' '}
            ARCHITECTURE / ENGINEERING / MENTORING
          </p>
        </Reveal>
        <Reveal className="hero-copy relative z-10" delay={0.12}>
          <p className="max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {siteConfig.tagline}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <ButtonLink href="/projects">
              Explore My Work <ArrowUpRight size={17} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/contact?category=Seminar%20Request" variant="secondary">
              Invite Me for a Free Session <ArrowUpRight size={17} aria-hidden="true" />
            </ButtonLink>
            <Link
              href="/knowledge-sharing"
              className="inline-flex min-h-11 items-center gap-2 px-2 text-sm font-semibold text-aqua-300 underline decoration-aqua-300/40 underline-offset-4 transition-colors hover:text-white"
            >
              Explore session topics <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
        <a
          href="#innovation"
          className="hero-discover relative z-10 flex min-h-11 items-center justify-between gap-3 border-t border-white/10 pt-3 text-sm text-slate-400 transition-colors hover:text-aqua-300"
        >
          <span>
            Enterprise architecture <span className="px-2 text-aqua-300">/</span> Applied
            AI{' '}
            <span className="hidden sm:inline">
              <span className="px-2 text-emerald-300">/</span> Shared knowledge
            </span>
          </span>
          <ArrowDown size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
