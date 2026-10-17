import Image from 'next/image';
import {
  BrainCircuit,
  Cloud,
  Code2,
  GitBranch,
  Network,
  PanelsTopLeft,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';
import { expertiseMapCategories } from '@/content/expertise';
import { profilePhoto } from '@/content/site';

const icons = {
  architecture: Network,
  engineering: Code2,
  cloud: Cloud,
  integration: GitBranch,
  ai: BrainCircuit,
  web: PanelsTopLeft,
  quality: ShieldCheck,
  leadership: UsersRound,
} as const;

function TechnologyNode({ label, icon }: { readonly label: string; readonly icon: keyof typeof icons }) {
  const Icon = icons[icon];
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="grid size-12 place-items-center rounded-full border border-aqua-300/25 bg-ink-900 text-aqua-300 sm:size-14">
        <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
      </span>
      <span className="max-w-36 text-xs font-medium leading-5 text-slate-200 sm:text-sm">
        {label}
      </span>
    </div>
  );
}

function ProfileImage({ className = '' }: { readonly className?: string }) {
  return (
    <div className={`h-full w-full ${className}`}>
      <Image
        src={profilePhoto.src}
        alt={profilePhoto.alt}
        width={181}
        height={236}
        sizes="(min-width: 1024px) 180px, 130px"
        className="h-full w-full object-contain object-bottom"
      />
    </div>
  );
}

export function TechnologyMap() {
  return (
    <div>
      <div className="relative mx-auto hidden max-w-5xl lg:block">
        <svg
          aria-hidden="true"
          viewBox="0 0 1000 720"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <g fill="none" stroke="rgba(103,232,249,.25)" strokeWidth="1.5">
            <path d="M500 360 166 120M500 360 500 120M500 360 834 120M500 360 166 360M500 360 834 360M500 360 166 600M500 360 500 600M500 360 834 600" />
          </g>
          <g fill="#67e8f9">
            <circle cx="500" cy="360" r="4" />
            <circle cx="166" cy="120" r="3" />
            <circle cx="500" cy="120" r="3" />
            <circle cx="834" cy="120" r="3" />
            <circle cx="166" cy="360" r="3" />
            <circle cx="834" cy="360" r="3" />
            <circle cx="166" cy="600" r="3" />
            <circle cx="500" cy="600" r="3" />
            <circle cx="834" cy="600" r="3" />
          </g>
        </svg>
        <div className="relative grid aspect-[1.39] grid-cols-3 grid-rows-3 items-center justify-items-center gap-4 py-8">
          {expertiseMapCategories.slice(0, 3).map((category) => (
            <TechnologyNode key={category.id} label={category.label} icon={category.icon} />
          ))}
          <TechnologyNode
            label={expertiseMapCategories[3].label}
            icon={expertiseMapCategories[3].icon}
          />
          <div className="z-10 grid size-44 place-items-center overflow-hidden rounded-full border border-aqua-300/30 bg-ink-900 p-3 shadow-[0_0_0_12px_rgba(34,211,238,.04)]">
            <ProfileImage />
          </div>
          <TechnologyNode
            label={expertiseMapCategories[4].label}
            icon={expertiseMapCategories[4].icon}
          />
          {expertiseMapCategories.slice(5).map((category) => (
            <TechnologyNode key={category.id} label={category.label} icon={category.icon} />
          ))}
        </div>
      </div>

      <div className="lg:hidden">
        <ProfileImage className="mx-auto mb-6 size-32 overflow-hidden rounded-full border border-aqua-300/30 bg-ink-900 p-2 sm:size-36" />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {expertiseMapCategories.map((category) => (
            <li
              key={category.id}
              className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-ink-900/70 px-2 py-3 text-center"
            >
              <TechnologyNode label={category.label} icon={category.icon} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
