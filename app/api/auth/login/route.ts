import { NextResponse } from "next/server";
import { ensureDefaultUser, sessionToken } from "@/lib/auth";
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
  const token = await sessionToken(user.id);
  return withCors(
    request,
    NextResponse.json({ ok: true, token, username: user.username }),
  );
}
