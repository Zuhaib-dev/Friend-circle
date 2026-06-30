"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { processOfflineQueue } from "@/lib/offline-sync";
import { Wifi, WifiOff } from "lucide-react";

export function OfflineSyncProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleOnline = async () => {
      toast("You are back online", {
        icon: <Wifi className="w-4 h-4 text-emerald-400" />,
        description: "Syncing offline actions...",
      });
      
      const result = await processOfflineQueue();
      if (result.success > 0) {
        toast.success(`Successfully synced ${result.success} offline actions.`);
      }
      if (result.failed > 0) {
        toast.error(`Failed to sync ${result.failed} actions. They will remain in queue.`);
      }
    };

    const handleOffline = () => {
      toast("You are offline", {
        icon: <WifiOff className="w-4 h-4 text-rose-400" />,
        description: "Your actions will be saved and synced when reconnected.",
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial check on mount in case they come back online after closing the app
    if (navigator.onLine) {
      processOfflineQueue().then((result) => {
        if (result.success > 0) {
          toast.success(`Successfully synced ${result.success} offline actions from a previous session.`);
        }
      });
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return <>{children}</>;
}
