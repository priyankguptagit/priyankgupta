import type { NavItem, SocialLink } from '@/types';

const defaultSiteUrl = 'https://priyankgupta.vercel.app';
const configuredSiteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl);
const isLocalHostname =
  configuredSiteUrl.hostname === 'localhost' ||
  configuredSiteUrl.hostname.endsWith('.localhost') ||
  configuredSiteUrl.hostname === '127.0.0.1' ||
  configuredSiteUrl.hostname === '0.0.0.0' ||
  configuredSiteUrl.hostname === '[::1]';
const siteUrl = isLocalHostname ? new URL(defaultSiteUrl) : configuredSiteUrl;

export const siteConfig = {
  domain: siteUrl.hostname,
  url: siteUrl.origin,
  name: 'Dr. Priyank Gupta',
  /** Flip NEXT_PUBLIC_USE_DOCTOR_TITLE once the Ph.D. record is confirmed. */
  useDoctorTitle: true,
  role: 'Software Architect & Technology Leader',
  headline: 'Exploring technology. Sharing knowledge. Enabling growth.',
  tagline:
    'I work across software architecture, engineering, AI and machine learning, and research. I also welcome opportunities to share practical technical knowledge through free learning sessions, subject to availability.',
  altTagline: 'Practical architecture. Maintainable software. Shared knowledge.',
  description:
    'Dr. Priyank Gupta is a Software Architect and Technology Leader exploring scalable systems, applied AI and machine learning, research, and free technical knowledge-sharing sessions.',
  experience: '14+ years of IT experience',
  location: '',
  shortLocation: 'Online and offline, subject to availability',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'guptapriyank87@gmail.com',
  alternateEmail: '',
  phone: '',
  phoneHref: '',
  whatsappHref: '',
  locale: 'en_IN',
  disclaimer:
    'All views, opinions and content expressed on this website are personal and do not represent the views, strategy or opinions of any current or previous employer, client or partner.',
  privacyNote:
    'No analytics or advertising trackers are used. Contact requests are sent to the configured inquiry service; see the privacy notice for details.',
} as const;

/** Served from /public/images. Replace the file in place to swap the portrait. */
export const profilePhoto = {
  src: '/images/PriyankGupta.png',
  width: 181,
  height: 236,
  alt: `${siteConfig.name} — ${siteConfig.role}`,
} as const;

export const primaryNav: readonly NavItem[] = [
  { label: 'Home', href: '/', description: 'Overview and highlights' },
  { label: 'About', href: '/about', description: 'Professional story and principles' },
  {
    label: 'Knowledge Sharing',
    href: '/knowledge-sharing',
    description: 'Free technical learning sessions',
  },
  {
    label: 'Learning Resources',
    href: '/resources',
    description: 'Technical learning materials',
  },
  {
    label: 'Publications',
    href: '/publications',
    description: 'Published papers and research articles',
  },
  { label: 'Projects', href: '/projects' },
  { label: 'Expertise', href: '/expertise' },
  { label: 'Contact', href: '/contact', description: 'Get in touch' },
] as const;

export const footerNav: readonly NavItem[] = [
  { label: 'Sessions', href: '/sessions' },
  { label: 'Achievements', href: '/achievements' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'Accessibility', href: '/accessibility' },
] as const;

export const footerMap = {
  title: 'MFAR Building, Manyata Tech Park',
  address: 'Bengaluru, Karnataka',
  query: 'MFAR, Manyata Tech Park, Bengaluru, Karnataka',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=MFAR%2C%20Manyata%20Tech%20Park%2C%20Bengaluru%2C%20Karnataka',
} as const;

/**
 * Public profiles. Handles are placeholders until the real URLs are supplied;
 * `EditableValue`-style rendering keeps unverified links from becoming dead links.
 */
export const socialLinks: readonly SocialLink[] = [];
