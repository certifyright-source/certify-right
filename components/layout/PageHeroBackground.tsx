import Image from "next/image";
import type { CSSProperties } from "react";

// Left-to-right navy gradient used on desktop: solid behind the text, clear on the right.
const DESKTOP_GRADIENT =
  "linear-gradient(to right, #0C2D5A 28%, rgba(12,45,90,0.80) 43%, rgba(12,45,90,0.15) 61%, transparent 78%)";

// ── Phones and tablets ─────────────────────────────────────────────────────────────────────
// Solid navy behind the text, then the photo in a band at the bottom of the hero. These
// overlays only tint; they never change the photo's size or position.

// Navy opacity along the fade (position as a fraction of the fade, opacity). An ease-out curve,
// so the solid navy of the text area melts into the photo with no visible edge.
const FADE_STOPS: [number, number][] = [
  [0, 1],
  [0.12, 0.96],
  [0.24, 0.87],
  [0.36, 0.74],
  [0.48, 0.58],
  [0.6, 0.42],
  [0.72, 0.27],
  [0.84, 0.13],
  [0.93, 0.04],
  [1, 0],
];

/** Default length of the fade, as a share of the photo band's height. */
export const MOBILE_FADE_END = "34%";

/**
 * The phone/tablet version of the desktop's left-to-right gradient, turned vertical: it starts
 * as the hero's own solid navy at the top of the photo band and fades out evenly across the
 * full width by `end` (a share of the band's height). Set `end` to finish above any face, so
 * no tint ever sits on it.
 */
export function mobileBlend(end: string = MOBILE_FADE_END) {
  const stops = FADE_STOPS.map(([p, a]) => `rgba(12,45,90,${a}) calc(${end} * ${p})`);
  return `linear-gradient(to bottom, ${stops.join(", ")})`;
}

// A light navy finish along the bottom edge of the photo.
export const MOBILE_BASE =
  "linear-gradient(to top, rgba(12,45,90,0.45) 0%, rgba(12,45,90,0.14) 12%, rgba(12,45,90,0) 24%)";

interface PageHeroBackgroundProps {
  src: string;
  /** object-position on desktop (lg and up) — unchanged from the original hero. */
  position: string;
  /** object-position on phones and tablets, chosen per image so the subject sits in frame. */
  mobilePosition: string;
  /**
   * Phones and tablets: where the navy fade ends, as a share of the photo band's height. For a
   * photo with a person, set it just above their head so the face is never tinted.
   */
  mobileFadeEnd?: string;
  preload?: boolean;
}

/**
 * Background photo layer for page heroes. On desktop (lg+) it fills the whole hero. Below lg
 * (phones and tablets, where text across the photo would cover faces) it fills a band at the
 * bottom of the hero whose height comes from the hero's `--hero-img-h` custom property, so the
 * text above never covers the subject.
 */
export default function PageHeroBackground({
  src,
  position,
  mobilePosition,
  mobileFadeEnd,
  preload = false,
}: PageHeroBackgroundProps) {
  return (
    <div
      className="absolute inset-x-0 bottom-0 h-[var(--hero-img-h)] lg:top-0 lg:h-auto"
      aria-hidden="true"
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-cover object-[var(--pos-m)] lg:object-[var(--pos)]"
        style={{ "--pos": position, "--pos-m": mobilePosition } as CSSProperties}
        preload={preload}
        // Phones/tablets show the banner at the band's height, roughly 2.4× the screen width.
        sizes="(max-width: 1023px) 240vw, 100vw"
      />
      <div className="absolute inset-0 hidden lg:block" style={{ background: DESKTOP_GRADIENT }} />
      <div className="absolute inset-0 lg:hidden" style={{ background: MOBILE_BASE }} />
      {/* Starts 2px above the band so no sliver of photo edge shows under the text area. */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{ top: -2, background: mobileBlend(mobileFadeEnd) }}
      />
    </div>
  );
}
