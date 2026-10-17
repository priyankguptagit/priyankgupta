import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { siteConfig } from '@/content/site';
import { createMetadata } from '@/lib/seo';
export const metadata = createMetadata({
  title: 'Privacy',
  description:
    'Information collection, storage, use, retention and deletion for professional inquiries.',
  path: '/privacy',
});
export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="Privacy and Data Handling"
        description="A practical summary, not a claim of independently reviewed legal compliance."
      />
      <Section width="narrow">
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-white">What is collected</h2>
            <p className="mt-3">
              Name, email, message and consent are required. You may provide a phone
              number, organization, designation and event information, including audience
              category, participant count, general age group, experience level, dates,
              time, duration, city, state, country, venue, and available facilities. Do
              not include individual student details or sensitive personal information.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white">Purpose and storage</h2>
            <p className="mt-3">
              When configured, the website sends your request through its server-side
              route to an independently operated inquiry service so it can be reviewed and
              answered. This repository does not contain that service, its database, or
              its email provider. Its operator determines where submissions are stored,
              who can access them, which processors receive them, and how long they are
              retained. No account or marketing subscription is created by this website.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white">Retention and deletion</h2>
            <p className="mt-3">
              The inquiry service operator must confirm its retention period, deletion
              process, and treatment of backups before accepting production requests. You
              can request access, correction, or deletion by contacting the site owner.
              Please include the public reference returned after a successful submission,
              if available.
            </p>
            <p className="mt-3">
              Public privacy email: {siteConfig.email || 'awaiting owner confirmation'}.
            </p>
            <Link
              className="mt-3 inline-flex min-h-11 items-center underline"
              href="/contact"
            >
              Submit a privacy request
            </Link>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white">Cookies and analytics</h2>
            <p className="mt-3">
              This site does not use analytics, advertising trackers, or marketing
              cookies. It stores your theme preference in your browser&apos;s local
              storage. The location map opens Google Maps only when you follow its link.
              The website is deployed on Vercel, whose infrastructure may process
              operational request data under its own policies.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white">Security limitations</h2>
            <p className="mt-3">
              The website validates requests before forwarding them, but the independent
              inquiry service is responsible for its own validation, access controls, rate
              limiting, storage security, and incident response. Please do not send
              passwords, private documents, or employer/customer confidential information.
            </p>
          </section>
        </div>
      </Section>
    </>
  );
}
