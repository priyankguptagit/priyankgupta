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
              time, duration, city, state, country, venue, facilities and budget
              preference. Do not include individual student details or sensitive personal
              information.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white">Purpose and storage</h2>
            <p className="mt-3">
              Validated inquiries are stored in a private MongoDB database to review and
              respond to professional queries and coordinate requested sessions. No
              account or automatic marketing subscription is created. Submission contents
              are not written to application logs. A temporary network identifier is used
              in memory for abuse rate limiting and is not stored with the inquiry.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white">Retention and deletion</h2>
            <p className="mt-3">
              Retention period: awaiting owner confirmation before public launch. You can
              request access, correction or deletion using the contact form, quoting your
              public reference if available. Identity verification and the final deletion
              process, including backups, must be confirmed by the owner.
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
              No analytics, advertising trackers, newsletter or application cookies are
              currently installed. Hosting providers may retain operational access logs
              under their own policies; production hosting has not yet been selected.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-white">Security limitations</h2>
            <p className="mt-3">
              Input validation, limited API access and security headers reduce risk but
              cannot guarantee absolute security. Production hosting must use HTTPS and
              restricted database access. Please do not send passwords, private documents
              or employer/customer confidential information.
            </p>
          </section>
        </div>
      </Section>
    </>
  );
}
