"use server";

import { CACHE_KEY } from "@/cacheKeys";
import db from "@/drizzle/db";
import { BooksTable } from "@/drizzle/schema";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const schema = z.object({
  author: z.string().min(1, "required"),
  stocks: z
    .string()
    .min(1, "required")
    .transform((v) => Number(v)),
  categories: z
    .string()
    .min(1, "required")
    .transform((v) => v.split(",").map((c) => c.trim())),
  title: z.string().min(1, "required"),
});

export const addNewBook = async (_: any, data: FormData) => {
  const { author, categories, stocks, title } = Object.fromEntries(
    data.entries()
  );

  const validated = schema.safeParse({
    author,
    categories,
    stocks,
    title,
  });

  if (!validated.success) {
    return {
      validationErrors: validated.error.formErrors.fieldErrors,
    };
  }

  const { author: a, categories: c, stocks: s, title: t } = validated.data;
  const result = await db
    .insert(BooksTable)
    .values({
      author: a,
      available: s,
      categories: c,
      stocks: s,
      title: t,
    })
    .returning();

  revalidateTag(CACHE_KEY.books);

  if (result.length === 0) {
    return {
      actionError: `Failed to insert`,
    };
  } else {
    return {
      success: true,
    };
  }
};
