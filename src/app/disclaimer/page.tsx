import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { sessionConditions } from '@/content/session-topics';
import { siteConfig } from '@/content/site';
import { createMetadata } from '@/lib/seo';
export const metadata = createMetadata({
  title: 'Disclaimer',
  description:
    'Personal views, educational use, confidentiality and session-request conditions.',
  path: '/disclaimer',
});
export default function DisclaimerPage() {
  return (
    <>
      <PageHeader eyebrow="Professional conditions" title="Disclaimer" />
      <Section width="narrow">
        <h2 className="text-xl font-semibold text-white">
          Personal and educational content
        </h2>
        <p className="mt-4">{siteConfig.disclaimer}</p>
        <p className="mt-4">
          Technical material is educational, not a guarantee of results or professional
          advice for a particular situation. Free sessions do not create a commercial
          relationship.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-white">Session requests</h2>
        <ul className="mt-4 list-disc space-y-4 pl-5">
          {sessionConditions.map((condition) => (
            <li key={condition}>{condition}</li>
          ))}
        </ul>
        <p className="mt-6">
          There is no guarantee of availability or acceptance. Employer and customer
          confidential information is not intentionally shared.
        </p>
      </Section>
    </>
  );
}
