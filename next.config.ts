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
   "style-src 'self' 'unsafe-inline' https://tpwidg.com https://*.tpwidg.com https://s3.amazonaws.com https://use.fontawesome.com",
  "font-src 'self' data: https://use.fontawesome.com https://ka-f.fontawesome.com",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://tpwidg.com https://*.tpwidg.com https://s3.amazonaws.com https://tpo.gg https://*.tpo.gg",
  "img-src 'self' data: blob: https: http:",
  "connect-src 'self' https: wss:","frame-src 'self' https://tpwidg.com https://*.tpwidg.com https://ticketnetwork.com https://*.ticketnetwork.com",
    "worker-src 'self' blob:",
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