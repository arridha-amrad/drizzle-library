import PaginateButton from "@/components/PaginatedButton";
import { LIMIT_BOOKS } from "@/variables";
import { Metadata } from "next";
import Header from "./Header";
import { fetchHistories, sumCharge } from "./query";
import Table from "./Table";

export const metadata: Metadata = {
  title: "Loan Histories",
};

type Props = {
  searchParams: Promise<{
    page?: number;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const { page } = await searchParams;
  const intPage = isNaN(Number(page)) ? 1 : Number(page);

  const [{ histories, total }, balance] = await Promise.all([
    fetchHistories(intPage),
    sumCharge(),
  ]);

  return (
    <div className="xl:p-8 p-4 min-h-screen flex flex-col">
      <section className="flex flex-col items-start gap-3">
        <Header />
        <div className="py-4">
          <h1 className="text-lg font-semibold inline">Balance : </h1>
          <span>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(Number(balance[0].total!))}
          </span>
        </div>
      </section>

      <div className="flex-grow">
        <Table histories={histories} page={intPage} />
      </div>

      <section className="w-full flex justify-center py-4">
        {total > LIMIT_BOOKS && (
          <div className="join">
            {new Array(Math.ceil(total / LIMIT_BOOKS)).fill("").map((_, i) => (
              <PaginateButton key={i} number={i + 1} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
