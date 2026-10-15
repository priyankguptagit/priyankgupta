import Link from 'next/link';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { footerNav, primaryNav, siteConfig, socialLinks } from '@/content/site';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="mx-auto max-w-[1200px] px-5 py-7 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="font-mono text-xs text-aqua-300">
              ARCHITECTURE / AI / SHARED KNOWLEDGE
            </p>
            <p className="mt-4 text-2xl font-semibold text-white">{siteConfig.name}</p>
            <p className="mt-3 max-w-md leading-relaxed">
              Sharing knowledge, mentoring professionals and helping technology
              communities grow through practical learning.
            </p>
            <Link
              href="/contact?category=Training%20Request"
              className="mt-4 inline-flex min-h-11 items-center font-semibold text-aqua-300"
            >
              Request a Free Session
            </Link>
            {siteConfig.email && (
              <p>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </p>
            )}
            {socialLinks.length > 0 && <SocialLinks links={socialLinks} />}
          </div>
          <nav aria-label="Footer">
            <h2 className="font-semibold text-white">Explore</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-4">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-sm hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Resources and policies">
            <h2 className="font-semibold text-white">Resources and Policies</h2>
            <ul className="mt-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-sm hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-6 border-t border-white/15 pt-5 text-sm leading-relaxed">
          {siteConfig.disclaimer}
        </p>
        <p className="mt-4 text-sm">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
