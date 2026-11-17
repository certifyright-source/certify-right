import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { BLOB_UPLOAD_PREFIX, MAX_FILE_SIZE, isPdfName } from "@/lib/contact";

export const runtime = "nodejs";

// Issues short-lived tokens so the browser can upload a PDF larger than Vercel's 4.5MB request
// limit straight to private Vercel Blob storage. Only PDFs up to MAX_FILE_SIZE are allowed.
export async function POST(request: Request) {
  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return Response.json({ error: "Invalid upload request." }, { status: 400 });
  }

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith(BLOB_UPLOAD_PREFIX) || !isPdfName(pathname)) {
          throw new Error("Only PDF uploads are allowed.");
        }
        return {
          allowedContentTypes: ["application/pdf"],
          maximumSizeInBytes: MAX_FILE_SIZE,
          addRandomSuffix: true,
          validUntil: Date.now() + 10 * 60 * 1000,
        };
      },
    });
    return Response.json(result);
  } catch (err) {
    console.error("[contact] Upload token failed:", err instanceof Error ? err.message : err);
    return Response.json({ error: "Upload failed." }, { status: 400 });
  }
}
