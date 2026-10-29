import Link from "next/link";
import { ArrowRight, FileCheck, HardHat, CheckCircle2, ClipboardCheck, BookOpen, FileText, Building2, Waves, Search, Flame } from "lucide-react";
import { services } from "@/data/services";

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

export default function ServicesSection() {
  const featured = services.find((s) => s.featured);
  const rest = services.filter((s) => !s.featured);

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-8 bg-[#185FA5]" />
              <span className="text-[#185FA5] text-xs font-semibold tracking-widest uppercase">
                Our Services
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0C2D5A] leading-tight">
              Approval, Certification & Compliance Services
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[#185FA5] font-semibold text-sm hover:text-[#0C2D5A] transition-colors whitespace-nowrap"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured: CDC */}
        {featured && (
          <div className="mb-8">
            <Link href={`/services/${featured.slug}`} className="group block">
              <div className="bg-[#0C2D5A] rounded-2xl p-8 lg:p-10 hover:bg-[#0a2449] transition-colors relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <span className="bg-[#185FA5] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                    Most Popular
                  </span>
                </div>
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                        <FileCheck className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-blue-300 text-sm font-semibold uppercase tracking-wider">
                        Lead Service
                      </span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                      {featured.title}
                    </h3>
                    <p className="text-blue-100 leading-relaxed mb-6">
                      {featured.tagline}
                    </p>
                    <span className="inline-flex items-center gap-2 bg-white text-[#0C2D5A] font-bold px-5 py-2.5 rounded-lg text-sm group-hover:bg-blue-50 transition-colors">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="hidden lg:block">
                    <ul className="space-y-2.5">
                      {featured.features.slice(0, 4).map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4.5 h-4.5 text-blue-300 flex-shrink-0 mt-0.5" />
                          <span className="text-blue-100 text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Other services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((service) => {
            const Icon = iconMap[service.icon] || FileText;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-[#F8FAFC] hover:bg-white border border-slate-100 hover:border-[#185FA5]/20 hover:shadow-md rounded-2xl p-6 transition-all"
              >
                <div className="w-11 h-11 bg-[#EEF4FC] group-hover:bg-[#185FA5] rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <Icon className="w-5 h-5 text-[#185FA5] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-[#0C2D5A] font-bold text-base mb-2 group-hover:text-[#185FA5] transition-colors">
                  {service.shortTitle}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {service.tagline}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-[#185FA5] text-sm font-semibold">
                  Learn more
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
