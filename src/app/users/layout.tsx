import SearchForm from "@/components/SearchForm";
import { ReactNode, Suspense } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <main className="px-12 py-4 w-full">
        <section className="w-full ">
          <div className="pb-4">
            <SearchForm />
          </div>
          {children}
        </section>
      </main>
    </Suspense>
  );
}
