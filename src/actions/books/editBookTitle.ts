"use server";

import { CACHE_KEY } from "@/cacheKeys";
import db from "@/lib/drizzle/db";
import { BooksTable } from "@/lib/drizzle/schema";
import { actionClient, SafeActionError } from "@/lib/safeAction";
import { createSlug } from "@/utils";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { zfd } from "zod-form-data";

export const editBookTitle = actionClient
  .schema(
    zfd.formData({
      title: zfd.text(z.string().min(3, "Title too short")),
    })
  )
  .bindArgsSchemas<[bookId: z.ZodString]>([z.string().uuid()])
  .action(
    async ({ bindArgsParsedInputs: [bookId], parsedInput: { title } }) => {
      try {
        const result = await db
          .update(BooksTable)
          .set({
            title,
            slug: createSlug(title),
          })
          .where(eq(BooksTable.id, bookId))
          .returning();

        if (result.length === 0) {
          throw new SafeActionError("Failed to update the book");
        }

        const book = result[0];

        revalidateTag(CACHE_KEY.books);
        revalidateTag(CACHE_KEY.bookDetail);

        redirect(`/books/${book.slug}`);
      } catch (err) {
        throw err;
      }
    }
  );
