"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CSSProperties } from "react";
import PageHeroBackground from "@/components/layout/PageHeroBackground";

interface Slide {
  id: number;
  chip: string;
  heading: string;
  body: string;
  cta?: { label: string; href: string };
  bg: string;
  objectPos: string;
  /** Phones: the photo sits in a band below the text; keeps Fadi in frame. */
  mobilePos: string;
  /** Phones: Fadi's face position within the photo band, kept clear of the navy blend. */
  mobileFace: string;
}

const SLIDES: Slide[] = [
  {
    id: 0,
    chip: "Approvals & Certification FAQ",
    heading: "Frequently Asked Questions",
    body: "Plain-English answers about CDCs, construction certificates, occupation certificates, inspections, approvals, compliance and the NSW Planning Portal.",
    bg: "/images/faq-slide-3.webp",
    objectPos: "45% center",
    mobilePos: "70% center",
    mobileFace: "27% 29%",
  },
  {
    id: 1,
    chip: "Know the Process",
    heading: "Your Questions. Clear Answers.",
    body: "Understanding how approvals and certification work before you start saves time, reduces surprises, and helps keep your project on track.",
    bg: "/images/faq-slide-1.webp",
    objectPos: "55% center",
    mobilePos: "55% center",
    mobileFace: "53% 30%",
  },
  {
    id: 2,
    chip: "Ask Fadi Directly",
    heading: "Don't See Your Question?",
    body: "Every project is different. Contact Fadi for a straight, same-business-day answer — no vague responses, no unnecessary delays.",
    cta: { label: "Contact Fadi", href: "/contact" },
    bg: "/images/faq-slide-2.webp",
    objectPos: "60% center",
    mobilePos: "100% center",
    mobileFace: "59% 18%",
  },
];

const AUTO_MS = 6000;

export default function FaqHeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goNext = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(goNext, AUTO_MS);
    return () => clearInterval(id);
  }, [goNext, paused]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative bg-[#0C2D5A] sm:min-h-[70vh] overflow-hidden"
      style={{ "--hero-img-h": "84vw", "--faq-text-h": "344px" } as CSSProperties}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="FAQ hero"
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
          <PageHeroBackground
            src={slide.bg}
            position={slide.objectPos}
            mobilePosition={slide.mobilePos}
            mobileFace={slide.mobileFace}
            preload={current === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-12 pb-[calc(var(--hero-img-h)-0.5rem)] sm:min-h-[70vh] sm:py-20 lg:py-24 flex flex-col justify-center">
          {/* Phones: a fixed-height text block (controls pinned to its foot) so the hero and
              photo band don't jump when slides with different text lengths change. */}
          <div className="max-w-xl lg:max-w-[600px] flex flex-col min-h-[var(--faq-text-h)] sm:block sm:min-h-0">
            <div className="flex items-center gap-2 mb-5">
              <span className="h-px w-8 bg-blue-400 flex-shrink-0" />
              <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">
                {slide.chip}
              </span>
            </div>
            <h1 className="text-[1.875rem] sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.1] mb-4 sm:mb-5">
              {slide.heading}
            </h1>
            <p className="text-blue-100/90 text-base leading-[1.65] sm:text-lg sm:leading-relaxed mb-7 sm:mb-8">
              {slide.body}
            </p>
            {slide.cta && (
              <Link
                href={slide.cta.href}
                className="self-start inline-flex items-center gap-2 bg-white text-[#0C2D5A] hover:bg-blue-50 font-bold px-6 py-3.5 rounded-xl transition-colors text-sm shadow-lg shadow-black/20"
              >
                {slide.cta.label}
              </Link>
            )}

            {/* Slide controls */}
            <div className="flex items-center gap-4 mt-auto pt-8 sm:pt-0 sm:mt-12">
              <div className="flex items-center gap-2">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
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
