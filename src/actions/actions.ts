"use server";

import { revalidateTag, unstable_cache } from "next/cache";
import { UsersTable } from "../drizzle/schema";
import { desc, eq, ilike } from "drizzle-orm";
import { cookies } from "next/headers";
import { LIMIT_USERS } from "../variables";
import { CACHE_KEY } from "@/cacheKeys";

type FetchProps = {
  page: number;
  name?: string;
};

export const search = async (name: string, page: number) => {
  if (!name) return;
  const limit = 8;
  const total = (
    await db.query.users.findMany({
      where: ilike(users.name, `%${String(name)}%`),
    })
  ).length;

  const data = await db
    .select()
    .from(users)
    .limit(limit)
    .offset((Number(page) - 1) * limit)
    .where(ilike(users.name, `%${String(name)}%`));

  return { data, total };
};

export const setUsersPageCookies = async (page: number) => {
  const cookie = await cookies();
  cookie.set({
    name: "users-page",
    value: String(page),
  });
};

export const setUserSearchPageCookie = async (page: number, name: string) => {
  const data = JSON.stringify({ page: String(page), name });
  const cookie = await cookies();
  cookie.set({
    name: "users-search-page",
    value: data,
  });
};
