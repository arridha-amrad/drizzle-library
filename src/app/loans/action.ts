"use server";

import { CACHE_KEY } from "@/cacheKeys";
import db from "@/drizzle/db";
import {
  BooksTable,
  HistoriesTable,
  LoansTable,
  ReviewsTable,
} from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export const returnBookAction = async (_: any, data: FormData) => {
  const { loanAt, charge, userId, bookId, rating, comment } =
    Object.fromEntries(data.entries());

  const validatedSchema = z
    .object({
      loanAt: z.string().transform((v) => new Date(v)),
      charge: z.string().transform((v) => parseInt(v)),
      userId: z.string().transform((v) => parseInt(v)),
      bookId: z.string(),
      rating: z.string(),
      comment: z.string().min(1, "comment required"),
    })
    .safeParse({
      rating,
      comment,
      loanAt,
      charge,
      userId,
      bookId,
    });

  if (!validatedSchema.success) {
    return {
      validationErrors: validatedSchema.error.formErrors.fieldErrors,
      success: false,
      errors: null,
    };
  }

  const {
    bookId: bi,
    charge: c,
    comment: co,
    loanAt: la,
    rating: r,
    userId: u,
  } = validatedSchema.data;

  const book = await db.select().from(BooksTable).where(eq(BooksTable.id, bi));
  await db
    .delete(LoansTable)
    .where(and(eq(LoansTable.bookId, bi), eq(LoansTable.userId, u)));
  await db
    .update(BooksTable)
    .set({
      stocks: book[0].stocks,
      available: book[0].available + 1,
    })
    .where(eq(BooksTable.id, bi));

  await db
    .insert(ReviewsTable)
    .values({
      description: co,
      rating: r,
      userId: u,
      bookId: bi,
    })
    .returning();

  const result = await db
    .insert(HistoriesTable)
    .values({
      bookId: bi,
      userId: u,
      loanAt: la,
      charge: c,
    })
    .returning();

  if (result.length === 0) {
    return {
      errors: "failed to return",
      success: false,
      validationErrors: null,
    };
  } else {
    revalidateTag(CACHE_KEY.loans);
    revalidateTag(CACHE_KEY.loanBook);
    revalidateTag(CACHE_KEY.histories);
    revalidateTag(CACHE_KEY.charge);
    return {
      errors: null,
      validationErrors: null,
      success: true,
    };
  }
};
