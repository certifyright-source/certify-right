import Link from "next/link";
import { ArrowRight, Home, HardHat, Building2, Users } from "lucide-react";

const groups = [
  {
    icon: Home,
    title: "Homeowners",
    description:
      "Building a new home, adding a granny flat, or renovating? We handle CDCs, Construction Certificates, Occupation Certificates, and pool compliance — so you can focus on your project.",
    cta: "Get a Quote",
    href: "/contact",
  },
  {
    icon: HardHat,
    title: "Builders",
    description:
      "Need a responsive Principal Certifier who shows up on time and turns around paperwork quickly? Certify Right works alongside builders to keep certification moving and projects on schedule.",
    cta: "Our Services",
    href: "/services",
  },
  {
    icon: Building2,
    title: "Developers, Architects & Consultants",
    description:
      "From feasibility advice and approval package reviews to CDC assessments for multi-dwelling projects, we provide practical approval support that keeps your project on track.",
    cta: "Talk to Fadi",
    href: "/contact",
  },
  {
    icon: Users,
    title: "Granny Flat Companies",
    description:
      "Secondary dwellings require fast, reliable CDC approvals. We understand the SEPP requirements for granny flats and deliver the certificates your business needs to keep building.",
    cta: "CDC Information",
    href: "/services/complying-development-certificate",
  },
];

export default function WhoWeHelpSection() {
  return (
    <section className="py-20 lg:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-px w-8 bg-[#185FA5]" />
            <span className="text-[#185FA5] text-xs font-semibold tracking-widest uppercase">
              Who We Help
            </span>
            <span className="h-px w-8 bg-[#185FA5]" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0C2D5A] mb-4 leading-tight">
            Building Approval Shouldn&apos;t Slow Your Project Down.
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Certify Right works with homeowners, builders, architects, developers, consultants and granny flat companies
            across Greater Sydney and NSW.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {groups.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.title}
                className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm flex flex-col"
              >
                <div className="w-12 h-12 bg-[#EEF4FC] rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-[#185FA5]" />
                </div>
                <h3 className="text-[#0C2D5A] font-bold text-lg mb-3">{group.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                  {group.description}
                </p>
                <Link
                  href={group.href}
                  className="inline-flex items-center gap-1.5 text-[#185FA5] font-semibold text-sm hover:text-[#0C2D5A] transition-colors"
                >
                  {group.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
