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

export const editBook = actionClient
  .schema(
    zfd.formData({
      title: zfd.text(z.string()),
      author: zfd.text(z.string()),
      categories: zfd.text(
        z
          .string()
          .min(1, "required")
          .transform(async (v) => v.split(",").map((c) => c.trim()))
      ),
      stocks: zfd.numeric(),
      available: zfd.numeric(),
    })
  )
  .bindArgsSchemas<[id: z.ZodString]>([z.string().uuid()])
  .action(
    async ({
      bindArgsParsedInputs: [id],
      parsedInput: { title, author, available, categories, stocks },
    }) => {
      try {
        const storedBook = await db
          .select()
          .from(BooksTable)
          .where(eq(BooksTable.id, id));

        if (storedBook.length === 0) {
          throw new SafeActionError("Book not found");
        }

        const result = await db
          .update(BooksTable)
          .set({
            slug: createSlug(title),
            author,
            available,
            categories,
            stocks,
            title,
          })
          .where(eq(BooksTable.id, id))
          .returning();

        if (result.length === 0) {
          throw new SafeActionError("Failed to perform edit book");
        }

        const updatedBook = result[0];
        revalidateTag(CACHE_KEY.books);
        revalidateTag(CACHE_KEY.bookDetail);
        revalidateTag(CACHE_KEY.loanBook);

        redirect(`/books/${updatedBook.slug}`);
      } catch (err) {
        throw err;
      }
    }
  );
