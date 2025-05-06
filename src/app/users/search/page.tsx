import FormSearchUser from "@/components/Forms/FormSearchUser";
import TableUsers from "@/components/Tables/TableUsers";
import { Suspense } from "react";
import { SearchParams } from "@/types";
import { searchUser } from "@/queries/searchUser";

type Props = {
  searchParams: SearchParams;
};

export default async function Page({ searchParams }: Props) {
  const name = (await searchParams).query;

  const users =
    typeof name === "string" ? await searchUser(decodeURIComponent(name)) : [];

  return (
    <main className="xl:px-8 xl:py-2 p-4  min-h-screen flex flex-col">
      <div className="flex h-20 items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight">Search User</h1>
        <Suspense>
          <FormSearchUser />
        </Suspense>
      </div>
      <div className="breadcrumbs text-sm">
        <ul>
          <li>Users</li>
          <li>Search</li>
          <li>{name}</li>
        </ul>
      </div>
      <div className="flex-1">
        <TableUsers users={users} page={1} />
      </div>
    </main>
  );
}
