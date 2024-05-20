"use client";

import Link from "next/link";
import SidebarBooksButton from "./Sidebar/BooksBtn";
import HistoriesButton from "./Sidebar/HistoriesBtn";
import SidebarLoanBooksButton from "./Sidebar/LoanBtn";
import SidebarUsersButton from "./Sidebar/UsersBtn";

export default function Navbar() {
  return (
    <div className="navbar flex md:px-8 xl:hidden bg-base-300">
      <div className="flex-1">
        <Link href="/" className="md:text-xl text-base">
          Drizzle Library
        </Link>
      </div>
      <div className="md:space-x-6 space-x-3">
        <SidebarBooksButton />
        <SidebarUsersButton />
        <SidebarLoanBooksButton />
        <HistoriesButton />
      </div>
      <div className="flex-none dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content shadow-xl z-[1] menu p-2 bg-base-100 rounded-box w-52"
        >
          <li>
            <a>Add Book</a>
          </li>
          <li>
            <a>Filter Book</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
