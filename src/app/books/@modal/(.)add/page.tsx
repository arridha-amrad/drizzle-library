"use client";

import ModalAddBookForm from "@/components/AddBookForm";

export default function ModalPage() {
  return (
    <dialog id="my_modal_1" className={`modal`}>
      <ModalAddBookForm />
    </dialog>
  );
}
