'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { primaryNav, profilePhoto, siteConfig } from '@/content/site';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

const featuredNav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Expertise', href: '/expertise' },
  { label: 'Publications', href: '/publications' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
];
const secondaryNav = [
  { label: 'Achievements', href: '/achievements' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Accessibility', href: '/accessibility' },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const moreButton = useRef<HTMLButtonElement>(null);
  const mobileMenu = useRef<HTMLElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!open && !moreOpen) return;
    const previousOverflow = document.body.style.overflow;
    if (open) document.body.style.overflow = 'hidden';
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        setMoreOpen(false);
        (open ? menuButton : moreButton).current?.focus();
      }
      if (open && event.key === 'Tab') {
        const links = mobileMenu.current?.querySelectorAll<HTMLAnchorElement>('a');
        const lastLink = links?.[links.length - 1];
        if (event.shiftKey && document.activeElement === menuButton.current) {
          event.preventDefault();
          lastLink?.focus();
        } else if (!event.shiftKey && document.activeElement === lastLink) {
          event.preventDefault();
          menuButton.current?.focus();
        }
      }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) {
        setOpen(false);
        setMoreOpen(false);
        if (open) menuButton.current?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
      else setMoreOpen(false);
    };
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', outside);
    window.addEventListener('resize', resize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', close);
      document.removeEventListener('pointerdown', outside);
      window.removeEventListener('resize', resize);
    };
  }, [open, moreOpen]);
  const active = (href: string) =>
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname.startsWith(`${href}/`);
  return (
    <header
      ref={header}
      className={cn(
        'sticky top-0 z-40 border-b border-white/10 backdrop-blur-xl transition-[background-color,box-shadow] duration-300',
        scrolled ? 'bg-ink-950/95 shadow-[0_8px_30px_-15px_#000000]' : 'bg-ink-950/80'
      )}
    >
      <div
        className={cn(
          'mx-auto flex max-w-[1200px] items-center justify-between gap-2 px-4 transition-[height] duration-300 sm:gap-3 sm:px-8',
          scrolled && !open ? 'h-15' : 'h-16'
        )}
      >
        <Link
          href="/"
          onClick={() => {
            setOpen(false);
            setMoreOpen(false);
          }}
          aria-label={`${siteConfig.name} home`}
          className="flex min-h-11 min-w-0 items-center gap-2 whitespace-nowrap text-sm font-semibold text-white sm:text-base"
        >
          <Image
            src={profilePhoto.src}
            alt=""
            width={40}
            height={40}
            className="size-10 shrink-0 rounded-full border border-aqua-400/40 bg-ink-850 object-cover object-top"
          />
          <span>{siteConfig.name}</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {featuredNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active(item.href) ? 'page' : undefined}
              className={cn(
                'nav-link inline-flex min-h-11 items-center whitespace-nowrap border-b-2 px-2 text-xs transition-colors xl:px-2.5 xl:text-sm',
                active(item.href)
                  ? 'border-transparent font-semibold text-aqua-300'
                  : 'border-transparent text-slate-300 hover:border-aqua-400/40 hover:text-white'
              )}
            >
              {item.label}
              {active(item.href) && (
                <m.span
                  aria-hidden="true"
                  layoutId="primary-nav-indicator"
                  className="absolute inset-x-2 bottom-0 h-0.5 bg-aqua-400"
                  transition={{ duration: reduced ? 0 : 0.25 }}
                />
              )}
            </Link>
          ))}
          <div
            className="relative"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setMoreOpen(false);
            }}
          >
            <button
              ref={moreButton}
              type="button"
              aria-expanded={moreOpen}
              aria-controls="more-navigation"
              onClick={() => setMoreOpen((current) => !current)}
              className={cn(
                'flex min-h-11 items-center gap-1 border-b-2 px-2 text-xs xl:px-3 xl:text-sm',
                secondaryNav.some((item) => item.href !== '/' && active(item.href))
                  ? 'border-aqua-400 font-semibold text-aqua-300'
                  : 'border-transparent'
              )}
            >
              More{' '}
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={cn('transition-transform', moreOpen && 'rotate-180')}
              />
            </button>
            <AnimatePresence>
              {moreOpen && (
                <m.ul
                  id="more-navigation"
                  initial={reduced ? false : { opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -5 }}
                  transition={{ duration: 0.18 }}
                  className="glass-strong absolute right-0 top-full grid w-80 max-w-[calc(100vw-2rem)] rounded-lg p-2 shadow-xl"
                >
                  <li className="mb-2 border-b border-white/10">
                    <NavigationProfile />
                  </li>
                  {secondaryNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMoreOpen(false)}
                        aria-current={active(item.href) ? 'page' : undefined}
                        className={cn(
                          'flex min-h-11 items-center rounded-md px-3 text-sm hover:bg-ink-800',
                          active(item.href) && 'bg-ink-800 font-semibold text-aqua-300'
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </m.ul>
              )}
            </AnimatePresence>
          </div>
        </nav>
        <Link
          href="/contact"
          className="action-button hidden min-h-11 shrink-0 items-center justify-center rounded-md border border-white/20 bg-white/5 px-4 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-white/10 xl:inline-flex"
        >
          Get in Touchh
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close main menu' : 'Open main menu'}
            title={open ? 'Close main menu' : 'Open main menu'}
            className="grid size-11 shrink-0 place-items-center rounded-md border border-white/20 bg-white/5 transition-colors hover:bg-white/10 lg:hidden"
          >
            <span
              className={cn('transition-transform duration-200', open && 'rotate-90')}
            >
              {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </span>
          </button>
        </div>
      </div>
      <div
        className={cn(
          'absolute inset-x-0 top-full grid bg-ink-950/95 backdrop-blur-xl transition-[grid-template-rows,visibility] duration-200 lg:hidden',
          open
            ? 'visible grid-rows-[1fr] border-b border-ink-700 shadow-lg'
            : 'invisible grid-rows-[0fr]'
        )}
      >
        <nav
          ref={mobileMenu}
          id="mobile-navigation"
          aria-label="Mobile primary"
          aria-hidden={!open}
          inert={!open}
          className="min-h-0 overflow-hidden"
        >
          <ul className="grid max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain px-5 py-3 sm:grid-cols-2">
            <li className="mb-2 border-b border-white/10 sm:col-span-2">
              <NavigationProfile />
            </li>
            {primaryNav.map((item, index) => (
              <m.li
                key={item.href}
                initial={false}
                animate={{ opacity: open ? 1 : 0, y: open && !reduced ? [-6, 0] : 0 }}
                transition={{
                  duration: reduced ? 0 : 0.2,
                  delay: open && !reduced ? index * 0.018 : 0,
                }}
              >
                <Link
                  onClick={() => setOpen(false)}
                  href={item.href}
                  aria-current={active(item.href) ? 'page' : undefined}
                  className={cn(
                    'flex min-h-12 items-center rounded-md px-3 text-lg transition-colors hover:bg-ink-800',
                    active(item.href) && 'bg-ink-800 font-semibold text-aqua-300'
                  )}
                >
                  {item.label}
                </Link>
              </m.li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function NavigationProfile() {
  return (
    <div className="flex items-center gap-4 p-3">
      <Image
        src={profilePhoto.src}
        alt={profilePhoto.alt}
        width={80}
        height={104}
        className="h-24 w-20 shrink-0 rounded-lg border border-aqua-300/30 bg-ink-850 object-contain object-bottom"
      />
      <div>
        <p className="text-base font-semibold text-white">{siteConfig.name}</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-400">
          Software Architect
          <br />
          Technology Leader &amp; Mentor
        </p>
        <p className="mt-2 text-xs text-emerald-300">14+ years of experience</p>
      </div>
    </div>
  );
}
