import FormSearchUser from "@/components/Forms/FormSearchUser";
import TableUserLoanBooks from "@/components/Tables/TableUserLoanBooks";
import TableUsers from "@/components/Tables/TableUsers";
import { fetchUserById } from "@/queries/fetchUserByName";
import { fetchUserLoanBooks } from "@/queries/fetchUserLoanBooks";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const id = (await params).id;

  const { users } = await fetchUserById(Number(id));
  const books = await fetchUserLoanBooks(Number(id));

  if (users.length == 0) {
    notFound();
  }

  return (
    <main className="xl:px-8 xl:py-2 p-4 min-h-screen flex flex-col">
      <div className="flex h-20 items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User</h1>
        </div>
        <Suspense>
          <FormSearchUser />
        </Suspense>
      </div>
      <div className="breadcrumbs text-sm">
        <ul>
          <li>Users</li>
          <li>{users[0].name}</li>
        </ul>
      </div>
      <TableUsers users={users} page={1} />

      <div className="mt-8 mb-4">
        <h1 className="text-sm text-white/50">Borrowed&apos;s Books</h1>
      </div>
      <TableUserLoanBooks books={books} />
    </main>
  );
}
