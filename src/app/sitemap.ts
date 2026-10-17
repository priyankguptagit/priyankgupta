import type { MetadataRoute } from 'next';
import { publishedArticles } from '@/content/insights';
import { siteConfig } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: { path: string; priority: number; changeFrequency: 'monthly' | 'yearly' }[] =
    [
      { path: '/', priority: 1, changeFrequency: 'monthly' },
      { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
      { path: '/knowledge-sharing', priority: 0.9, changeFrequency: 'monthly' },
      { path: '/sessions', priority: 0.9, changeFrequency: 'monthly' },
      { path: '/audiences', priority: 0.8, changeFrequency: 'monthly' },
      { path: '/achievements', priority: 0.7, changeFrequency: 'yearly' },
      { path: '/publications', priority: 0.8, changeFrequency: 'monthly' },
      { path: '/testimonials', priority: 0.4, changeFrequency: 'yearly' },
      { path: '/disclaimer', priority: 0.3, changeFrequency: 'yearly' },
      { path: '/expertise', priority: 0.9, changeFrequency: 'monthly' },
      { path: '/projects', priority: 0.7, changeFrequency: 'monthly' },
      { path: '/blog', priority: 0.8, changeFrequency: 'monthly' },
      { path: '/contact', priority: 0.8, changeFrequency: 'yearly' },
      { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
      { path: '/accessibility', priority: 0.3, changeFrequency: 'yearly' },
    ];

  return [
    ...routes.map((route) => ({
      url: `${siteConfig.url}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...publishedArticles.map((article) => ({
      url: `${siteConfig.url}/insights/${article.slug}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
