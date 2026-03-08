const JWT_SECRET = "masai";
const TOKEN_EXPIRY_SECONDS = 7 * 24 * 60 * 60; // 7 days

function base64url(input: Uint8Array | string): string {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : input;
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

export async function generateToken(): Promise<string> {
  const header = base64url('{"alg":"HS256","typ":"JWT"}');
  const now = Math.floor(Date.now() / 1000);
  const payload = base64url(
    JSON.stringify({ userID: 1, iat: now, exp: now + TOKEN_EXPIRY_SECONDS })
  );
  const data = `${header}.${payload}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(JWT_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data))
  );
  return `${data}.${base64url(sig)}`;
}
