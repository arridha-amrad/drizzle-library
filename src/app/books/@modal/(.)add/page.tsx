"use client";

import ModalAddBookForm from "@/components/AddBookForm/modal";

export default function ModalPage() {
  return (
    <dialog id="my_modal_1" className={`modal`}>
      <ModalAddBookForm />
    </dialog>
  );
}
