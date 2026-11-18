"use client";

import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import { Download, ExternalLink, FileText } from "lucide-react";

export interface DownloadableForm {
  title: string;
  description: string;
  stage: string;
  href: string;
  fileName: string;
  preview: string;
  pages: number;
  size: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function FormCards({ forms }: { forms: DownloadableForm[] }) {
  // Two columns on tablets: an odd last card is centred under the others instead of left hanging.
  const lastIsOrphan = forms.length % 2 === 1;

  return (
    <MotionConfig reducedMotion="user">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
        {forms.map((form, i) => (
          <motion.article
            key={form.href}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.12, ease }}
            whileHover="hover"
            className={`group relative flex flex-col bg-white rounded-3xl border border-slate-200/80 hover:border-[#185FA5]/30 shadow-[0_1px_3px_rgba(12,45,90,0.06),0_12px_32px_-12px_rgba(12,45,90,0.18)] hover:shadow-[0_1px_3px_rgba(12,45,90,0.08),0_28px_56px_-18px_rgba(12,45,90,0.32)] transition-[box-shadow,border-color,translate] duration-300 hover:-translate-y-1 overflow-hidden ${
              lastIsOrphan && i === forms.length - 1
                ? "sm:col-span-2 sm:w-[calc(50%-0.75rem)] sm:justify-self-center lg:col-span-1 lg:w-auto lg:justify-self-stretch"
                : ""
            }`}
          >
            {/* Brand accent along the top edge, drawn in on hover */}
            <span
              className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 bg-gradient-to-r from-[#0C2D5A] via-[#185FA5] to-[#4FA3E8]"
              aria-hidden="true"
            />

            {/* Preview: the real first page of the PDF */}
            <a
              href={form.href}
              download={form.fileName}
              aria-label={`Download ${form.title} (PDF)`}
              className="relative block bg-gradient-to-br from-[#EEF4FC] via-[#F4F8FD] to-[#DAEAF8] px-6 sm:px-8 pt-16 pb-9 overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-[0.35]"
                aria-hidden="true"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(24,95,165,0.18) 1px, transparent 0)",
                  backgroundSize: "18px 18px",
                }}
              />
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#185FA5] shadow-sm">
                {form.stage}
              </span>
              <span
                className="absolute top-4 right-4 text-[11px] font-bold tracking-widest text-[#0C2D5A]/35"
                aria-hidden="true"
              >
                FORM {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative mx-auto w-[56%] max-w-[210px] min-w-[160px]">
                {/* Second sheet behind, hinting at a multi-page form */}
                <div
                  className="absolute inset-0 rounded-lg bg-white border border-slate-200/70 shadow-md rotate-[4deg] translate-x-2"
                  aria-hidden="true"
                />
                <motion.div
                  variants={{ hover: { y: -8, rotate: -1.5, scale: 1.02 } }}
                  transition={{ duration: 0.4, ease }}
                  className="relative aspect-[900/1273] overflow-hidden rounded-lg shadow-[0_18px_40px_-12px_rgba(12,45,90,0.45)] ring-1 ring-black/5"
                >
                  <Image
                    src={form.preview}
                    alt={`First page of the ${form.title} form`}
                    fill
                    sizes="(max-width: 640px) 56vw, 210px"
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </a>

            {/* Details */}
            <div className="relative flex flex-col flex-1 p-6 sm:p-7 border-t border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#0C2D5A] group-hover:bg-[#185FA5] transition-colors duration-300 flex items-center justify-center flex-shrink-0 shadow-[0_8px_18px_-10px_rgba(12,45,90,0.8)]">
                  <FileText className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500">
                  <span className="rounded-md bg-red-50 text-red-600 font-bold px-1.5 py-0.5 tracking-wide">
                    PDF
                  </span>
                  <span>{form.pages} pages</span>
                  <span className="text-slate-300" aria-hidden="true">•</span>
                  <span>{form.size}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#0C2D5A] leading-snug mb-3">{form.title}</h3>
              <p className="text-slate-600 text-[0.9375rem] leading-relaxed mb-7">{form.description}</p>

              <div className="mt-auto flex flex-col gap-2">
                <a
                  href={form.href}
                  download={form.fileName}
                  className="inline-flex items-center justify-center gap-2.5 bg-[#185FA5] hover:bg-[#0C2D5A] text-white font-semibold px-6 py-3.5 rounded-xl transition-colors shadow-[0_8px_20px_-8px_rgba(24,95,165,0.7)]"
                >
                  <motion.span
                    variants={{ hover: { y: [0, 3, 0] } }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="inline-flex"
                  >
                    <Download className="w-4.5 h-4.5" aria-hidden="true" />
                  </motion.span>
                  Download PDF
                </a>
                <a
                  href={form.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-[#185FA5] hover:text-[#0C2D5A] transition-colors py-2"
                >
                  View in browser
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  <span className="sr-only">(opens the PDF in a new tab)</span>
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </MotionConfig>
  );
}
