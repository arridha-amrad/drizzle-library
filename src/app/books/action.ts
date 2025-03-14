"use server";

import db from "@/drizzle/db";
import { BooksTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteBook = async (id: string) => {
  await db.delete(BooksTable).where(eq(BooksTable.id, id));
  revalidatePath("/books");
};
