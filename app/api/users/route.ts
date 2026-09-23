import { NextResponse } from "next/server";
import { ensureDefaultUser } from "@/lib/auth";
import { hashPassword } from "@/lib/passwords";
import { prisma } from "@/lib/prisma";
import { preflight, withCors } from "@/lib/cors";
import { requireAdmin } from "@/lib/guard";

export async function OPTIONS(request: Request) {
  return preflight(request);
}

function publicUser(user: { id: string; username: string; createdAt: Date }) {
  return { id: user.id, username: user.username, createdAt: user.createdAt };
}

function validUsername(username: string) {
  return /^[a-z0-9._-]{3,40}$/.test(username);
}

export async function GET(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  await ensureDefaultUser();
  const users = await prisma.cmsUser.findMany({ orderBy: { username: "asc" } });
  return withCors(request, NextResponse.json(users.map(publicUser)));
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const body = (await request.json()) as { username?: string; password?: string };
  const username = body.username?.trim().toLowerCase() || "";
  const password = body.password || "";
  if (!validUsername(username)) {
    return withCors(
      request,
      NextResponse.json(
        { message: "Username must be 3–40 characters: letters, numbers, dot, dash, or underscore." },
        { status: 400 },
      ),
    );
  }
  if (password.length < 8) {
    return withCors(
      request,
      NextResponse.json({ message: "Password must be at least 8 characters." }, { status: 400 }),
    );
  }
  const existing = await prisma.cmsUser.findUnique({ where: { username } });
  if (existing) {
    return withCors(request, NextResponse.json({ message: "That username is already used." }, { status: 409 }));
  }
  const user = await prisma.cmsUser.create({
    data: { username, passwordHash: hashPassword(password) },
  });
  return withCors(request, NextResponse.json(publicUser(user)));
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const body = (await request.json()) as { id?: string; username?: string; password?: string };
  if (!body.id) {
    return withCors(request, NextResponse.json({ message: "User id is required." }, { status: 400 }));
  }
  const username = body.username?.trim().toLowerCase() || "";
  if (!validUsername(username)) {
    return withCors(
      request,
      NextResponse.json(
        { message: "Username must be 3–40 characters: letters, numbers, dot, dash, or underscore." },
        { status: 400 },
      ),
    );
  }
  const password = body.password || "";
  if (password && password.length < 8) {
    return withCors(
      request,
      NextResponse.json({ message: "Password must be at least 8 characters." }, { status: 400 }),
    );
  }
  const taken = await prisma.cmsUser.findFirst({
    where: { username, NOT: { id: body.id } },
  });
  if (taken) {
    return withCors(request, NextResponse.json({ message: "That username is already used." }, { status: 409 }));
  }
  const user = await prisma.cmsUser.update({
    where: { id: body.id },
    data: {
      username,
      ...(password ? { passwordHash: hashPassword(password) } : {}),
    },
  });
  return withCors(request, NextResponse.json(publicUser(user)));
}

export async function DELETE(request: Request) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const id = new URL(request.url).searchParams.get("id") || "";
  if (!id) {
    return withCors(request, NextResponse.json({ message: "User id is required." }, { status: 400 }));
  }
  const count = await prisma.cmsUser.count();
  if (count <= 1) {
    return withCors(
      request,
      NextResponse.json({ message: "The last CMS user cannot be deleted." }, { status: 400 }),
    );
  }
  await prisma.cmsUser.delete({ where: { id } });
  return withCors(request, NextResponse.json({ ok: true }));
}
