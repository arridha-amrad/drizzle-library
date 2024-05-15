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
        <div className="px-10 h-[70px] w-full flex items-center justify-between">
          <h1 className="text-neutral-600 font-bold">Books Collection</h1>
          <BookFilterButton />
        </div>
        {children}
        {modal}
      </main>
    </Suspense>
  );
}
