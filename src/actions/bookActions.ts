"use server";

import { CACHE_KEY } from "@/cacheKeys";
import db from "@/drizzle/db";
import {
  BooksTable,
  HistoriesTable,
  LoansTable,
  ReviewsTable,
} from "@/drizzle/schema";
import { LIMIT_BOOKS } from "@/variables";
import { and, arrayContains, asc, count, eq, ilike } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

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

export const loanABook = async (_: any, data: FormData) => {
  const { bookId, userId } = Object.fromEntries(data.entries());

  const validatedSchema = z
    .object({
      userId: z.string().transform((v) => parseInt(v)),
      bookId: z.string(),
    })
    .safeParse({ bookId, userId });

  if (!validatedSchema.success) {
    return {
      validationErrors: validatedSchema.error.formErrors.fieldErrors,
    };
  }

  const validBookId = validatedSchema.data.bookId;
  const validUserId = validatedSchema.data.userId;

  // The maximum number of books a user can borrow is 4
  const userTotalLoan = await db
    .select({ count: count() })
    .from(LoansTable)
    .where(eq(LoansTable.userId, validUserId))
    .then((res) => res[0].count);
  if (userTotalLoan >= 4) {
    return {
      actionError: "User has loaned 4 books.",
    };
  }

  // Make sure the book is available
  const book = await db
    .select()
    .from(BooksTable)
    .where(eq(BooksTable.id, validBookId));
  if (book[0].available === 0) {
    return {
      actionError: "un available stock",
    };
  }

  const isLoanedSameBook = await db
    .select()
    .from(LoansTable)
    .where(
      and(
        eq(LoansTable.userId, validUserId),
        eq(LoansTable.bookId, validBookId)
      )
    );
  if (isLoanedSameBook.length > 0) {
    return {
      actionError: "The user has been loaning this book",
    };
  }

  await db.transaction(async (tx) => {
    await tx.insert(LoansTable).values({
      bookId: validBookId,
      userId: validUserId,
    });
    await db
      .update(BooksTable)
      .set({
        available: book[0].available - 1,
      })
      .where(eq(BooksTable.id, book[0].id));
  });

  revalidateTag(CACHE_KEY.books);
  revalidateTag(CACHE_KEY.bookDetail);

  return {
    success: true,
  };
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
      .delete(LoansTable)
      .where(and(eq(LoansTable.bookId, bookId), eq(LoansTable.userId, userId)));

    // update books table stock
    await tx
      .update(BooksTable)
      .set({
        stocks: book[0].stocks,
        available: book[0].available + 1,
      })
      .where(eq(BooksTable.id, bookId));

    await tx.insert(ReviewsTable).values({
      bookId,
      description: comment,
      rating: String(rating),
      userId,
    });

    // insert into loan histories
    await tx.insert(HistoriesTable).values({
      bookId,
      userId,
      loanAt,
      charge,
    });
  });
  revalidatePath("/loan");
  revalidatePath("/histories");
};
