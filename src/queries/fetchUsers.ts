import { CACHE_KEY } from "@/cacheKeys";
import db from "@/lib/drizzle/db";
import { UsersTable } from "@/lib/drizzle/schema";
import { LIMIT_USERS } from "@/constants";
import { count, desc } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const fetchUsers = unstable_cache(
  async (page?: number) => {
    const u = await db
      .select()
      .from(UsersTable)
      .orderBy(desc(UsersTable.createdAt))
      .limit(LIMIT_USERS)
      .offset((Number(page) - 1) * LIMIT_USERS);

    const sum = await db
      .select({ count: count() })
      .from(UsersTable)
      .then((res) => res[0].count);

    return {
      users: u,
      total: sum,
    };
  },
  [CACHE_KEY.users],
  { tags: [CACHE_KEY.users], revalidate: 60 }
);

export type User = Awaited<ReturnType<typeof fetchUsers>>["users"][number];
