import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardList, Globe, Users } from "lucide-react";

const blocks = [
  {
    icon: ClipboardList,
    title: "Approval Package Reviews",
    intro:
      "Incomplete or non-compliant documentation is one of the biggest causes of delays. We review your package before lodgement to reduce delays, redesign costs and requests for information.",
    listLabel: "We regularly review:",
    items: [
      "Architectural plans",
      "BASIX Certificates",
      "Structural engineering",
      "Stormwater designs",
      "Flood reports",
      "Bushfire reports",
      "Geotechnical reports",
      "Waste management plans",
      "Fire safety documentation",
      "Specialist consultant reports",
    ],
    outro: "Our aim is to help clients submit stronger applications the first time.",
  },
  {
    icon: Globe,
    title: "NSW Planning Portal Expertise",
    intro:
      "Many clients find the NSW Planning Portal confusing. We work with it every day and understand submissions, information requests, referrals and approval requirements.",
    listLabel: "We help you understand:",
    items: [
      "CDC pathways",
      "DA approval pathways",
      "Portal lodgements",
      "Requests for additional information",
      "Referral processes",
      "Required documentation",
      "Approval sequencing and timeframes",
    ],
    outro: "Our experience helps clients avoid common delays and unnecessary frustration.",
  },
  {
    icon: Users,
    title: "Industry Relationships & Project Coordination",
    intro:
      "Building approvals often need input from multiple specialists. Through our industry network, we can connect you with experienced:",
    listLabel: null,
    items: [
      "Architects",
      "Town planners",
      "Structural engineers",
      "Stormwater engineers",
      "Hydraulic consultants",
      "Fire safety practitioners",
      "Building designers",
      "Accredited energy assessors",
      "Surveyors",
      "Specialist consultants",
    ],
    outro:
      "While Certify Right remains independent in its certification role, we understand how to coordinate and navigate the broader approval process to help keep projects moving efficiently. This allows clients to access trusted industry professionals while maintaining the independence expected of a certifier.",
  },
];

export default function ApprovalExpertiseSection() {
  return (
    <section className="py-20 lg:py-24 bg-[#EEF4FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-px w-8 bg-[#185FA5]" />
            <span className="text-[#185FA5] text-xs font-semibold tracking-widest uppercase">
              Beyond Certification
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0C2D5A] leading-tight mb-4">
            Approval Support From Concept to Completion
          </h2>
          <p className="text-slate-600 leading-relaxed">
            We help you navigate the entire approval process — not just the certificate at the end.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blocks.map(({ icon: Icon, title, intro, listLabel, items, outro }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-7 border border-blue-100 shadow-sm flex flex-col"
            >
              <div className="w-11 h-11 bg-[#EEF4FC] rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-[#185FA5]" />
              </div>
              <h3 className="text-[#0C2D5A] font-bold text-lg mb-3">{title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">{intro}</p>
              {listLabel && (
                <p className="text-[#0C2D5A] text-sm font-semibold mb-2">{listLabel}</p>
              )}
              <ul className="space-y-2 mb-5">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#185FA5] flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-500 text-sm leading-relaxed mt-auto pt-4 border-t border-slate-100">
                {outro}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#185FA5] hover:bg-[#0C2D5A] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Discuss Your Project
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
