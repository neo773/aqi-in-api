import jwt from "jsonwebtoken";

const JWT_SECRET = "masai";
const TOKEN_EXPIRY_SECONDS = 7 * 24 * 60 * 60; // 7 days, matches their original tokens

export function generateToken(): string {
  const now = Math.floor(Date.now() / 1000);
  return jwt.sign(
    { userID: 1 },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY_SECONDS }
  );
}
