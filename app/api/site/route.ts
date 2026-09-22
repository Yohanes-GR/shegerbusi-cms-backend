import { NextResponse } from "next/server";
import { getSite, saveSite } from "@/lib/cms";
import type { SiteContent } from "@/lib/types";
import { absolutize, assetOrigin, relativize } from "@/lib/assets";
import { preflight, withCors } from "@/lib/cors";
import { requireAdmin } from "@/lib/guard";

export async function OPTIONS(request: Request) {
  return preflight(request);
}

export async function GET(request: Request) {
  const site = await getSite();
  return withCors(request, NextResponse.json(absolutize(site, assetOrigin(request))));
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const body = (await request.json()) as SiteContent;
  const site = relativize(body, assetOrigin(request));
  if (!site?.company?.name || !Array.isArray(site.divisions)) {
    return withCors(request, NextResponse.json({ message: "Invalid site payload." }, { status: 400 }));
  }
  if (!Array.isArray(site.partners)) {
    const current = await getSite();
    site.partners = current.partners ?? [];
  }
  await saveSite(site);
  return withCors(request, NextResponse.json({ ok: true }));
}
