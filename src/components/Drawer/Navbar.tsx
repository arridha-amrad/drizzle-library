"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar flex md:px-8 xl:hidden bg-base-300">
      <div className="flex-1">
        <label htmlFor="my-drawer" className="btn drawer-button">
          Menu
        </label>
      </div>
      <div className="">
        <Link href="/" className="md:text-xl text-base">
          Drizzle Library
        </Link>
      </div>
    </div>
  );
}
