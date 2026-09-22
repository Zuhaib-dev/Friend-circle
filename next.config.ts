import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";
import { withSentryConfig } from "@sentry/nextjs";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
    exclude: [/public\/archive\/.*$/, /\.mp4$/],
  },
});

const nextConfig: NextConfig = {
  images: {
    // Serve WebP/AVIF by default for massive size savings
    formats: ["image/avif", "image/webp"],
    // Cache optimized images for 1 year on CDN
    minimumCacheTTL: 31536000,
    // Responsive breakpoints that match our `sizes` attributes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    // Allow Next.js to optimize external images from these domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google OAuth avatars
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io", // ImageKit CDN (gallery, crew portraits, tour covers)
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Unsplash images for dispatches/blogs
      },
      {
        protocol: "https",
        hostname: "picsum.photos", // Placeholder images
      },
    ],
  },

  // Compress responses
  compress: true,

  // Strict production headers for better caching & security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        // Static assets — cache aggressively
        source: "/(.*)\\.(jpg|jpeg|png|webp|avif|svg|ico|gif|woff2|woff|ttf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Next.js optimised images
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Static JS/CSS chunks
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default withSentryConfig(withPWA(nextConfig), {
  silent: !process.env.CI,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
  reactComponentAnnotation: {
    enabled: true,
  },
});
