import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const trustPoints = [
  "Registered Building Surveyor (Class A3)",
  "Civil/Design Engineer",
  "Council Compliance Officer",
  "Qualified Fire Safety Professional",
  "15+ years of industry experience",
  "NSW Planning Portal expertise",
  "Practical, solution-focused advice",
  "Direct access to your certifier",
  "Fast turnaround times",
];

export default function AboutSection() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-[#185FA5]" />
              <span className="text-[#185FA5] text-xs font-semibold tracking-widest uppercase">
                About Certify Right
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0C2D5A] mb-4 leading-tight">
              More Than Certification. Real Approval Expertise.
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed mb-8">
              <p>
                At Certify Right, we do more than issue certificates. We help homeowners,
                builders, architects, developers and consultants navigate planning,
                certification, compliance and approval pathways across NSW.
              </p>
              <p>
                Whether you&apos;re pursuing a CDC, Construction Certificate, Occupation
                Certificate, BCA/Building Compliance or seeking advice before purchasing or
                designing a property, our focus is on providing clear, practical guidance that
                helps keep your project moving.
              </p>
            </div>
            {/* Video — replace src with the Certify Right company video when available */}
            <div className="relative w-full rounded-xl overflow-hidden shadow-lg aspect-video bg-[#0C2D5A] mb-8">
              <video
                className="w-full h-full"
                controls
                poster="/images/hero-new.webp"
                preload="metadata"
              >
                <source
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                  type="video/mp4"
                />
              </video>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-[#185FA5] hover:bg-[#0C2D5A] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              About Fadi
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right */}
          <div className="space-y-4">
            <div className="bg-[#F8FAFC] rounded-2xl p-7 border border-slate-100">
              <h3 className="text-[#0C2D5A] font-bold text-base mb-4">Why Clients Choose Certify Right</h3>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {trustPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#185FA5] flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-600 text-sm leading-relaxed mt-5 pt-5 border-t border-slate-200">
                We understand projects from multiple perspectives, allowing us to identify issues
                early and provide practical pathways forward.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0C2D5A] rounded-2xl p-6 text-white text-center">
                <div className="text-4xl font-bold mb-1">15+</div>
                <div className="text-blue-200 text-xs font-medium">Years Experience</div>
              </div>
              <div className="bg-[#185FA5] rounded-2xl p-6 text-white text-center">
                <div className="text-4xl font-bold mb-1">10</div>
                <div className="text-blue-100 text-xs font-medium">Core Services</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
