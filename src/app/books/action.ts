"use server";

import { CACHE_KEY } from "@/cacheKeys";
import db from "@/lib/drizzle/db";
import { BooksTable } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

export const deleteBook = async (id: string) => {
  await db.delete(BooksTable).where(eq(BooksTable.id, id));
  revalidatePath("/books");
};

export const updateBookTitle = async (_: any, data: FormData, id: string) => {
  const validationResult = z
    .object({
      title: z.string().min(5),
    })
    .safeParse({
      title: data.get("title"),
    });
  if (!validationResult.success) {
    return {
      validationErrors: validationResult.error.formErrors.fieldErrors,
    };
  }
  const validData = validationResult.data;
  const result = await db
    .update(BooksTable)
    .set({ title: validData.title })
    .where(eq(BooksTable.id, id));

  if (result.rowCount && result.rowCount > 0) {
    revalidateTag(CACHE_KEY.books);
    revalidateTag(CACHE_KEY.bookDetail);
    return {
      success: true,
    };
  }
  return {
    actionError: "Something went wrong",
  };
};
