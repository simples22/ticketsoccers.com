import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const blockedPatterns = [
  ".env",
  "wp-admin",
  "wp-login",
  "xmlrpc.php",
  "phpmyadmin",
  "adminer",
  ".git",
  ".svn",
  "config.php",
  "composer.json",
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
];

const suspiciousQueryPatterns = [
  "<script",
  "javascript:",
  "onerror=",
  "onload=",
  "../",
  "%2e%2e",
  "union select",
  "drop table",
];

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname.toLowerCase();
  const search = url.search.toLowerCase();

  const isBlockedPath = blockedPatterns.some((pattern) =>
    pathname.includes(pattern)
  );

  const isSuspiciousQuery = suspiciousQueryPatterns.some((pattern) =>
    search.includes(pattern)
  );

  if (isBlockedPath || isSuspiciousQuery) {
    return new NextResponse("Blocked", {
      status: 403,
    });
  }

  const response = NextResponse.next();

  response.headers.set("X-Robots-Tag", "index, follow");
  response.headers.set("X-Request-Protection", "ticketsoccers-shield");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|google5a23f596896594f6.html).*)",
  ],
};