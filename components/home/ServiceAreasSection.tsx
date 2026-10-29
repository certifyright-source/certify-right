import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

const sydneyAreas = [
  "Parramatta", "Blacktown", "Auburn", "Merrylands", "Fairfield",
  "Liverpool", "Penrith", "Campbelltown", "Sutherland", "Bankstown",
  "Ryde", "North Shore", "Hills District", "Inner West", "Eastern Suburbs",
];

const regionalAreas = [
  "Central Coast", "Wollongong", "Blue Mountains", "Southern Highlands", "Illawarra",
];

export default function ServiceAreasSection() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-[#185FA5]" />
              <span className="text-[#185FA5] text-xs font-semibold tracking-widest uppercase">
                Service Areas
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0C2D5A] mb-4 leading-tight">
              NSW-Wide Approvals & Compliance
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed mb-6">
              <p>
                Certify Right is based in Merrylands and services projects across Greater
                Sydney and regional NSW. Whether your project is in the inner west, outer
                suburbs, or beyond Sydney, we can help.
              </p>
              <p>
                Contact us with your project location and we will confirm coverage and
                provide a quote.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
              <MapPin className="w-4 h-4 text-[#185FA5] flex-shrink-0" />
              <span>Head office: Merrylands NSW 2160</span>
            </div>
            <Link
              href="/service-areas"
              className="inline-flex items-center gap-2 bg-[#185FA5] hover:bg-[#0C2D5A] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Full Coverage Map
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right */}
          <div className="space-y-5">
            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-100">
              <h3 className="text-[#0C2D5A] font-bold text-sm uppercase tracking-wider mb-4">
                Greater Sydney
              </h3>
              <div className="flex flex-wrap gap-2">
                {sydneyAreas.map((area) => (
                  <span
                    key={area}
                    className="bg-white border border-slate-200 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-100">
              <h3 className="text-[#0C2D5A] font-bold text-sm uppercase tracking-wider mb-4">
                Regional NSW
              </h3>
              <div className="flex flex-wrap gap-2">
                {regionalAreas.map((area) => (
                  <span
                    key={area}
                    className="bg-white border border-slate-200 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
