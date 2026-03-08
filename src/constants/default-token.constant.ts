import jwt from "@tsndr/cloudflare-worker-jwt";

const JWT_SECRET = "masai";
const TOKEN_EXPIRY_SECONDS = 7 * 24 * 60 * 60; // 7 days

export async function generateToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  return jwt.sign(
    { userID: 1, iat: now, exp: now + TOKEN_EXPIRY_SECONDS },
    JWT_SECRET
  );
}
