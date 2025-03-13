import BooksTable from "@/components/BooksTable/BooksTable";

import SearchBookForm from "@/components/BooksTable/SearchForm";
import PaginateButton from "@/components/PaginatedButton";
import { LIMIT_BOOKS } from "@/variables";
import FilterBooks from "./FilterBooks/FilterBooks";
import Header from "./Header";
import { db } from "@/drizzle/migrate";
import { and, ilike, arrayContains, asc, count } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { BooksTable as BT } from "@/drizzle/schema";

export const getBooks = unstable_cache(
  async (
    page?: number,
    author?: string,
    title?: string,
    categories?: string[]
  ) => {
    console.log("categories : ", categories);

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
        .orderBy(asc(BT.title))
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
