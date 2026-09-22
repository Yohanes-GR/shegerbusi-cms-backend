import { NextResponse } from "next/server";
import { isValidSession } from "./auth";
import { withCors } from "./cors";

export async function requireAdmin(request: Request) {
  const header = request.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (await isValidSession(token)) return null;
  return withCors(request, NextResponse.json({ message: "Unauthorized" }, { status: 401 }));
}
