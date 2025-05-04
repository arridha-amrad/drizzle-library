"use server";

import { CACHE_KEY } from "@/cacheKeys";
import db from "@/lib/drizzle/db";
import { UsersTable } from "@/lib/drizzle/schema";
import { actionClient, SafeActionError } from "@/lib/safeAction";
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
        const result = await db
          .update(UsersTable)
          .set({
            email,
            name,
          })
          .where(eq(UsersTable.id, userId))
          .returning();

        revalidateTag(CACHE_KEY.users);
        revalidateTag(CACHE_KEY.userByName);
        if (result.length === 0) {
          throw new SafeActionError("Failed to edit user");
        }
        return result[0];
      } catch (err) {
        throw err;
      }
    }
  );
