import type { NavItem, SocialLink } from '@/types';

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const siteConfig = {
  domain: new URL(rawSiteUrl).hostname,
  url: new URL(rawSiteUrl).origin,
  name: 'Dr. Priyank Gupta',
  /** Flip NEXT_PUBLIC_USE_DOCTOR_TITLE once the Ph.D. record is confirmed. */
  useDoctorTitle: true,
  role: 'Software Architect & Technology Leader',
  headline:
    'Building practical software systems that scale.',
  tagline:
    'I design dependable digital products, simplify complex systems, and turn business needs into working software.',
  altTagline:
    'Practical architecture. Maintainable software. Shared knowledge.',
  description:
    'Dr. Priyank Gupta is an Enterprise Architecture professional focused on scalable web systems, full-stack engineering, AI-driven innovation, and practical digital transformation.',
  experience: '14+ years of IT experience',
  location: '',
  shortLocation: 'Online and offline, subject to availability',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'guptapriyank87@gmail.com',
  alternateEmail: '',
  phone: '',
  phoneHref: '',
  whatsappHref: '',
  publicResumeUrl: '',
  locale: 'en_IN',
  disclaimer:
    'All views, opinions and content expressed on this website are personal and do not represent the views, strategy or opinions of any current or previous employer, client or partner.',
  privacyNote:
    'This website does not use advertising cookies or third-party trackers. Form submissions are used only to respond to your enquiry.',
} as const;

export const displayName = siteConfig.name;

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
  { label: 'Publications', href: '/publications', description: 'Published papers and research articles' },
  { label: 'Projects', href: '/projects' },
  { label: 'Expertise', href: '/expertise' },
  { label: 'Contact', href: '/contact', description: 'Get in touch' },
] as const;

export const footerNav: readonly NavItem[] = [
  { label: 'Public resume', href: '/resume' },
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

/** Ordered contact channels rendered on the contact and speaking pages. */
export const contactChannels = siteConfig.email ? [
  {
    id: 'primary-email',
    label: 'Primary email',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    hint: 'Best for professional, speaking and collaboration enquiries.',
  },
] : [];
