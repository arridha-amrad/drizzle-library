import FormSearchUser from "@/components/Forms/FormSearchUser";
import PaginateButton from "@/components/PaginatedButton";
import TableUsers from "@/components/Tables/TableUsers";
import { LIMIT_USERS } from "@/constants";
import { fetchUsers } from "@/queries/fetchUsers";
import { SearchParams } from "@/types";
import { Suspense } from "react";
import Header from "./Header";

type Props = {
  searchParams: SearchParams;
};

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;

  let page = searchParams.page;

  const intPage = isNaN(Number(page)) ? 1 : Number(page);

  const { total, users: data } = await fetchUsers(intPage);

  return (
    <main className="xl:p-8 p-4 min-h-screen flex flex-col">
      <div className="flex items-center justify-between">
        <Header />
        <Suspense>
          <FormSearchUser />
        </Suspense>
      </div>
      <div className="flex-1 py-4">
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
