import { redirect } from "next/navigation";
import { getSession, type Session } from "./session";

export async function protectRoute(opts: { role?: "admin" } = {}): Promise<Session> {
  const session = await getSession();
  if (!session) redirect("/account/login");
  if (opts.role === "admin" && session.role !== "admin") redirect("/");
  return session;
}