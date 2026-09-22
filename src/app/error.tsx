"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { AlertCircle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bone text-ink p-4">
      <div className="hairline border-ink p-8 flex flex-col items-center gap-4 text-center max-w-sm">
        <AlertCircle className="h-8 w-8 text-signal" />
        <h2 className="font-display text-2xl uppercase">SYSTEM FAILURE</h2>
        <p className="mono-label opacity-60">An unexpected error occurred.</p>
        <button 
          onClick={reset}
          className="mt-4 brick px-4 py-2 text-bone mono-label hover:bg-signal transition-colors"
        >
          ATTEMPT RECOVERY
        </button>
      </div>
    </div>
  );
}
