"use server";

import { CACHE_KEY } from "@/cacheKeys";
import db from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export const removeUser = async (id: number) => {
  await db.delete(users).where(eq(users.id, id));
  revalidateTag(CACHE_KEY.users);
};
