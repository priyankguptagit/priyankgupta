'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import {
  LazyMotion,
  domAnimation,
  m,
  MotionConfig,
  animate,
  useInView,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion';

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <m.div
      aria-hidden="true"
      className="scroll-progress pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

export function Parallax({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const target = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ['start end', 'end start'] });
  const offset = useTransform(scrollYProgress, [0, 1], [0, -12]);
  return (
    <div ref={target} className={className}>
      <m.div style={{ y: reduced ? 0 : offset }}>{children}</m.div>
    </div>
  );
}

export function Typewriter({ text }: { text: string }) {
  const reduced = useReducedMotion();
  return (
    <span className="relative inline-block max-w-full">
      <span className="sr-only">{text}</span>
      <m.span
        aria-hidden="true"
        className="typewriter inline-block"
        initial={false}
        animate={
          reduced
            ? { clipPath: 'inset(0 0% 0 0)' }
            : { clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'] }
        }
        transition={{
          duration: 1.2,
          ease: (progress) =>
            Math.floor(progress * text.length) / Math.max(1, text.length),
          delay: 0.2,
        }}
      >
        {text}
      </m.span>
    </span>
  );
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  return (
    <m.div
      key={pathname}
      initial={false}
      animate={reduced ? { y: 0 } : { y: [6, 0] }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </m.div>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={false}
      whileInView={reduced ? undefined : { y: [12, 0] }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}

export function AnimatedCounter({
  value,
  suffix = '',
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const counter = useRef<HTMLSpanElement>(null);
  const visible = useInView(counter, { once: true });
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!visible || reduced) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (current) => {
        if (counter.current) counter.current.textContent = Math.round(current).toString();
      },
    });
    return () => controls.stop();
  }, [visible, reduced, value]);
  return (
    <div>
      <p className="font-display text-4xl font-semibold text-white">
        <span className="sr-only">
          {value}
          {suffix} {label}
        </span>
        <span aria-hidden="true">
          <span ref={counter}>{value}</span>
          <span className="text-aqua-300">{suffix}</span>
        </span>
      </p>
      <p aria-hidden="true" className="mt-2 text-sm text-slate-400">
        {label}
      </p>
    </div>
  );
}

export function CharacterReveal({ text }: { text: string }) {
  const reduced = useReducedMotion();
  return (
    <span>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(' ').map((word, wordIndex) => (
          <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap">
            {word.split('').map((character, characterIndex) => (
              <m.span
                key={`${character}-${characterIndex}`}
                className="inline-block"
                initial={false}
                animate={
                  reduced
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : {
                        opacity: [0.75, 1],
                        y: [8, 0],
                        filter: ['blur(2px)', 'blur(0px)'],
                      }
                }
                transition={{
                  duration: 0.4,
                  delay: wordIndex * 0.14 + characterIndex * 0.025,
                }}
              >
                {character}
              </m.span>
            ))}
            {wordIndex < text.split(' ').length - 1 ? '\u00a0' : ''}
          </span>
        ))}
      </span>
    </span>
  );
}

export function HoverSurface({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const horizontal = useMotionValue(0);
  const vertical = useMotionValue(0);
  const rotateX = useSpring(vertical, { stiffness: 180, damping: 25 });
  const rotateY = useSpring(horizontal, { stiffness: 180, damping: 25 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const background = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, #67e8f914, transparent 60%)`;
  return (
    <m.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== 'mouse') return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const positionX = (event.clientX - bounds.left) / bounds.width;
        const positionY = (event.clientY - bounds.top) / bounds.height;
        horizontal.set((positionX - 0.5) * 7);
        vertical.set((0.5 - positionY) * 7);
        glowX.set(positionX * 100);
        glowY.set(positionY * 100);
      }}
      onPointerLeave={() => {
        horizontal.set(0);
        vertical.set(0);
      }}
    >
      <m.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ background }}
      />
      {children}
    </m.div>
  );
}
