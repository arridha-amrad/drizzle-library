import UsersTable from "@/app/users/UsersTable";
import PaginateButton from "@/components/PaginatedButton";
import SearchForm from "@/components/SearchForm";
import db from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { LIMIT_USERS } from "@/variables";
import { ilike, desc, count } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { Suspense } from "react";
import Header from "./Header";

export const fetchUsers = unstable_cache(
  async (page?: number, name?: string) => {
    const filters = name ? ilike(users.name, `%${name}%`) : undefined;
    const u = await db
      .select()
      .from(users)
      .where(filters)
      .orderBy(desc(users.createdAt))
      .limit(LIMIT_USERS)
      .offset((Number(page) - 1) * LIMIT_USERS);

    const sum = await db
      .select({ count: count() })
      .from(users)
      .where(filters)
      .then((res) => res[0].count);

    return {
      users: u,
      total: sum,
    };
  },
  ["users"],
  { tags: ["users"] }
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
