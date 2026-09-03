"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Search, PlusSquare, Image as ImageIcon, User as UserIcon } from "lucide-react";
import { useSession } from "next-auth/react";

export function BottomNav({ onAddClick }: { onAddClick?: () => void }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  // The navigation is hidden on desktop (md:hidden) and fixed to the bottom on mobile.
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 hairline-t border-ink bg-bone px-6 py-3 flex items-center justify-between pb-safe">
      <Link href="/" aria-label="Home" className={`p-2 transition-colors ${pathname === "/" ? "text-signal" : "text-ink/60 hover:text-ink"}`}>
        <Home className="h-6 w-6" />
      </Link>
      
      <Link href="/crew" aria-label="Search Crew" className={`p-2 transition-colors ${pathname === "/crew" ? "text-signal" : "text-ink/60 hover:text-ink"}`}>
        <Search className="h-6 w-6" />
      </Link>
      
      {user && (user as any).role !== 'USER' && (
        <button 
          onClick={onAddClick}
          aria-label="Add Content"
          className="p-2 text-ink/60 hover:text-signal transition-colors"
        >
          <PlusSquare className="h-6 w-6" />
        </button>
      )}
      
      <Link href="/gallery" aria-label="Gallery" className={`p-2 transition-colors ${pathname === "/gallery" ? "text-signal" : "text-ink/60 hover:text-ink"}`}>
        <ImageIcon className="h-6 w-6" />
      </Link>
      
      <Link href={user ? `/crew/${(user as any).id}` : "/login"} aria-label="User Profile" className={`p-2 transition-colors ${pathname?.startsWith("/crew/") && pathname !== "/crew" ? "text-signal" : "text-ink/60 hover:text-ink"}`}>
        <UserIcon className="h-6 w-6" />
      </Link>
    </div>
  );
}
