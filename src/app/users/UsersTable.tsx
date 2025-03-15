import DeleteUserButton from "./DeleteUser";
import EditUserButton from "./EditUser";
import { LIMIT_USERS } from "@/variables";
import { User } from "./query";

type Props = {
  page: number;
  users: User[];
};

export default async function UsersTable({ page, users }: Props) {
  const className = {
    col: "border-r border-base-content/10",
  };

  return (
    <>
      <section className="rounded-box mt-4 overflow-hidden border border-base-content/10 bg-base-100">
        <table className="table">
          <thead>
            <tr className="bg-neutral">
              <th className={`${className.col}`}>No.</th>
              <th className={`${className.col}`}>Id</th>
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
              <tr className="hover cursor-pointer" key={user.id}>
                <th className={`${className.col}`}>
                  {i + 1 + (page - 1) * LIMIT_USERS}
                </th>
                <td className={`${className.col}`}>{user.id}</td>
                <td className={`${className.col}`}>{user.name}</td>
                <td className={`${className.col}`}>{user.email}</td>
                <td className={`${className.col}`}>
                  {new Intl.DateTimeFormat("en-US").format(
                    new Date(user.createdAt)
                  )}
                </td>
                <td className={`${className.col}`}>
                  <div className="flex items-center gap-2">
                    <EditUserButton user={user} />
                    <DeleteUserButton id={user.id} />
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
