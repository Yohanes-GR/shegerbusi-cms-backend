import { NextResponse } from "next/server";

const TRUSTED_HOSTS = new Set([
  "localhost",
  "127.0.0.1",
  "10.0.102.57",
  "196.189.119.89",
  "shegerbusinessgroup.com",
  "www.shegerbusinessgroup.com",
  "cms.shegerbusinessgroup.com",
  "46.224.36.213",
]);

export function allowedOrigins() {
  const extra = (process.env.CORS_ORIGINS || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return Array.from(
    new Set(
      [
        process.env.CMS_FRONT_ORIGIN,
        process.env.WEBSITE_ORIGIN,
        "http://localhost:3000",
        "http://localhost:3002",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3002",
        "http://10.0.102.57:3000",
        "http://10.0.102.57:3002",
        "https://10.0.102.57:3000",
        "https://10.0.102.57:3002",
        "http://196.189.119.89:3000",
        "http://196.189.119.89:3002",
        "https://196.189.119.89",
        "https://196.189.119.89:3000",
        "https://196.189.119.89:3002",
        "https://shegerbusinessgroup.com",
        "https://www.shegerbusinessgroup.com",
        ...extra,
      ].filter(Boolean) as string[],
    ),
  );
}

function originAllowed(origin: string, allowed: string[]) {
  if (!origin) return false;
  if (allowed.includes(origin) || allowed.includes("*")) return true;
  try {
    return TRUSTED_HOSTS.has(new URL(origin).hostname);
  } catch {
    return false;
  }
}

export function corsHeaders(request: Request) {
  const origin = request.headers.get("origin") || "";
  const allowed = allowedOrigins();
  const headers = new Headers();
  headers.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
  headers.set("Access-Control-Max-Age", "86400");
  if (originAllowed(origin, allowed)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Credentials", "true");
    headers.set("Vary", "Origin");
  }
  return headers;
}

export function withCors(request: Request, response: NextResponse) {
  corsHeaders(request).forEach((value, key) => response.headers.set(key, value));
  return response;
}

export function preflight(request: Request) {
  return withCors(request, new NextResponse(null, { status: 204 }));
}
