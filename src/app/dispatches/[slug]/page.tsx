import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectToDatabase from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import { DispatchDetailClient } from "@/app/dispatches/components/DispatchDetailClient";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://friendcirclee.netlify.app";

export const revalidate = 300;

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getDispatch(slug: string, incrementViews = false, allowUnpublished = false) {
  await connectToDatabase();

  const query: Record<string, any> = { slug };
  if (!allowUnpublished) {
    query.status = "PUBLISHED";
  }

  const operation = incrementViews
    ? BlogPost.findOneAndUpdate(query, { $inc: { viewsCount: 1 } }, { returnDocument: "after" })
    : BlogPost.findOne(query);

  const dispatch = await operation
    .populate("author", "name image role bio socialHandle")
    .lean();

  return dispatch ? JSON.parse(JSON.stringify(dispatch)) : null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dispatch = await getDispatch(slug);

  if (!dispatch) {
    return {
      title: "Dispatch Not Found | Friend Circle",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${dispatch.title} | Friend Circle Dispatches`;
  const url = `${BASE_URL}/dispatches/${dispatch.slug}`;
  const keywords = Array.isArray(dispatch.tags)
    ? dispatch.tags
    : ["expedition", "kashmir", "field-notes", "outdoor-journal"];

  return {
    title,
    description: dispatch.summary,
    alternates: {
      canonical: url,
    },
    keywords,
    authors: [{ name: dispatch.author?.name || "Zuhaib Rashid", url: dispatch.author?.socialHandle || "https://www.zuhaibrashid.com/" }],
    openGraph: {
      title,
      description: dispatch.summary,
      url,
      siteName: "Friend Circle Dispatches",
      type: "article",
      publishedTime: dispatch.publishedAt || dispatch.createdAt,
      modifiedTime: dispatch.updatedAt,
      authors: [dispatch.author?.name || "Zuhaib Rashid"],
      images: dispatch.coverImage
        ? [
            {
              url: dispatch.coverImage,
              alt: dispatch.title,
              width: 1200,
              height: 630,
            },
          ]
        : [
            {
              url: `${BASE_URL}/icon.png`,
              alt: "Friend Circle Field Manual",
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: dispatch.summary,
      images: dispatch.coverImage ? [dispatch.coverImage] : [`${BASE_URL}/icon.png`],
      creator: "@zuhaibrashid",
    },
  };
}

export default async function DispatchDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "ADMIN";
  const dispatch = await getDispatch(slug, !isAdmin, isAdmin);

  const articleJsonLd = dispatch
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: dispatch.title,
        description: dispatch.summary,
        articleSection: dispatch.category,
        keywords: Array.isArray(dispatch.tags) ? dispatch.tags.join(", ") : undefined,
        image: dispatch.coverImage ? [dispatch.coverImage] : undefined,
        datePublished: dispatch.publishedAt || dispatch.createdAt,
        dateModified: dispatch.updatedAt || dispatch.publishedAt || dispatch.createdAt,
        author: {
          "@type": "Person",
          name: dispatch.author?.name || "Zuhaib Rashid",
          url: dispatch.author?.socialHandle || "https://www.zuhaibrashid.com/",
          sameAs: ["https://www.zuhaibrashid.com/"],
        },
        publisher: {
          "@type": "Organization",
          name: "Friend Circle",
          url: BASE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${BASE_URL}/icon.png`,
          },
        },
        mainEntityOfPage: `${BASE_URL}/dispatches/${dispatch.slug}`,
      }
    : null;

  const breadcrumbJsonLd = dispatch
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: BASE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Dispatches",
            item: `${BASE_URL}/dispatches`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: dispatch.title,
            item: `${BASE_URL}/dispatches/${dispatch.slug}`,
          },
        ],
      }
    : null;

  return (
    <>
      {articleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}
      <DispatchDetailClient initialDispatch={dispatch} />
    </>
  );
}
