"use server";

import { CACHE_KEY } from "@/cacheKeys";
import db from "@/drizzle/db";
import { UsersTable } from "@/drizzle/schema";
import { actionClient } from "@/lib/safeAction";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const editUser = actionClient
  .schema(
    zfd.formData({
      name: z.string().min(1, "name is required"),
      email: z.string().min(1, "email is required").email("invalid email"),
    })
  )
  .bindArgsSchemas<[userId: z.ZodNumber]>([z.number()])
  .action(
    async ({
      parsedInput: { email, name },
      bindArgsParsedInputs: [userId],
    }) => {
      try {
        await db
          .update(UsersTable)
          .set({
            email,
            name,
          })
          .where(eq(UsersTable.id, userId))
          .returning();

        revalidateTag(CACHE_KEY.users);
        revalidateTag(CACHE_KEY.userByName);
      } catch (err) {
        throw err;
      }
    }
  );
