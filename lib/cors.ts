import { NextResponse } from "next/server";

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
        ...extra,
      ].filter(Boolean) as string[],
    ),
  );
}

export function corsHeaders(request: Request) {
  const origin = request.headers.get("origin") || "";
  const allowed = allowedOrigins();
  const headers = new Headers();
  headers.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
  headers.set("Access-Control-Max-Age", "86400");
  if (origin && (allowed.includes(origin) || allowed.includes("*"))) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Vary", "Origin");
  } else if (origin && allowed.length === 0) {
    headers.set("Access-Control-Allow-Origin", origin);
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
