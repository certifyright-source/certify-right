import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Tell Us About Your Project",
    description:
      "Contact Fadi with your project details — property address, project type, and where you are in the process. We respond within 24 hours.",
  },
  {
    number: "02",
    title: "We Review Your Requirements",
    description:
      "We confirm the right approval pathway (CDC or DA/CC), review your documentation for gaps, and provide a clear quote. No jargon, no surprises.",
  },
  {
    number: "03",
    title: "Certification & Inspections",
    description:
      "Once engaged, we handle your certificate application and coordinate all required critical stage inspections throughout construction.",
  },
  {
    number: "04",
    title: "Keep Your Project Moving",
    description:
      "We respond promptly, communicate clearly, and work to resolve any issues quickly — so your project stays on schedule from approval to occupation.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-24 bg-[#0C2D5A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-px w-8 bg-blue-400" />
            <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">
              How It Works
            </span>
            <span className="h-px w-8 bg-blue-400" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            Simple. Transparent. Responsive.
          </h2>
          <p className="text-blue-100 leading-relaxed">
            From your first call to your Occupation Certificate — here is what working
            with Certify Right looks like.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-white/10 z-0 -translate-y-0.5" />
              )}
              <div className="relative bg-white/10 border border-white/10 rounded-2xl p-6">
                <div className="text-4xl font-bold text-white/20 mb-4 leading-none">
                  {step.number}
                </div>
                <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#0C2D5A] hover:bg-blue-50 font-bold px-8 py-4 rounded-xl transition-colors"
          >
            Get a Quote Within 24 Hours
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
