import BookFilterButton from "@/components/BooksFilterButton";
import { ReactNode, Suspense } from "react";

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
