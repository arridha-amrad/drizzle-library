import { CACHE_KEY } from "@/cacheKeys";
import { LIMIT_USERS } from "@/constants";
import db from "@/lib/drizzle/db";
import { UsersTable } from "@/lib/drizzle/schema";
import { count, desc, eq, ilike } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const fetchUserByName = unstable_cache(
  async (name: string) => {
    const u = await db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.name, name))
      .orderBy(desc(UsersTable.createdAt))
      .limit(LIMIT_USERS);

    const sum = await db
      .select({ count: count() })
      .from(UsersTable)
      .where(ilike(UsersTable.name, name))
      .then((res) => res[0].count);

    return {
      users: u,
      total: sum,
    };
  },
  [CACHE_KEY.userByName],
  { revalidate: 60, tags: [CACHE_KEY.userByName] }
);
