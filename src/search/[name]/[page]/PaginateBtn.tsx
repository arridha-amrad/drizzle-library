// "use client";

// import { setUserSearchPageCookie } from "@/actions";
// import { usePathname, useRouter } from "next/navigation";

// export default function PaginateButton({
//   number,
//   search,
// }: {
//   number: number;
//   search: string;
// }) {
//   const pathname = usePathname();
//   const page = pathname.split("/").pop();
//   const router = useRouter();
//   const action = () => {
//     setUserSearchPageCookie(number, search);
//     router.push(`/users/search/${search}/${number}`);
//   };
//   return (
//     <button
//       onClick={action}
//       className={`join-item btn btn-md  ${
//         Number(page) === number ? "btn-active" : ""
//       }`}
//     >
//       {number}
//     </button>
//   );
// }
