"use server";

import { CACHE_KEY } from "@/cacheKeys";
import db from "@/lib/drizzle/db";
import { LoansTable, BooksTable } from "@/lib/drizzle/schema";
import { eq, and, count } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export const loanABook = async (_: any, data: FormData) => {
  const { bookId, userId } = Object.fromEntries(data.entries());

  const validatedSchema = z
    .object({
      userId: z.string().transform((v) => parseInt(v)),
      bookId: z.string(),
    })
    .safeParse({ bookId, userId });

  if (!validatedSchema.success) {
    return {
      validationErrors: validatedSchema.error.formErrors.fieldErrors,
    };
  }

  const validBookId = validatedSchema.data.bookId;
  const validUserId = validatedSchema.data.userId;

  // The maximum number of books a user can borrow is 4
  const userTotalLoan = await db
    .select({ count: count() })
    .from(LoansTable)
    .where(eq(LoansTable.userId, validUserId))
    .then((res) => res[0].count);
  if (userTotalLoan >= 4) {
    return {
      actionError: "Same user has loaned 4 books.",
    };
  }

  // Make sure the book is available
  const book = await db
    .select()
    .from(BooksTable)
    .where(eq(BooksTable.id, validBookId));
  if (book[0].available === 0) {
    return {
      actionError: "unavailable stock",
    };
  }

  const isLoanedSameBook = await db
    .select()
    .from(LoansTable)
    .where(
      and(
        eq(LoansTable.userId, validUserId),
        eq(LoansTable.bookId, validBookId)
      )
    );
  if (isLoanedSameBook.length > 0) {
    return {
      actionError: "Same user is currently loaning this book",
    };
  }

  await db.transaction(async (tx) => {
    await tx.insert(LoansTable).values({
      bookId: validBookId,
      userId: validUserId,
    });
    await db
      .update(BooksTable)
      .set({
        available: book[0].available - 1,
      })
      .where(eq(BooksTable.id, book[0].id));
  });

  revalidateTag(CACHE_KEY.books);
  revalidateTag(CACHE_KEY.bookDetail);
  revalidateTag(CACHE_KEY.loanBook);
  revalidateTag(CACHE_KEY.loans);

  return {
    success: true,
  };
};
