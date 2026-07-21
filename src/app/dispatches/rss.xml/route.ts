import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://friendcirclee.netlify.app";

export const revalidate = 3600;

export async function GET() {
  try {
    await connectToDatabase();
    const dispatches = await BlogPost.find({ status: "PUBLISHED" })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(30)
      .populate("author", "name")
      .lean();

    const itemsXml = dispatches
      .map((d: any) => {
        const url = `${BASE_URL}/dispatches/${d.slug}`;
        const pubDate = new Date(d.publishedAt || d.createdAt).toUTCString();
        const authorName = d.author?.name || "Zuhaib Rashid";

        return `
    <item>
      <title><![CDATA[${d.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <author><![CDATA[${authorName}]]></author>
      <category><![CDATA[${d.category || "FIELD_NOTES"}]]></category>
      <description><![CDATA[${d.summary}]]></description>
      ${d.coverImage ? `<media:content url="${d.coverImage}" medium="image" />` : ""}
    </item>`;
      })
      .join("");

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Friend Circle Field Dispatches</title>
    <link>${BASE_URL}/dispatches</link>
    <description>Kashmir expedition stories, outdoor guides, and tactical notes from Friend Circle.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/dispatches/rss.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

    return new NextResponse(rssXml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error("RSS generation error:", error);
    return new NextResponse("Failed to generate RSS feed", { status: 500 });
  }
}
