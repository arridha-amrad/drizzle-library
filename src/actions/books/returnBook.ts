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
import { countCharge } from "@/utils";
import { and, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  rating: zfd.text(z.string()),
  review: zfd.text(z.string()),
});

export const returnBook = actionClient
  .schema(schema)
  .bindArgsSchemas<[userId: z.ZodNumber, bookId: z.ZodString]>([
    z.number(),
    z.string().uuid(),
  ])
  .action(
    async ({
      parsedInput: { rating, review },
      bindArgsParsedInputs: [userId, bookId],
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

        const storedLoan = await db
          .select()
          .from(LoansTable)
          .where(
            and(eq(LoansTable.userId, userId), eq(LoansTable.bookId, bookId))
          );

        if (storedLoan.length === 0) {
          throw new SafeActionError("Loan data is not exists");
        }

        const loanData = storedLoan[0];

        const historyData = await db.transaction(async (tx) => {
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

          const history = await tx
            .insert(HistoriesTable)
            .values({
              bookId,
              charge: countCharge(loanData.dueAt),
              loanAt: loanData.createdAt,
              userId,
            })
            .returning();

          await tx
            .delete(LoansTable)
            .where(
              and(eq(LoansTable.bookId, bookId), eq(LoansTable.userId, userId))
            );

          return history;
        });

        revalidateTag(CACHE_KEY.onLoanBooks);
        revalidateTag(CACHE_KEY.histories);
        revalidateTag(CACHE_KEY.historyCharge);

        if (historyData.length !== 0) {
          return historyData[0];
        }
      } catch (err) {
        throw err;
      }
    }
  );
