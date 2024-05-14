import AddBookButton from "@/components/AddBooksBtn";
import BooksTable from "@/components/BooksTable";

export default async function Page() {
  return (
    <section className="px-8">
      <BooksTable />
      <div className="fixed bottom-10 right-28">
        <AddBookButton />
      </div>
    </section>
  );
}
