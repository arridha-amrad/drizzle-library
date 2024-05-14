import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { name: string } }) {
  redirect(`/users/search/${params.name}/1`);
}
