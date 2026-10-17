import Image from 'next/image';
import { Atom, BrainCircuit, Cloud, Factory, Network } from 'lucide-react';
import { HoverSurface } from '@/components/ui/Motion';
import { profilePhoto } from '@/content/site';
import { cn } from '@/lib/utils';

export function Portrait({
  prominent = false,
  className,
  badges = false,
}: {
  prominent?: boolean;
  className?: string;
  badges?: boolean;
}) {
  return (
    <HoverSurface className={cn('portrait-scene relative mx-auto w-full', className)}>
      <div className="portrait-frame relative isolate mx-auto aspect-square w-full rounded-full p-[3px]">
        <div className="portrait-interior relative h-full overflow-hidden rounded-full">
          <Image
            src={profilePhoto.src}
            alt={profilePhoto.alt}
            fill
            preload={prominent}
            sizes={
              prominent
                ? '(min-width: 1024px) 420px, (min-width: 640px) 360px, 270px'
                : '(min-width: 768px) 340px, 270px'
            }
            className="portrait-image object-contain object-bottom"
          />
        </div>
      </div>
      {badges && (
        <div
          className="portrait-badges"
          aria-label="Architecture and technology interests"
        >
          <span className="technology-badge badge-architecture">
            <Network size={16} aria-hidden="true" /> Enterprise Architecture
          </span>
          <span className="technology-badge badge-ai">
            <BrainCircuit size={17} aria-hidden="true" /> Applied AI
          </span>
          <span className="technology-badge badge-azure">
            <Cloud size={16} aria-hidden="true" /> Azure
          </span>
          <span className="technology-badge badge-aws">
            <Cloud size={16} aria-hidden="true" /> AWS
          </span>
          <span className="technology-badge badge-react">
            <Atom size={17} aria-hidden="true" /> React
          </span>
          <span className="technology-badge badge-mes">
            <Factory size={16} aria-hidden="true" /> MES
          </span>
        </div>
      )}
    </HoverSurface>
  );
}
