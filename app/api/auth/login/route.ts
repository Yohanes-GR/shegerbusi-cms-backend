import { NextResponse } from "next/server";
import { adminCookieName, createSession, ensureDefaultUser, sessionMaxAgeSeconds } from "@/lib/auth";
import { verifyPassword } from "@/lib/passwords";
import { prisma } from "@/lib/prisma";
import { preflight, withCors } from "@/lib/cors";

export async function OPTIONS(request: Request) {
  return preflight(request);
}

export async function POST(request: Request) {
  const body = (await request.json()) as { username?: string; password?: string };
  const username = body.username?.trim().toLowerCase() || "";
  const password = body.password || "";
  await ensureDefaultUser();
  const user = username
    ? await prisma.cmsUser.findUnique({ where: { username } })
    : null;
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return withCors(
      request,
      NextResponse.json({ message: "Incorrect username or password." }, { status: 401 }),
    );
  }
  const { token, expiresAt } = await createSession(user.id);
  const response = NextResponse.json({
    ok: true,
    token,
    username: user.username,
    expiresAt: expiresAt.toISOString(),
  });
  response.cookies.set(adminCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionMaxAgeSeconds(),
  });
  return withCors(request, response);
}
