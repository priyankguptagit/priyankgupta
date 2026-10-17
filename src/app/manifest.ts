import type { MetadataRoute } from 'next';
import { siteConfig } from '@/content/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.role}`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#080c13',
    theme_color: '#0f172a',
  };
}
