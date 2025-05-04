"use server";

import { CACHE_KEY } from "@/cacheKeys";
import db from "@/lib/drizzle/db";
import { BooksTable } from "@/lib/drizzle/schema";
import { actionClient } from "@/lib/safeAction";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export const deleteBook = actionClient
  .schema(
    z.object({
      bookId: z.string().uuid(),
    })
  )
  .action(async ({ parsedInput: { bookId } }) => {
    try {
      await db.delete(BooksTable).where(eq(BooksTable.id, bookId));
      revalidateTag(CACHE_KEY.books);
    } catch (err) {
      throw err;
    }
  });
