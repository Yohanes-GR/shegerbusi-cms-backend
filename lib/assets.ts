const PREFIXES = ["/uploads/", "/brand/"];

export function assetOrigin(request: Request) {
  const configured = (process.env.PUBLIC_ASSET_URL || "").replace(/\/$/, "");
  if (configured) return configured;
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || "127.0.0.1:3001";
  const proto = request.headers.get("x-forwarded-proto") || "http";
  return `${proto}://${host.split(",")[0].trim()}`;
}

export function absolutize<T>(value: T, origin: string): T {
  return walk(value, origin, "toAbsolute") as T;
}

export function relativize<T>(value: T, origin: string): T {
  return walk(value, origin.replace(/\/$/, ""), "toRelative") as T;
}

function walk(value: unknown, origin: string, mode: "toAbsolute" | "toRelative"): unknown {
  if (typeof value === "string") {
    if (mode === "toAbsolute") {
      if (PREFIXES.some((prefix) => value.startsWith(prefix))) return `${origin}${value}`;
      return value;
    }
    if (value.startsWith(origin)) {
      const next = value.slice(origin.length);
      if (PREFIXES.some((prefix) => next.startsWith(prefix))) return next;
    }
    return value;
  }
  if (Array.isArray(value)) return value.map((item) => walk(item, origin, mode));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, walk(item, origin, mode)]),
    );
  }
  return value;
}
