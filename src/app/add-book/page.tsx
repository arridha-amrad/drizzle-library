import AddBookForm from "@/app/add-book/FormAddBook";

export default function Page() {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="p-8 border w-[400px] rounded-lg border-base-content/10">
        <AddBookForm />
      </div>
    </section>
  );
}
