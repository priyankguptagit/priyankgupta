import { Hero } from '@/components/home/Hero';
import {
  InnovationSection,
  ProfileBand,
  WorkshopSection,
} from '@/components/home/BrandSections';
import { Reveal } from '@/components/ui/Motion';
import { ArrowUpRight } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { ProjectCard } from '@/components/ui/ContentCards';
import { projects } from '@/content/projects';
import { createMetadata } from '@/lib/seo';
import { siteConfig } from '@/content/site';

export const metadata = createMetadata({
  title: 'Dr. Priyank Gupta - Senior Solution Architect',
  description: siteConfig.description,
  path: '/',
});
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProfileBand />
      <InnovationSection />
      <Section width="wide" className="selected-work-band border-t border-white/10">
        <Reveal>
          <SectionHeading
            eyebrow="02 / Selected work"
            title="Engineering ideas into impact."
            description="A selection of enterprise applications, AI-driven systems, and scalable digital products built across architecture, engineering, and delivery leadership."
          />
        </Reveal>
        <div className="selected-work-list mt-9 grid gap-5">
          {projects
            .filter((project) => project.featured)
            .slice(0, 4)
            .map((project) => (
              <Reveal key={project.id} className="h-full">
                <ProjectCard project={project} featured />
              </Reveal>
            ))}
        </div>
        <div className="mt-6">
          <ButtonLink href="/projects" variant="secondary">
            All Project Areas <ArrowUpRight size={16} aria-hidden="true" />
          </ButtonLink>
        </div>
      </Section>
      <WorkshopSection />
      <Section width="wide" className="contact-band">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="mb-4 font-mono text-xs text-emerald-300">
              04 / Let&apos;s connect
            </p>
            <h2 className="section-title font-semibold leading-tight text-white">
              What could we build next?
            </h2>
            <p className="mt-3">
              Discuss an architecture question, collaboration or learning session.
            </p>
          </div>
          <div className="shrink-0">
            <ButtonLink href="/contact">
              Start a Conversation <ArrowUpRight size={17} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
