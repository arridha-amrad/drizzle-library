import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "All Users",
  description: "All users of Drizzle Library",
};

export default async function Layout({ children }: { children: ReactNode }) {
  return <main className="xl:px-8 md:px-4 w-full">{children}</main>;
}
