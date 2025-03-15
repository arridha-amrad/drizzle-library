"use server";

import { CACHE_KEY } from "@/cacheKeys";
import db from "@/drizzle/db";
import { UsersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export const registerUser = async (_: any, data: FormData) => {
  const { name, email } = Object.fromEntries(data.entries());
  const validated = z
    .object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Email is invalid"),
    })
    .safeParse({
      email,
      name,
    });
  if (!validated.success) {
    return {
      validationErrors: validated.error.formErrors.fieldErrors,
    };
  }
  const result = await db
    .insert(UsersTable)
    .values({
      email: validated.data.email,
      name: validated.data.name,
    })
    .returning();
  if (result.length === 0) {
    return {
      errors: "Failed to register a user",
    };
  }
  revalidateTag(CACHE_KEY.users);
  return {
    success: true,
  };
};
