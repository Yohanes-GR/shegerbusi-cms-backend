import { NextResponse } from "next/server";
import { tokenFromRequest, userIdFromToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { preflight, withCors } from "@/lib/cors";

export async function OPTIONS(request: Request) {
  return preflight(request);
}

export async function GET(request: Request) {
  const userId = await userIdFromToken(tokenFromRequest(request));
  if (!userId) {
    return withCors(request, NextResponse.json({ message: "Unauthorized" }, { status: 401 }));
  }
  const user = await prisma.cmsUser.findUnique({
    where: { id: userId },
    select: { username: true },
  });
  if (!user) {
    return withCors(request, NextResponse.json({ message: "Unauthorized" }, { status: 401 }));
  }
  return withCors(request, NextResponse.json({ ok: true, username: user.username }));
}
