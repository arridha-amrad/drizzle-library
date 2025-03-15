import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "All Books",
  description: "All books of Drizzle Library",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <main className="w-full">{children}</main>;
}
