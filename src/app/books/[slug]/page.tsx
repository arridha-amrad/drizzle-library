import ModalBorrowBook from "@/components/Modal/ModalBorrowBook";
import TabBookDetail from "@/components/Tab/TabBookDetail";
import TableBookBorrowers from "@/components/Tables/TableBookBorrowers";
import TableBookDetail from "@/components/Tables/TableBookDetail";
import { fetchBookBySlug } from "@/queries/fetchBookBySlug";
import { SearchParams } from "@/types";
import { notFound } from "next/navigation";
import BookReviews from "./Reviews";
import InputBorrowBookUser from "@/components/Input/InputBorrowBookUser";

type Params = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: SearchParams;
};

export default async function Page({ params, searchParams }: Params) {
  const [{ slug }, { tab }] = await Promise.all([params, searchParams]);

  const storedBook = await fetchBookBySlug(slug);

  if (storedBook.length === 0) {
    return notFound();
  }

  const { available, id, title } = storedBook[0];

  return (
    <section className="xl:px-8 xl:py-2 p-4  min-h-screen flex flex-col">
      <div className="h-20 flex gap-4 items-center">
        <h1 className="text-3xl font-bold tracking-tight">Book Detail</h1>
        <ModalBorrowBook available={available} bookId={id} title={title}>
          <InputBorrowBookUser />
        </ModalBorrowBook>
      </div>
      <TableBookDetail book={storedBook[0]} />
      <TabBookDetail />
      {tab === "reviews" ? (
        <BookReviews bookId={id} />
      ) : (
        <TableBookBorrowers bookId={id} />
      )}
    </section>
  );
}
