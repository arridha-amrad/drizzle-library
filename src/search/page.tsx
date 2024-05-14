// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// export default function Page() {
//   const data = cookies().get("users-search-page")?.value;

//   if (!data) {
//     redirect("/users/table/1");
//   }

//   const values = JSON.parse(data);

//   console.log({ values });

//   redirect(`/users/search/${values.name}/${values.page}`);
// }
