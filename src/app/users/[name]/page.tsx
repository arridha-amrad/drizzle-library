import FormSearchUser from "@/components/Forms/FormSearchUser";
import TableUsers from "@/components/Tables/TableUsers";
import { Suspense } from "react";
import Header from "../Header";
import { fetchUserByName } from "@/queries/fetchUserByName";

type Props = {
  params: Promise<{ name: string }>;
};

export default async function Page({ params }: Props) {
  const name = (await params).name;
  const { users } = await fetchUserByName(name);
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
