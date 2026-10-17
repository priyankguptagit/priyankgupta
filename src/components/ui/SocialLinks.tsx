import { SocialIcon } from '@/components/ui/SocialIcon';
import { cn, isPlaceholder } from '@/lib/utils';
import type { SocialLink } from '@/types';

interface SocialLinksProps {
  readonly links: readonly SocialLink[];
  readonly variant?: 'row' | 'list';
  readonly className?: string;
}

/**
 * Profiles whose URL is still a `[Add ...]` placeholder render as inert chips so
 * the layout is final while the real links are pending.
 */
export function SocialLinks({ links, variant = 'row', className }: SocialLinksProps) {
  if (variant === 'list') {
    return (
      <ul className={cn('grid gap-2 sm:grid-cols-2', className)}>
        {links.map((link) => {
          const pending = isPlaceholder(link.handle);
          return (
            <li key={link.platform}>
              {pending ? (
                <span className="glass flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-500">
                  <SocialIcon platform={link.platform} />
                  <span>{link.label}</span>
                  <span className="ml-auto rounded-full border border-dashed border-gold-400/50 px-2 py-0.5 text-[0.7rem] text-gold-400">
                    <span className="sr-only">Pending detail: </span>Coming soon
                  </span>
                </span>
              ) : (
                <a
                  href={link.href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="glass flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <SocialIcon platform={link.platform} />
                  <span>{link.label}</span>
                  <span className="ml-auto text-xs text-slate-500">{link.handle}</span>
                </a>
              )}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {links.map((link) => {
        const pending = isPlaceholder(link.handle);
        return (
          <li key={link.platform}>
            {pending ? (
              <span
                title={`${link.label} link coming soon`}
                className="grid size-10 place-items-center rounded-xl border border-dashed border-white/15 text-slate-500"
              >
                <SocialIcon platform={link.platform} />
                <span className="sr-only">{link.label} — link coming soon</span>
              </span>
            ) : (
              <a
                href={link.href}
                target="_blank"
                rel="me noopener noreferrer"
                className="glass grid size-10 place-items-center rounded-xl text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <SocialIcon platform={link.platform} />
                <span className="sr-only">{link.label}</span>
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
