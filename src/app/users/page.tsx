import UsersTable from "@/components/UsersTable";

type Props = {
  searchParams: {
    name?: string;
    page?: number;
  };
};

export default async function Page({ searchParams: { name, page } }: Props) {
  return (
    <main>
      <UsersTable name={name} page={page ?? 1} />
    </main>
  );
}
