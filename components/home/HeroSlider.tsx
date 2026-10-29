"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
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
    bg: "/images/hero-new.webp",
    objectPos: "65% center",
  },
  {
    id: 1,
    chip: "Complying Development Certificate",
    headline: "Skip Council.",
    accent: "Get Your CDC Faster.",
    body: "A CDC is the fastest approval pathway for eligible residential projects. We assess your project against the SEPP codes and give you a straight answer upfront.",
    cta1: { label: "Learn About CDC", href: "/services/complying-development-certificate" },
    cta2: { label: "Call Fadi", href: "tel:0423925514", phone: true },
    bg: "/images/hero-2.webp",
    objectPos: "60% center",
  },
  {
    id: 2,
    chip: "From Concept to Completion",
    headline: "Clear Advice.",
    accent: "A Clear Path Forward.",
    body: "Not every project starts with a building approval. We provide practical direction early, helping you understand what is achievable before investing significant time and money.",
    cta1: { label: "Our Services", href: "/services" },
    cta2: { label: "Service Areas", href: "/service-areas" },
    bg: "/images/hero-3.webp",
    objectPos: "65% top",
  },
];

const TRUST_BADGES = [
  { Icon: ShieldCheck, label: "NSW Fair Trading Registered" },
  { Icon: CheckCircle2, label: "Class A3 · BDC2868" },
  { Icon: Clock, label: "24-Hr Quote Turnaround" },
];

const AUTO_MS = 6000;

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
  const dy = reduced ? 0 : 18;

  const textVariants = {
    enter: (d: number) => ({ opacity: 0, y: d * dy }),
    center: { opacity: 1, y: 0 },
    exit: (d: number) => ({ opacity: 0, y: d * -dy }),
  };

  return (
    <section
      className="relative bg-[#0C2D5A] min-h-[90vh] overflow-hidden"
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
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          aria-hidden="true"
        >
          <Image
            src={slide.bg}
            alt=""
            fill
            className="object-cover"
            style={{ objectPosition: slide.objectPos }}
            preload={current === 0}
            sizes="100vw"
          />
          {/* Left-to-right gradient: solid on left for text, clears on right so face is visible */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #0C2D5A 28%, rgba(12,45,90,0.80) 43%, rgba(12,45,90,0.15) 61%, transparent 78%)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Main content — text on left, photo shows through on right */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-[90vh] py-20 lg:py-24 flex flex-col justify-center">

          {/* Text block — constrained to left half on large screens */}
          <div className="max-w-xl lg:max-w-[600px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`text-${current}`}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                {/* Chip */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="h-px w-8 bg-blue-400 flex-shrink-0" />
                  <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">
                    {slide.chip}
                  </span>
                </div>

                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-bold text-white leading-[1.1] mb-5">
                  {slide.headline}
                  <br />
                  <span className="text-blue-300">{slide.accent}</span>
                </h1>

                {/* Body */}
                <p className="text-blue-100/90 text-lg leading-relaxed mb-8">
                  {slide.body}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 mb-10">
                  <Link
                    href={slide.cta1.href}
                    className="inline-flex items-center gap-2 bg-white text-[#0C2D5A] hover:bg-blue-50 font-bold px-6 py-3.5 rounded-xl transition-colors text-sm shadow-lg shadow-black/20"
                  >
                    {slide.cta1.label}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={slide.cta2.href}
                    className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 hover:bg-white/5 text-white font-semibold px-6 py-3.5 rounded-xl transition-all text-sm"
                  >
                    {slide.cta2.phone && <Phone className="w-4 h-4 flex-shrink-0" />}
                    {slide.cta2.label}
                  </a>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-2">
                  {TRUST_BADGES.map(({ Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 bg-[#0C2D5A]/70 border border-white/20 rounded-lg px-3 py-2 backdrop-blur-sm"
                    >
                      <Icon className="w-3.5 h-3.5 text-blue-300 flex-shrink-0" />
                      <span className="text-white/90 text-xs font-medium whitespace-nowrap">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide controls */}
            <div className="flex items-center gap-4 mt-12">
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
