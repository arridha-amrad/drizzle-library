import AddBookForm from "@/components/AddBookForm";

export default function Page() {
  return (
    <dialog id="add-book-modal" className="modal">
      <AddBookForm />
    </dialog>
  );
}
