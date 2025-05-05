"use client";

import { createUser } from "@/actions/users/createUser";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  isShowCancelButton?: boolean;
};

export default function FromCreateUser({ isShowCancelButton }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    name: "",
  });

  const { execute, isPending } = useAction(createUser, {
    onSuccess() {
      toast.success("Register is successful");
    },
    onError: ({ error }) => {
      const serverError = error.serverError;
      if (serverError) {
        toast.error(serverError);
      }
      const vErr = error.validationErrors;
      if (vErr) {
        const emailError = vErr.email;
        const nameError = vErr.name;
        setErrors({
          ...errors,
          email: emailError?._errors ? emailError._errors[0] : "",
          name: nameError?._errors ? nameError._errors[0] : "",
        });
      }
    },
  });

  return (
    <fieldset disabled={isPending}>
      <form action={execute} className="space-y-3">
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
          {!!errors.name && (
            <p className="fieldset-label text-error">{errors.name}</p>
          )}
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email</legend>
          <input
            type="text"
            name="email"
            className="input input-neutral w-full"
          />
          {!!errors.email && (
            <p className="fieldset-label text-error">{errors.email}</p>
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
            className="btn btn-primary disabled:btn-disabled w-24"
          >
            {isPending ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Register"
            )}
          </button>
        </div>
      </form>
    </fieldset>
  );
}
