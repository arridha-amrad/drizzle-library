import { fetchCategories } from "@/actions/bookActions";
import BookFilterForm from "@/components/BookFilterForm";
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
    <section className="xl:px-8 py-2 h-full">
      <BookFilterForm categories={categories} />
      <BooksTable
        author={author}
        categories={cat ? cat.split(",").map((val) => val.trim()) : []}
        title={title}
        page={page}
      />
    </section>
  );
}
