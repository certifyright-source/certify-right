"use client";

import { useState, useEffect, useCallback } from "react";
import { getImageProps } from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  cta1: { label: string; href: string };
  cta2: { label: string; href: string; phone?: boolean };
  bg: string;
  objectPos: string;
}

const SLIDES: SlideData[] = [
  {
    id: 0,
    chip: "NSW Approvals, Certification & Compliance",
    headline: "More Than a Certifier.",
    accent: "Your Approval & Compliance Partner.",
    body: "Helping homeowners, builders, architects and developers navigate planning, certification, fire safety and compliance across NSW. From planning advice and approval package reviews through to certification and final occupation, we provide practical guidance, responsive communication and a clear path forward.",
    cta1: { label: "Get a Quote Within 24 Hours", href: "/contact" },
    cta2: { label: "0423 925 514", href: "tel:0423925514", phone: true },
    bg: "/images/hero-banner-1.webp",
    objectPos: "90% 30%",
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
  },
];

const TRUST_BADGES = [
  { Icon: ShieldCheck, label: "NSW Fair Trading Registered" },
  { Icon: CheckCircle2, label: "Class A3 · BDC2868" },
  { Icon: Clock, label: "24-Hr Quote Turnaround" },
];

const AUTO_MS = 6000;

// Phones (< 640px) show one full-hero background on every slide: the construction-site banner.
// The tall hero renders it ~1.8× the screen width, so request the full 2000px source.
const MOBILE_BG = "/images/hero-banner-3.webp";
const MOBILE_BG_POS = "78% center";
const MOBILE_BG_SIZES = "1600px";
const MOBILE_BG_QUALITY = 90;
// Desktop banners are shown close to full width, so request them at the higher allowed quality.
const DESKTOP_BG_QUALITY = 90;
// Short laptop screens (xl+): the shorter hero leaves the uncropped banner narrower than the
// screen, so softly feather its left edge into the blurred backdrop instead of showing a hard seam.
// The banners are 2000×1113, so the contained image starts 179.7cqh (its width) from the right.
const HERO_EDGE_MASK =
  "linear-gradient(to right, transparent calc(100% - 179.7cqh), #000 calc(100% - 179.7cqh + 160px))";

const HEADLINE_CLASS =
  "text-[1.75rem] sm:text-5xl lg:text-[3.25rem] xl:text-6xl laptop:text-5xl laptop-short:text-[2.5rem] font-bold text-white leading-[1.1] mb-4 sm:mb-5 laptop:mb-4 laptop-short:mb-3";
const CTA1_CLASS =
  "inline-flex items-center gap-2 bg-white text-[#0C2D5A] hover:bg-blue-50 font-bold px-6 py-3.5 laptop-short:py-3 rounded-xl transition-colors text-sm shadow-lg shadow-black/20";
const CTA2_CLASS =
  "inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 hover:bg-white/5 text-white font-semibold px-6 py-3.5 laptop-short:py-3 rounded-xl transition-all text-sm";

