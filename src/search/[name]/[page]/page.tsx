// import { search } from "@/actions";
// import DeleteUserButton from "@/components/DeleteUserBtn";
// import EditUserButton from "@/components/EditUserBtn";
// import PaginateButton from "./PaginateBtn";

// export default async function Page({
//   params,
// }: {
//   params: { name: string; page: string };
// }) {
//   const users = await search(params.name, Number(params.page));
//   if (!users) {
//     return (
//       <div className="flex justify-center w-full py-6">
//         <h1>Record not found</h1>
//       </div>
//     );
//   }
//   return (
//     <>
//       <div className="overflow-x-auto">
//         <table className="table border border-base-100">
//           <thead>
//             <tr>
//               <th className="border-r border-base-100">No.</th>
//               <th className="border-r border-base-100">Id</th>
//               <th className="border-r border-base-100">Name</th>
//               <th className="border-r border-base-100">Email</th>
//               <th className="border-r border-base-100">Joined At</th>
//               <th className="border-r border-base-100">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="border border-base-100">
//             {users?.data?.map((user, i) => (
//               <tr className="hover cursor-pointer" key={user.id}>
//                 <th className="border-r border-base-100">
//                   {i + 1 + (Number(params.page) - 1) * 8}
//                 </th>
//                 <td className="border-r border-base-100">{user.id}</td>
//                 <td className="border-r border-base-100">{user.name}</td>
//                 <td className="border-r border-base-100">{user.email}</td>
//                 <td className="border-r border-base-100">
//                   {new Intl.DateTimeFormat("en-US").format(
//                     new Date(user.createdAt)
//                   )}
//                 </td>
//                 <td className="border-r border-base-100">
//                   <div className="flex items-center gap-2">
//                     <DeleteUserButton id={user.id} />
//                     <EditUserButton user={user} />
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <section className="w-full flex justify-center py-4">
//         <div className="join">
//           {new Array(Math.ceil(users.total / 8)).fill("").map((_, i) => (
//             <PaginateButton search={params.name} number={i + 1} key={i} />
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }
