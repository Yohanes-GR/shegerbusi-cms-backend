import { NextResponse } from "next/server";
import { adminCookieName, destroySession, tokenFromRequest } from "@/lib/auth";
import { preflight, withCors } from "@/lib/cors";

export async function OPTIONS(request: Request) {
  return preflight(request);
}

export async function POST(request: Request) {
  await destroySession(tokenFromRequest(request));
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieName(), "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return withCors(request, response);
}
