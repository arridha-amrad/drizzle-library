import { CACHE_KEY } from "@/cacheKeys";
import db from "@/lib/drizzle/db";
import { HistoriesTable } from "@/lib/drizzle/schema";
import { sum } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const fetchLibraryBalance = unstable_cache(
  async () => {
    const total = await db
      .select({ total: sum(HistoriesTable.charge) })
      .from(HistoriesTable);
    return Number(total[0].total);
  },
  [CACHE_KEY.historyCharge],
  { tags: [CACHE_KEY.historyCharge], revalidate: 60 }
);
