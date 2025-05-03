"use client";

import FormEditUser from "@/components/Forms/FormEditUser";
import { User } from "@/queries/fetchUsers";
import { useRef, useState } from "react";

export default function EditUserButton({ user }: { user: User }) {
  const refDialog = useRef<HTMLDialogElement | null>(null);

  const [pendingUi, setPendingUi] = useState(false);

  return (
    <fieldset disabled={pendingUi}>
      <button
        onClick={() => refDialog.current?.showModal()}
        className="btn btn-accent"
      >
        edit
      </button>
      <dialog id="my_modal_2" className="modal" ref={refDialog}>
        <div className="modal-box">
          <FormEditUser
            setPendingUi={setPendingUi}
            user={user}
            cancelCallback={() => {
              refDialog.current?.close();
            }}
          />
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </fieldset>
  );
}
