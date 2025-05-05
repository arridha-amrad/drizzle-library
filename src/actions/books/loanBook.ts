"use server";

import { CACHE_KEY } from "@/cacheKeys";
import { MAX_LOAN } from "@/constants";
import db from "@/lib/drizzle/db";
import { BooksTable, LoansTable } from "@/lib/drizzle/schema";
import { actionClient, SafeActionError } from "@/lib/safeAction";
import { count, eq, and } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const loanBook = actionClient
  .schema(
    zfd.formData({
      userId: zfd.text(z.string().transform(async (v) => parseInt(v))),
      bookId: zfd.text(z.string().uuid()),
    })
  )
  .action(async ({ parsedInput: { bookId, userId } }) => {
    try {
      const totalLoan = await db
        .select({
          count: count(),
        })
        .from(LoansTable)
        .where(eq(LoansTable.userId, userId))
        .then((res) => res[0].count);

      if (totalLoan >= MAX_LOAN) {
        throw new SafeActionError(`This user has loaned ${MAX_LOAN} books`);
      }

      const storedBook = await db
        .select()
        .from(BooksTable)
        .where(eq(BooksTable.id, bookId));

      if (storedBook.length === 0) {
        throw new SafeActionError("Book not found");
      }

      const book = storedBook[0];

      const hasLoanedSameBook = await db
        .select()
        .from(LoansTable)
        .where(
          and(eq(LoansTable.userId, userId), eq(LoansTable.bookId, bookId))
        );

      if (hasLoanedSameBook.length !== 0) {
        throw new SafeActionError("The same user has borrowed this book");
      }

      const insertResult = await db.transaction(async (tx) => {
        const result = await tx
          .insert(LoansTable)
          .values({
            bookId,
            userId,
          })
          .returning();
        await db
          .update(BooksTable)
          .set({
            available: book.available - 1,
          })
          .where(eq(BooksTable.id, book.id));

        if (result.length === 0) {
          throw new SafeActionError("Failed to insert to loan table");
        }

        return result;
      });

      revalidateTag(CACHE_KEY.books);
      revalidateTag(CACHE_KEY.bookDetail);
      revalidateTag(CACHE_KEY.loanBook);
      revalidateTag(CACHE_KEY.onLoanBooks);

      const data = insertResult[0];

      redirect(
        `/loans?highlight=true&userId=${data.userId}&bookId=${data.bookId}`
      );
    } catch (err) {
      throw err;
    }
  });
