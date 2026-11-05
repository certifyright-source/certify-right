import { Resend } from "resend";
import {
  MAX_FILE_SIZE,
  MAX_FILE_SIZE_LABEL,
  getServiceLabel,
  isPdfName,
  validateContactFields,
  type ContactErrors,
  type ContactFields,
} from "@/lib/contact";

export const runtime = "nodejs";

const DEFAULT_TO = "certifyright@gmail.com";

function field(form: FormData, name: string) {
  const v = form.get(name);
  return typeof v === "string" ? v : "";
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Returns null (and names only the missing variables) when Resend isn't configured.
function getMailer() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim() || DEFAULT_TO;
  const missing = [!apiKey && "RESEND_API_KEY", !from && "CONTACT_FROM_EMAIL"].filter(Boolean);
  if (missing.length > 0) {
    console.error(`[contact] Missing environment variables: ${missing.join(", ")}`);
    return null;
  }
  return { resend: new Resend(apiKey), from: from!, to };
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const fields: ContactFields = {
    fullName: field(form, "fullName").trim(),
    phone: field(form, "phone").trim(),
    email: field(form, "email").trim(),
    service: field(form, "service"),
    propertyAddress: field(form, "propertyAddress").trim(),
    description: field(form, "description").trim(),
  };
  const errors: ContactErrors = validateContactFields(fields);

  const upload = form.get("file");
  let attachment: { filename: string; content: Buffer; contentType: string } | null = null;
  if (upload instanceof File && upload.size > 0) {
    if (upload.size > MAX_FILE_SIZE) {
      errors.file = `File must be under ${MAX_FILE_SIZE_LABEL}.`;
    } else {
      const content = Buffer.from(await upload.arrayBuffer());
      // Check the PDF signature, not just the extension.
      if (!isPdfName(upload.name) || content.subarray(0, 5).toString("latin1") !== "%PDF-") {
        errors.file = "Please upload a PDF file.";
      } else {
        attachment = {
          filename: upload.name.replace(/[\r\n"]/g, "_"),
          content,
          contentType: "application/pdf",
        };
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    return Response.json({ error: "Please check the highlighted fields.", errors }, { status: 400 });
  }

  const mailer = getMailer();
  if (!mailer) {
    return Response.json(
      { error: "The enquiry form is temporarily unavailable." },
      { status: 500 }
    );
  }

  const serviceLabel = getServiceLabel(fields.service)!;
  const safeName = fields.fullName.replace(/[\r\n]/g, " ");
  const rows: [string, string][] = [
    ["Full Name", fields.fullName],
    ["Phone Number", fields.phone],
    ["Email Address", fields.email],
    ["Service Required", serviceLabel],
    ["Property Address / Suburb", fields.propertyAddress],
  ];

  const text = [
    "New enquiry from the Certify Right website",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Project Description:",
    fields.description,
    "",
    `Attachment: ${attachment ? attachment.filename : "None"}`,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#0C2D5A;max-width:640px">
      <h2 style="margin:0 0 16px">New enquiry from the Certify Right website</h2>
      <table cellpadding="8" style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="background:#EEF4FC;font-weight:bold;width:200px;border:1px solid #dbe6f5">${k}</td><td style="border:1px solid #dbe6f5">${escapeHtml(v)}</td></tr>`
          )
          .join("")}
      </table>
      <h3 style="margin:20px 0 8px">Project Description</h3>
      <p style="white-space:pre-wrap;font-size:14px;color:#334155;margin:0">${escapeHtml(fields.description)}</p>
      <p style="font-size:13px;color:#64748b;margin-top:20px">
        Attachment: ${attachment ? escapeHtml(attachment.filename) : "None"}<br>
        Reply to this email to respond directly to ${escapeHtml(safeName)}.
      </p>
    </div>`;

  const deliveryFailed = () =>
    Response.json({ error: "We couldn't send your enquiry right now." }, { status: 502 });

  try {
    const { error } = await mailer.resend.emails.send({
      from: mailer.from,
      to: mailer.to,
      replyTo: `"${safeName.replace(/["<>]/g, "")}" <${fields.email}>`,
      subject: `New enquiry: ${serviceLabel} — ${safeName}`,
      text,
      html,
      attachments: attachment ? [attachment] : [],
    });
    if (error) {
      console.error(`[contact] Email delivery failed: ${error.name}: ${error.message}`);
      return deliveryFailed();
    }
  } catch (err) {
    console.error("[contact] Email delivery failed:", err instanceof Error ? err.message : err);
    return deliveryFailed();
  }

  return Response.json({ ok: true });
}
