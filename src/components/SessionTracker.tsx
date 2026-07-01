"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

export function SessionTracker() {
  const { status } = useSession();
  const pinged = useRef(false);

  useEffect(() => {
    if (status === "authenticated" && !pinged.current) {
      pinged.current = true;
      fetch("/api/user/sessions/ping", {
        method: "POST",
      }).catch((err) => console.error("Session telemetry failed:", err));
    }
  }, [status]);

  return null; // Invisible component
}
