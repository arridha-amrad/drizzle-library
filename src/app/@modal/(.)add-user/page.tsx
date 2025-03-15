"use client";

import RegisterForm from "@/app/add-user/FormAddUser";
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
