"use client";

import { editUser } from "@/actions/users/editUser";
import { User } from "@/queries/fetchUsers";
import { useAction } from "next-safe-action/hooks";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  user: User;
  closeModal: VoidFunction;
};

export default function FormEditUser({ user, closeModal }: Props) {
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    email: "",
  });

  const router = useRouter();

  const pathname = usePathname();

  const [state, setState] = useState({
    name: user.name,
    email: user.email,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const { execute, isPending } = useAction(editUser.bind(null, user.id), {
    onError({ error }) {
      const vError = error.validationErrors;
      if (vError) {
        const emailError = vError?.email?._errors;
        const nameError = vError?.name?._errors;
        setValidationErrors({
          ...validationErrors,
          email: emailError ? emailError[0] : "",
          name: nameError ? nameError[0] : "",
        });
      }
      if (error.serverError) {
        toast.error(error.serverError);
      }
    },
    onSuccess({ data }) {
      if (data) {
        toast.success("Edit is successful");
        if (pathname === `/users/${data.id}`) {
          closeModal();
        } else {
          router.push(`/users/${data.id}`);
        }
      }
    },
  });

  return (
    <form action={execute}>
      <input type="text" hidden name="id" defaultValue={user.id} />
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Name</legend>
        <input
          value={state.name}
          onChange={handleChange}
          type="text"
          className="input input-neutral w-full"
          name="name"
        />
        {!!validationErrors.name && (
          <p className="fieldset-label text-error">{!validationErrors.name}</p>
        )}
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Email</legend>
        <input
          value={state.email}
          onChange={handleChange}
          type="text"
          className="input input-neutral w-full"
          name="email"
        />
        {!!validationErrors.email && (
          <p className="fieldset-label text-error">{validationErrors.email}</p>
        )}
      </fieldset>
      <div className="flex justify-end gap-4 mt-4">
        <button
          type="button"
          onClick={closeModal}
          className="btn btn-neutral w-20"
        >
          Close
        </button>
        <button type="submit" className="btn btn-accent btn-soft w-20">
          {isPending ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Edit"
          )}
        </button>
      </div>
    </form>
  );
}
