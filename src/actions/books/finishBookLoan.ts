"use server";

import { CACHE_KEY } from "@/cacheKeys";
import db from "@/lib/drizzle/db";
import {
  BooksTable,
  HistoriesTable,
  LoansTable,
  ReviewsTable,
} from "@/lib/drizzle/schema";
import { actionClient, SafeActionError } from "@/lib/safeAction";
import { and, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  userId: zfd.numeric(),
  bookId: zfd.text(z.string()),
  charge: zfd.numeric(),
  loanAt: zfd.text(z.string().transform((v) => new Date(v))),
  rating: zfd.text(z.string()),
  review: zfd.text(z.string().min(1, "review is required")),
});

export const finishBookLoan = actionClient
  .schema(schema)
  .action(
    async ({
      parsedInput: { bookId, charge, loanAt, rating, review, userId },
    }) => {
      try {
        const storedBook = await db
          .select()
          .from(BooksTable)
          .where(eq(BooksTable.id, bookId));

        if (storedBook.length === 0) {
          throw new SafeActionError("Book not found");
        }

        const book = storedBook[0];

        await db.transaction(async (tx) => {
          await tx
            .update(BooksTable)
            .set({
              available: book.available + 1,
            })
            .where(eq(BooksTable.id, bookId));

          await tx.insert(ReviewsTable).values({
            bookId,
            description: review,
            rating,
            userId,
          });

          await tx.insert(HistoriesTable).values({
            bookId,
            charge,
            loanAt,
            userId,
          });

          await tx
            .delete(LoansTable)
            .where(
              and(eq(LoansTable.bookId, bookId), eq(LoansTable.userId, userId))
            );
        });

        revalidateTag(CACHE_KEY.onLoanBooks);
        revalidateTag(CACHE_KEY.books);
        revalidateTag(CACHE_KEY.loanBook);
        revalidateTag(CACHE_KEY.histories);
        revalidateTag(CACHE_KEY.charge);
      } catch (err) {
        throw err;
      }
    }
  );
