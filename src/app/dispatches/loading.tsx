import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bone text-ink p-4">
      <div className="flex flex-col items-center gap-4 text-signal">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="mono-label text-sm uppercase tracking-widest">LOADING DISPATCHES...</p>
      </div>
    </div>
  );
}
