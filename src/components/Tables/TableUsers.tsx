"use client";

import { LIMIT_USERS } from "@/constants";
import { User } from "@/queries/fetchUsers";
import EditUserButton from "../Buttons/ButtonEditUser";
import ButtonDeleteUser from "../Buttons/ButtonDeleteUser";
import { formatDate } from "@/utils";
import { useRouter } from "nextjs-toploader/app";

type Props = {
  page: number;
  users: User[];
};

export default function TableUsers({ page, users }: Props) {
  const className = {
    col: "border-r border-base-content/10",
  };

  const router = useRouter();

  return (
    <>
      <section className="rounded-box mt-4 overflow-hidden border border-base-content/10 bg-base-100">
        <table className="table">
          <thead>
            <tr className="bg-neutral">
              <th className={`${className.col}`}>No.</th>
              <th className={`${className.col}`}>Name</th>
              <th className={`${className.col}`}>Email</th>
              <th className={`${className.col}`}>Joined At</th>
              <th className={`${className.col}`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td>
                  <h1 className="text-xl font-semibold">Users not found</h1>
                </td>
              </tr>
            )}
            {users.map((user, i) => (
              <tr
                className="hover:bg-black/5 cursor-pointer"
                onClick={() => router.push(`/users/${user.id}`)}
                key={user.id}
              >
                <th className={`${className.col}`}>
                  {i + 1 + (page - 1) * LIMIT_USERS}
                </th>
                <td className={`${className.col}`}>{user.name}</td>
                <td className={`${className.col}`}>{user.email}</td>
                <td className={`${className.col}`}>
                  {formatDate(new Date(user.createdAt))}
                </td>
                <td className={`${className.col}`}>
                  <div className="flex items-center gap-2">
                    <EditUserButton user={user} />
                    <ButtonDeleteUser id={user.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
