const COOKIE = "sbg_admin";

export function adminCookieName() {
  return COOKIE;
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "ShegerAdmin@2026";
}

export function getAdminSecret() {
  return process.env.ADMIN_SECRET || "sheger-cms-secret-change-me";
}

export async function sessionToken(password = getAdminPassword()) {
  const data = new TextEncoder().encode(`${password}::${getAdminSecret()}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function isValidSession(token?: string | null) {
  if (!token) return false;
  return token === (await sessionToken());
}
