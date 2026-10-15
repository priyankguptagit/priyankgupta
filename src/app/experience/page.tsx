import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { Timeline, TimelineItem } from '@/components/ui/Timeline';
import { experiencesNewestFirst } from '@/content/experience';
import { siteConfig } from '@/content/site';
import { isPlaceholder, formatDateRange } from '@/lib/utils';
import { createMetadata } from '@/lib/seo';
export const metadata = createMetadata({
  title: 'Experience',
  description:
    'Professional experience in web development, applied AI, enterprise applications and technical leadership.',
  path: '/experience',
});
export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow={siteConfig.experience}
        title="Experience, applied."
        description="A career across enterprise applications, engineering and technology leadership. The current employer name remains private until public disclosure is confirmed."
      />
      <Section>
        <Timeline>
          {experiencesNewestFirst.map((role) => (
            <TimelineItem
              key={role.id}
              marker={String(role.order)}
              active={role.currentlyWorking}
            >
              <article className="py-2">
                <h2 className="max-w-[36ch] text-2xl font-semibold leading-snug text-white sm:text-[28px]">
                  {role.designation}
                </h2>
                <p className="mt-2 font-semibold">{role.company}</p>
                <p className="mt-2 text-sm">
                  {formatDateRange(role.startDate, role.endDate)}
                </p>
                <p className="mt-4">
                  {isPlaceholder(role.summary)
                    ? 'Public responsibility summary and contributions awaiting owner approval.'
                    : role.summary}
                </p>
                {role.technologies.length > 0 && (
                  <p className="mt-3">{role.technologies.join(', ')}</p>
                )}
                {role.responsibilities.length > 0 && (
                  <ul className="mt-3 list-disc pl-5">
                    {role.responsibilities.map((responsibility) => (
                      <li key={responsibility}>{responsibility}</li>
                    ))}
                  </ul>
                )}
              </article>
            </TimelineItem>
          ))}
        </Timeline>
        <p className="mt-8 text-sm">{siteConfig.disclaimer}</p>
      </Section>
    </>
  );
}
