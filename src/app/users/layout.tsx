import RegisterForm from "@/components/RegisterForm";
import SearchForm from "@/components/SearchForm";
import { ReactNode, Suspense } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <main className="px-12 py-4 w-full">
        <div className="w-full flex pb-4 items-center">
          <h1 className="text-neutral-500 font-bold">Register new user</h1>
        </div>
        <section className="w-full">
          <RegisterForm />
        </section>
        <div className="divider"></div>
        <section className="w-full ">
          <div className="flex items-center pb-4 justify-between">
            <h1 className="text-neutral-500 font-bold">Users</h1>
            <SearchForm />
          </div>
          {children}
        </section>
      </main>
    </Suspense>
  );
}
