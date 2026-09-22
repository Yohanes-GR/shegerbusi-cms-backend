import { NextResponse } from "next/server";
import { getAdminPassword, sessionToken } from "@/lib/auth";
import { preflight, withCors } from "@/lib/cors";

export async function OPTIONS(request: Request) {
  return preflight(request);
}

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  if (body.password !== getAdminPassword()) {
    return withCors(request, NextResponse.json({ message: "Incorrect password." }, { status: 401 }));
  }
  const token = await sessionToken();
  return withCors(request, NextResponse.json({ ok: true, token }));
}
