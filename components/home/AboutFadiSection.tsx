import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";

const expertise = [
  { label: "Civil/Design Engineering", desc: "Bachelor of Civil Engineering — structural and design knowledge." },
  { label: "Building Surveying", desc: "Registered Building Surveyor Class A3 (BDC2868) — NSW Fair Trading." },
  { label: "NSW Planning Portal", desc: "Daily work with CDC and DA lodgements, requests and referrals." },
  { label: "Council Compliance", desc: "Former council compliance officer — knows the process from both sides." },
  { label: "Fire Safety", desc: "Qualified fire safety professional — AFSS, schedules and assessments." },
  { label: "Private Certification", desc: "15+ years of industry experience across residential and commercial projects." },
];

const credentials = [
  { label: "NSW Fair Trading Registered Building Surveyor" },
  { label: "Class A3 · Registration BDC2868" },
  { label: "AIBS Member (Australian Institute of Building Surveyors)" },
  { label: "AAC Member (Association of Accredited Certifiers)" },
  { label: "Professional Indemnity Insurance" },
];

export default function AboutFadiSection() {
  return (
    <section className="py-20 lg:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-[#185FA5]" />
              <span className="text-[#185FA5] text-xs font-semibold tracking-widest uppercase">
                About Fadi
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0C2D5A] mb-4 leading-tight">
              One Certifier. Multiple Perspectives.
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed mb-8">
              <p>
                Fadi Habbouche is a Registered Building Surveyor (Class A3), Civil/Design
                Engineer, former Council Compliance Officer and qualified Fire Safety
                Professional.
              </p>
              <p>
                With 15+ years of industry experience, Fadi gives practical, plain-English
                advice, responds promptly and focuses on moving your project forward.
              </p>
            </div>

            {/* Credentials */}
            <div className="bg-[#0C2D5A] rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-blue-300" />
                <span className="text-white font-semibold text-sm">Credentials & Registrations</span>
              </div>
              <ul className="space-y-2">
                {credentials.map((c) => (
                  <li key={c.label} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-1.5" />
                    <span className="text-blue-100 text-sm">{c.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-[#185FA5] hover:bg-[#0C2D5A] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Full Profile
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: photo + expertise grid */}
          <div className="flex flex-col gap-5">
            <div className="relative w-full h-64 lg:h-72 rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/fadi-site.webp"
                alt="Fadi Habbouche — Certify Right Building Certification"
                fill
                className="object-cover"
                style={{ objectPosition: "60% 15%" }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {expertise.map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-[#185FA5] mb-3" />
                  <h3 className="text-[#0C2D5A] font-bold text-sm mb-1.5">{item.label}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
