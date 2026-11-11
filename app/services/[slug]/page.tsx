import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { CSSProperties } from "react";
import PageHeroBackground from "@/components/layout/PageHeroBackground";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck,
  HardHat,
  ClipboardCheck,
  BookOpen,
  FileText,
  Building2,
  Waves,
  Search,
  Flame,
  ArrowLeft,
  Phone,
} from "lucide-react";
import { services, getServiceBySlug } from "@/data/services";
import CTASection from "@/components/home/CTASection";

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

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} | NSW Approvals & Certification`,
    description: service.description,
    alternates: {
      canonical: `https://certifyright.com.au/services/${service.slug}`,
    },
  };
}

// Phones show each banner in a band below the hero text; these keep each banner's subject in frame.
const MOBILE_BANNER_POSITION: Record<string, string> = {
  "complying-development-certificate": "100% center",
  "construction-certificate": "98% center",
  "occupation-certificate": "100% center",
  "principal-certifier-appointment": "96% center",
  "bca-ncc-compliance": "94% center",
  "da-support": "92% center",
  "demolition-certificate": "100% center",
  "swimming-pool-compliance": "62% center",
  "building-inspections": "90% center",
  "fire-safety": "88% center",
};

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = iconMap[service.icon] || FileText;
  const mobileBannerPos = MOBILE_BANNER_POSITION[service.slug] ?? "85% center";
  const relatedServices = services.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <>
      {/* Hero — banner image as background with text overlay */}
      <section
        className="relative bg-[#0C2D5A] lg:min-h-[70vh] overflow-hidden"
        style={{ "--hero-img-h": "min(72vw, 520px)" } as CSSProperties}
      >
        {/* Background banner image (phones and tablets: photo band below the text) */}
        <PageHeroBackground
          src={service.banner}
          position="center"
          mobilePosition={mobileBannerPos}
          preload
        />
        {/* Content — matches homepage hero container/alignment pattern */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-10 sm:pt-16 pb-[calc(var(--hero-img-h)-0.5rem)] lg:min-h-[70vh] lg:py-24 flex flex-col justify-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm mb-6 sm:mb-8 transition-colors self-start"
            >
              <ArrowLeft className="w-4 h-4" />
              All Services
            </Link>
            <div className="max-w-xl lg:max-w-[600px]">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 rounded-xl flex items-center justify-center mb-5 sm:mb-6 border border-white/15">
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              {service.featured && (
                <div className="mb-3">
                  <span className="bg-[#185FA5] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Lead Service
                  </span>
                </div>
              )}
              <h1 className="text-[1.875rem] sm:text-5xl font-bold text-white leading-tight mb-4 sm:mb-5">
                {service.title}
              </h1>
              <p className="text-blue-100 text-base leading-[1.65] sm:text-lg sm:leading-relaxed mb-7 sm:mb-8">
                {service.tagline}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-[#0C2D5A] hover:bg-blue-50 font-semibold px-6 py-3.5 rounded-lg transition-colors shadow-lg shadow-black/20"
                >
                  Get a Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:0423925514"
                  className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 hover:bg-white/5 text-white font-semibold px-6 py-3.5 rounded-lg transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Call Fadi
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features — wide grid section */}
      <section className="py-10 lg:py-12 bg-[#EEF4FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-px w-8 bg-[#185FA5]" />
            <span className="text-[#185FA5] text-xs font-semibold uppercase tracking-wider">Key Features</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.features.map((f) => (
              <div key={f} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-blue-100 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-[#185FA5] flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 text-sm leading-relaxed">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Main content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0C2D5A] mb-6">
                Overview
              </h2>
              <div className="space-y-4">
                {service.longDescription.split("\n\n").map((para, i) => (
                  <p key={i} className="text-slate-600 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* Who is it for */}
              <div className="mt-10">
                <h3 className="text-xl font-bold text-[#0C2D5A] mb-5">
                  Who Is This Service For?
                </h3>
                <ul className="space-y-3">
                  {service.whoIsItFor.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#EEF4FC] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#185FA5]" />
                      </div>
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process */}
              <div className="mt-10">
                <h3 className="text-xl font-bold text-[#0C2D5A] mb-6">
                  How It Works
                </h3>
                <div className="space-y-4">
                  {service.process.map((step, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#0C2D5A] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="bg-[#F8FAFC] rounded-xl p-4 border border-slate-100 flex-1">
                        <span className="text-slate-700 text-sm">{step}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-[#0C2D5A] rounded-2xl p-7 text-white sticky top-28">
                <h3 className="text-lg font-bold mb-4">Ready to Get Started?</h3>
                <p className="text-blue-100 text-sm leading-relaxed mb-6">
                  Contact Fadi directly to discuss your project. We respond within 24 hours
                  and provide a quote promptly.
                </p>
                <div className="space-y-3">
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 bg-white text-[#0C2D5A] hover:bg-blue-50 font-semibold px-5 py-3 rounded-lg transition-colors text-sm w-full"
                  >
                    Get a Quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="tel:0423925514"
                    className="flex items-center justify-center gap-2 border border-white/30 hover:border-white/60 text-white text-sm font-semibold px-5 py-3 rounded-lg transition-colors w-full"
                  >
                    <Phone className="w-4 h-4" />
                    0423 925 514
                  </a>
                </div>
                <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
                  <div className="text-xs text-blue-300">
                    NSW Fair Trading Registered Building Surveyor
                  </div>
                  <div className="text-xs text-white font-semibold">
                    Class A3 · BDC2868
                  </div>
                  <div className="text-xs text-blue-300 mt-1">
                    Fadi Habbouche · 15+ Years Experience
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="py-16 bg-[#F8FAFC] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#0C2D5A] mb-8">
            Related Services
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {relatedServices.map((s) => {
              const SIcon = iconMap[s.icon] || FileText;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md hover:border-blue-100 transition-all"
                >
                  <div className="w-10 h-10 bg-[#EEF4FC] rounded-xl flex items-center justify-center mb-4">
                    <SIcon className="w-5 h-5 text-[#185FA5]" />
                  </div>
                  <h3 className="text-base font-bold text-[#0C2D5A] mb-2 group-hover:text-[#185FA5] transition-colors">
                    {s.shortTitle}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-3">
                    {s.tagline}
                  </p>
                  <span className="text-[#185FA5] text-sm font-medium flex items-center gap-1">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
