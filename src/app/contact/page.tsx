import { ContactForm } from '@/components/forms/ContactForm';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { siteConfig } from '@/content/site';
import { createMetadata } from '@/lib/seo';
import {
  ArrowUpRight,
  CalendarDays,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Portrait } from '@/components/visuals/Portrait';
export const metadata = createMetadata({
  title: 'Contact and Session Requests',
  description:
    'Professional inquiries, free weekend learning sessions, mentoring and collaboration requests.',
  path: '/contact',
});
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const query = await searchParams;
  return (
    <>
      <PageHeader
        eyebrow="Professional conversations"
        title="Start a conversation."
        description="Share a professional question or propose a learning session. Requests are reviewed based on availability, and confirmation is not automatic."
      />
      <Section width="wide" className="contact-page-band">
        <div className="grid items-start gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
          <div className="lg:col-start-2 lg:row-start-1">
            <div className="mb-6 flex items-center gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-lg border border-aqua-400/25 bg-aqua-500/10 text-aqua-300">
                <MessagesSquare size={23} aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-xs text-aqua-300">LET'S MAKE A CONNECTION</p>
                <h2 className="mt-1 text-2xl font-semibold text-white">
                  Your next idea starts here.
                </h2>
              </div>
            </div>
            <ContactForm
              initialCategory={
                typeof query.category === 'string' ? query.category : undefined
              }
            />
          </div>
          <aside className="lg:sticky lg:top-28 lg:col-start-1 lg:row-start-1">
            <div className="mb-6 max-w-[190px] px-4">
              <Portrait />
            </div>
            <p className="mb-2 font-mono text-xs text-aqua-300">PRIYANK GUPTA</p>
            <h2 className="text-2xl font-semibold text-white">
              A conversation,
              <br />
              not a sales pitch.
            </h2>
            <div
              aria-hidden="true"
              className="my-5 flex items-center gap-4 text-aqua-300"
            >
              <MessagesSquare size={22} />
              <span className="h-px flex-1 bg-aqua-400/30" />
              <Sparkles size={22} />
              <span className="h-px flex-1 bg-emerald-300/30" />
              <ArrowUpRight size={22} className="text-emerald-300" />
            </div>
            <p className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
              <CalendarDays size={18} aria-hidden="true" /> Free weekend knowledge sharing
            </p>
            <p className="mt-5 leading-relaxed">
              Webinars, seminars, workshops, training, awareness and mentoring, primarily
              on weekends.
            </p>
            <p className="mt-5 leading-relaxed">
              Online and offline formats depend on topic, audience, dates, location and
              practical arrangements. Submitting this form creates no commercial
              commitment.
            </p>
            <div className="mt-7 border-t border-white/10 pt-5">
              <ShieldCheck
                size={21}
                className="mb-3 text-emerald-300"
                aria-hidden="true"
              />
              <p className="text-sm">{siteConfig.privacyNote}</p>
            </div>
            {siteConfig.email && (
              <a
                className="mt-4 inline-block underline"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
            )}
          </aside>
        </div>
      </Section>
    </>
  );
}
