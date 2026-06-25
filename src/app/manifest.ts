import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Friend Circle",
    short_name: "FriendCircle",
    description:
      "Friend Circle – Kashmir-based adventure community exploring trekking, camping, offroading, fishing, and photography.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    orientation: "portrait",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "any",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["travel", "lifestyle", "entertainment"],
    lang: "en",
    dir: "ltr",
  };
}
