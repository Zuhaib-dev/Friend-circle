"use client";
import { Search } from "lucide-react";

export function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="group relative w-full sm:w-72">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-zinc-500 transition group-focus-within:text-emerald-300" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search surah, meaning, number…"
        className="w-full rounded-full border border-white/10 bg-white/3 py-2 pl-9 pr-3 text-xs text-zinc-100 placeholder:text-zinc-500 backdrop-blur-md transition focus:border-emerald-300/40 focus:outline-none focus:ring-2 focus:ring-emerald-300/10"
      />
    </div>
  );
}

