import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Motion';
import { expertiseCategories } from '@/content/expertise';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Expertise',
  description:
    'Architecture, frontend, backend, databases, quality, cloud, DevOps and applied AI capabilities.',
  path: '/expertise',
});

export default function ExpertisePage() {
  return (
    <>
      <PageHeader
        eyebrow="Engineering capabilities"
        title="A connected view of technology."
        description="Working knowledge and technical interests, grouped by discipline. No proficiency scores or certification claims."
      />
      <Section>
        <div className="border-t border-white/15">
          {expertiseCategories.map((category, index) => (
            <Reveal key={category.id}>
              <article
                id={category.id}
                className="capability-row grid gap-5 border-b border-white/15 py-7 md:grid-cols-[48px_1fr_1fr] md:gap-6"
              >
                <span className="font-mono text-sm text-aqua-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 className="text-2xl font-semibold text-white">{category.title}</h2>
                  <p className="mt-3">{category.summary}</p>
                </div>
                <ul className="flex flex-wrap content-start gap-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="border-b border-aqua-400/20 bg-white/5 px-3 py-1.5 text-base"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
