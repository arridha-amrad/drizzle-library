import ModalLoanBookForm from "@/app/LoanBookForm/modal";

export default async function Page() {
  return (
    <dialog id="my_modal_2" className={`modal`}>
      <ModalLoanBookForm />
    </dialog>
  );
}
