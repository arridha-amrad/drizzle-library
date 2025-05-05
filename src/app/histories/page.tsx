import PaginateButton from "@/components/PaginatedButton";
import { LIMIT_BOOKS } from "@/constants";
import { fetchLibraryBalance } from "@/queries/fetchLibraryBalance";
import { fetchLoanHistories } from "@/queries/fetchLoanHistories";
import { Metadata } from "next";
import Table from "../../components/Tables/TableLoanHistories";
import { formatToRupiah } from "@/utils";

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
    fetchLoanHistories(intPage),
    fetchLibraryBalance(),
  ]);

  return (
    <div className="xl:px-8 xl:py-2 p-4 min-h-screen flex flex-col">
      <section className="flex flex-col items-start gap-3">
        <div className="h-20 flex items-center">
          <h1 className="text-3xl font-bold tracking-tight">Loan Histories</h1>
        </div>
        <div className="">
          <h1 className="text-lg font-semibold inline">Balance : </h1>
          <span>{formatToRupiah(balance)}</span>
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
