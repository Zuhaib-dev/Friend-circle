"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bone text-ink p-4">
      <div className="hairline border-ink p-8 flex flex-col items-center gap-4 text-center max-w-sm">
        <h2 className="font-display text-4xl uppercase">404</h2>
        <p className="mono-label opacity-60">Route not found.</p>
        <Link href="/" className="mt-4 brick px-4 py-2 text-bone mono-label hover:bg-signal transition-colors">
          RETURN TO BASE
        </Link>
      </div>
    </div>
  );
}
