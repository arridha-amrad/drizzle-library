import UsersTable from "@/app/users/UsersTable";
import PaginateButton from "@/components/PaginatedButton";
import { LIMIT_USERS } from "@/variables";
import { Suspense } from "react";
import Header from "./Header";
import { fetchUsers } from "./query";
import SearchForm from "./SarchForm";

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
        {total > 10 && (
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
