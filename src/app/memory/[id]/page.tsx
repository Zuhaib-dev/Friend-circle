import { Suspense } from "react";
import MemoryDetailData from "./MemoryDetailData";

export default async function MemoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-bone text-ink px-4 md:px-8 py-12">
          <div className="h-[70vh] animate-pulse bg-ink/5" />
        </main>
      }
    >
      <MemoryDetailData id={id} />
    </Suspense>
  );
}
