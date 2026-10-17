import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import Link from 'next/link';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Accessibility',
  description:
    'The accessibility commitments and known limitations of priyankgupta.com, and how to report a barrier.',
  path: '/accessibility',
});

const commitments = [
  'Semantic landmarks, a skip link and a logical heading order on every page.',
  'Keyboard operability throughout, with a clearly visible focus indicator.',
  'Colour contrast targeted at WCAG 2.2 AA for body text and interactive controls.',
  'Form fields with real labels, programmatic error association and live status messages.',
  'Decorative animation is disabled automatically when the operating system requests reduced motion.',
  'Text reflows to 320px width without horizontal scrolling and supports 200% zoom.',
];

const limitations = [
  'Images and seminar photographs are pending; alternative text will be added with them.',
  'Third-party embedded content, if added later, will be reviewed separately.',
];

export default function AccessibilityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Accessibility"
        title="Accessibility statement"
        description="This site is built to be usable with a keyboard, a screen reader, magnification and reduced motion."
      />

      <Section width="narrow">
        <section>
          <h2 className="text-xl font-semibold text-white">What is in place</h2>
          <ul className="mt-5 space-y-3">
            {commitments.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-slate-400"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-400"
                />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-9">
          <h2 className="text-xl font-semibold text-white">Known limitations</h2>
          <ul className="mt-5 space-y-3">
            {limitations.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-slate-400"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold-400"
                />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-9">
          <h2 className="text-xl font-semibold text-white">Report a barrier</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            If something on this site is difficult or impossible to use, use the{' '}
            <Link
              href="/contact"
              className="font-medium text-aqua-300 hover:text-aqua-400"
            >
              contact form
            </Link>{' '}
            with the page address and what went wrong. Reports are treated as defects.
          </p>
        </section>
      </Section>
    </>
  );
}
