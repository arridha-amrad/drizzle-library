"use client";

import { useRouter } from "next/navigation";
import { User } from "./query";
import { useActionState, useEffect, useRef } from "react";
import { editUser } from "./actions";
import { toast } from "react-toastify";

const initialState = {
  validationErrors: undefined,
  errors: undefined,
  success: false,
};

export default function EditUserButton({ user }: { user: User }) {
  const refDialog = useRef<HTMLDialogElement | null>(null);

  const [actionState, action, pending] = useActionState(
    (state: any, data: FormData) => {
      return editUser(state, data);
    },
    initialState
  );

  const ve = actionState.validationErrors;

  useEffect(() => {
    if (actionState.success) {
      toast.success("Updated");
      refDialog.current?.close();
    }
  }, [actionState.success]);

  useEffect(() => {
    if (actionState.errors) {
      toast.error(actionState.errors);
    }
  }, [actionState.errors]);

  return (
    <fieldset disabled={pending}>
      <button
        onClick={() => refDialog.current?.showModal()}
        className="btn btn-accent"
      >
        edit
      </button>
      <dialog id="my_modal_2" className="modal" ref={refDialog}>
        <form action={action} className="modal-box">
          <input type="text" hidden name="id" defaultValue={user.id} />
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Name</legend>
            <input
              defaultValue={user.name}
              type="text"
              className="input input-neutral w-full"
              name="name"
            />
            {ve && ve.name && (
              <p className="fieldset-label text-error">{ve.name[0]}</p>
            )}
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input
              defaultValue={user.email}
              type="text"
              className="input input-neutral w-full"
              name="email"
            />
            {ve && ve.email && (
              <p className="fieldset-label text-error">{ve.email[0]}</p>
            )}
          </fieldset>
          <div className="modal-action">
            <button
              type="button"
              onClick={() => refDialog.current?.close()}
              className="btn btn-neutral"
            >
              Close
            </button>
            <button type="submit" className="btn btn-accent btn-soft">
              Edit
            </button>
          </div>
        </form>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </fieldset>
  );
}
