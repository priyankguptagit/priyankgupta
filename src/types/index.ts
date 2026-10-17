/** Domain types for the priyankgupta.com personal site. */

/** Marker for values that still need to be supplied by the site owner. */
type Placeholder = `[Add ${string}]`;

/** A value that is either real content or an explicit, editable placeholder. */
type Editable<T = string> = T | Placeholder;

export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly description?: string;
}

export type SocialPlatform =
  | 'linkedin'
  | 'github'
  | 'x'
  | 'youtube'
  | 'instagram'
  | 'facebook'
  | 'medium'
  | 'stackoverflow'
  | 'scholar'
  | 'email'
  | 'phone'
  | 'whatsapp';

export interface SocialLink {
  readonly platform: SocialPlatform;
  readonly label: string;
  readonly href: string;
  readonly handle: string;
}

interface ExperienceProject {
  readonly name: Editable;
  readonly summary: Editable;
}

export interface Experience {
  readonly id: string;
  readonly company: string;
  readonly designation: Editable;
  readonly employmentType: Editable;
  readonly location: Editable;
  readonly startDate: Editable;
  readonly endDate: Editable;
  readonly currentlyWorking: boolean;
  readonly summary: Editable;
  readonly responsibilities: readonly string[];
  readonly achievements: readonly string[];
  readonly technologies: readonly string[];
  readonly domain: Editable;
  readonly projects: readonly ExperienceProject[];
  readonly logo: Editable;
  readonly website: Editable;
  /** Confidential engagements are rendered without client or system names. */
  readonly confidential: boolean;
  readonly order: number;
}

export interface ExpertiseCategory {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly accent: AccentKey;
  readonly skills: readonly string[];
}

type AccentKey = 'indigo' | 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose';

export interface Project {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly client?: string;
  readonly role?: string;
  readonly startDate?: string;
  readonly endDate?: string;
  readonly location?: string;
  readonly overview: string;
  readonly responsibilities: readonly string[];
  readonly technologies: readonly string[];
  readonly categories: readonly string[];
  readonly category: string;
  readonly summary?: string;
  readonly highlights?: readonly string[];
  readonly link?: Editable;
  readonly publicUrl?: string | null;
  readonly source?: string;
  readonly confidential: boolean;
  readonly featured?: boolean;
  readonly sortOrder?: number;
  readonly visibility?: 'approved' | 'review';
  readonly image?: { readonly src: string; readonly alt: string };
}

export interface Article {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly publishedAt: Editable;
  readonly readingTime: string;
  readonly tags: readonly string[];
  readonly status: 'published' | 'draft';
  readonly body: readonly string[];
  readonly category?: string;
  readonly updatedAt?: string;
  readonly author?: string;
  readonly featuredImage?: string;
}
