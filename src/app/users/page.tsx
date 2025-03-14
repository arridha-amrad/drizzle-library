import UsersTable from "@/app/users/UsersTable";
import PaginateButton from "@/components/PaginatedButton";
import SearchForm from "@/components/SearchForm";
import db from "@/drizzle/db";
import { UsersTable as UT } from "@/drizzle/schema";
import { LIMIT_USERS } from "@/variables";
import { ilike, desc, count } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { Suspense } from "react";
import Header from "./Header";
import { CACHE_KEY } from "@/cacheKeys";

export const fetchUsers = unstable_cache(
  async (page?: number, name?: string) => {
    const filters = name ? ilike(UT.name, `%${name}%`) : undefined;
    const u = await db
      .select()
      .from(UT)
      .where(filters)
      .orderBy(desc(UT.createdAt))
      .limit(LIMIT_USERS)
      .offset((Number(page) - 1) * LIMIT_USERS);

    const sum = await db
      .select({ count: count() })
      .from(UT)
      .where(filters)
      .then((res) => res[0].count);

    return {
      users: u,
      total: sum,
    };
  },
  [CACHE_KEY.users],
  { tags: [CACHE_KEY.users] }
);

type Props = {
  searchParams: Promise<{
    name?: string;
    page?: number;
  }>;
};

export default async function Page({ searchParams }: Props) {
  let { name, page } = await searchParams;
  page = isNaN(Number(page)) ? 1 : Number(page);
  const { total, users: data } = await fetchUsers(page, name);

  return (
    <main className="xl:p-8 p-4 min-h-screen flex flex-col">
      <div className="flex items-center justify-between">
        <Header />
        <Suspense>
          <SearchForm />
        </Suspense>
      </div>
      <div className="flex-1 py-4">
        <UsersTable users={data} page={page} />
      </div>
      <section className="w-full flex justify-center py-4">
        {total > 8 && (
          <div className="join">
            {new Array(Math.ceil(total / LIMIT_USERS)).fill("").map((_, i) => (
              <PaginateButton key={i} number={i + 1} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
