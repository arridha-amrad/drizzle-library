import UsersTable from "@/components/UsersTable";

type Props = {
  searchParams: Promise<{
    name?: string;
    page?: number;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const { name, page } = await searchParams;
  return (
    <main>
      <UsersTable name={name} page={page ?? 1} />
    </main>
  );
}
