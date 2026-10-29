import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  FileCheck,
  HardHat,
  CheckCircle2,
  ClipboardCheck,
  BookOpen,
  FileText,
  Building2,
  Waves,
  Search,
  Flame,
} from "lucide-react";
import { services } from "@/data/services";
import CTASection from "@/components/home/CTASection";
import ApprovalExpertiseSection from "@/components/home/ApprovalExpertiseSection";

export const metadata: Metadata = {
  title: "Approval, Certification & Compliance Services — NSW",
  description:
    "NSW approval, certification and compliance services: CDC, Construction Certificate, Occupation Certificate, Principal Certifier, BCA & NCC Compliance, Development & Approval Support, approval package reviews, NSW Planning Portal assistance, Demolition, Swimming Pool, Building Inspections, Fire Safety & AFSS.",
  alternates: { canonical: "https://certifyright.com.au/services" },
};

const iconMap: Record<string, React.ElementType> = {
  FileCheck,
  HardHat,
  CheckCircle2,
  ClipboardCheck,
  BookOpen,
  FileText,
  Building2,
  Waves,
  Search,
  Flame,
};

export default function ServicesPage() {
  const featured = services.find((s) => s.featured);
  const rest = services.filter((s) => !s.featured);

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0C2D5A] py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#g)" />
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-blue-400" />
              <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">Services</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Approval, Certification & Compliance Services
            </h1>
            <p className="text-blue-100 text-xl leading-relaxed max-w-2xl">
              From early planning advice and approval package reviews through to certification
              and final occupation — practical support at every stage across NSW.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Featured: CDC */}
          {featured && (
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-[#185FA5] text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wide">
                Lead Service
              </div>
              <Link href={`/services/${featured.slug}`} className="group block">
                <div className="bg-[#0C2D5A] rounded-2xl p-8 lg:p-12 hover:bg-[#0a2449] transition-colors relative overflow-hidden">
                  <div className="absolute top-5 right-5 z-10">
                    <span className="bg-[#185FA5] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                      Most Popular
                    </span>
                  </div>
                  <div className="max-w-2xl">
                    <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-5">
                      <FileCheck className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                      {featured.title}
                    </h2>
                    <p className="text-blue-100 leading-relaxed mb-6">
                      {featured.description}
                    </p>
                    <span className="inline-flex items-center gap-2 bg-white text-[#0C2D5A] font-bold px-5 py-2.5 rounded-lg text-sm group-hover:bg-blue-50 transition-colors">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* All services grid */}
          <h2 className="text-xl font-bold text-[#0C2D5A] mb-6">All Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((service) => {
              const Icon = iconMap[service.icon] || FileText;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group bg-[#F8FAFC] hover:bg-white border border-slate-100 hover:border-[#185FA5]/20 hover:shadow-md rounded-2xl p-7 transition-all flex flex-col"
                >
                  <div className="w-12 h-12 bg-[#EEF4FC] group-hover:bg-[#185FA5] rounded-xl flex items-center justify-center mb-5 transition-colors">
                    <Icon className="w-6 h-6 text-[#185FA5] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-[#0C2D5A] font-bold text-lg mb-2 group-hover:text-[#185FA5] transition-colors">
                    {service.shortTitle}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">
                    {service.tagline}
                  </p>
                  <div className="flex items-center gap-1.5 text-[#185FA5] text-sm font-semibold mt-auto">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <ApprovalExpertiseSection />

      <CTASection />
    </>
  );
}
