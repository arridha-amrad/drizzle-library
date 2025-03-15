"use client";

import FormAddBook from "@/app/add-book/FormAddBook";
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("./Modal"), { ssr: false });

export default function Page() {
  return (
    <Modal>
      <FormAddBook isShowCancelButton={true} />
    </Modal>
  );
}
