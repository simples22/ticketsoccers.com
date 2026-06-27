import { SignJWT, jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

const COOKIE = "ts_session";
const secret = new TextEncoder().encode(process.env.AUTH_SECRET ?? "dev-insecure-secret");

export interface Session { userId: string; role: "user" | "admin"; email: string }

export async function createSession(s: Session): Promise<string> {
  return new SignJWT({ ...s })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

async function verify(token?: string): Promise<Session | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return { userId: String(payload.userId), role: payload.role as Session["role"], email: String(payload.email) };
  } catch {
    return null;
  }
}

export async function getSessionFromRequest(req: NextRequest): Promise<Session | null> {
  return verify(req.cookies.get(COOKIE)?.value);
}

export async function getSession(): Promise<Session | null> {
  return verify((await cookies()).get(COOKIE)?.value);
}

export const SESSION_COOKIE = COOKIE;