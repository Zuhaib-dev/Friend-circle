import { MetadataRoute } from "next";

const BASE_URL = "https://friendcirclee.netlify.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/team", "/crew", "/tours", "/gallery", "/apply-team"],
        disallow: [
          "/admin",
          "/admin/",
          "/api/",
          "/profile",
          "/surveillance",
          "/verify-otp",
        ],
      },
      {
        // Block known bad bots
        userAgent: [
          "AhrefsBot",
          "SemrushBot",
          "DotBot",
          "MJ12bot",
          "BLEXBot",
        ],
        disallow: ["/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
