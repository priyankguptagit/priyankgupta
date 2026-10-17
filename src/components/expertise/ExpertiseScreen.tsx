import Link from 'next/link';
import {
  ArrowDownRight,
  ArrowRight,
} from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { Section, SectionHeading } from '@/components/ui/Section';
import { articles } from '@/content/insights';
import {
  capabilityAreas,
  expertiseCategories,
  expertiseClosing,
  expertiseIntroduction,
  problemSolvingApproach,
} from '@/content/expertise';
import { projects } from '@/content/projects';
import { CapabilityExplorer } from './CapabilityExplorer';
import { TechnologyMap } from './TechnologyMap';

const projectsById = new Map(projects.map((project) => [project.id, project]));

const appliedProjectIds = [
  ...new Set(capabilityAreas.flatMap((area) => area.projectIds)),
];
const appliedProjects = appliedProjectIds
  .map((id) => projectsById.get(id))
  .filter((project) => project !== undefined);

export function ExpertiseScreen() {
  const publishedArticles = articles.filter((article) => article.status === 'published');
  const skillCategories = expertiseCategories.map((category) => ({
    ...category,
    skills: category.skills.filter(
      (skill, index, skills) =>
        skills.findIndex((candidate) => candidate.toLowerCase() === skill.toLowerCase()) ===
        index
    ),
  }));

  return (
    <>
      <section className="border-b border-white/10 bg-ink-950 px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.16em] text-aqua-300">
            <span aria-hidden="true" className="h-px w-7 bg-aqua-400" />
            {expertiseIntroduction.eyebrow}
          </p>
          <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:gap-12">
            <h1 className="max-w-3xl text-4xl leading-[1.08] font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {expertiseIntroduction.title}
            </h1>
            <div>
              <p className="max-w-[62ch] text-base leading-7 text-slate-300 sm:text-lg">
                {expertiseIntroduction.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/projects" size="md">
                  Explore My Projects <ArrowDownRight size={17} aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href="/experience" variant="outline" size="md">
                  View My Experience
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section className="border-b border-white/10 bg-ink-900/45" width="wide">
        <SectionHeading
          eyebrow="Areas of interest"
          title="Technology, connected."
          description="A map of the disciplines I explore across software and technology."
          className="mb-8"
        />
        <TechnologyMap />
      </Section>

      <Section id="capabilities" width="wide">
        <SectionHeading
          eyebrow="Selected highlights"
          title="Capabilities across the engineering lifecycle."
          description="A focused overview of professional interests and selected skills."
        />
        <div className="mt-8">
          <CapabilityExplorer />
        </div>
      </Section>

      <Section
        id="skills-and-technologies"
        className="border-y border-white/10 bg-ink-900/45"
        width="wide"
      >
        <SectionHeading
          eyebrow="Detailed skill list"
          title="Skills & Technologies"
          description="Explore the technical inventory by discipline. Expand a category to see its related skills."
        />
        <div className="mt-7 space-y-3">
          {skillCategories.map((category, index) => (
            <details
              key={category.id}
              className="group rounded-xl border border-white/10 bg-ink-950/65 transition-colors open:border-aqua-300/30"
            >
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 [&::-webkit-details-marker]:hidden sm:px-5">
                <span className="flex min-w-0 items-center gap-3">
                  <span className="font-mono text-xs text-aqua-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="truncate font-semibold text-white">{category.title}</span>
                  <span className="hidden text-xs text-slate-500 sm:inline">
                    {category.skills.length} skills
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="grid size-8 shrink-0 place-items-center rounded-full border border-white/10 text-aqua-300 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="border-t border-white/10 px-4 pb-4 pt-3 sm:px-5">
                <p className="max-w-3xl text-sm leading-6 text-slate-300">
                  {category.summary}
                </p>
                <ul
                  aria-label={`${category.title} skills`}
                  className="mt-3 flex flex-wrap gap-2"
                >
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-md border border-white/10 bg-white/[0.035] px-2.5 py-1.5 text-sm text-slate-300"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </Section>

      <Section className="border-y border-white/10 bg-ink-900/45" width="wide">
        <SectionHeading
          eyebrow="A practical working approach"
          title={problemSolvingApproach.title}
          description={problemSolvingApproach.introduction}
        />
        <ol className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {problemSolvingApproach.steps.map((step, index) => (
            <li
              key={step.id}
              className="border-l-2 border-aqua-300/40 pl-4 sm:border-l-0 sm:border-t-2 sm:pl-0 sm:pt-4"
            >
              <p className="font-mono text-xs text-aqua-300">
                STEP {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section width="wide">
        <SectionHeading
          eyebrow="From capability to application"
          title="Applied in Practice"
          description="Examples from the existing project portfolio, connected to the capability areas they relate to."
        />
        {appliedProjects.length > 0 && (
          <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {appliedProjects.slice(0, 6).map((project) => (
              <li key={project.id}>
                <Link
                  href={`/projects#${project.id}`}
                  className="group flex h-full flex-col rounded-xl border border-white/10 bg-ink-900/70 p-5 transition-colors hover:border-aqua-300/35 hover:bg-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-300"
                >
                  <span className="text-xs font-medium uppercase tracking-wide text-aqua-300">
                    {project.category}
                  </span>
                  <span className="mt-2 text-lg font-semibold leading-snug text-white">
                    {project.title}
                  </span>
                  <span className="mt-2 line-clamp-3 text-sm leading-6 text-slate-300">
                    {project.overview}
                  </span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-aqua-300 group-hover:text-white">
                    View in project portfolio <ArrowRight size={15} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {publishedArticles.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-3">
            {publishedArticles.map((article) => {
              return (
                <li key={article.slug}>
                  <Link
                    href={`/insights/${article.slug}`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/15 px-4 text-sm font-medium text-slate-200 hover:border-aqua-300/40 hover:text-white"
                  >
                    {article.title} <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </Section>

      <Section className="border-t border-white/10 bg-ink-900/45" width="wide">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-3 font-mono text-xs tracking-[0.16em] text-aqua-300">
              OPEN CONVERSATION
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
              {expertiseClosing.title}
            </h2>
            <p className="mt-3 max-w-[65ch] leading-7 text-slate-300">
              {expertiseClosing.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact">Contact Me</ButtonLink>
            <ButtonLink href="/projects" variant="outline">
              Explore Projects
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
