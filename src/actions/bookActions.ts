"use server";

import db from "@/drizzle/db";
import {
  BooksRatingTable,
  BooksTable,
  CategoriesTable,
  CommentTable,
  LoanHistoriesTable,
  LoanTable,
  users,
} from "@/drizzle/schema";
import { LIMIT_BOOKS } from "@/variables";
import { and, arrayContains, asc, desc, eq, ilike } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const fetchCategories = async () => {
  return db.select().from(CategoriesTable);
};

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
  await db.transaction(async (tx) => {
    await tx.insert(BooksTable).values({
      author: String(author),
      categories: arrCategories.map((text) => text.trim().toLowerCase()),
      title: String(title),
    });
    await tx
      .insert(CategoriesTable)
      .values(arrCategories.map((val) => ({ name: val.toLowerCase() })))
      .onConflictDoNothing({});
  });
  revalidateTag("books");
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
    )
    .orderBy(asc(BooksTable.title));
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

export const fetchBooks = async (props: BooksFilterProps) => {
  const acceptedCategories = props.categories?.filter((val) => val !== "null");
  const myProps = { ...props, categories: acceptedCategories };
  const [total, books] = await Promise.all([
    getTotal(myProps),
    getBooks(myProps),
  ]);
  return { total, books };
};

export const deleteBook = async (id: string) => {
  await db.delete(BooksTable).where(eq(BooksTable.id, id));
  revalidatePath("/books");
};

export const loanABook = async (bookId: string, data: FormData) => {
  const userId = data.get("userId") as string;
  const userTotalLoan = await db
    .select()
    .from(LoanTable)
    .where(eq(LoanTable.userId, Number(userId)));

  if (userTotalLoan.length >= 4) {
    return {
      error: "User has loaned 4 books.",
    };
  }

  const book = await db
    .select()
    .from(BooksTable)
    .where(eq(BooksTable.id, bookId));

  if (book[0].stocks.available === 0) {
    return {
      error: "un available stock",
    };
  }

  const isLoanedSameBook = await db
    .select()
    .from(LoanTable)
    .where(
      and(eq(LoanTable.userId, Number(userId)), eq(LoanTable.bookId, bookId))
    );

  if (isLoanedSameBook.length > 0) {
    return {
      error: "The user has been loaning this book",
    };
  }

  try {
    await db.transaction(async (tx) => {
      await tx.insert(LoanTable).values({ bookId, userId: Number(userId) });
      await db
        .update(BooksTable)
        .set({
          stocks: {
            total: 3,
            available: book[0].stocks.available - 1,
          },
        })
        .where(eq(BooksTable.id, book[0].id));
    });
    revalidatePath(`/books/${bookId}`);
    revalidatePath(`/books`);
    revalidatePath("/loan");
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getBookLoanData = async (bookId: string) => {
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
};

export const getBookDetail = async (bookId: string) => {
  const book = await db
    .select()
    .from(BooksTable)
    .where(eq(BooksTable.id, bookId));
  return book;
};

export const returnBookAction = async (data: FormData) => {
  const loanAt = new Date(data.get("loanAt") as string);
  const charge = parseInt(data.get("charge") as string);
  const userId = parseInt(data.get("userId") as string);
  const bookId = data.get("bookId") as string;
  const comment = String(data.get("comment"));
  const rating = parseFloat(data.get("rating") as string);

  const book = await db
    .select()
    .from(BooksTable)
    .where(eq(BooksTable.id, bookId));

  await db.transaction(async (tx) => {
    // delete from loan table
    await tx
      .delete(LoanTable)
      .where(and(eq(LoanTable.bookId, bookId), eq(LoanTable.userId, userId)));

    // update books table stock
    await tx
      .update(BooksTable)
      .set({
        stocks: {
          total: book[0].stocks.total,
          available: (book[0].stocks.available += 1),
        },
      })
      .where(eq(BooksTable.id, bookId));

    // insert into comment table
    const commentResult = await db
      .insert(CommentTable)
      .values({ content: comment })
      .returning({
        commentId: CommentTable.id,
      });

    // insert into book rating table
    await tx.insert(BooksRatingTable).values({
      bookId,
      value: rating,
      userId,
      commentId: commentResult[0].commentId,
    });

    // insert into loan histories
    await tx.insert(LoanHistoriesTable).values({
      bookId,
      userId,
      loanAt,
      returnAt: new Date(),
      charge,
    });
  });
  revalidatePath("/loan");
  revalidatePath("/histories");
};
