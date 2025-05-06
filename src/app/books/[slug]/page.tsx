import ModalBorrowBook from "@/components/Modal/ModalBorrowBook";
import TabBookDetail from "@/components/Tab/TabBookDetail";
import TableBookBorrowers from "@/components/Tables/TableBookBorrowers";
import TableBookDetail from "@/components/Tables/TableBookDetail";
import { fetchBookBySlug } from "@/queries/fetchBookBySlug";
import { SearchParams } from "@/types";
import { notFound } from "next/navigation";
import BookReviews from "./BookReviews";
import ModalEditBook from "@/components/Modal/ModalEditBook";
import ModalDeleteBook from "@/components/Modal/ModalDeleteBook";

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
    <section className="xl:px-8 xl:py-2 p-4 min-h-screen flex flex-col">
      <div className="h-20 flex items-center gap-4">
        <div className="flex-1 flex gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Book Detail</h1>
        </div>
        <ModalBorrowBook available={available} bookId={id} title={title} />
        <ModalEditBook book={storedBook[0]} />
        <ModalDeleteBook id={id} />
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
