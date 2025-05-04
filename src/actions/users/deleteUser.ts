"use server";

import { CACHE_KEY } from "@/cacheKeys";
import db from "@/lib/drizzle/db";
import { UsersTable } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export const deleteUser = async (id: number) => {
  await db.delete(UsersTable).where(eq(UsersTable.id, id));
  revalidateTag(CACHE_KEY.users);
};
