"use server";

import { CACHE_KEY } from "@/cacheKeys";
import db from "@/lib/drizzle/db";
import { BooksTable } from "@/lib/drizzle/schema";
import { actionClient, SafeActionError } from "@/lib/safeAction";
import { revalidateTag } from "next/cache";
import slugify from "slugify";
import { z } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  author: zfd.text(z.string().min(1, "required")),
  stocks: zfd.numeric(),
  categories: zfd.text(
    z
      .string()
      .min(1, "required")
      .transform((v) => v.split(",").map((c) => c.trim()))
  ),
  title: zfd.text(z.string().min(1, "required")),
});

export const createBook = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { author, categories, stocks, title } }) => {
    try {
      const result = await db
        .insert(BooksTable)
        .values({
          author,
          available: stocks,
          categories,
          stocks,
          title,
          slug: slugify(title, { lower: true }),
        })
        .returning();

      if (result.length === 0) {
        throw new SafeActionError("Failed to create book");
      }

      revalidateTag(CACHE_KEY.books);

      return result[0];
    } catch (err) {
      throw err;
    }
  });
