import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { EditableValue } from '@/components/ui/EditableValue';
import { Section } from '@/components/ui/Section';
import { getArticleBySlug, publishedArticles } from '@/content/insights';
import { createMetadata } from '@/lib/seo';

interface PageProps {
  readonly params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return publishedArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return createMetadata({
      title: 'Article not found',
      description: 'The requested article could not be found.',
      path: `/insights/${slug}`,
    });
  }

  return createMetadata({
    title: article.title,
    description: article.description,
    path: `/insights/${article.slug}`,
    keywords: article.tags,
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const related = publishedArticles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 2);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/insights' },
          { name: article.title, path: `/insights/${article.slug}` },
        ]}
      />

      <Section width="narrow">
        <Link
          href="/insights"
          className="text-sm font-medium text-aqua-300 hover:text-aqua-400"
        >
          ← All insights
        </Link>

        <article className="mt-8">
          <header>
            <ul className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <li key={tag}>
                  <Badge tone="accent">{tag}</Badge>
                </li>
              ))}
            </ul>

            <h1 className="mt-6 text-4xl leading-[1.1] font-bold text-white sm:text-5xl">
              {article.title}
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-slate-300">
              {article.description}
            </p>

            <p className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/8 pt-6 text-xs text-slate-500">
              <EditableValue value={article.publishedAt} fallback="publish date" />
              <span aria-hidden="true">·</span>
              {article.readingTime}
            </p>
          </header>

          <div className="mt-8 space-y-6">
            {article.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-base leading-[1.85] text-slate-300"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {related.length > 0 ? (
          <aside className="mt-16 border-t border-white/8 pt-8">
            <h2 className="text-sm font-semibold tracking-[0.16em] text-aqua-300 uppercase">
              Keep reading
            </h2>
            <ul className="mt-6 space-y-4">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/insights/${item.slug}`}
                    className="group block rounded-2xl border border-white/8 bg-white/[0.02] p-5 transition-colors hover:border-aqua-400/30 hover:bg-white/[0.05]"
                  >
                    <p className="font-semibold text-white group-hover:text-aqua-300">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-sm text-slate-400">{item.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/speaking/request" size="lg">
            Invite priyank to speak
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary" size="lg">
            Get in touch
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
