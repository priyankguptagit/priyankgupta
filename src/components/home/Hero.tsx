import { ArrowDown, ArrowUpRight, AudioLines } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { CharacterReveal, Reveal, Typewriter } from '@/components/ui/Motion';
import { Portrait } from '@/components/visuals/Portrait';
import { siteConfig } from '@/content/site';

export function Hero() {
  return (
    <section className="hero-band relative isolate overflow-hidden border-b border-white/10 px-5 sm:px-8">
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />
      <div aria-hidden="true" className="hero-light-field absolute inset-0 -z-10" />
      <div className="hero-layout relative mx-auto max-w-[1200px] py-6 sm:py-8">
        <Reveal className="hero-intro relative z-10">
          <p className="mb-3 flex items-center gap-3 text-base font-medium text-aqua-300">
            <span aria-hidden="true" className="h-px w-10 bg-aqua-400" />
            {siteConfig.role}
          </p>
          <h1 className="hero-title font-semibold leading-[1.02] text-white">
            <CharacterReveal text={siteConfig.name} />
          </h1>
        </Reveal>
        <Reveal className="hero-portrait relative mx-auto w-full" delay={0.15}>
          <div className="hero-portrait-orbit" aria-hidden="true">
            <span />
            <span />
          </div>
          <div className="hero-photo">
            <Portrait prominent />
          </div>
          <div className="hero-experience">
            <span className="font-display text-4xl font-medium leading-none text-white">
              14<span className="text-aqua-300">+</span>
            </span>
            <span className="text-sm leading-snug text-slate-400">
              14+ years of experience delivering scalable enterprise solutions.
            </span>
          </div>
          <p className="hero-portrait-caption flex items-center gap-2 font-mono text-xs text-slate-400">
            <AudioLines size={17} className="text-emerald-300" aria-hidden="true" />{' '}
            ARCHITECT / SPEAKER / MENTOR
          </p>
        </Reveal>
        <Reveal className="hero-copy relative z-10" delay={0.12}>
          <h2 className="hero-tagline font-semibold leading-[1.2]">
            Architecture for
            <br />
            what comes next.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Enterprise systems, applied AI and practical learning. Built around people.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <ButtonLink href="/projects" className="px-3 sm:px-6">
              Explore My Work <ArrowUpRight size={17} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink
              href="/contact?category=Workshop%20Request"
              variant="secondary"
              className="px-3 sm:px-6"
            >
              Book a Session <ArrowUpRight size={17} aria-hidden="true" />
            </ButtonLink>
          </div>
          <p className="mt-4 font-mono text-xs text-aqua-300">
            <Typewriter text="Architecture. Intelligence. Human impact." />
          </p>
          <p className="sr-only">
            <span>Enterprise Architect</span>
            <span>AI Enthusiast</span>
            <span>Trainer &amp; Speaker</span>
            <span>Technology Mentor</span>
          </p>
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
