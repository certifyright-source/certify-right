"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getImageProps } from "next/image";
import Link from "next/link";
import {
  MOBILE_BASE,
  MOBILE_FADE_END,
  mobileBlend,
} from "@/components/layout/PageHeroBackground";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  Phone,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface SlideData {
  id: number;
  chip: string;
  headline: string;
  accent: string;
  body: string;
  /** Shorter description for phones (below 768px); `body` is shown from md (768px) up. */
  mobileBody?: string;
  cta1: { label: string; href: string };
  cta2: { label: string; href: string; phone?: boolean };
  bg: string;
  objectPos: string;
  /** Phones and tablets: object-position of the photo band below the text (before it is measured). */
  mobilePos: string;
  /**
   * Phones and tablets: where the navy fade over the photo ends (share of the band's height),
   * just above the person's head so the face is never tinted.
   */
  mobileFadeEnd?: string;
  /**
   * Phones and tablets: the point to keep in frame, as fractions of the image ([x, y]). Once the band is
   * measured the photo is framed around it.
   */
  focus: [number, number];
}

const SLIDES: SlideData[] = [
  {
    id: 0,
    chip: "NSW Approvals, Certification & Compliance",
    headline: "More Than a Certifier.",
    accent: "Your Approval & Compliance Partner.",
    mobileBody:
      "Expert guidance for building approvals, certification and compliance across NSW — making your project simpler from start to finish.",
    body: "Helping homeowners, builders, architects and developers navigate planning, certification, fire safety and compliance across NSW. From planning advice and approval package reviews through to certification and final occupation, we provide practical guidance, responsive communication and a clear path forward.",
    cta1: { label: "Get a Quote Within 24 Hours", href: "/contact" },
    cta2: { label: "0423 925 514", href: "tel:0423925514", phone: true },
    bg: "/images/hero-banner-1.webp",
    objectPos: "90% 30%",
    mobilePos: "100% center",
    mobileFadeEnd: "26%",
    focus: [0.81, 0.36],
  },
  {
    id: 1,
    chip: "Complying Development Certificate",
    headline: "Skip Council.",
    accent: "Get Your CDC Faster.",
    body: "A CDC is the fastest approval pathway for eligible residential projects. We assess your project against the SEPP codes and give you a straight answer upfront.",
    cta1: { label: "Learn About CDC", href: "/services/complying-development-certificate" },
    cta2: { label: "Call Fadi", href: "tel:0423925514", phone: true },
    bg: "/images/hero-banner-2.webp",
    objectPos: "60% 30%",
    mobilePos: "100% center",
    mobileFadeEnd: "18%",
    focus: [0.67, 0.33],
  },
  {
    id: 2,
    chip: "From Concept to Completion",
    headline: "Clear Advice.",
    accent: "A Clear Path Forward.",
    body: "Not every project starts with a building approval. We provide practical direction early, helping you understand what is achievable before investing significant time and money.",
    cta1: { label: "Our Services", href: "/services" },
    cta2: { label: "Service Areas", href: "/service-areas" },
    bg: "/images/hero-banner-3.webp",
    objectPos: "95% center",
    mobilePos: "78% center",
    focus: [0.75, 0.65],
  },
];

const TRUST_BADGES = [
  { Icon: ShieldCheck, label: "NSW Fair Trading Registered" },
  { Icon: CheckCircle2, label: "Class A3 · BDC2868" },
  { Icon: Clock, label: "24-Hr Quote Turnaround" },
];

const AUTO_MS = 6000;

// Phones and tablets (< 1024px): each slide's own banner sits in a photo band below the text
// and slider controls. This is its height under the longest slide; shorter slides start it
// higher.
const MOBILE_IMG_H = "min(80vw, 500px)";
// Phones and tablets: the photo band starts this far below the slide text. The slider controls
// sit on the band's solid-navy top edge, so there is no empty navy strip above the photo.
const BAND_GAP = 24;
// Banner aspect ratio (all three are 2000×1113).
const BG_ASPECT = 2000 / 1113;

interface MobileBand {
  /** Top of the slider controls, from the top of the text block. */
  ctrlTop: number;
  /** Photo band height. */
  h: number;
  /** object-position that frames the slide's focus point in the band. */
  pos: string;
}

