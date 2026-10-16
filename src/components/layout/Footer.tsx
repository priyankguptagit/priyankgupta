import Link from 'next/link';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { footerMap, footerNav, primaryNav, siteConfig, socialLinks } from '@/content/site';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8 sm:py-12">
        <div className="grid gap-9 border-b border-white/10 pb-9 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:gap-12">
          <div>
            <p className="font-mono text-xs tracking-wide text-aqua-300">
              ARCHITECTURE / AI / SHARED KNOWLEDGE
            </p>
            <p className="mt-3 text-2xl font-semibold text-white">{siteConfig.name}</p>
            <p className="mt-3 max-w-md leading-relaxed text-slate-300">
              Sharing knowledge, mentoring professionals and helping technology
              communities grow through practical learning.
            </p>
            <Link
              href="/contact?category=Training%20Request"
              className="mt-4 inline-flex min-h-11 items-center font-semibold text-aqua-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aqua-300"
            >
              Request a Free Session
            </Link>
            {siteConfig.email && (
              <p className="mt-2 text-sm text-slate-300">
                <a
                  className="underline decoration-white/20 underline-offset-4 hover:text-white"
                  href={`mailto:${siteConfig.email}`}
                >
                  {siteConfig.email}
                </a>
              </p>
            )}
            {socialLinks.length > 0 && (
              <div className="mt-3">
                <SocialLinks links={socialLinks} />
              </div>
            )}
          </div>
          <nav aria-label="Explore">
            <h2 className="font-semibold text-white">Explore</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 lg:grid-cols-1">
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
          <nav aria-label="Resources">
            <h2 className="font-semibold text-white">Resources</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 lg:grid-cols-1">
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
        <section
          aria-labelledby="footer-location-title"
          className="grid gap-5 border-b border-white/10 py-8 sm:py-9 lg:grid-cols-[minmax(15rem,0.8fr)_minmax(0,1.5fr)] lg:items-center lg:gap-10"
        >
          <div>
            <p className="font-mono text-xs text-aqua-300">LOCATION</p>
            <h2 id="footer-location-title" className="mt-2 text-xl font-semibold text-white">
              {footerMap.title}
            </h2>
            <p className="mt-1 text-sm text-slate-300">{footerMap.address}</p>
            <a
              href={footerMap.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-aqua-300 underline decoration-aqua-300/40 underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aqua-300"
            >
              Open in Google Maps
            </a>
          </div>
          <iframe
            title={`Map of ${footerMap.title}, ${footerMap.address}`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(footerMap.query)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-56 w-full rounded-xl border border-white/10 bg-ink-900 sm:h-64 lg:h-60"
          />
        </section>
        <div className="flex flex-col gap-3 pt-5 text-sm text-slate-400 sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-3xl leading-relaxed">{siteConfig.disclaimer}</p>
          <p className="shrink-0">
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
