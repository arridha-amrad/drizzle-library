"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "./action";

const initialState = {
  validationErrors: undefined,
  errors: undefined,
  success: false,
};

type Props = {
  isShowCancelButton?: boolean;
};

export default function FormAddUser({ isShowCancelButton }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");

  let [actionState, action, pending] = useActionState(
    (state: any, data: FormData) => {
      actionState = initialState;
      return registerUser(state, data);
    },
    initialState
  );

  const ve = actionState.validationErrors;

  useEffect(() => {
    if (actionState.success) {
      toast.success("Register is successful");
      router.push(`/users?name=${name}`);
    }
  }, [actionState.success]);

  useEffect(() => {
    if (actionState.errors) {
      toast.error(actionState.errors);
    }
  }, [actionState.errors]);

  return (
    <fieldset disabled={pending}>
      <form action={action} className="space-y-3">
        <div className="space-y-4">
          <h1 className="text-xl font-bold">Register a User</h1>
          <p className="text-sm text-neutral-content/50">
            Add a new user to library member
          </p>
        </div>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Name</legend>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            type="text"
            className="input input-neutral w-full"
          />
          {ve && ve.name && (
            <p className="fieldset-label text-error">{ve.name[0]}</p>
          )}
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email</legend>
          <input
            type="text"
            name="email"
            className="input input-neutral w-full"
          />
          {ve && ve.email && (
            <p className="fieldset-label text-error">{ve.email[0]}</p>
          )}
        </fieldset>
        <div className="modal-action">
          {isShowCancelButton && (
            <button
              onClick={() => {
                router.back();
              }}
              type="button"
              className="btn btn-neutral"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="btn btn-primary disabled:btn-disabled"
          >
            Register User
          </button>
        </div>
      </form>
    </fieldset>
  );
}
