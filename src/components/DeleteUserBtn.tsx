"use client";

import { removeUser } from "@/actions";

export default function DeleteUserButton({ id }: { id: number }) {
  return (
    <button
      onClick={async () => await removeUser(id)}
      className="btn btn-sm btn-error"
    >
      delete
    </button>
  );
}
