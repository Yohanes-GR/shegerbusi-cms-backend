import { randomBytes } from "crypto";
import { prisma } from "./prisma";
import { hashPassword } from "./passwords";

const COOKIE = "sbg_admin";
const SESSION_MS = 7 * 24 * 60 * 60 * 1000;

export function sessionMaxAgeSeconds() {
  return SESSION_MS / 1000;
}

export function adminCookieName() {
  return COOKIE;
}

export function getAdminSecret() {
  return process.env.ADMIN_SECRET || "sheger-cms-secret-change-me";
}

export function tokenFromRequest(request: Request) {
  const header = request.headers.get("authorization") || "";
  if (header.startsWith("Bearer ")) {
    const bearer = header.slice(7).trim();
    if (bearer) return bearer;
  }
  const cookie = request.headers.get("cookie") || "";
  const match = cookie.match(/(?:^|;\s*)sbg_admin=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_MS);
  await prisma.cmsSession.create({
    data: { token, userId, expiresAt },
  });
  return { token, expiresAt };
}

export async function destroySession(token?: string | null) {
  if (!token) return;
  await prisma.cmsSession.deleteMany({ where: { token } });
}

export async function userIdFromToken(token?: string | null) {
  if (!token) return null;
  const session = await prisma.cmsSession.findUnique({ where: { token } });
  if (!session) return null;
  if (session.expiresAt.getTime() <= Date.now()) {
    await prisma.cmsSession.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }
  return session.userId;
}

export async function isValidSession(token?: string | null) {
  return Boolean(await userIdFromToken(token));
}

export async function ensureDefaultUser() {
  const count = await prisma.cmsUser.count();
  if (count > 0) return;
  await prisma.cmsUser.create({
    data: {
      username: "admin",
      passwordHash: hashPassword(process.env.ADMIN_PASSWORD || "ShegerAdmin@2026"),
    },
  });
}
