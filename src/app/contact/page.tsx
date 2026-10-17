import { ContactForm } from '@/components/forms/ContactForm';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { siteConfig } from '@/content/site';
import { createMetadata } from '@/lib/seo';
import {
  ArrowUpRight,
  CalendarDays,
  Mail,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Portrait } from '@/components/visuals/Portrait';
export const metadata = createMetadata({
  title: 'Invite Me for a Free Session',
  description:
    'Professional inquiries, free weekend learning sessions, mentoring and collaboration requests.',
  path: '/contact',
});
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string | string[];
    topic?: string | string[];
    eventType?: string | string[];
  }>;
}) {
  const query = await searchParams;
  const category = typeof query.category === 'string' ? query.category : undefined;
  const topic = typeof query.topic === 'string' ? query.topic : undefined;
  const eventType = typeof query.eventType === 'string' ? query.eventType : undefined;
  return (
    <>
      <PageHeader
        eyebrow="Knowledge sharing · Professional conversations"
        title="Let’s make knowledge sharing happen."
        description="Are you a school, college, university, professional community, or organization interested in a free technical learning session? Share details about your audience and preferred topic, and I will review the request."
      />
      <Section width="wide" className="contact-page-band">
        <div className="grid items-start gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
          <div className="lg:col-start-2 lg:row-start-1">
            <div className="mb-6 flex items-center gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-lg border border-aqua-400/25 bg-aqua-500/10 text-aqua-300">
                <MessagesSquare size={23} aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-xs text-aqua-300">
                  LET&apos;S MAKE A CONNECTION
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-white">
                  Your next idea starts here.
                </h2>
              </div>
            </div>
            <ContactForm
              key={`${category ?? ''}:${topic ?? ''}:${eventType ?? ''}`}
              initialCategory={category}
              initialTopic={topic}
              initialEventType={eventType}
            />
          </div>
          <aside className="lg:sticky lg:top-28 lg:col-start-1 lg:row-start-1">
            <div className="mb-6 max-w-47.5 px-4">
              <Portrait />
            </div>
            <p className="mb-2 font-mono text-xs text-aqua-300">DR. PRIYANK GUPTA</p>
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
              <div className="mt-6 rounded-xl border border-white/10 bg-white/3 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Mail size={17} className="text-aqua-300" aria-hidden="true" />
                  Prefer email?
                </div>
                <a
                  className="mt-2 inline-flex min-h-11 items-center text-sm text-aqua-300 underline decoration-aqua-300/40 underline-offset-4 transition-colors hover:text-white"
                  href={`mailto:${siteConfig.email}`}
                >
                  {siteConfig.email}
                </a>
                <p className="text-xs leading-relaxed text-slate-400">
                  You can also contact me directly at this address.
                </p>
              </div>
            )}
          </aside>
        </div>
      </Section>
    </>
  );
}
