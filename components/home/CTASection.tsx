import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 lg:py-24 bg-[#0C2D5A] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-g" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-g)" />
        </svg>
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-5">
          <span className="h-px w-8 bg-blue-400" />
          <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">
            Get Started
          </span>
          <span className="h-px w-8 bg-blue-400" />
        </div>
        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-5 leading-tight">
          Ready to Keep Your Project Moving?
        </h2>
        <p className="text-blue-100 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
          Contact Fadi directly. We respond within 24 hours and provide a quote promptly.
          No automated replies, no long queues — you speak directly with your certifier.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#0C2D5A] hover:bg-blue-50 font-bold px-8 py-4 rounded-xl transition-colors"
          >
            Get a Quote Within 24 Hours
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="tel:0423925514"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-4 rounded-xl transition-colors"
          >
            <Phone className="w-4 h-4" />
            0423 925 514
          </a>
        </div>
        <p className="mt-6 text-blue-200 text-sm">
          Fadi Habbouche · Registered Building Surveyor Class A3 · BDC2868 · Austral, NSW 2179, Australia
        </p>
      </div>
    </section>
  );
}
