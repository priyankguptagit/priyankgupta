import Link from 'next/link';
import {
  ArrowUpRight,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  GraduationCap,
  Layers3,
  Mic2,
  Network,
  School,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Reveal, AnimatedCounter, Parallax } from '@/components/ui/Motion';
import { ButtonLink } from '@/components/ui/Button';
import { ArchitectureScene } from './ArchitectureScene';
import { SpeakerSpotlight } from './SpeakerSpotlight';
import { topicNames } from '@/content/session-topics';
import { expertiseCategories } from '@/content/expertise';
import { researchWorks } from '@/content/research';

const innovationAreas = [
  {
    title: 'AI Agents',
    icon: Bot,
    text: 'Exploring purposeful agents, human oversight and responsible AI integration.',
    href: '/expertise#ai',
  },
  {
    title: 'Copilot Solutions',
    icon: Sparkles,
    text: 'Bringing an AI-assisted mindset to everyday engineering and knowledge work.',
    href: '/knowledge-sharing',
  },
  {
    title: 'Automation Workflows',
    icon: Workflow,
    text: 'Connecting systems and simplifying repetitive work with clear, reliable workflows.',
    href: '/expertise#capabilities',
  },
  {
    title: 'Digital Transformation',
    icon: Layers3,
    text: 'Evolving enterprise applications around real business needs and sustainable delivery.',
    href: '/about#experience-journey',
  },
  {
    title: 'Architecture Practice',
    icon: Network,
    text: 'Exploring system design, technical trade-offs and the path from intent to implementation.',
    href: '/contact',
  },
];

