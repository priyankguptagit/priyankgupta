import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';

export default function NotFound() {
  return (
    <Section width="narrow" className="py-32 text-center">
      <p className="font-mono text-sm text-aqua-300">404</p>
      <h1 className="mt-5 text-4xl font-bold text-white sm:text-5xl">
        This page does not exist
      </h1>
      <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-slate-400">
        The link may be out of date. Try the main sections, or get in touch if you were
        expecting something specific here.
      </p>
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href="/" size="lg">
          Back to home
        </ButtonLink>
        <ButtonLink href="/contact" variant="secondary" size="lg">
          Contact
        </ButtonLink>
      </div>
    </Section>
  );
}
