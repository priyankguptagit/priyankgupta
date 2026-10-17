import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/manrope';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SkipLink } from '@/components/layout/SkipLink';
import { BackToTop } from '@/components/layout/BackToTop';
import { PersonJsonLd, WebsiteJsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/content/site';
import { MotionProvider, PageTransition, ScrollProgress } from '@/components/ui/Motion';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [
    'Dr. Priyank Gupta',
    'Software Architecture',
    'Enterprise Architecture',
    'MERN',
    'Digital Transformation',
    'Next.js',
    'AWS',
    'Applied AI',
    'College seminar speaker',
    'Free weekend workshops',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.description,
    locale: siteConfig.locale,
    images: [
      {
        url: `${siteConfig.url}/images/PriyankGupta.png`,
        width: 181,
        height: 236,
        alt: `${siteConfig.name} — ${siteConfig.role}`,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/PriyankGupta.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'technology',
};

export const viewport: Viewport = {
  themeColor: '#0B1120',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{document.documentElement.dataset.theme=localStorage.getItem('priyank-theme')==='light'?'light':'dark'}catch{}",
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <MotionProvider>
          <ScrollProgress />
          <SkipLink />
          <Header />
          <main id="main" tabIndex={-1} className="relative">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <BackToTop />
        </MotionProvider>
        <PersonJsonLd />
        <WebsiteJsonLd />
      </body>
    </html>
  );
}
