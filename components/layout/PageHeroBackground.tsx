import Image from "next/image";
import type { CSSProperties } from "react";

// Left-to-right navy gradient used on tablets/desktop: solid behind the text, clear on the right.
const DESKTOP_GRADIENT =
  "linear-gradient(to right, #0C2D5A 28%, rgba(12,45,90,0.80) 43%, rgba(12,45,90,0.15) 61%, transparent 78%)";

// ── Phones ────────────────────────────────────────────────────────────────────────────────
// The photo sits in a band at the bottom of the hero, below the text. These overlays only
// tint; they never change the photo's size or position.

// Over the photo, two gradients blend it into the navy text area:
//  • left → right: deep navy (#112F59) on the left, easing to fully transparent by ~70%
//  • top → bottom: starts as the hero's own navy (no seam with the text area) and eases out
//    over the top ~half of the photo, so there's no horizontal edge under the text.
const MOBILE_BLEND =
  "linear-gradient(to right, rgba(17,47,89,0.9) 0%, rgba(17,47,89,0.72) 14%, rgba(17,47,89,0.48) 28%, rgba(17,47,89,0.24) 44%, rgba(17,47,89,0.08) 58%, rgba(17,47,89,0) 70%), " +
  "linear-gradient(to bottom, #0C2D5A 0%, rgba(12,45,90,0.9) 6%, rgba(12,45,90,0.74) 12%, rgba(12,45,90,0.54) 19%, rgba(12,45,90,0.34) 27%, rgba(12,45,90,0.18) 35%, rgba(12,45,90,0.07) 43%, rgba(12,45,90,0) 52%)";

// A light navy finish along the bottom edge of the photo.
const MOBILE_BASE =
  "linear-gradient(to top, rgba(12,45,90,0.45) 0%, rgba(12,45,90,0.14) 12%, rgba(12,45,90,0) 24%)";

// Behind the text: a soft brand-blue glow from the top-right corner, so the text area reads as
// a gradient rather than a flat navy block. It has faded out before the photo band begins.
const MOBILE_TEXT_GLOW =
  "radial-gradient(120% 50% at 92% 0%, rgba(24,95,165,0.38) 0%, rgba(24,95,165,0) 75%)";

interface PageHeroBackgroundProps {
  src: string;
  /** object-position on tablets/desktop (sm and up) — unchanged from the original hero. */
  position: string;
  /** object-position on phones, chosen per image so the subject sits in frame. */
  mobilePosition: string;
  /**
   * Phones: centre of the person's face within the photo band ("x% y%"). The navy blend is
   * faded out in a soft oval around this point so the face stays clear and untinted.
   */
  mobileFace?: string;
  preload?: boolean;
}

/**
 * Background photo layer for page heroes. On sm+ it fills the whole hero exactly as before.
 * Below sm it fills a band at the bottom of the hero whose height comes from the hero's
 * `--hero-img-h` custom property, so the text above never covers the subject.
 */
export default function PageHeroBackground({
  src,
  position,
  mobilePosition,
  mobileFace,
  preload = false,
}: PageHeroBackgroundProps) {
  // The oval keeps the face clear; the top strip of the band always keeps the full blend so the
  // photo starts out navy right under the text, whatever the face position.
  const faceMask = mobileFace
    ? `linear-gradient(to bottom, black 0%, black 9%, transparent 16%), radial-gradient(ellipse 24% 27% at ${mobileFace}, transparent 50%, black 100%)`
    : undefined;

  return (
    <>
      <div
        className="absolute inset-0 sm:hidden"
        style={{ background: MOBILE_TEXT_GLOW }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[var(--hero-img-h)] sm:top-0 sm:h-auto"
        aria-hidden="true"
      >
        <Image
          src={src}
          alt=""
          fill
          className="object-cover object-[var(--pos-m)] sm:object-[var(--pos)]"
          style={{ "--pos": position, "--pos-m": mobilePosition } as CSSProperties}
          preload={preload}
          // Phones show the banner at the band's height, roughly 2.4× the screen width.
          sizes="(max-width: 639px) 240vw, 100vw"
        />
        <div className="absolute inset-0 hidden sm:block" style={{ background: DESKTOP_GRADIENT }} />
        <div className="absolute inset-0 sm:hidden" style={{ background: MOBILE_BASE }} />
        {/* Starts 2px above the band so no sliver of photo edge shows under the text area. */}
        <div
          className="absolute inset-0 sm:hidden"
          style={{
            top: -2,
            background: MOBILE_BLEND,
            maskImage: faceMask,
            WebkitMaskImage: faceMask,
          }}
        />
      </div>
    </>
  );
}
