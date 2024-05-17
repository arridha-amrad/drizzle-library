import { fetchCategories } from "@/actions/bookActions";
import AddBookButton from "@/components/AddBooksBtn";
import BookFilterForm from "@/components/BookFilterForm";
import BookFilterButton from "@/components/BooksFilterButton";
import BooksTable from "@/components/BooksTable/BooksTable";

type Params = {
  title?: string;
  page?: number;
  categories?: string;
  author?: string;
};

type Props = {
  searchParams: Params;
};

export default async function Page({ searchParams }: Props) {
  const { author, categories: cat, page, title } = searchParams;
  const categories = await fetchCategories();
  return (
    <section className="px-8 h-full">
      <div className="px h-[70px] w-full flex items-center justify-between">
        <h1 className="text-neutral-600 font-bold">Books Collection</h1>
        <BookFilterButton />
      </div>
      <BookFilterForm categories={categories} />
      <BooksTable
        author={author}
        categories={cat ? cat.split(",").map((val) => val.trim()) : []}
        title={title}
        page={page}
      />
      <div className="fixed bottom-10 right-28">
        <AddBookButton />
      </div>
    </section>
  );
}