// One slide's text, top-aligned with natural spacing. On short laptop screens (`laptop` /
// `laptop-short` variants in globals.css) type and gaps tighten so the whole hero fits the screen. `sizer` renders a non-interactive copy
// (no h1 or links) used only to reserve the tallest slide's height.
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
      <Heading className={HEADLINE_CLASS}>
        {slide.headline}
        <br />
        <span className="text-blue-300">{slide.accent}</span>
      </Heading>

      {/* Body */}
      <p className="text-blue-100/90 text-[0.9375rem] leading-[1.65] sm:text-lg sm:leading-relaxed laptop:text-base laptop:leading-relaxed mb-7 sm:mb-8 laptop:mb-6 laptop-short:mb-5">
        {slide.body}
      </p>

      <div>
        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mb-8 laptop:mb-6 laptop-short:mb-5">
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

  const slide = SLIDES[current];
  const { props: desktopBg } = getImageProps({
    src: slide.bg,
    alt: "",
    fill: true,
    sizes: "100vw",
    quality: DESKTOP_BG_QUALITY,
  });
  const { props: mobileBg } = getImageProps({
    src: MOBILE_BG,
    alt: "",
    fill: true,
    sizes: MOBILE_BG_SIZES,
    quality: MOBILE_BG_QUALITY,
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
      className="relative bg-[#0C2D5A] min-h-[90vh] lg:min-h-0 overflow-hidden"
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
          {/* One <img>, art-directed: sm+ uses the slide's own banner (as before); phones use the
              shared construction-site banner. Each device downloads only the image it shows. */}
          {/* Wide screens (xl+): the full banner is shown uncropped, so a blurred, darkened copy
              fills any space around it. Not rendered below xl, so it never downloads there. */}
          <div
            className="absolute inset-0 hidden xl:block scale-110 blur-2xl brightness-[0.55] bg-cover bg-center"
            style={{ backgroundImage: `url(${backdropBg.src})` }}
          />
          <picture>
            <source media="(min-width: 640px)" srcSet={desktopBg.srcSet} sizes={desktopBg.sizes} />
            <img
              {...mobileBg}
              alt=""
              loading="eager"
              fetchPriority={current === 0 ? "high" : "auto"}
              className="object-cover object-[var(--hero-pos-m)] sm:object-[var(--hero-pos)] xl:object-contain xl:object-[right_bottom] laptop:xl:[mask-image:var(--hero-edge)]"
              style={
                {
                  ...mobileBg.style,
                  "--hero-pos": slide.objectPos,
                  "--hero-pos-m": MOBILE_BG_POS,
                  "--hero-edge": HERO_EDGE_MASK,
                } as React.CSSProperties
              }
            />
          </picture>
          {/* Left-to-right gradient: solid on left for text, clears on right so face is visible */}
          <div
            className="absolute inset-0 hidden sm:block"
            style={{
              background:
                "linear-gradient(to right, #0C2D5A 28%, rgba(12,45,90,0.80) 43%, rgba(12,45,90,0.15) 61%, transparent 78%)",
            }}
          />
          {/* Phones: text covers the full width, so a top-to-bottom navy gradient — strongest
              behind the heading and paragraph, easing off where the site and helmet show between
              the buttons, then settling again at the foot behind the slider controls. A deep navy
              (#112F59) gradient from the left fades to clear towards the right, and a soft
              brand-blue glow lifts the top. */}
          <div
            className="absolute inset-0 sm:hidden"
            style={{
              background:
                "radial-gradient(120% 40% at 92% 0%, rgba(24,95,165,0.3) 0%, rgba(24,95,165,0) 70%), linear-gradient(to right, rgba(17,47,89,0.6) 0%, rgba(17,47,89,0.38) 25%, rgba(17,47,89,0.14) 48%, rgba(17,47,89,0) 68%),linear-gradient(to bottom, rgba(12,45,90,0.9) 0%, rgba(12,45,90,0.86) 25%, rgba(12,45,90,0.76) 45%, rgba(12,45,90,0.6) 62%, rgba(12,45,90,0.5) 74%, rgba(12,45,90,0.62) 88%, rgba(12,45,90,0.82) 100%)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Main content — text on left, photo shows through on right */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-[90vh] lg:min-h-0 py-12 sm:py-20 lg:py-12 laptop:py-8 laptop-short:py-6 flex flex-col justify-center">

          {/* Text block — constrained to left half on large screens */}
          <div className="max-w-xl lg:max-w-[600px]">
            {/* All slides share one grid cell: invisible copies reserve the tallest slide's
                height, so the hero, buttons and controls never move between slides. On desktop the
                visible slide is centred in that space, so shorter slides leave no gap below. */}
            <div className="grid">
              {SLIDES.map((s) => (
                <div
                  key={`sizer-${s.id}`}
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
            <div className="flex items-center gap-4 mt-12 lg:mt-8 laptop:mt-6 laptop-short:mt-5">
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
