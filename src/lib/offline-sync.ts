import { get, set } from "idb-keyval";
import { toast } from "sonner";

export type OfflineActionType = "tazkiyah_habit" | "memory_upload" | "tasbih_sync";

export interface OfflineAction {
  id: string;
  type: OfflineActionType;
  payload: any;
  timestamp: number;
}

const SYNC_QUEUE_KEY = "offline-sync-queue";

export async function getOfflineQueue(): Promise<OfflineAction[]> {
  try {
    const queue = await get<OfflineAction[]>(SYNC_QUEUE_KEY);
    return queue || [];
  } catch (error) {
    console.error("Failed to access IndexedDB:", error);
    return [];
  }
}

export async function queueOfflineAction(type: OfflineActionType, payload: any) {
  const queue = await getOfflineQueue();
  const newAction: OfflineAction = {
    id: crypto.randomUUID(),
    type,
    payload,
    timestamp: Date.now(),
  };
  await set(SYNC_QUEUE_KEY, [...queue, newAction]);
  return newAction;
}

export async function clearOfflineAction(id: string) {
  const queue = await getOfflineQueue();
  await set(SYNC_QUEUE_KEY, queue.filter((action) => action.id !== id));
}

export async function processOfflineQueue() {
  const queue = await getOfflineQueue();
  if (queue.length === 0) return { success: 0, failed: 0 };

  let successCount = 0;
  let failCount = 0;

  for (const action of queue) {
    try {
      if (action.type === "tasbih_sync") {
        // Mocking an API call for syncing Tasbih counts
        await new Promise((resolve) => setTimeout(resolve, 500));
      } else if (action.type === "memory_upload") {
        // Mocking memory upload for now (could connect to real API later)
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      
      await clearOfflineAction(action.id);
      successCount++;
    } catch (e) {
      console.error(`Failed to sync action ${action.id}:`, e);
      failCount++;
    }
  }

  return { success: successCount, failed: failCount };
}
