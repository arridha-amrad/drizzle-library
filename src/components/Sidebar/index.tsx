import Link from "next/link";
import SidebarUsersButton from "./UsersBtn";
import SidebarBooksButton from "./BooksBtn";
import SidebarLoanBooksButton from "./LoanBtn";
import HistoriesButton from "./HistoriesBtn";

export default async function Sidebar() {
  return (
    <aside className="w-[250px] border-r border-neutral-700">
      <div className="w-full h-[70px] flex items-center justify-center">
        <Link href="/" className="font-bold text-xl text-primary">
          Drizzle Library
        </Link>
      </div>
      <div>
        <h3 className="font-bold px-2 text-neutral-600 text-sm">Links</h3>
        <SidebarUsersButton />
        <SidebarBooksButton />
        <SidebarLoanBooksButton />
        <HistoriesButton />
      </div>
    </aside>
  );
}
