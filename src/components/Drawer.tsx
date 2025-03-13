import Link from "next/link";
import { ReactNode } from "react";
import SidebarUsersButton from "./Sidebar/UsersBtn";
import SidebarBooksButton from "./Sidebar/BooksBtn";
import HistoriesButton from "./Sidebar/HistoriesBtn";
import SidebarLoanBooksButton from "./Sidebar/LoanBtn";
import Navbar from "./Navbar";

type Props = {
  children: ReactNode;
};

export default function Drawer({ children }: Props) {
  return (
    <div className="drawer xl:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Navbar />
        {children}
      </div>
      <div className="drawer-side ">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu w-72 min-h-full bg-base-200 text-base-content">
          <li className="w-full ">
            <div className="flex h-[6rem]">
              <Link href="/" className="font-bold text-xl w-full">
                Drizzle Library
              </Link>
            </div>
          </li>
          <div className="divider divider-start text-neutral-600">Links</div>
          <li>
            <SidebarUsersButton />
          </li>
          <li className="mt-2">
            <SidebarBooksButton />
          </li>
          <li className="mt-2">
            <SidebarLoanBooksButton />
          </li>
          <li className="mt-2">
            <HistoriesButton />
          </li>
          <div className="divider divider-start text-neutral-600">Actions</div>
          <li>
            <Link href="/add-user" scroll={false}>
              Add User
            </Link>
          </li>
          <li className="mt-2">
            <Link href="/add-book" scroll={false}>
              Add Book
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
