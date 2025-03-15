import { CACHE_KEY } from "@/cacheKeys";
import db from "@/drizzle/db";
import { UsersTable } from "@/drizzle/schema";
import { LIMIT_USERS } from "@/variables";
import { ilike, desc, count } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const fetchUsers = unstable_cache(
  async (page?: number, name?: string) => {
    const filters = name ? ilike(UsersTable.name, `%${name}%`) : undefined;
    const u = await db
      .select()
      .from(UsersTable)
      .where(filters)
      .orderBy(desc(UsersTable.createdAt))
      .limit(LIMIT_USERS)
      .offset((Number(page) - 1) * LIMIT_USERS);

    const sum = await db
      .select({ count: count() })
      .from(UsersTable)
      .where(filters)
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
