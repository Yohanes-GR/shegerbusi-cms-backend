import { NextResponse } from "next/server";
import { deleteUpload, listUploads, saveUpload } from "@/lib/cms";
import { absolutize, assetOrigin, relativize } from "@/lib/assets";
import { preflight, withCors } from "@/lib/cors";
import { requireAdmin } from "@/lib/guard";

export const runtime = "nodejs";

export async function OPTIONS(request: Request) {
  return preflight(request);
}

export async function GET(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const files = await listUploads();
  return withCors(request, NextResponse.json(absolutize(files, assetOrigin(request))));
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return withCors(request, NextResponse.json({ message: "Choose a file to upload." }, { status: 400 }));
  }
  if (file.size > 40 * 1024 * 1024) {
    return withCors(request, NextResponse.json({ message: "File must be under 40MB." }, { status: 400 }));
  }
  if (!/^(image\/|video\/)/.test(file.type)) {
    return withCors(
      request,
      NextResponse.json({ message: "Upload an image or video file." }, { status: 400 }),
    );
  }
  const saved = await saveUpload(file);
  return withCors(request, NextResponse.json(absolutize(saved, assetOrigin(request))));
}

export async function DELETE(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const body = (await request.json()) as { name?: string; url?: string };
  const origin = assetOrigin(request);
  const name =
    body.name ||
    (body.url ? relativize(body.url, origin).split("/").pop() : "");
  if (!name) {
    return withCors(request, NextResponse.json({ message: "Missing file name." }, { status: 400 }));
  }
  await deleteUpload(name);
  return withCors(request, NextResponse.json({ ok: true }));
}
