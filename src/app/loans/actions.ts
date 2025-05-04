"use server";

import { CACHE_KEY } from "@/cacheKeys";
import db from "@/lib/drizzle/db";
import {
  BooksTable,
  HistoriesTable,
  LoansTable,
  ReviewsTable,
} from "@/lib/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const finishLoanSchema = z.object({
  userId: z.string().transform((v) => Number(v)),
  bookId: z.string(),
  charge: z.string().transform((v) => Number(v)),
  loanAt: z.string().transform((v) => new Date(v)),
  rating: z.string(),
  comment: z.string().min(1, "comment is required"),
});

export const finishLoan = async (_: any, data: FormData) => {
  const validatedSchema = finishLoanSchema.safeParse({
    userId: data.get("userId"),
    bookId: data.get("bookId"),
    charge: data.get("charge"),
    loanAt: data.get("loanAt"),
    rating: data.get("rating"),
    comment: data.get("comment"),
  });

  if (!validatedSchema.success) {
    return {
      validationErrors: validatedSchema.error.formErrors.fieldErrors,
    };
  }

  const result = await db.transaction(async (tx) => {
    try {
      const book = await tx
        .select()
        .from(BooksTable)
        .where(eq(BooksTable.id, validatedSchema.data.bookId));
      await tx
        .update(BooksTable)
        .set({
          available: book[0].available + 1,
        })
        .where(eq(BooksTable.id, validatedSchema.data.bookId));
      await tx.insert(ReviewsTable).values({
        bookId: validatedSchema.data.bookId,
        description: validatedSchema.data.comment,
        rating: validatedSchema.data.rating,
        userId: validatedSchema.data.userId,
      });
      await tx.insert(HistoriesTable).values({
        bookId: validatedSchema.data.bookId,
        charge: validatedSchema.data.charge,
        loanAt: validatedSchema.data.loanAt,
        userId: validatedSchema.data.userId,
      });
      await tx
        .delete(LoansTable)
        .where(
          and(
            eq(LoansTable.bookId, validatedSchema.data.bookId),
            eq(LoansTable.userId, validatedSchema.data.userId)
          )
        );
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  });
  if (result) {
    revalidateTag(CACHE_KEY.loans);
    revalidateTag(CACHE_KEY.books);
    revalidateTag(CACHE_KEY.loanBook);
    revalidateTag(CACHE_KEY.histories);
    revalidateTag(CACHE_KEY.charge);
    return {
      success: true,
    };
  }
  return {
    actionError: "Something went wrong",
  };
};
