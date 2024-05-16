"use server";

import { db } from "@/drizzle/migrate";
import { BooksTable, CategoriesTable } from "@/drizzle/schema";
import { LIMIT_BOOKS } from "@/variables";
import { and, arrayContains, eq, ilike } from "drizzle-orm";
import { revalidateTag, unstable_cache } from "next/cache";
import { redirect } from "next/navigation";

export const fetchCategories = unstable_cache(
  async () => {
    return db.select().from(CategoriesTable);
  },
  ["categories"],
  { tags: ["categories"] }
);

export const searchBooks = async (data: FormData) => {
  const { title, author } = Object.fromEntries(data.entries());
  const cat = data.getAll("categories") as string[];
  const catStr = cat
    .map((val) => {
      val.trim();
      if (val.includes("#")) {
        return val.replace("#", "%23");
      }
      return val;
    })
    .join(",");
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
      categories: arrCategories.map((text) => text.trim().toLowerCase()),
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
  revalidateTag("categories");
};

const getBooks = async (props: BooksFilterProps) => {
  const acceptedCategories = props.categories?.filter((val) => val !== "null");
  return db
    .select()
    .from(BooksTable)
    .limit(LIMIT_BOOKS)
    .offset(props.page ? (props.page - 1) * LIMIT_BOOKS : 0)
    .where(
      and(
        props.author && props.author !== "null"
          ? ilike(BooksTable.author, `%${props.author}%`)
          : undefined,
        props.title && props.title !== "null"
          ? ilike(BooksTable.title, `%${props.title}%`)
          : undefined,
        acceptedCategories && acceptedCategories.length > 0
          ? arrayContains(BooksTable.categories, acceptedCategories)
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

export const fetchBooks = unstable_cache(
  async (props: BooksFilterProps) => {
    const [total, books] = await Promise.all([
      getTotal(props),
      getBooks(props),
    ]);
    return { total, books };
  },
  ["books"],
  { tags: ["books"] }
);

export const deleteBooks = async (id: string) => {
  await db.delete(BooksTable).where(eq(BooksTable.id, id));
  revalidateTag("books");
};
