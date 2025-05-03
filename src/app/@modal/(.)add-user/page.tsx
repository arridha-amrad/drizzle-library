"use client";

import RegisterForm from "@/components/Forms/FormCreateUser";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("./Modal"), { ssr: false });

export default function Page() {
  return (
    <Modal>
      <Suspense>
        <RegisterForm isShowCancelButton />
      </Suspense>
    </Modal>
  );
}
