"use server";

import { revalidateTag, unstable_cache } from "next/cache";
import { db } from "../drizzle/migrate";
import { users } from "../drizzle/schema";
import { desc, eq, ilike } from "drizzle-orm";
import { cookies } from "next/headers";
import { LIMIT_USERS } from "../variables";
import { CACHE_KEY } from "@/cacheKeys";

export const register = async (data: FormData) => {
  const email = data.get("email");
  const name = data.get("name");
  if (!email || !name) return;

  const result = await db
    .insert(users)
    .values({
      email: String(email),
      name: String(name),
    })
    .returning({ name: users.name });

  revalidateTag("users");
  return result[0].name;
};

type FetchProps = {
  page: number;
  name?: string;
};

export const editUser = async (id: string | null, data: FormData) => {
  const email = data.get("email");
  const name = data.get("name");

  if (!email || !name || !id) return;

  const result = await db
    .update(users)
    .set({
      email: String(email),
      name: String(name),
    })
    .returning({ name: users.name })
    .where(eq(users.id, parseInt(id)));
  revalidateTag("users");
  return result[0].name;
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
