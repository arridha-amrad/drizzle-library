"use server";

import { db } from "@/drizzle/migrate";
import {
  BooksTable,
  CategoriesTable,
  BooksToCategoriesTable,
} from "@/drizzle/schema";
import {
  and,
  arrayContained,
  arrayContains,
  arrayOverlaps,
  eq,
  ilike,
  inArray,
} from "drizzle-orm";
import { revalidateTag, unstable_cache } from "next/cache";

export const storeBooks = async (data: FormData) => {
  const values = Object.fromEntries(data.entries());
  const { title, categories, author } = values;

  const arrCategories = String(categories).split(",");

  if (!title || !categories || !author) return;

  await db
    .insert(BooksTable)
    .values({
      author: String(author),
      categories: arrCategories.map((text) => text.trim()),
      title: String(title),
    })
    .returning({ id: BooksTable.id });

  await db
    .insert(CategoriesTable)
    .values(arrCategories.map((val) => ({ name: val.toLowerCase() })))
    .onConflictDoNothing({})
    .returning({
      id: CategoriesTable.id,
    });

  revalidateTag("books");
};

const getBooks = async () => {
  return db
    .select()
    .from(BooksTable)
    .where(
      and(
        ilike(BooksTable.author, `%arridha amrad%`),
        ilike(BooksTable.title, `%typescript%`),
        arrayContains(BooksTable.categories, ["programming"])
      )
    );
};

const getTotal = async () => {
  return (await db.select().from(BooksTable)).length;
};

export const fetchBooks = async () => {
  const [total, books] = await Promise.all([getTotal(), getBooks()]);
  console.log(books);

  return { total, books };
};

export const deleteBooks = async (id: string) => {
  await db.delete(BooksTable).where(eq(BooksTable.id, id));
  revalidateTag("books");
};
