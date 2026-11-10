import { Suspense } from "react";
import GalleryPageData from "./GalleryPageData";

function GalleryPageFallback() {
  return (
    <main className="min-h-screen bg-bone text-ink px-4 py-6 md:py-8">
      <div className="mb-6 h-24 animate-pulse bg-ink/5" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="aspect-4/3 animate-pulse bg-ink/5 hairline border-ink/20" />
        ))}
      </div>
    </main>
  );
}

export default function GalleryPage() {
  return (
    <Suspense fallback={<GalleryPageFallback />}>
      <GalleryPageData />
    </Suspense>
  );
}
