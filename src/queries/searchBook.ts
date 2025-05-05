import { LIMIT_BOOKS } from "@/constants";
import db from "@/lib/drizzle/db";
import { BooksTable } from "@/lib/drizzle/schema";
import { eq, arrayContains, ilike, and, count } from "drizzle-orm";

type Params = {
  page?: number;
  title?: string;
  author?: string;
  categories?: string;
};

export const searchBook = async ({
  author,
  categories,
  page,
  title,
}: Params) => {
  const condition = [];

  if (author) {
    condition.push(ilike(BooksTable.author, `%${author}%`));
  }

  if (categories) {
    const bookCategories = categories
      .trim()
      .split(",")
      .map((v) => v.trim());

    condition.push(arrayContains(BooksTable.categories, bookCategories));
  }

  if (title) {
    condition.push(ilike(BooksTable.title, `%${title}%`));
  }

  const books = await db
    .select()
    .from(BooksTable)
    .where(and(...condition))
    .limit(LIMIT_BOOKS)
    .offset(page ? (Number(page) - 1) * LIMIT_BOOKS : 0);

  const total = await db
    .select({ total: count() })
    .from(BooksTable)
    .where(and(...condition))
    .then((res) => res[0].total);

  return {
    books,
    total,
  };
};
