import { Resend } from "resend";
import { del, get } from "@vercel/blob";
import {
  BLOB_UPLOAD_PREFIX,
  MAX_FILE_SIZE,
  MAX_FILE_SIZE_LABEL,
  getServiceLabel,
  isPdfName,
  validateContactFields,
  type ContactErrors,
  type ContactFields,
} from "@/lib/contact";

export const runtime = "nodejs";

const DEFAULT_TO = "info@certifyright.com.au";

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

// Reads a PDF the browser uploaded to private Vercel Blob storage, then deletes the blob (the
// email carries the copy). Only blobs under the contact-upload prefix are accepted, and reading
// stops past MAX_FILE_SIZE. Returns null if the blob can't be read.
async function readUploadedBlob(url: string) {
  let pathname: string;
  try {
    pathname = decodeURIComponent(new URL(url).pathname).replace(/^\//, "");
  } catch {
    return null;
  }
  if (!pathname.startsWith(BLOB_UPLOAD_PREFIX)) return null;

  try {
    const result = await get(url, { access: "private", useCache: false });
    if (!result || result.statusCode !== 200) return null;
    const chunks: Uint8Array[] = [];
    let size = 0;
    const reader = result.stream.getReader();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_FILE_SIZE) {
        await reader.cancel();
        break;
      }
      chunks.push(value);
    }
    const name = pathname.slice(BLOB_UPLOAD_PREFIX.length).replace(/-[A-Za-z0-9]+(\.pdf)$/i, "$1");
    return { name, size, content: Buffer.concat(chunks) };
  } catch (err) {
    console.error("[contact] Reading uploaded file failed:", err instanceof Error ? err.message : err);
    return null;
  } finally {
    await del(url).catch((err) =>
      console.error("[contact] Deleting uploaded file failed:", err instanceof Error ? err.message : err)
    );
  }
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

  // The PDF arrives either with the form (up to DIRECT_UPLOAD_LIMIT) or, when larger, as the URL
  // of a private Vercel Blob the browser uploaded it to. Both get the same checks.
  const upload = form.get("file");
  const fileUrl = field(form, "fileUrl");
  let pdf: { name: string; size: number; content: Buffer } | null = null;
  if (upload instanceof File && upload.size > 0) {
    pdf =
      upload.size > MAX_FILE_SIZE
        ? { name: upload.name, size: upload.size, content: Buffer.alloc(0) }
        : { name: upload.name, size: upload.size, content: Buffer.from(await upload.arrayBuffer()) };
  } else if (fileUrl) {
    const blob = await readUploadedBlob(fileUrl);
    if (!blob) {
      errors.file = "We couldn't read your file. Please try uploading it again.";
    } else {
      pdf = { name: field(form, "fileName") || blob.name, size: blob.size, content: blob.content };
    }
  }

  let attachment: { filename: string; content: Buffer; contentType: string } | null = null;
  if (pdf) {
    if (pdf.size > MAX_FILE_SIZE) {
      errors.file = `File must be under ${MAX_FILE_SIZE_LABEL}.`;
    } else if (!isPdfName(pdf.name) || pdf.content.subarray(0, 5).toString("latin1") !== "%PDF-") {
      // Check the PDF signature, not just the extension.
      errors.file = "Please upload a PDF file.";
    } else {
      attachment = {
        filename: pdf.name.replace(/[\r\n"]/g, "_"),
        content: pdf.content,
        contentType: "application/pdf",
      };
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
