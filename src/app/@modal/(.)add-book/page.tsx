"use client";

import FormAddBook from "@/components/Forms/FormCreateBook";
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("./Modal"), { ssr: false });

export default function Page() {
  return (
    <Modal>
      <FormAddBook isShowCancelButton={true} />
    </Modal>
  );
}
