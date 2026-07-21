import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectToDatabase from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import DispatchDetailClient from "../components/DispatchDetailClient";

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
    ? BlogPost.findOneAndUpdate(query, { $inc: { viewsCount: 1 } }, { new: true })
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

  const title = `${dispatch.title} | Friend Circle`;
  const url = `${BASE_URL}/dispatches/${dispatch.slug}`;

  return {
    title,
    description: dispatch.summary,
    alternates: {
      canonical: url,
    },
    keywords: dispatch.tags,
    openGraph: {
      title,
      description: dispatch.summary,
      url,
      siteName: "Friend Circle",
      type: "article",
      publishedTime: dispatch.publishedAt || dispatch.createdAt,
      modifiedTime: dispatch.updatedAt,
      authors: dispatch.author?.name ? [dispatch.author.name] : undefined,
      images: dispatch.coverImage
        ? [
            {
              url: dispatch.coverImage,
              alt: dispatch.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: dispatch.summary,
      images: dispatch.coverImage ? [dispatch.coverImage] : undefined,
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
        image: dispatch.coverImage ? [dispatch.coverImage] : undefined,
        datePublished: dispatch.publishedAt || dispatch.createdAt,
        dateModified: dispatch.updatedAt || dispatch.publishedAt || dispatch.createdAt,
        author: {
          "@type": "Person",
          name: dispatch.author?.name || "Friend Circle",
        },
        publisher: {
          "@type": "Organization",
          name: "Friend Circle",
          url: BASE_URL,
        },
        mainEntityOfPage: `${BASE_URL}/dispatches/${dispatch.slug}`,
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
      <DispatchDetailClient initialDispatch={dispatch} />
    </>
  );
}
