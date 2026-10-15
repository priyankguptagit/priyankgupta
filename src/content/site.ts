import type { NavItem, SocialLink } from '@/types';

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const siteConfig = {
  domain: new URL(rawSiteUrl).hostname,
  url: new URL(rawSiteUrl).origin,
  name: 'Priyank Gupta',
  /** Flip NEXT_PUBLIC_USE_DOCTOR_TITLE once the Ph.D. record is confirmed. */
  useDoctorTitle: false,
  role: 'Senior Solution Architect',
  headline:
    'Senior Solution Architect | Enterprise Architect | Full-Stack Technology Leader | MERN and Next.js Specialist',
  tagline:
    'Transforming business needs into scalable digital solutions.',
  altTagline:
    'Practical architecture. Maintainable software. Shared knowledge.',
  description:
    'Senior Solution Architect and full-stack technology professional with 14+ years of experience across enterprise applications, modern web development, cloud, DevOps, testing and applied AI.',
  experience: '14+ years of IT experience',
  location: '',
  shortLocation: 'Online and offline, subject to availability',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
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
  { label: 'Experience', href: '/experience', description: 'Career timeline' },
  { label: 'Skills', href: '/skills' },
  { label: 'Projects', href: '/projects' },
  { label: 'Knowledge Sharing', href: '/knowledge-sharing' },
  { label: 'Audiences', href: '/audiences' },
  { label: 'Sessions', href: '/sessions' },
  { label: 'Achievements', href: '/achievements' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact', description: 'Get in touch' },
] as const;

export const footerNav: readonly NavItem[] = [
  { label: 'Public resume', href: '/resume' },
  { label: 'Education', href: '/education' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'Accessibility', href: '/accessibility' },
] as const;

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
