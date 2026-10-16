import { BriefcaseBusiness, Download, Languages, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { experiencesNewestFirst } from '@/content/experience';
import { coreSkills } from '@/content/expertise';
import { languages, professionalSummary } from '@/content/profile';
import { siteConfig } from '@/content/site';
import { createMetadata } from '@/lib/seo';

const resumePdfPath = '/Priyank-Gupta-Resume-2026.pdf';

export const metadata = createMetadata({
  title: 'Resume',
  description:
    'Review Dr. Priyank Gupta’s professional profile, experience, and selected technical skills.',
  path: '/resume',
});

export default function ResumePage() {
  return (
    <>
      <PageHeader
        eyebrow="PROFESSIONAL RESUME"
        title={siteConfig.name}
        description={`${siteConfig.role} · ${siteConfig.experience}`}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink
            href={resumePdfPath}
            download="Priyank-Gupta-Resume-2026.pdf"
            className="gap-2"
          >
            <Download size={16} aria-hidden="true" />
            Download résumé (PDF)
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Contact me
          </ButtonLink>
        </div>
      </PageHeader>
      <Section width="wide" className="pt-8 sm:pt-10 md:py-12 xl:py-16">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(17rem,0.8fr)] lg:gap-6">
          <div className="space-y-5">
            <section
              aria-labelledby="resume-summary"
              className="rounded-2xl border border-white/10 bg-ink-950/60 p-5 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-aqua-400/20 bg-aqua-400/5 text-aqua-300">
                  <Sparkles size={18} aria-hidden="true" />
                </span>
                <h2 id="resume-summary" className="text-xl font-semibold text-white">
                  Professional summary
                </h2>
              </div>
              <p className="mt-4 max-w-[75ch] text-justify leading-7 text-slate-300">
                {professionalSummary[0]}
              </p>
            </section>

            <section
              aria-labelledby="resume-experience"
              className="rounded-2xl border border-white/10 bg-ink-950/60 p-5 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-aqua-400/20 bg-aqua-400/5 text-aqua-300">
                  <BriefcaseBusiness size={18} aria-hidden="true" />
                </span>
                <h2 id="resume-experience" className="text-xl font-semibold text-white">
                  Professional experience
                </h2>
              </div>
              <ol className="relative mt-6 ml-2 space-y-7 border-l border-white/10">
                {experiencesNewestFirst.map((role) => (
                  <li key={role.id} className="relative pl-6">
                    <span
                      aria-hidden="true"
                      className={`absolute top-1.5 -left-[5px] size-2.5 rounded-full border-2 ${
                        role.currentlyWorking
                          ? 'border-aqua-300 bg-aqua-300'
                          : 'border-slate-500 bg-ink-950'
                      }`}
                    />
                    <div className="flex flex-col justify-between gap-1.5 sm:flex-row sm:gap-4">
                      <div>
                        <h3 className="font-semibold leading-snug text-white">
                          {role.designation}
                        </h3>
                        <p className="mt-1 text-sm text-slate-300">{role.company}</p>
                      </div>
                      <p className="shrink-0 text-sm text-slate-400">
                        {role.startDate} – {role.endDate}
                      </p>
                    </div>
                    <p className="mt-1.5 text-sm text-slate-400">{role.location}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <aside className="space-y-5">
            <section
              aria-labelledby="resume-skills"
              className="rounded-2xl border border-white/10 bg-ink-950/60 p-5 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-aqua-400/20 bg-aqua-400/5 text-aqua-300">
                  <Sparkles size={18} aria-hidden="true" />
                </span>
                <h2 id="resume-skills" className="text-xl font-semibold text-white">
                  Selected skills
                </h2>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {coreSkills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-200"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                A focused selection of technologies and capability areas.
              </p>
            </section>

            <section
              aria-labelledby="resume-languages"
              className="rounded-2xl border border-white/10 bg-ink-950/60 p-5 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-aqua-400/20 bg-aqua-400/5 text-aqua-300">
                  <Languages size={18} aria-hidden="true" />
                </span>
                <h2 id="resume-languages" className="text-xl font-semibold text-white">
                  Languages
                </h2>
              </div>
              <p className="mt-4 text-slate-300">{languages.join(' · ')}</p>
            </section>

            <div className="rounded-2xl border border-aqua-400/20 bg-aqua-400/[0.04] p-5">
              <p className="text-sm leading-relaxed text-slate-300">
                Prefer a printable copy? Download the supplied 2026 résumé PDF.
              </p>
              <ButtonLink
                href={resumePdfPath}
                download="Priyank-Gupta-Resume-2026.pdf"
                variant="outline"
                size="sm"
                className="mt-4 gap-2"
              >
                <Download size={15} aria-hidden="true" />
                Download PDF
              </ButtonLink>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
