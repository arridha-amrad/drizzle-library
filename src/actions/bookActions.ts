"use server";

import { db } from "@/drizzle/migrate";
import {
  BooksTable,
  CategoriesTable,
  LoanTable,
  users,
} from "@/drizzle/schema";
import { LIMIT_BOOKS } from "@/variables";
import { and, arrayContains, desc, eq, ilike } from "drizzle-orm";
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
  const params = new URLSearchParams({
    isFilter: "true",
    page: "1",
    ...(catStr && { categories: catStr }),
    ...(author && { author: String(author) }),
    ...(title && { title: String(title) }),
  });
  redirect(`/books?${params}`);
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

const getBooks = async ({
  author,
  categories,
  page,
  title,
}: BooksFilterProps) => {
  return db
    .select()
    .from(BooksTable)
    .limit(LIMIT_BOOKS)
    .offset(page ? (page - 1) * LIMIT_BOOKS : 0)
    .where(
      and(
        author && author !== "null"
          ? ilike(BooksTable.author, `%${author}%`)
          : undefined,
        title && title !== "null"
          ? ilike(BooksTable.title, `%${title}%`)
          : undefined,
        categories && categories.length > 0
          ? arrayContains(BooksTable.categories, categories)
          : undefined
      )
    );
};

const getTotal = async ({ author, categories, title }: BooksFilterProps) => {
  return (
    await db
      .select()
      .from(BooksTable)
      .where(
        and(
          author ? ilike(BooksTable.author, `%${author}%`) : undefined,
          title ? ilike(BooksTable.title, `%${title}%`) : undefined,
          categories && categories.length > 0
            ? arrayContains(BooksTable.categories, categories)
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
    const acceptedCategories = props.categories?.filter(
      (val) => val !== "null"
    );
    const myProps = { ...props, categories: acceptedCategories };
    const [total, books] = await Promise.all([
      getTotal(myProps),
      getBooks(myProps),
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

export const loanABook = async (bookId: string, data: FormData) => {
  const userId = data.get("userId") as string;
  const book = await db
    .select()
    .from(BooksTable)
    .where(eq(BooksTable.id, bookId));
  if (!book) return;
  await db.insert(LoanTable).values({ bookId, userId: Number(userId) });
  await db.update(BooksTable).set({
    stocks: {
      total: 3,
      available: book[0].stocks.available - 1,
    },
  });
  revalidateTag("loan_book");
};

export const getBookLoanData = unstable_cache(
  async (bookId: string) => {
    const data = await db
      .select({
        loan: {
          dueAt: LoanTable.dueAt,
          loanAt: LoanTable.createdAt,
        },
        user: {
          name: users.name,
          id: users.id,
        },
        book: {
          title: BooksTable.title,
          id: BooksTable.id,
        },
      })
      .from(LoanTable)
      .where(eq(LoanTable.bookId, bookId))
      .innerJoin(users, eq(users.id, LoanTable.userId))
      .innerJoin(BooksTable, eq(LoanTable.bookId, BooksTable.id))
      .orderBy(desc(LoanTable.createdAt));
    return data;
  },
  ["loan_book"],
  {
    tags: ["loan_book"],
  }
);
