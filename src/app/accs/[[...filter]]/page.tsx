export default async function Page({
  params,
}: {
  params: { name: string; page: number };
}) {
  return (
    <div>
      <h1>{JSON.stringify(params)}</h1>
    </div>
  );
}
