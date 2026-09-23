import { NextResponse } from "next/server";
import { isValidSession, tokenFromRequest } from "./auth";
import { withCors } from "./cors";

export async function requireAdmin(request: Request) {
  if (await isValidSession(tokenFromRequest(request))) return null;
  return withCors(request, NextResponse.json({ message: "Unauthorized" }, { status: 401 }));
}
