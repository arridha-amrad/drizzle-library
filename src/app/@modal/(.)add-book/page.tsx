import AddBookForm from "@/components/AddBookForm";
import Modal from "./Modal";

export default function Page() {
  return (
    <Modal>
      <AddBookForm isShowCancelButton={true} />
    </Modal>
  );
}
