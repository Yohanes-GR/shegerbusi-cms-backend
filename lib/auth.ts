import { prisma } from "./prisma";
import { hashPassword } from "./passwords";

const COOKIE = "sbg_admin";

export function adminCookieName() {
  return COOKIE;
}

export function getAdminSecret() {
  return process.env.ADMIN_SECRET || "sheger-cms-secret-change-me";
}

export async function sessionToken(userId: string) {
  const data = new TextEncoder().encode(`${userId}::${getAdminSecret()}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function userIdFromToken(token?: string | null) {
  if (!token) return null;
  const users = await prisma.cmsUser.findMany({ select: { id: true } });
  for (const user of users) {
    if (token === (await sessionToken(user.id))) return user.id;
  }
  return null;
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
