import { getTripMemory } from "./data";
import MemoryDetailClient from "./MemoryDetailClient";
import type { ITripMemory } from "@/models/TripMemory";

export default async function MemoryDetailData({ id }: { id: string }) {
  const memory = await getTripMemory(id);
  const initialMemory = memory
    ? (JSON.parse(JSON.stringify(memory)) as ITripMemory)
    : null;

  return <MemoryDetailClient memory={initialMemory} />;
}
