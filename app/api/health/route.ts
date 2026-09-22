import { NextResponse } from "next/server";
import { withCors } from "@/lib/cors";

export async function GET(request: Request) {
  return withCors(request, NextResponse.json({ ok: true, service: "cms-back" }));
}
