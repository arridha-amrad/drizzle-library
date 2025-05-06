"use client";

import FormEditUser from "@/components/Forms/FormEditUser";
import { User } from "@/queries/fetchUsers";
import { useRef } from "react";

export default function ModalUserButton({ user }: { user: User }) {
  const refDialog = useRef<HTMLDialogElement | null>(null);

  return (
    <>
      <button
        onClick={() => refDialog.current?.showModal()}
        className="btn btn-accent"
      >
        edit
      </button>
      <dialog id="my_modal_2" className="modal" ref={refDialog}>
        <div className="modal-box">
          <FormEditUser user={user}>
            <button
              type="button"
              onClick={() => refDialog.current?.close()}
              className="btn btn-neutral w-20"
            >
              Close
            </button>
          </FormEditUser>
        </div>
      </dialog>
    </>
  );
}
