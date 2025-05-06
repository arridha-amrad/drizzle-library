"use server";

import { CACHE_KEY } from "@/cacheKeys";
import db from "@/lib/drizzle/db";
import { LoansTable, UsersTable } from "@/lib/drizzle/schema";
import { actionClient, SafeActionError } from "@/lib/safeAction";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export const deleteUser = actionClient
  .bindArgsSchemas<[userId: z.ZodNumber]>([z.number()])
  .action(async ({ bindArgsParsedInputs: [userId] }) => {
    await db.delete(UsersTable).where(eq(UsersTable.id, userId));

    const loanBooks = await db
      .select()
      .from(LoansTable)
      .where(eq(LoansTable.userId, userId));

    if (loanBooks.length !== 0) {
      throw new SafeActionError(
        "Failed to delete. Currently, this user is borrowing some books"
      );
    }

    revalidateTag(CACHE_KEY.users);
  });
