import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ui/ContactForm";
import { Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us — Get a Quote",
  description:
    "Contact Certify Right to discuss your NSW building certification requirements. Call Fadi directly on 0423 925 514 or send an enquiry. 24-hour quote turnaround.",
  alternates: { canonical: "https://certifyright.com.au/contact" },
};

const contactDetails = [
  {
    icon: Phone,
    label: "Phone",
    value: "0423 925 514",
    sub: "Speak directly with Fadi",
    href: "tel:0423925514",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@certifyright.com.au",
    sub: "We respond within 24 hours",
    href: "mailto:info@certifyright.com.au",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Merrylands NSW 2160",
    sub: "Greater Sydney & NSW-wide",
    href: undefined,
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon–Fri 9:00am–5:00pm",
    sub: "By appointment",
    href: undefined,
  },
];

const credentials = [
  "NSW Fair Trading Registered Building Surveyor",
  "Class A3 · Registration BDC2868",
  "AIBS Member",
  "AAC Member",
  "Professional Indemnity Insurance",
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0C2D5A] min-h-[70vh] overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/images/contact-hero.webp"
            alt=""
            fill
            className="object-cover"
            style={{ objectPosition: "65% center" }}
            preload
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #0C2D5A 28%, rgba(12,45,90,0.80) 43%, rgba(12,45,90,0.15) 61%, transparent 78%)",
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-[70vh] py-20 lg:py-24 flex flex-col justify-center">
            <div className="max-w-xl lg:max-w-[600px]">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-px w-8 bg-blue-400" />
                <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">Contact</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Get a Quote
              </h1>
              <p className="text-blue-100 text-xl leading-relaxed">
                Tell us about your project. We respond within 24 hours and provide
                a quote promptly — you speak directly with Fadi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Sidebar */}
            <div>
              <h2 className="text-2xl font-bold text-[#0C2D5A] mb-6">
                Contact Details
              </h2>
              <div className="space-y-5 mb-10">
                {contactDetails.map((d) => {
                  const Icon = d.icon;
                  return (
                    <div key={d.label} className="flex items-start gap-4">
                      <div className="w-11 h-11 bg-[#EEF4FC] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#185FA5]" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 mb-0.5 uppercase tracking-wider">
                          {d.label}
                        </div>
                        {d.href ? (
                          <a
                            href={d.href}
                            className="text-[#0C2D5A] font-semibold text-sm hover:text-[#185FA5] transition-colors"
                          >
                            {d.value}
                          </a>
                        ) : (
                          <div className="text-[#0C2D5A] font-semibold text-sm">
                            {d.value}
                          </div>
                        )}
                        <div className="text-slate-400 text-xs mt-0.5">{d.sub}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Credentials */}
              <div className="bg-[#F8FAFC] rounded-2xl border border-slate-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-4.5 h-4.5 text-[#185FA5]" />
                  <div className="text-xs text-[#185FA5] font-semibold uppercase tracking-wider">
                    Our Credentials
                  </div>
                </div>
                <ul className="space-y-2">
                  {credentials.map((c) => (
                    <li key={c} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#185FA5] flex-shrink-0 mt-1.5" />
                      <span className="text-slate-700 text-xs">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
