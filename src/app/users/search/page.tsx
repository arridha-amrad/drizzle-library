import FormSearchUser from "@/components/Forms/FormSearchUser";
import TableUsers from "@/components/Tables/TableUsers";
import { Suspense } from "react";
import Header from "../Header";
import { SearchParams } from "@/types";
import { searchUser } from "@/queries/searchUser";

type Props = {
  searchParams: SearchParams;
};

export default async function Page({ searchParams }: Props) {
  const name = (await searchParams).query;

  const users = typeof name === "string" ? await searchUser(name) : [];

  return (
    <main className="xl:p-8 p-4 min-h-screen flex flex-col">
      <div className="flex items-center justify-between">
        <Header />
        <Suspense>
          <FormSearchUser />
        </Suspense>
      </div>
      <div className="flex-1 py-4">
        <TableUsers users={users} page={1} />
      </div>
    </main>
  );
}