export function ProfileBand() {
  const metrics = [
    { value: 14, suffix: '+', label: 'Years of experience' },
    { value: topicNames.length, label: 'Learning topics' },
    {
      value:
        expertiseCategories.find((category) => category.id === 'programming')?.skills
          .length || 0,
      label: 'Programming languages',
    },
    { value: expertiseCategories.length, label: 'Expertise domains' },
  ];
  return (
    <Section className="metrics-band border-b border-white/10" width="wide">
      <h2 className="sr-only">Experience and areas of focus</h2>
      <div className="metric-rail grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Reveal key={metric.label} delay={index * 0.06}>
            <div className="h-full border-l border-white/15 px-5 sm:px-6">
              <AnimatedCounter {...metric} />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function BrandIdentityCards() {
  return (
    <Section width="wide" className="border-b border-white/10">
      <div className="grid gap-5 lg:grid-cols-2">
        <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-ink-900/65 p-6 sm:p-8">
          <p className="font-mono text-xs tracking-[0.16em] text-aqua-300">
            PROFESSIONAL PROFILE
          </p>
          <h2 className="mt-4 text-2xl font-semibold text-white">
            My Professional Journey
          </h2>
          <p className="mt-3 flex-1 leading-7 text-slate-300">
            Explore my technical interests, projects, research, professional experience,
            and approach to solving real-world problems through technology.
          </p>
          <ButtonLink href="/about" variant="outline" className="mt-6 w-fit">
            Explore My Profile <ArrowUpRight size={16} aria-hidden="true" />
          </ButtonLink>
        </article>
        <article className="flex h-full flex-col rounded-2xl border border-aqua-300/25 bg-aqua-300/[0.04] p-6 sm:p-8">
          <p className="font-mono text-xs tracking-[0.16em] text-emerald-300">
            KNOWLEDGE SHARING
          </p>
          <h2 className="mt-4 text-2xl font-semibold text-white">
            Knowledge Is Better When Shared
          </h2>
          <p className="mt-3 flex-1 leading-7 text-slate-300">
            I welcome opportunities to share technical knowledge through free seminars,
            webinars, workshops, guest lectures, and training sessions for students,
            professionals, and interested organizations.
          </p>
          <ButtonLink href="/contact?category=Seminar%20Request" className="mt-6 w-fit">
            Invite Me for a Session <ArrowUpRight size={16} aria-hidden="true" />
          </ButtonLink>
        </article>
      </div>
    </Section>
  );
}

export function InnovationSection() {
  return (
    <Section id="innovation" width="wide" className="innovation-band">
      <div className="grid items-start gap-9 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="01 / Architecture thinking"
            title={
              <>
                Complex systems.
                <br />
                <span className="text-gradient">Clear thinking.</span>
              </>
            }
            description="Intelligence is useful when it serves a purpose. I bring an architecture-first perspective to AI, automation and enterprise transformation."
          />
          <Parallax className="mt-8">
            <ArchitectureScene />
          </Parallax>
          <div className="mt-6">
            <ButtonLink href="/expertise#capabilities" variant="ghost">
              Explore My Expertise <ArrowUpRight size={17} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
        <div className="innovation-index border-t border-white/15">
          {innovationAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <Reveal key={area.title} delay={index * 0.04}>
                <Link
                  href={area.href}
                  className="innovation-row group grid grid-cols-[28px_1fr_20px] gap-x-4 border-b border-white/15 py-7 sm:gap-x-5"
                >
                  <Icon
                    size={24}
                    strokeWidth={1.4}
                    className={index % 2 ? 'text-emerald-300' : 'text-aqua-300'}
                    aria-hidden="true"
                  />
                  <h3 className="text-xl font-semibold leading-tight text-white sm:text-2xl">
                    {area.title}
                  </h3>
                  <ArrowUpRight
                    size={18}
                    className="text-slate-500 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-aqua-300"
                    aria-hidden="true"
                  />
                  <p className="col-start-2 col-end-4 mt-3 max-w-md text-lg leading-relaxed text-slate-400">
                    {area.text}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

const workshopAudiences = [
  {
    title: 'School Students',
    icon: School,
    text: 'Technology awareness, digital foundations and a first step into coding.',
    topic: 'Technology foundations for school students',
  },
  {
    title: 'College Students',
    icon: GraduationCap,
    text: 'Connect classroom concepts with real-world development and career direction.',
    topic: 'Introduction to web development',
  },
  {
    title: 'Working Professionals',
    icon: BriefcaseBusiness,
    text: 'Deepen engineering practice with architecture, modern stacks and AI awareness.',
    topic: 'Web application architecture and scalability',
  },
  {
    title: 'Organizations',
    icon: Network,
    text: 'Discuss a free knowledge-sharing session on relevant engineering topics, subject to availability.',
    topic: 'Solution architecture fundamentals',
  },
];

export function WorkshopSection() {
  return (
    <Section
      id="workshops"
      width="wide"
      className="workshop-band border-y border-white/10"
    >
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="03 / Learn. Build. Evolve."
            title="Good ideas deserve to be shared."
            description="Practical learning for every starting point. Free weekend sessions, online or offline, subject to availability and confirmation."
          />
          <ButtonLink href="/sessions" variant="secondary" className="shrink-0">
            View Sessions <ArrowUpRight size={16} aria-hidden="true" />
          </ButtonLink>
        </div>
      </Reveal>
      <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {workshopAudiences.map((audience, index) => {
          const Icon = audience.icon;
          return (
            <Reveal key={audience.title} delay={index * 0.06}>
              <div className="group flex h-full flex-col border-t border-white/20 pt-6">
                <Icon
                  size={27}
                  strokeWidth={1.4}
                  className="text-emerald-300"
                  aria-hidden="true"
                />
                <h3 className="mt-5 text-xl font-semibold text-white">
                  {audience.title}
                </h3>
                <p className="mt-3 flex-1 text-lg leading-relaxed text-slate-400">
                  {audience.text}
                </p>
                <Link
                  href={`/contact?category=Workshop%20Request&eventType=Workshop&topic=${encodeURIComponent(audience.topic)}`}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-aqua-300"
                >
                  Discuss a workshop <ArrowUpRight size={15} aria-hidden="true" />
                  <span className="sr-only"> for {audience.title}</span>
                </Link>
              </div>
            </Reveal>
          );
        })}
      </div>
      <div className="mt-9">
        <SpeakerSpotlight />
      </div>
      <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-6 text-xs text-slate-300">
        <span className="flex items-center gap-2">
          <Mic2 size={15} aria-hidden="true" /> Seminars
        </span>
        <span className="flex items-center gap-2">
          <GraduationCap size={15} aria-hidden="true" /> Technical Sessions
        </span>
        <span className="flex items-center gap-2">
          <BrainCircuit size={15} aria-hidden="true" /> Technology Sessions
        </span>
        <span className="flex items-center gap-2">
          <BriefcaseBusiness size={15} aria-hidden="true" /> Career Guidance
        </span>
        <Link
          href="/knowledge-sharing"
          className="min-h-6 text-aqua-300 underline underline-offset-4"
        >
          All workshop categories
        </Link>
      </div>
    </Section>
  );
}

export function ResearchPreview() {
  return (
    <Section width="wide" className="border-t border-white/10 bg-ink-900/45">
      <SectionHeading
        eyebrow="Research & publications"
        title="Research-informed thinking."
        description="Selected publications exploring machine learning, feature selection, and predictive modeling."
      />
      <div className="mt-7 grid gap-4 lg:grid-cols-3">
        {researchWorks.slice(0, 3).map((paper) => (
          <article
            key={paper.id}
            className="flex h-full flex-col rounded-xl border border-white/10 bg-ink-950/60 p-5"
          >
            <p className="font-mono text-xs text-aqua-300">
              {paper.type} <span aria-hidden="true">/</span> {paper.year}
            </p>
            <h3 className="mt-3 flex-1 text-lg font-semibold leading-snug text-white">
              {paper.title}
            </h3>
            <p className="mt-3 text-sm text-slate-400">{paper.publisher}</p>
            <details className="mt-4 border-t border-white/10 pt-3">
              <summary className="min-h-11 cursor-pointer py-2 text-sm font-medium text-aqua-300">
                Abstract
              </summary>
              <p className="pb-3 text-sm leading-6 text-slate-300">{paper.abstract}</p>
            </details>
          </article>
        ))}
      </div>
      <ButtonLink href="/publications" variant="outline" className="mt-6">
        Explore Research & Publications <ArrowUpRight size={16} aria-hidden="true" />
      </ButtonLink>
    </Section>
  );
}
