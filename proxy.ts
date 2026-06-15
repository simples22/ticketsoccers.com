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

const allowedWidgetPaths = [
  "tpwidg",
  "ticketnetwork",
  "tns3",
  "powered_by",
  "promo_id=8505",
  "shmarker=664478",
  "campaign_id=72",
];

function isWidgetRequest(pathname: string, search: string) {
  const combined = `${pathname}?${search}`.toLowerCase();

  return allowedWidgetPaths.some((item) => combined.includes(item));
}

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname.toLowerCase();
  const search = url.search.toLowerCase();

  if (isWidgetRequest(pathname, search)) {
    const response = NextResponse.next();

    response.headers.set("X-Request-Protection", "ticketsoccers-widget-pass");

    return response;
  }

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
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|google5a23f596896594f6.html|sw.js).*)",
  ],
};