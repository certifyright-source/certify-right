// Shared by the contact form (client) and /api/contact (server) so both validate identically.

export const SERVICE_OPTIONS = [
  { value: "cdc", label: "Complying Development Certificate (CDC)" },
  { value: "construction-certificate", label: "Construction Certificate" },
  { value: "occupation-certificate", label: "Occupation Certificate" },
  { value: "principal-certifier", label: "Principal Certifier Appointment" },
  { value: "bca-compliance", label: "BCA & NCC Compliance Reports" },
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

// Vercel rejects function request bodies over 4.5MB, so attachments are capped at 4MB.
export const MAX_FILE_SIZE = 4 * 1024 * 1024;
export const MAX_FILE_SIZE_LABEL = "4MB";

export const FIELD_LIMITS = {
  fullName: 100,
  phone: 30,
  email: 254,
  propertyAddress: 200,
  description: 5000,
} as const;

export interface ContactFields {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  propertyAddress: string;
  description: string;
}

export type ContactErrors = Partial<Record<keyof ContactFields | "file", string>>;

export function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone: string) {
  return /^[\d\s\+\-\(\)]{8,}$/.test(phone.trim());
}

export function isPdfName(name: string) {
  return name.toLowerCase().endsWith(".pdf");
}

export function getServiceLabel(value: string) {
  return SERVICE_OPTIONS.find((o) => o.value === value)?.label;
}

export function validateContactFields(f: ContactFields): ContactErrors {
  const e: ContactErrors = {};
  if (!f.fullName.trim()) e.fullName = "Full name is required.";
  else if (f.fullName.length > FIELD_LIMITS.fullName) e.fullName = "Name is too long.";

  if (!f.phone.trim()) e.phone = "Phone number is required.";
  else if (!validatePhone(f.phone) || f.phone.length > FIELD_LIMITS.phone)
    e.phone = "Please enter a valid phone number.";

  if (!f.email.trim()) e.email = "Email address is required.";
  else if (!validateEmail(f.email.trim()) || f.email.length > FIELD_LIMITS.email)
    e.email = "Please enter a valid email address.";

  if (!f.service) e.service = "Please select a service.";
  else if (!getServiceLabel(f.service)) e.service = "Please select a valid service.";

  if (!f.propertyAddress.trim()) e.propertyAddress = "Property address is required.";
  else if (f.propertyAddress.length > FIELD_LIMITS.propertyAddress)
    e.propertyAddress = "Address is too long.";

  if (!f.description.trim()) e.description = "Please provide a brief project description.";
  else if (f.description.trim().length < 10) e.description = "Please provide a bit more detail.";
  else if (f.description.length > FIELD_LIMITS.description)
    e.description = "Description is too long — please shorten it.";

  return e;
}
