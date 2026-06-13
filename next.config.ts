import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), magnetometer=(), gyroscope=(), accelerometer=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://tpwidg.com https://*.tpwidg.com https://ticketnetwork.com https://*.ticketnetwork.com",
      "style-src 'self' 'unsafe-inline' https://tpwidg.com https://*.tpwidg.com https://ticketnetwork.com https://*.ticketnetwork.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https:",
      "connect-src 'self' https: wss:",
      "frame-src 'self' https://tpwidg.com https://*.tpwidg.com https://ticketnetwork.com https://*.ticketnetwork.com",
      "worker-src 'self' blob:",
      "child-src 'self' blob: https:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https:",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    qualities: [70, 75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tpwidg.com",
      },
      {
        protocol: "https",
        hostname: "**.tpwidg.com",
      },
      {
        protocol: "https",
        hostname: "**.ticketnetwork.com",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;