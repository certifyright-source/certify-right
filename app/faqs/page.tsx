"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Phone, ArrowRight } from "lucide-react";
import { faqs } from "@/data/faqs";
import FaqHero from "@/components/faq/FaqHero";

const categories = ["All", "General", "CDC", "Inspections"] as const;
type Category = (typeof categories)[number];

// Map "Inspections" filter to include relevant IDs
const inspectionIds = [
  "how-many-inspections",
  "after-cc",
  "failed-inspection",
  "critical-stage-inspection",
  "pool-granny-flat",
  "what-pc-does",
];

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = faqs.filter((f) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Inspections") return inspectionIds.includes(f.id);
    return f.category === activeCategory;
  });

  return (
    <>
      <FaqHero />

      {/* FAQ content */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenId(null);
                }}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-[#185FA5] text-white"
                    : "bg-[#F8FAFC] text-slate-600 hover:bg-blue-50 hover:text-[#185FA5] border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {filtered.map((faq) => (
              <div
                key={faq.id}
                className="bg-[#F8FAFC] border border-slate-100 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={openId === faq.id}
                >
                  <span className="text-[#0C2D5A] font-semibold text-sm leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      openId === faq.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openId === faq.id && (
                  <div className="px-6 pb-6">
                    <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact prompt */}
          <div className="mt-14 bg-[#0C2D5A] rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Still have a question?
            </h2>
            <p className="text-blue-100 mb-6 max-w-md mx-auto">
              Call Fadi directly or send an enquiry. We respond within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:0423925514"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0C2D5A] hover:bg-blue-50 font-bold px-6 py-3 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                0423 925 514
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Send an Enquiry
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
