"use client";

import { useState, useRef } from "react";
import { ArrowRight, Upload, X, CheckCircle2, AlertCircle } from "lucide-react";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  propertyAddress: string;
  description: string;
  file: File | null;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  service?: string;
  propertyAddress?: string;
  description?: string;
  file?: string;
}

const serviceOptions = [
  { value: "", label: "Select a service..." },
  { value: "cdc", label: "Complying Development Certificate (CDC)" },
  { value: "construction-certificate", label: "Construction Certificate" },
  { value: "occupation-certificate", label: "Occupation Certificate" },
  { value: "principal-certifier", label: "Principal Certifier Appointment" },
  { value: "bca-compliance", label: "BCA & NCC Compliance" },
  { value: "da-support", label: "Development & Approval Support" },
  { value: "approval-package-review", label: "Approval Package Review" },
  { value: "planning-portal", label: "NSW Planning Portal Assistance" },
  { value: "demolition", label: "Demolition Certificate" },
  { value: "swimming-pool", label: "Swimming Pool Compliance" },
  { value: "building-inspections", label: "Building Inspections" },
  { value: "fire-safety", label: "Fire Safety & AFSS" },
  { value: "other", label: "Other" },
  { value: "not-sure", label: "Not Sure — Happy to Discuss" },
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string) {
  return /^[\d\s\+\-\(\)]{8,}$/.test(phone.trim());
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    service: "",
    propertyAddress: "",
    description: "",
    file: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!formData.fullName.trim()) e.fullName = "Full name is required.";
    if (!formData.phone.trim()) {
      e.phone = "Phone number is required.";
    } else if (!validatePhone(formData.phone)) {
      e.phone = "Please enter a valid phone number.";
    }
    if (!formData.email.trim()) {
      e.email = "Email address is required.";
    } else if (!validateEmail(formData.email)) {
      e.email = "Please enter a valid email address.";
    }
    if (!formData.service) e.service = "Please select a service.";
    if (!formData.propertyAddress.trim()) e.propertyAddress = "Property address is required.";
    if (!formData.description.trim()) {
      e.description = "Please provide a brief project description.";
    } else if (formData.description.trim().length < 10) {
      e.description = "Please provide a bit more detail.";
    }
    if (formData.file && formData.file.size > MAX_FILE_SIZE) {
      e.file = "File must be under 10MB.";
    }
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file && file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({ ...prev, file: "File must be under 10MB." }));
      setFormData((prev) => ({ ...prev, file: null }));
      e.target.value = "";
      return;
    }
    setFormData((prev) => ({ ...prev, file }));
    setErrors((prev) => ({ ...prev, file: undefined }));
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, file: null }));
    setErrors((prev) => ({ ...prev, file: undefined }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStatus("submitting");
    // TODO: Replace with real API call
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center">
        <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-[#0C2D5A] mb-3">
          Enquiry Received
        </h2>
        <p className="text-slate-600 leading-relaxed mb-2">
          Thank you, <strong>{formData.fullName}</strong>. We&apos;ve received your enquiry and will be in touch promptly.
        </p>
        <p className="text-slate-500 text-sm">
          If you need to speak to Fadi directly, call{" "}
          <a href="tel:0423925514" className="text-[#185FA5] font-semibold hover:underline">
            0423 925 514
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
      <h2 className="text-2xl font-bold text-[#0C2D5A] mb-2">
        Send an Enquiry
      </h2>
      <p className="text-slate-500 text-sm mb-8">
        Tell us about your project and we will get back to you within 24 hours with a quote.
      </p>

      {status === "error" && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">
            Something went wrong. Please try again or call Fadi on{" "}
            <a href="tel:0423925514" className="font-semibold underline">
              0423 925 514
            </a>
            .
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Row: name + phone */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-[#0C2D5A] mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Jane Smith"
              className={`w-full px-4 py-3 rounded-xl border text-sm bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition-colors ${
                errors.fullName ? "border-red-300" : "border-slate-200"
              }`}
            />
            {errors.fullName && (
              <p className="mt-1.5 text-red-600 text-xs">{errors.fullName}</p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-[#0C2D5A] mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0412 345 678"
              className={`w-full px-4 py-3 rounded-xl border text-sm bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition-colors ${
                errors.phone ? "border-red-300" : "border-slate-200"
              }`}
            />
            {errors.phone && (
              <p className="mt-1.5 text-red-600 text-xs">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[#0C2D5A] mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@example.com.au"
            className={`w-full px-4 py-3 rounded-xl border text-sm bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition-colors ${
              errors.email ? "border-red-300" : "border-slate-200"
            }`}
          />
          {errors.email && (
            <p className="mt-1.5 text-red-600 text-xs">{errors.email}</p>
          )}
        </div>

        {/* Service */}
        <div>
          <label htmlFor="service" className="block text-sm font-semibold text-[#0C2D5A] mb-1.5">
            Service Required <span className="text-red-500">*</span>
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border text-sm bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition-colors appearance-none cursor-pointer ${
              errors.service ? "border-red-300" : "border-slate-200"
            } ${!formData.service ? "text-slate-400" : "text-slate-700"}`}
          >
            {serviceOptions.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="mt-1.5 text-red-600 text-xs">{errors.service}</p>
          )}
        </div>

        {/* Property address */}
        <div>
          <label htmlFor="propertyAddress" className="block text-sm font-semibold text-[#0C2D5A] mb-1.5">
            Property Address <span className="text-red-500">*</span>
          </label>
          <input
            id="propertyAddress"
            name="propertyAddress"
            type="text"
            value={formData.propertyAddress}
            onChange={handleChange}
            placeholder="12 Example St, Merrylands NSW 2160"
            className={`w-full px-4 py-3 rounded-xl border text-sm bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition-colors ${
              errors.propertyAddress ? "border-red-300" : "border-slate-200"
            }`}
          />
          {errors.propertyAddress && (
            <p className="mt-1.5 text-red-600 text-xs">{errors.propertyAddress}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-[#0C2D5A] mb-1.5">
            Tell Us About Your Project <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Briefly describe your project — e.g. new single dwelling CDC, granny flat, extension, swimming pool compliance, building inspections…"
            className={`w-full px-4 py-3 rounded-xl border text-sm bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition-colors resize-none ${
              errors.description ? "border-red-300" : "border-slate-200"
            }`}
          />
          {errors.description && (
            <p className="mt-1.5 text-red-600 text-xs">{errors.description}</p>
          )}
        </div>

        {/* File upload */}
        <div>
          <label className="block text-sm font-semibold text-[#0C2D5A] mb-1.5">
            Attach Plans or Documents{" "}
            <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <p className="text-slate-400 text-xs mb-2">
            PDF only · Maximum 10MB
          </p>

          {formData.file ? (
            <div className="flex items-center gap-3 bg-[#EEF4FC] border border-blue-100 rounded-xl px-4 py-3">
              <div className="w-8 h-8 bg-[#185FA5]/15 rounded-lg flex items-center justify-center flex-shrink-0">
                <Upload className="w-4 h-4 text-[#185FA5]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[#0C2D5A] text-sm font-medium truncate">
                  {formData.file.name}
                </div>
                <div className="text-slate-400 text-xs">
                  {(formData.file.size / (1024 * 1024)).toFixed(2)} MB
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="p-1 rounded-full hover:bg-white transition-colors"
                aria-label="Remove file"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          ) : (
            <label
              htmlFor="file"
              className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl py-8 px-4 cursor-pointer transition-colors hover:border-[#185FA5] hover:bg-[#EEF4FC]/50 ${
                errors.file ? "border-red-300 bg-red-50/30" : "border-slate-200 bg-[#F8FAFC]"
              }`}
            >
              <Upload className="w-6 h-6 text-slate-400" />
              <span className="text-slate-600 text-sm font-medium">
                Click to upload or drag and drop
              </span>
              <span className="text-slate-400 text-xs">PDF · Max 10MB</span>
              <input
                id="file"
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFile}
                className="sr-only"
              />
            </label>
          )}
          {errors.file && (
            <p className="mt-1.5 text-red-600 text-xs">{errors.file}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full flex items-center justify-center gap-2 bg-[#185FA5] hover:bg-[#0C2D5A] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors text-base"
        >
          {status === "submitting" ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending Enquiry...
            </>
          ) : (
            <>
              Send Enquiry
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        <p className="text-center text-slate-400 text-xs">
          By submitting this form you agree to be contacted by Certify Right regarding your enquiry. We do not share your information with third parties.
        </p>
      </form>
    </div>
  );
}
