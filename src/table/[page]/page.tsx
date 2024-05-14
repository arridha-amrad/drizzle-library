// import { fetchUsers } from "@/actions";
// import UsersTable from "@/components/UsersTable";
// import PaginateButton from "./PaginateBtn";
// import { redirect } from "next/navigation";

// export default async function Page({ params }: { params: { page: number } }) {
//   if (params.page <= 0) {
//     redirect("/users/table/1");
//   }
//   const data = await fetchUsers(params.page + 1);
//   return (
//     <>
//       <UsersTable page={params.page} />
//       <section className="w-full flex justify-center py-4">
//         <div className="join">
//           {new Array(Math.ceil(data.total / 5)).fill("").map((_, i) => (
//             <PaginateButton number={i + 1} key={i} />
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }
