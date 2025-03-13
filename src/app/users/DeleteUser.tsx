"use client";

import { useRef, useTransition } from "react";
import { toast } from "react-toastify";
import { removeUser } from "./actions";

export default function DeleteUserButton({ id }: { id: number }) {
  const refDialog = useRef<HTMLDialogElement | null>(null);
  const [isPending, startTransition] = useTransition();
  const remove = () => {
    startTransition(async () => {
      await removeUser(id);
      refDialog.current?.close();
      toast.success("Deleted", { position: "bottom-right" });
    });
  };
  return (
    <>
      <button
        onClick={() => refDialog.current?.showModal()}
        className="btn btn-soft btn-error"
      >
        Delete
      </button>
      <dialog ref={refDialog} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete User</h3>
          <p className="py-4">Are you sure to delete this user?</p>
          <div className="modal-action">
            <button
              disabled={isPending}
              className="btn btn-neutral"
              onClick={() => refDialog.current?.close()}
            >
              Cancel
            </button>
            <button
              disabled={isPending}
              className="btn btn-error btn-soft"
              onClick={remove}
            >
              Delete
              {isPending && (
                <span className="loading loading-spinner loading-sm"></span>
              )}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
