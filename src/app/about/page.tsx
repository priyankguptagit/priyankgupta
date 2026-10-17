import { PageHeader } from '@/components/layout/PageHeader';
import { Section, SectionHeading } from '@/components/ui/Section';
import { professionalSummary, workingPrinciples, languages } from '@/content/profile';
import { siteConfig } from '@/content/site';
import { createMetadata } from '@/lib/seo';
import { Portrait } from '@/components/visuals/Portrait';
import { AnimatedCounter } from '@/components/ui/Motion';
import { Timeline, TimelineItem } from '@/components/ui/Timeline';
import { ButtonLink } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { experiencesNewestFirst } from '@/content/experience';
import { expertiseCategories } from '@/content/expertise';
import { formatDateRange } from '@/lib/utils';
import { ArrowUpRight, Layers3 } from 'lucide-react';

export const metadata = createMetadata({
  title: 'About',
  description: siteConfig.description,
  path: '/about',
});
export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Dr. Priyank"
        title="Business clarity. Technical execution."
        description="Technology leader, solution architect, and engineer focused on building practical systems that work in real business environments."
      />
      <Section>
        <h2 className="sr-only">Professional introduction</h2>
        <div className="grid items-start gap-9 lg:grid-cols-[340px_1fr]">
          <div className="mx-auto w-full max-w-[340px] px-5 pt-4 lg:sticky lg:top-28">
            <Portrait />
            <p className="mt-6 text-center text-lg font-semibold text-white">
              Dr. Priyank Gupta
            </p>
            <p className="mt-1 text-center text-sm text-aqua-300">
              Architect / Trainer / Technology Mentor
            </p>
            <div className="mt-6 grid grid-cols-2 gap-5 border-t border-white/15 pt-5">
              <AnimatedCounter value={14} suffix="+" label="Years of experience" />
              <AnimatedCounter
                value={expertiseCategories.length}
                label="Expertise domains"
              />
            </div>
          </div>
          <div className="max-w-[65ch]">
            <div className="profile-narrative space-y-6 text-base leading-[1.7] sm:text-lg">
              {professionalSummary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink
                href="/Priyank-Gupta-Resume-2026.pdf"
                download="Priyank-Gupta-Resume-2026.pdf"
                variant="secondary"
              >
                <ArrowUpRight size={17} aria-hidden="true" />
                Download Resume
              </ButtonLink>
              <ButtonLink href="/projects" variant="outline">
                Explore Projects <ArrowUpRight size={17} aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
      <Section id="experience-journey" className="border-y border-white/10 bg-ink-900">
        <SectionHeading
          eyebrow="Experience, in perspective"
          title="A career built in chapters."
        />
        <div className="mt-8 grid items-start gap-9 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
          <Timeline>
            {experiencesNewestFirst.map((role) => (
              <TimelineItem
                key={role.id}
                marker={String(role.order)}
                active={role.currentlyWorking}
              >
                <article className="pb-7">
                  <p className="mb-3 font-mono text-xs text-aqua-300">
                    {formatDateRange(role.startDate, role.endDate)}
                  </p>
                  <h3 className="text-2xl font-semibold leading-snug text-white">
                    {role.designation}
                  </h3>
                  <p className="mt-3 text-lg text-slate-400">{role.company}</p>
                  <p className="mt-2 text-sm text-slate-300">{role.location}</p>
                </article>
              </TimelineItem>
            ))}
          </Timeline>
          <div className="space-y-5">
            <h3 className="mb-6 text-2xl font-semibold text-white">Areas of focus</h3>
            {expertiseCategories.slice(0, 3).map((category) => (
              <Card key={category.id} as="article">
                <Layers3 size={22} className="mb-4 text-emerald-300" aria-hidden="true" />
                <h4 className="text-xl font-semibold text-white">{category.title}</h4>
                <p className="mt-3 text-lg text-slate-400">{category.summary}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>
      <Section className="workshop-band border-y border-white/10">
        <SectionHeading eyebrow="Principles, not prescriptions" title="How I work" />
        <ul className="mt-7 grid gap-x-9 gap-y-6 md:grid-cols-2">
          {workingPrinciples.map((principle, index) => (
            <li key={principle} className="flex gap-5 border-t border-white/15 pt-5">
              <span className="shrink-0 whitespace-nowrap font-mono text-sm text-emerald-300">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>{principle}</span>
            </li>
          ))}
        </ul>
      </Section>
      <Section>
        <SectionHeading title="Languages" />
        <p className="mt-6">Languages: {languages.join(', ')}</p>
        <p className="mt-8 border-t border-white/20 pt-6 text-sm">
          {siteConfig.disclaimer}
        </p>
      </Section>
    </>
  );
}
