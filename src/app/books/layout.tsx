import { Metadata } from "next";
import { ReactNode, Suspense } from "react";

export const metadata: Metadata = {
  title: "All Books",
  description: "All books of Drizzle Library",
};

export default async function Layout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <Suspense>
      <main className="w-full">
        {children}
        {modal}
      </main>
    </Suspense>
  );
}
