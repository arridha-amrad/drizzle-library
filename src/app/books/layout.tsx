import BookFilterButton from "@/components/BooksFilterButton";
import { ReactNode } from "react";

export default async function Layout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <main>
      <div className="h-[70px] px-10 w-full flex items-center justify-between">
        <h1 className="text-neutral-600 font-bold">Books Collection</h1>
        <div>
          <BookFilterButton />
        </div>
      </div>
      {children}
      {modal}
    </main>
  );
}
