"use server";

import { CACHE_KEY } from "@/cacheKeys";
import db from "@/drizzle/db";
import { UsersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export const register = async (data: FormData) => {
  const email = data.get("email");
  const name = data.get("name");
  if (!email || !name) return;

  const result = await db
    .insert(UsersTable)
    .values({
      email: String(email),
      name: String(name),
    })
    .returning({ name: UsersTable.name });

  revalidateTag(CACHE_KEY.users);
  return result[0].name;
};

export const editUser = async (id: string | null, data: FormData) => {
  const email = data.get("email");
  const name = data.get("name");

  if (!email || !name || !id) return;

  const result = await db
    .update(UsersTable)
    .set({
      email: String(email),
      name: String(name),
    })
    .returning({ name: UsersTable.name })
    .where(eq(UsersTable.id, parseInt(id)));
  revalidateTag("users");
  return result[0].name;
};
