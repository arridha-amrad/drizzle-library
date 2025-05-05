"use server";

import { CACHE_KEY } from "@/cacheKeys";
import db from "@/lib/drizzle/db";
import { UsersTable } from "@/lib/drizzle/schema";
import { actionClient, SafeActionError } from "@/lib/safeAction";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const createUser = actionClient
  .schema(
    zfd.formData({
      name: zfd.text(z.string().min(1, "Name is required")),
      email: zfd.text(z.string().email()),
    })
  )
  .action(async ({ parsedInput: { email, name } }) => {
    try {
      const isEmailRegistered = await db
        .select()
        .from(UsersTable)
        .where(eq(UsersTable.email, email));
      if (isEmailRegistered.length > 0) {
        throw new SafeActionError("Email has been registered");
      }
      const result = await db
        .insert(UsersTable)
        .values({
          name,
          email,
        })
        .returning();
      if (result.length === 0) {
        throw new SafeActionError("Failed to create user");
      }
      revalidateTag(CACHE_KEY.users);
      const data = result[0];
      redirect(`/users/${data.id}`);
    } catch (err) {
      throw err;
    }
  });
