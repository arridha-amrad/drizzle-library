import { fetchCategories } from "@/actions/bookActions";
import AddBookButton from "@/components/AddBooksBtn";
import BookFilterForm from "@/components/BookFilterForm";
import BooksTable from "@/components/BooksTable";

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
