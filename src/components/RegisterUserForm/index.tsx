"use client";

import { editUser, register } from "@/actions/actions";
import RegisterSubmitButton from "./RegisterSubmitBtn";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function RegisterUserForm() {
  const params = useSearchParams();
  const emailFromParam = params.get("email");
  const nameFromParam = params.get("name");
  const isEdit = params.get("isEdit");
  const idFromParam = params.get("id");

  const ref = useRef<HTMLFormElement>(null);

  const [state, setState] = useState({
    email: "",
    name: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!nameFromParam || !emailFromParam) return;
    setState({
      email: emailFromParam,
      name: nameFromParam,
    });
  }, [emailFromParam, nameFromParam]);

  const updateUserWithId = editUser.bind(null, idFromParam);
  const router = useRouter();

  const action = async (formData: FormData) => {
    let name = "";
    if (isEdit && isEdit === "true") {
      const result = await updateUserWithId(formData);
      toast.success("Edit successful", {
        theme: "dark",
      });
      name = result ?? "";
    } else {
      const result = await register(formData);
      toast.success("Register successful", {
        theme: "dark",
      });
      name = result ?? "";
    }
    ref.current?.reset();
    setState({
      ...state,
      email: "",
      name: "",
    });
    router.back();
  };

  return (
    <>
      <form action={action} className="modal-box space-y-3">
        <div className="mx-auto w-fit">
          <h1 className="text-lg font-semibold text-base-content">Add User</h1>
        </div>
        <label className="input w-full input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            value={state.email}
            onChange={onChange}
            name="email"
            className="grow"
            placeholder="Email"
          />
        </label>
        <label className="input w-full input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>

          <input
            type="text"
            value={state.name}
            onChange={onChange}
            name="name"
            className="grow"
            placeholder="Name"
          />
        </label>
        <div className="modal-action">
          <RegisterSubmitButton isDisabled={!state.email || !state.name} />
          <button type="button" className="btn" onClick={() => router.back()}>
            Close
          </button>
        </div>
      </form>
    </>
  );
}
