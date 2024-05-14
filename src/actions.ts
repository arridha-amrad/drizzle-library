"use server";

import { revalidateTag, unstable_cache } from "next/cache";
import { db } from "./drizzle/migrate";
import { users } from "./drizzle/schema";
import { count, desc, eq, ilike, like } from "drizzle-orm";
import { cookies } from "next/headers";
import { LIMIT_USERS } from "./variables";

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

const getTotal = async (name?: string) => {
  const total = (
    await db
      .select()
      .from(users)
      .where(name ? ilike(users.name, `%${name}%`) : undefined)
  ).length;
  return total;
};

const getUsers = async (page: number, name?: string) => {
  const data = await db
    .select()
    .from(users)
    .where(name ? ilike(users.name, `%${name}%`) : undefined)
    .orderBy(desc(users.createdAt))
    .limit(LIMIT_USERS)
    .offset((Number(page) - 1) * LIMIT_USERS);
  return data;
};

export const fetchUsers = unstable_cache(
  async (props: FetchProps) => {
    const [total, data] = await Promise.all([
      getTotal(props.name),
      getUsers(props.page, props.name),
    ]);
    return { data, total };
  },
  ["users"],
  { tags: ["users"] }
);

export const removeUser = async (id: number) => {
  await db.delete(users).where(eq(users.id, id));
  revalidateTag("users");
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

export const setUsersPageCookies = (page: number) => {
  cookies().set({
    name: "users-page",
    value: String(page),
  });
};

export const setUserSearchPageCookie = (page: number, name: string) => {
  const data = JSON.stringify({ page: String(page), name });
  console.log(data);

  cookies().set({
    name: "users-search-page",
    value: data,
  });
};
