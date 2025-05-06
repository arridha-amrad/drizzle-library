"use server";

import { CACHE_KEY } from "@/cacheKeys";
import db from "@/lib/drizzle/db";
import { BooksTable, LoansTable } from "@/lib/drizzle/schema";
import { actionClient, SafeActionError } from "@/lib/safeAction";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const deleteBook = actionClient
  .schema(
    z.object({
      bookId: z.string().uuid(),
    })
  )
  .action(async ({ parsedInput: { bookId } }) => {
    try {
      const loanBook = await db
        .select()
        .from(LoansTable)
        .where(eq(LoansTable.bookId, bookId));

      if (loanBook.length !== 0) {
        throw new SafeActionError(
          "Failed to delete. The book is currently on loan"
        );
      }

      await db.delete(BooksTable).where(eq(BooksTable.id, bookId));
      revalidateTag(CACHE_KEY.books);
    } catch (err) {
      throw err;
    }
  });
