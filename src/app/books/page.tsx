import AddBookButton from "@/components/AddBooksBtn";
import BookFilterForm from "@/components/BookFilterForm";
import BooksTable from "@/components/BooksTable";

export default async function Page() {
  return (
    <section className="px-8">
      <BookFilterForm />
      <BooksTable />
      <div className="fixed bottom-10 right-28">
        <AddBookButton />
      </div>
    </section>
  );
}
