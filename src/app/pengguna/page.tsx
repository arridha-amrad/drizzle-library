type Props = {
  searchParams: {
    name?: string;
    page?: number;
  };
};

export default function Pengguna({ searchParams }: Props) {
  return (
    <main>
      <div>{JSON.stringify(searchParams)}</div>
    </main>
  );
}
