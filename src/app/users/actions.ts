"use server";

import { CACHE_KEY } from "@/cacheKeys";
import db from "@/drizzle/db";
import { UsersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export const removeUser = async (id: number) => {
  await db.delete(UsersTable).where(eq(UsersTable.id, id));
  revalidateTag(CACHE_KEY.users);
};

export const editUser = async (_: any, data: FormData) => {
  const { id, name, email } = Object.fromEntries(data.entries());

  const validateSchema = z
    .object({
      id: z.string().transform((v) => parseInt(v)),
      name: z.string().min(1, "name is required"),
      email: z.string().min(1, "email is required").email("invalid email"),
    })
    .safeParse({
      id,
      name,
      email,
    });

  if (!validateSchema.success) {
    return {
      validationErrors: validateSchema.error.formErrors.fieldErrors,
    };
  }

  const result = await db
    .update(UsersTable)
    .set({
      email: validateSchema.data.email,
      name: validateSchema.data.name,
    })
    .where(eq(UsersTable.id, validateSchema.data.id))
    .returning();

  if (result.length === 0) {
    return {
      errors: "failed to update user",
    };
  }

  revalidateTag(CACHE_KEY.users);

  return {
    success: true,
  };
};
