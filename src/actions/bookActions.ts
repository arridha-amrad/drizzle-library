"use server";

import { db } from "@/drizzle/migrate";
import { BooksTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidateTag, unstable_cache } from "next/cache";

export const fetchCategories = async () => {
  const result = await db
    .selectDistinct({
      categories: BooksTable.categories,
    })
    .from(BooksTable);

  return result;
};

export const storeBooks = async (data: FormData) => {
  const values = Object.fromEntries(data.entries());
  const { title, categories, author } = values;

  if (!title || !categories || !author) return;

  await db.insert(BooksTable).values({
    author: String(author),
    categories: String(categories)
      .split(",")
      .map((text) => text.trim()),
    title: String(title),
  });

  revalidateTag("books");
};

const getBooks = async () => {
  return db.select().from(BooksTable);
};

const getTotal = async () => {
  return (await db.select().from(BooksTable)).length;
};

export const fetchBooks = unstable_cache(
  async () => {
    const [total, books] = await Promise.all([getTotal(), getBooks()]);
    console.log({ total, books });

    return { total, books };
  },
  ["books"],
  { tags: ["books"] }
);

export const deleteBooks = async (id: string) => {
  await db.delete(BooksTable).where(eq(BooksTable.id, id));
  revalidateTag("books");
};
