import FormSearchUser from "@/components/Forms/FormSearchUser";
import PaginateButton from "@/components/PaginatedButton";
import TableUsers from "@/components/Tables/TableUsers";
import { LIMIT_USERS } from "@/constants";
import { fetchUsers } from "@/queries/fetchUsers";
import { SearchParams } from "@/types";
import { Suspense } from "react";

type Props = {
  searchParams: SearchParams;
};

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;

  let page = searchParams.page;

  const intPage = isNaN(Number(page)) ? 1 : Number(page);

  const { total, users: data } = await fetchUsers(intPage);

  return (
    <main className="xl:px-8 xl:py-2 p-4  min-h-screen flex flex-col">
      <div className="flex h-20 items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">User</h1>
        <Suspense>
          <FormSearchUser />
        </Suspense>
      </div>
      <div className="flex-1">
        <TableUsers users={data} page={intPage} />
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