// Frame the focus point (image fractions) in a w×h band, as object-cover would show it.
function frameBand(slide: SlideData, w: number, h: number, ctrlTop: number): MobileBand {
  const scale = Math.max(w / BG_ASPECT, h);
  const iw = scale * BG_ASPECT;
  const ih = scale;
  const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
  // Put the focus a little right of centre (text reads from the left) and in the upper half.
  const offX = iw > w ? clamp(0.6 * w - slide.focus[0] * iw, w - iw, 0) : 0;
  const offY = ih > h ? clamp(0.42 * h - slide.focus[1] * ih, h - ih, 0) : 0;
  const posX = iw > w ? (offX / (w - iw)) * 100 : 50;
  const posY = ih > h ? (offY / (h - ih)) * 100 : 50;
  return { ctrlTop, h, pos: `${posX.toFixed(1)}% ${posY.toFixed(1)}%` };
}
// Banners are shown close to full width (and ~2.4× the screen width in the phone band), so
// request them at the higher allowed quality.
const BG_QUALITY = 90;
// Wide screens (xl+): when the hero is short for its width, the uncropped banner is narrower
// than the screen, so softly feather its left edge into the blurred backdrop (no hard seam).
// The banners are 2000×1113, so the contained image starts 179.7cqh (its width) from the right.
const HERO_EDGE_MASK =
  "linear-gradient(to right, transparent calc(100% - 179.7cqh), #000 calc(100% - 179.7cqh + 160px))";

const HEADLINE_BASE =
  "font-bold text-white leading-[1.1] mb-4 sm:mb-5 laptop:mb-4 laptop-short:mb-3";
const HEADLINE_SIZE =
  "text-[1.75rem] sm:text-5xl lg:text-[3.25rem] xl:text-6xl laptop:text-5xl laptop-short:text-[2.5rem]";
// Slide 1 has the longest headline, so on desktop it is set slightly smaller.
const HEADLINE_SIZE_LONG =
  "text-[1.75rem] sm:text-5xl lg:text-[3rem] xl:text-[3.375rem] laptop:text-[2.75rem] laptop-short:text-[2.375rem]";
const CTA1_CLASS =
  "inline-flex items-center gap-2 bg-white text-[#0C2D5A] hover:bg-blue-50 font-bold px-6 py-3.5 laptop-short:py-3 rounded-xl transition-colors text-sm shadow-lg shadow-black/20";
const CTA2_CLASS =
  "inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 hover:bg-white/5 text-white font-semibold px-6 py-3.5 laptop-short:py-3 rounded-xl transition-all text-sm";

