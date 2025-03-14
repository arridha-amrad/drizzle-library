import BooksTable from "@/app/books/BooksTable/BooksTable";

import SearchBookForm from "@/app/books/SearchForm";
import PaginateButton from "@/components/PaginatedButton";
import { BooksTable as BT } from "@/drizzle/schema";
import { LIMIT_BOOKS } from "@/variables";
import { and, arrayContains, asc, count, desc, ilike } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import FilterBooks from "./FilterBooks";
import Header from "./Header";
import db from "@/drizzle/db";

export const getBooks = unstable_cache(
  async (
    page?: number,
    author?: string,
    title?: string,
    categories?: string[]
  ) => {
    const filters = and(
      author && author !== "null" ? ilike(BT.author, `%${author}%`) : undefined,
      title && title !== "null" ? ilike(BT.title, `%${title}%`) : undefined,
      categories && categories.length > 0
        ? arrayContains(BT.categories, categories)
        : undefined
    );
    try {
      const books = await db
        .select()
        .from(BT)
        .where(filters)
        .orderBy(desc(BT.title))
        .limit(LIMIT_BOOKS)
        .offset(page ? (page - 1) * LIMIT_BOOKS : 0);

      const total = await db
        .select({ count: count() })
        .from(BT)
        .where(filters)
        .then((res) => res[0]?.count || 0);

      return { books, total };
    } catch (err: any) {
      console.log(err);

      throw new Error("Failed to fetch books : ", err.message);
    }
  },
  ["books"],
  {
    tags: ["books"],
  }
);

type Params = {
  title?: string;
  page?: number;
  categories?: string;
  author?: string;
};

type Props = {
  searchParams: Promise<Params>;
};

export default async function Page({ searchParams }: Props) {
  const { author, categories, page, title } = await searchParams;
  const bc = categories ? categories.split(",").map((v) => v.trim()) : [];
  const { books, total } = await getBooks(page, author, title, bc);

  return (
    <section className="xl:p-8 p-4 min-h-screen flex flex-col">
      <div className="pb-4 flex justify-between">
        <Header />
        <div className="flex items-center gap-3 w-full max-w-sm">
          <FilterBooks />
          <SearchBookForm />
        </div>
      </div>
      <BooksTable books={books} page={page ?? 1} />
      <section className="w-full flex justify-center">
        {total > LIMIT_BOOKS && (
          <div className="join">
            {new Array(Math.ceil(total / LIMIT_BOOKS)).fill("").map((_, i) => (
              <PaginateButton key={i} number={i + 1} />
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
