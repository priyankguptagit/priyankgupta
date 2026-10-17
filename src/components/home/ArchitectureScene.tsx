'use client';

import { useState } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  Blocks,
  BrainCircuit,
  Database,
  Network,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const stages = [
  {
    label: 'Business intent',
    icon: Network,
    description:
      'Start with the problem. Align people, processes and business capabilities.',
  },
  {
    label: 'Intelligent systems',
    icon: BrainCircuit,
    description:
      'Connect applications, data and responsible AI through a clear architecture.',
  },
  {
    label: 'Enterprise impact',
    icon: Blocks,
    description:
      'Deliver maintainable systems with security, observability and room to evolve.',
  },
];

export function ArchitectureScene() {
  const [selected, setSelected] = useState(1);
  const reduced = useReducedMotion();
  return (
    <div className="architecture-scene" aria-label="Enterprise architecture workflow">
      <div aria-hidden="true" className="scene-grid" />
      <div className="relative mx-auto w-full max-w-md px-4 py-5 sm:px-8">
        <p className="mb-7 flex flex-wrap items-center justify-between gap-3 font-mono text-xs uppercase text-slate-400">
          <span>Concept / Enterprise intelligence</span>
          <span className="text-emerald-300">01 : 03</span>
        </p>
        <div className="relative grid gap-8">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.label}
                className={cn('relative', index === 0 && 'mr-8', index === 2 && 'ml-8')}
              >
                {index > 0 && (
                  <div aria-hidden="true" className="workflow-connector">
                    <ArrowDown size={14} />
                  </div>
                )}
                <m.button
                  type="button"
                  aria-pressed={selected === index}
                  onClick={() => setSelected(index)}
                  whileHover={reduced ? undefined : { y: -3, rotateX: 3, rotateY: -2 }}
                  className={cn(
                    'workflow-node flex w-full items-center gap-4 rounded-lg border p-4 text-left sm:p-5',
                    selected === index
                      ? 'border-aqua-400/60 bg-ink-850 shadow-[0_0_35px_-20px_#06b6d4]'
                      : 'border-white/15 bg-ink-950/85'
                  )}
                >
                  <span
                    className={cn(
                      'grid size-11 shrink-0 place-items-center rounded-md border',
                      index === 1
                        ? 'border-aqua-400/30 bg-aqua-500/10 text-aqua-300'
                        : 'border-white/15 bg-white/5 text-slate-200'
                    )}
                  >
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="mb-1 block font-mono text-xs uppercase text-slate-400">
                      Layer 0{index + 1}
                    </span>
                    <span className="block text-sm font-semibold text-white">
                      {stage.label}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'size-1.5 rounded-full',
                      selected === index ? 'bg-emerald-300' : 'bg-slate-600'
                    )}
                  />
                </m.button>
              </div>
            );
          })}
        </div>
        <div
          aria-hidden="true"
          className="mt-7 flex justify-center gap-5 border-t border-white/10 pt-5 text-slate-400"
        >
          <span className="flex items-center gap-2 text-xs">
            <Database size={14} /> Data
          </span>
          <span className="flex items-center gap-2 text-xs">
            <Workflow size={14} /> APIs
          </span>
          <span className="flex items-center gap-2 text-xs">
            <ShieldCheck size={14} /> Trust
          </span>
        </div>
        <p
          aria-live="polite"
          className="mt-5 min-h-20 text-center text-xs leading-relaxed text-slate-400"
        >
          {stages[selected]?.description}
        </p>
      </div>
    </div>
  );
}
