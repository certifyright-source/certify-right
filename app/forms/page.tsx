import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, FileCheck2, Mail, PenLine, Phone, Send } from "lucide-react";
import FormCards, { type DownloadableForm } from "@/components/forms/FormCards";

export const metadata: Metadata = {
  title: "Forms & Documents",
  description:
    "Download Certify Right forms: Appointment of Principal Certifier & Notice of Commencement, and Application for Occupation Certificate. Free PDF downloads.",
  alternates: { canonical: "https://certifyright.com.au/forms" },
};

const forms: DownloadableForm[] = [
  {
    title: "Appointment of Principal Certifier & Notice of Commencement",
    description:
      "Use this form to appoint a Principal Certifier for your project and to give notice before building work commences.",
    stage: "Before work starts",
    href: "/downloads/forms/noc-and-pc-appointment-form.pdf",
    fileName: "NOC and PC Appointment Form.pdf",
    preview: "/images/form-noc-pc-appointment-preview.webp",
    pages: 6,
    size: "752 KB",
  },
  {
    title: "Application for Occupation Certificate",
    description:
      "Use this form to apply for an Occupation Certificate once building work has been completed.",
    stage: "Once work is complete",
    href: "/downloads/forms/application-oc-form.pdf",
    fileName: "Application OC Form.pdf",
    preview: "/images/form-occupation-certificate-preview.webp",
    pages: 4,
    size: "735 KB",
  },
];

const steps = [
  {
    icon: Download,
    title: "Download the relevant form",
    description: "Choose the form that matches your project stage and save the PDF.",
  },
  {
    icon: PenLine,
    title: "Complete all details and signatures",
    description: "Fill in every required field and make sure all required parties have signed.",
  },
  {
    icon: Send,
    title: "Send it to Certify Right",
    description: "Email the completed form to info@certifyright.com.au and we'll take it from there.",
  },
];

export default function FormsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0C2D5A] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="forms-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#forms-grid)" />
          </svg>
        </div>
        <div
          className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full bg-[#185FA5]/40 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center py-16 sm:py-20 lg:py-24">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-px w-8 bg-blue-400" />
                <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">
                  Forms & Downloads
                </span>
              </div>
              <h1 className="text-[1.875rem] sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
                Forms & Documents
              </h1>
              <p className="text-blue-100 text-base leading-[1.65] sm:text-xl sm:leading-relaxed mb-7 sm:mb-8">
                Download the forms you need to appoint your Principal Certifier and apply for
                your Occupation Certificate — ready to complete, sign and send back to us.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#forms"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#0C2D5A] hover:bg-blue-50 font-bold px-7 py-3.5 rounded-xl transition-colors"
                >
                  <Download className="w-4 h-4" />
                  View Forms
                </a>
                <a
                  href="tel:0423925514"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-7 py-3.5 rounded-xl transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Need help? 0423 925 514
                </a>
              </div>
            </div>

            {/* Fanned document covers */}
            <div className="hidden lg:block relative h-[400px]" aria-hidden="true">
              <div className="absolute z-10 left-[4%] top-12 w-[230px] -rotate-6 rounded-lg overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
                <Image
                  src={forms[0].preview}
                  alt=""
                  width={900}
                  height={1273}
                  sizes="230px"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute right-[4%] top-2 w-[230px] rotate-[5deg] rounded-lg overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
                <Image
                  src={forms[1].preview}
                  alt=""
                  width={900}
                  height={1273}
                  sizes="230px"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute z-20 left-1/2 bottom-0 -translate-x-1/2 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0C2D5A] shadow-xl whitespace-nowrap">
                <FileCheck2 className="w-4 h-4 text-[#185FA5]" />
                2 forms · Free PDF downloads
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Forms */}
      <section id="forms" className="scroll-mt-28 py-16 sm:py-20 lg:py-24 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-px w-8 bg-[#185FA5]" />
              <span className="text-[#185FA5] text-xs font-semibold tracking-widest uppercase">
                Downloads
              </span>
              <span className="h-px w-8 bg-[#185FA5]" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0C2D5A] mb-4 leading-tight">
              Choose Your Form
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Each form downloads as a PDF. Select the one that matches your project stage.
            </p>
          </div>
          <FormCards forms={forms} />
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-px w-8 bg-[#185FA5]" />
              <span className="text-[#185FA5] text-xs font-semibold tracking-widest uppercase">
                How It Works
              </span>
              <span className="h-px w-8 bg-[#185FA5]" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0C2D5A] leading-tight">
              Three Simple Steps
            </h2>
          </div>

          <ol className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.title}
                  className="relative bg-[#F8FAFC] border border-slate-100 rounded-2xl p-6 lg:p-7"
                >
                  {i < steps.length - 1 && (
                    <div
                      className="hidden md:block absolute top-[52px] left-[calc(100%-12px)] w-[calc(1.5rem+24px)] h-px bg-gradient-to-r from-[#185FA5]/40 to-transparent"
                      aria-hidden="true"
                    />
                  )}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#185FA5] flex items-center justify-center shadow-[0_8px_20px_-8px_rgba(24,95,165,0.7)]">
                      <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                    </div>
                    <span className="text-4xl font-bold text-[#0C2D5A]/10 leading-none">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-[#0C2D5A] font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Help CTA */}
      <section className="pb-16 sm:pb-20 lg:pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#0C2D5A] px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
            <div
              className="absolute -bottom-32 -right-24 w-96 h-96 rounded-full bg-[#185FA5]/50 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative grid lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
                  Need help completing a form?
                </h2>
                <p className="text-blue-100 leading-relaxed">
                  Not sure which form you need or how to fill it in? Speak directly with Fadi —
                  we respond within 24 hours.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:0423925514"
                  className="flex items-center gap-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 px-5 py-3.5 text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-blue-300 flex-shrink-0" />
                  <span className="font-semibold">0423 925 514</span>
                </a>
                <a
                  href="mailto:info@certifyright.com.au"
                  className="flex items-center gap-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 px-5 py-3.5 text-white transition-colors min-w-0"
                >
                  <Mail className="w-4 h-4 text-blue-300 flex-shrink-0" />
                  <span className="font-semibold truncate">info@certifyright.com.au</span>
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 rounded-xl bg-white text-[#0C2D5A] hover:bg-blue-50 font-bold px-5 py-3.5 transition-colors"
                >
                  Contact Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
