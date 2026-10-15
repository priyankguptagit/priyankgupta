import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/ContentCards';
import { publicAchievements } from '@/content/achievements';
import { createMetadata } from '@/lib/seo';
export const metadata = createMetadata({
  title: 'Achievements',
  description: 'Approved patent, publication and professional contribution records.',
  path: '/achievements',
});
export default function AchievementsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Research and contributions"
        title="Achievements"
        description="Only verified records approved for public display are published."
      />
      <Section>
        {publicAchievements.length ? (
          publicAchievements.map((achievement) => (
            <Card key={achievement.id}>
              <h2 className="text-xl font-semibold text-white">{achievement.title}</h2>
              <p className="mt-3">
                {achievement.type} / {achievement.status}
              </p>
              {achievement.applicationNumber && (
                <p>Application: {achievement.applicationNumber}</p>
              )}
            </Card>
          ))
        ) : (
          <EmptyState
            title="Public records awaiting approval"
            message="Patent details supplied by the owner are under review. No awards, certifications or speaking records are claimed here."
          />
        )}
      </Section>
    </>
  );
}
