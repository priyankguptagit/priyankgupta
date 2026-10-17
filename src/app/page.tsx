import { Hero } from '@/components/home/Hero';
import {
  InnovationSection,
  ProfileBand,
  BrandIdentityCards,
  ResearchPreview,
  WorkshopSection,
} from '@/components/home/BrandSections';
import { Reveal } from '@/components/ui/Motion';
import { ArrowUpRight } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { ProjectCard } from '@/components/ui/ContentCards';
import { projects } from '@/content/projects';

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandIdentityCards />
      <ProfileBand />
      <InnovationSection />
      <ResearchPreview />
      <WorkshopSection />
      <Section width="wide" className="contact-band">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="mb-4 font-mono text-xs text-emerald-300">Let's connect</p>
            <h2 className="section-title font-semibold leading-tight text-white">
              Let's make knowledge sharing happen.
            </h2>
            <p className="mt-3">
              Invite me to share practical technical knowledge with your community.
            </p>
          </div>
          <div className="shrink-0">
            <ButtonLink href="/contact?category=Seminar%20Request">
              Invite Me for a Free Session <ArrowUpRight size={17} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