// One slide's text, top-aligned with natural spacing. On short laptop screens (`laptop` /
// `laptop-short` variants in globals.css) type and gaps tighten so the whole hero fits the
// screen. `sizer` renders a non-interactive copy (no h1 or links) used only to reserve the
// tallest slide's height.
function SlideText({ slide, sizer = false }: { slide: SlideData; sizer?: boolean }) {
  const Heading = sizer ? "div" : "h1";
  const cta2Content = (
    <>
      {slide.cta2.phone && <Phone className="w-4 h-4 flex-shrink-0" />}
      {slide.cta2.label}
    </>
  );

  return (
    <>
      {/* Chip — reserves two lines on phones, where the longest chip wraps, so headlines line up */}
      <div className="min-h-8 sm:min-h-0 mb-5 laptop:mb-4 laptop-short:mb-3">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-blue-400 flex-shrink-0" />
          <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">
            {slide.chip}
          </span>
        </div>
      </div>

      {/* Headline */}
      <Heading className={`${slide.id === 0 ? HEADLINE_SIZE_LONG : HEADLINE_SIZE} ${HEADLINE_BASE}`}>
        {slide.headline}
        <br />
        <span className="text-blue-300">{slide.accent}</span>
      </Heading>

      {/* Body */}
      <p className="text-blue-100/90 text-[0.9375rem] leading-[1.65] sm:text-lg sm:leading-relaxed laptop:text-base laptop:leading-relaxed mb-7 sm:mb-8 laptop:mb-6 laptop-short:mb-5">
        {slide.mobileBody ? (
          <>
            <span className="md:hidden">{slide.mobileBody}</span>
            <span className="hidden md:inline">{slide.body}</span>
          </>
        ) : (
          slide.body
        )}
      </p>

      <div>
        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mb-6 md:mb-8 laptop:mb-6 laptop-short:mb-5">
          {sizer ? (
            <>
              <span className={CTA1_CLASS}>
                {slide.cta1.label}
                <ArrowRight className="w-4 h-4" />
              </span>
              <span className={CTA2_CLASS}>{cta2Content}</span>
            </>
          ) : (
            <>
              <Link href={slide.cta1.href} className={CTA1_CLASS}>
                {slide.cta1.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={slide.cta2.href} className={CTA2_CLASS}>
                {cta2Content}
              </a>
            </>
          )}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-2">
          {TRUST_BADGES.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 bg-[#0C2D5A]/70 border border-white/20 rounded-lg px-3 py-2 backdrop-blur-sm"
            >
              <Icon className="w-3.5 h-3.5 text-blue-300 flex-shrink-0" />
              <span className="text-white/90 text-xs font-medium whitespace-nowrap">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goTo = useCallback(
    (n: number) => {
      setDirection(n > current ? 1 : -1);
      setCurrent(n);
    },
    [current]
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(goNext, AUTO_MS);
    return () => clearInterval(id);
  }, [goNext, paused]);

  // Phones and tablets: start the photo band right under the current slide's text, so slides with less
  // text show more photo instead of an empty navy gap. Measured from that slide's invisible
  // sizer copy, which has the same layout but never animates. The hero's height stays fixed.
  const sectionRef = useRef<HTMLElement>(null);
  const sizerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const [band, setBand] = useState<MobileBand | null>(null);
  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const sizer = sizerRefs.current[current];
    if (!section || !text || !sizer) return;
    const phone = window.matchMedia("(max-width: 1023px)");
    const measure = () => {
      const textEnd = sizer.lastElementChild;
      if (!phone.matches || !textEnd) {
        setBand(null);
        return;
      }
      const textEndY = textEnd.getBoundingClientRect().bottom;
      // Controls are positioned within the text block; the band within the hero.
      const ctrlTop = Math.round(textEndY - text.getBoundingClientRect().top);
      const bandTop = Math.round(textEndY - section.getBoundingClientRect().top) + BAND_GAP;
      const w = section.clientWidth;
      const h = Math.round(section.clientHeight - bandTop);
      setBand(frameBand(SLIDES[current], w, h, ctrlTop));
    };
    const ro = new ResizeObserver(measure);
    ro.observe(section);
    ro.observe(sizer);
    phone.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      phone.removeEventListener("change", measure);
    };
  }, [current]);

  const slide = SLIDES[current];
  const { props: bgImg } = getImageProps({
    src: slide.bg,
    alt: "",
    fill: true,
    sizes: "(max-width: 1023px) 240vw, 100vw",
    quality: BG_QUALITY,
  });
  // Small copy of the slide's banner for the blurred backdrop on wide screens (blur hides detail).
  const { props: backdropBg } = getImageProps({
    src: slide.bg,
    alt: "",
    width: 640,
    height: 356,
  });
  const dy = reduced ? 0 : 18;

  const textVariants = {
    enter: (d: number) => ({ opacity: 0, y: d * dy }),
    center: { opacity: 1, y: 0 },
    exit: (d: number) => ({ opacity: 0, y: d * -dy }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0C2D5A] overflow-hidden"
      style={{ "--hero-img-h": MOBILE_IMG_H } as CSSProperties}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      aria-label="Hero"
    >
      {/* Background image — crossfades per slide */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${current}`}
          className="absolute inset-0 [container-type:size]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          aria-hidden="true"
        >
          {/* Wide screens (xl+): the full banner is shown uncropped, so a blurred, darkened copy
              fills any space around it. Not rendered below xl, so it never downloads there. */}
          <div
            className="absolute inset-0 hidden xl:block scale-110 blur-2xl brightness-[0.55] bg-cover bg-center"
            style={{ backgroundImage: `url(${backdropBg.src})` }}
          />
          {/* The slide's own banner. Desktop (lg+): fills the whole hero. Below lg: a photo band below the text. */}
          <div
            className="absolute inset-x-0 bottom-0 h-[var(--band-h,var(--hero-img-h))] lg:top-0 lg:h-auto"
            style={band ? ({ "--band-h": `${band.h}px` } as CSSProperties) : undefined}
          >
            {/* Already optimised: the props come from next/image's getImageProps. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              {...bgImg}
              alt=""
              loading="eager"
              fetchPriority={current === 0 ? "high" : "auto"}
              className="object-cover object-[var(--hero-pos-m)] lg:object-[var(--hero-pos)] xl:object-contain xl:object-[right_bottom] xl:[mask-image:var(--hero-edge)]"
              style={
                {
                  ...bgImg.style,
                  "--hero-pos": slide.objectPos,
                  "--hero-pos-m": band ? band.pos : slide.mobilePos,
                  "--hero-edge": HERO_EDGE_MASK,
                } as CSSProperties
              }
            />
            {/* Left-to-right gradient: solid on left for text, clears on right so face is visible */}
            <div
              className="absolute inset-0 hidden lg:block"
              style={{
                background:
                  "linear-gradient(to right, #0C2D5A 28%, rgba(12,45,90,0.80) 43%, rgba(12,45,90,0.15) 61%, transparent 78%)",
              }}
            />
            {/* Phones and tablets: the same gradient turned vertical (solid navy from the text area
                fading evenly down into the photo, ending above the face), plus a light navy foot. */}
            <div className="absolute inset-0 lg:hidden" style={{ background: MOBILE_BASE }} />
            <div
              className="absolute inset-0 lg:hidden"
              style={{ top: -2, background: mobileBlend(slide.mobileFadeEnd ?? MOBILE_FADE_END) }}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Main content — text on left, photo shows through on right */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-8 sm:pt-14 pb-[calc(var(--hero-img-h)+76px)] lg:pt-16 lg:pb-12 laptop:pt-10 laptop:pb-8 laptop-short:pt-8 laptop-short:pb-6 flex flex-col justify-center">

          {/* Text block — constrained to left half on large screens */}
          <div ref={textRef} className="relative max-w-xl lg:max-w-[600px]">
            {/* All slides share one grid cell: invisible copies reserve the tallest slide's
                height, so the hero, buttons and controls never move between slides. On desktop the
                visible slide is centred in that space, so shorter slides leave no gap below. */}
            <div className="grid">
              {SLIDES.map((s) => (
                <div
                  key={`sizer-${s.id}`}
                  ref={(el) => {
                    sizerRefs.current[s.id] = el;
                  }}
                  className="invisible flex flex-col [grid-area:1/1]"
                  aria-hidden="true"
                >
                  <SlideText slide={s} sizer />
                </div>
              ))}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`text-${current}`}
                  className="flex flex-col [grid-area:1/1] lg:self-center"
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <SlideText slide={slide} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide controls */}
            {/* Phones and tablets: placed just under the current slide's text (the photo band
                starts below). */}
            <div
              className="flex items-center gap-4 max-lg:absolute max-lg:inset-x-0 max-lg:top-[var(--ctrl-top,auto)] mt-8 laptop:mt-6 laptop-short:mt-5"
              style={band ? ({ "--ctrl-top": `${band.ctrlTop}px` } as CSSProperties) : undefined}
            >
              <div className="flex items-center gap-2">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-7 h-2 bg-white"
                        : "w-2 h-2 bg-white/35 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2 ml-auto">
                <button
                  onClick={goPrev}
                  aria-label="Previous slide"
                  className="w-9 h-9 rounded-full border border-white/20 hover:border-white/50 flex items-center justify-center text-white/60 hover:text-white transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={goNext}
                  aria-label="Next slide"
                  className="w-9 h-9 rounded-full border border-white/20 hover:border-white/50 flex items-center justify-center text-white/60 hover:text-white transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-advance progress bar */}
      {!paused && (
        <motion.div
          key={`progress-${current}`}
          className="absolute bottom-0 left-0 h-[3px] bg-white/30 z-20"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
          aria-hidden="true"
        />
      )}
    </section>
  );
}
