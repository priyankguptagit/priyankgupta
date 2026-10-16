import { PageHeader } from '@/components/layout/PageHeader';
import { Section, SectionHeading } from '@/components/ui/Section';
import { EducationList } from '@/components/ui/EducationList';
import { ButtonLink } from '@/components/ui/Button';
import { siteConfig } from '@/content/site';
import { professionalSummary, languages } from '@/content/profile';
import { experiencesNewestFirst } from '@/content/experience';
import { coreSkills } from '@/content/expertise';
import { createMetadata } from '@/lib/seo';
export const metadata = createMetadata({
  title: 'Public Resume',
  description: 'Privacy-safe professional resume for Dr. Priyank Gupta.',
  path: '/resume',
});
export default function ResumePage() {
  return (
    <>
      <PageHeader
        eyebrow="Public resume"
        title={siteConfig.name}
        description={`${siteConfig.role}. ${siteConfig.experience}.`}
      />
      <Section width="narrow">
        <SectionHeading title="Profile" />
        <p className="mt-4">{professionalSummary[0]}</p>
        <h2 className="mt-10 text-2xl font-semibold text-white">Experience</h2>
        <ul className="mt-5 space-y-6">
          {experiencesNewestFirst.map((role) => (
            <li key={role.id}>
              <h3 className="font-semibold text-white">{role.designation}</h3>
              <p>{role.company}</p>
              <p className="text-sm text-slate-300">{role.location}</p>
              <p className="text-sm">
                {role.startDate} - {role.endDate}
              </p>
            </li>
          ))}
        </ul>
        <h2 className="mt-10 text-2xl font-semibold text-white">Skills</h2>
        <p className="mt-4">{coreSkills.join(', ')}</p>
        <h2 className="mt-10 text-2xl font-semibold text-white">Education</h2>
        <div className="mt-5">
          <EducationList />
        </div>
        <p className="mt-6">Languages: {languages.join(', ')}</p>
        <p className="mt-6">Public resume download will be available soon.</p>
        {siteConfig.publicResumeUrl && (
          <ButtonLink href={siteConfig.publicResumeUrl}>
            Download approved public resume
          </ButtonLink>
        )}
      </Section>
    </>
  );
}
