import RegisterForm from "@/components/RegisterUserForm";
import { Suspense } from "react";

export default function Page() {
  return (
    <dialog id="add-user-modal" className="modal modal-open">
      <Suspense>
        <RegisterForm />
      </Suspense>
    </dialog>
  );
}
