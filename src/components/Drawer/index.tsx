import Link from "next/link";
import { ReactNode } from "react";

import Navbar from "./Navbar";
import DrawerLink from "./DrawerLink";

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
          <li className="w-full">
            <div className="flex h-20">
              <Link href="/" className="font-bold text-xl w-full">
                Drizzle Library
              </Link>
            </div>
          </li>
          <div className="divider divider-start text-neutral-600">Links</div>
          <li>
            <DrawerLink url="/users" name="Users" />
          </li>
          <li className="mt-2">
            <DrawerLink url="/books" name="Books" />
          </li>
          <li className="mt-2">
            <DrawerLink url="/loans" name="Loans" />
          </li>
          <li className="mt-2">
            <DrawerLink url="/histories" name="Histories" />
          </li>
          <div className="divider divider-start text-neutral-600">Actions</div>
          <li>
            <DrawerLink url="/add-user" name="Add User" />
          </li>
          <li className="mt-2">
            <DrawerLink url="/add-book" name="Add Book" />
          </li>
        </ul>
      </div>
    </div>
  );
}
