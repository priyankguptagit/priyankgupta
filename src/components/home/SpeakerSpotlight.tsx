import { ArrowUpRight, Mic2 } from 'lucide-react';
import { Portrait } from '@/components/visuals/Portrait';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Motion';

export function SpeakerSpotlight() {
  return (
    <Reveal className="speaker-spotlight grid items-center gap-9 border-t border-white/10 py-9 md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
      <div className="mx-auto w-full max-w-[260px] px-5">
        <Portrait />
      </div>
      <div className="max-w-2xl">
        <p className="mb-4 flex items-center gap-2 font-mono text-xs text-emerald-300">
          <Mic2 size={16} aria-hidden="true" /> BEYOND THE CODE
        </p>
        <h2 className="section-title font-semibold leading-tight text-white">
          Experience becomes
          <br />
          more valuable when shared.
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-slate-300">
          Join Priyank for practical conversations on architecture, modern engineering and
          responsible AI. Room for questions. Space for new perspectives.
        </p>
        <p className="mt-4 text-sm text-slate-400">
          Trainer. Speaker. Technology Mentor.
        </p>
        <div className="mt-6">
          <ButtonLink href="/contact?category=Workshop%20Request" variant="secondary">
            Invite Priyank to Speak <ArrowUpRight size={17} aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>
    </Reveal>
  );
}
