import type { CSSProperties } from "react";
import PageHeroBackground from "@/components/layout/PageHeroBackground";

/** FAQs page hero: a single static banner. */
export default function FaqHero() {
  return (
    <section
      className="relative bg-[#0C2D5A] lg:min-h-[70vh] overflow-hidden"
      style={{ "--hero-img-h": "min(84vw, 600px)" } as CSSProperties}
      aria-label="FAQ hero"
    >
      {/* Background: Fadi reviewing a tablet at his desk (phones and tablets: photo band below the text) */}
      <PageHeroBackground
        src="/images/faq-slide-3.webp"
        position="45% center"
        mobilePosition="70% center"
        mobileFace="27% 29%"
        preload
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-12 sm:pt-16 pb-[calc(var(--hero-img-h)-0.5rem)] lg:min-h-[70vh] lg:py-24 flex flex-col justify-center">
          <div className="max-w-xl lg:max-w-[600px]">
            <div className="flex items-center gap-2 mb-5">
              <span className="h-px w-8 bg-blue-400 flex-shrink-0" />
              <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">
                Approvals &amp; Certification FAQ
              </span>
            </div>
            <h1 className="text-[1.875rem] sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.1] mb-4 sm:mb-5">
              Frequently Asked Questions
            </h1>
            <p className="text-blue-100/90 text-base leading-[1.65] sm:text-lg sm:leading-relaxed">
              Plain-English answers about CDCs, construction certificates, occupation certificates,
              inspections, approvals, compliance and the NSW Planning Portal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
