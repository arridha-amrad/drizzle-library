"use server";

import { db } from "@/drizzle/migrate";
import { BooksTable, CategoriesTable } from "@/drizzle/schema";
import { and, arrayContains, eq, ilike } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const fetchCategories = async () => {
  return db.select().from(CategoriesTable);
};

export const searchBooks = async (data: FormData) => {
  const { title, author } = Object.fromEntries(data.entries());
  const cat = data.getAll("categories") as string[];
  const catStr = cat.map((val) => val.trim()).join(",");
  redirect(
    `/books?isFilter=true&categories=${catStr}&author=${author}&page=1&title=${title}`
  );
};

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

const getBooks = async (props: BooksFilterProps) => {
  return db
    .select()
    .from(BooksTable)
    .where(
      and(
        props.author
          ? ilike(BooksTable.author, `%${props.author}%`)
          : undefined,
        props.title ? ilike(BooksTable.title, `%${props.title}%`) : undefined,
        props.categories && props.categories.length > 0
          ? arrayContains(BooksTable.categories, props.categories)
          : undefined
      )
    );
};

const getTotal = async (props: BooksFilterProps) => {
  return (
    await db
      .select()
      .from(BooksTable)
      .where(
        and(
          props.author
            ? ilike(BooksTable.author, `%${props.author}%`)
            : undefined,
          props.title ? ilike(BooksTable.title, `%${props.title}%`) : undefined,
          props.categories && props.categories.length > 0
            ? arrayContains(BooksTable.categories, props.categories)
            : undefined
        )
      )
  ).length;
};

export type BooksFilterProps = Partial<
  Omit<typeof BooksTable.$inferSelect, "id"> & { page: number }
>;

export const fetchBooks = async (props: BooksFilterProps) => {
  const [total, books] = await Promise.all([getTotal(props), getBooks(props)]);

  return { total, books };
};

export const deleteBooks = async (id: string) => {
  await db.delete(BooksTable).where(eq(BooksTable.id, id));
  revalidateTag("books");
};
