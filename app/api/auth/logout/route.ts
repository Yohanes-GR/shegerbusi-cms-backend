import { NextResponse } from "next/server";
import { preflight, withCors } from "@/lib/cors";

export async function OPTIONS(request: Request) {
  return preflight(request);
}

export async function POST(request: Request) {
  return withCors(request, NextResponse.json({ ok: true }));
}
