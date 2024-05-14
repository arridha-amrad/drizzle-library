import { fetchUsers } from "@/actions";
import DeleteUserButton from "../DeleteUserBtn";
import EditUserButton from "../EditUserBtn";
import PaginateButton from "../PaginateButton";
import { LIMIT_USERS } from "@/variables";

type Props = {
  page: number;
  name?: string;
};

export default async function UsersTable({ page, name }: Props) {
  let pNum = 0;
  if (isNaN(page)) {
    pNum = 1;
    console.log("not a number");
  } else {
    pNum = page;
  }
  const data = await fetchUsers({ page, name });

  return (
    <>
      {data.total === 0 ? (
        <section className="w-full flex justify-center">
          <p className="text-neutral">No record found</p>
        </section>
      ) : (
        <section className="overflow-x-auto">
          <table className="table border border-base-100">
            <thead>
              <tr>
                <th className="border-r border-base-100">No.</th>
                <th className="border-r border-base-100">Id</th>
                <th className="border-r border-base-100">Name</th>
                <th className="border-r border-base-100">Email</th>
                <th className="border-r border-base-100">Joined At</th>
                <th className="border-r border-base-100">Actions</th>
              </tr>
            </thead>
            <tbody className="border border-base-100">
              {data.data.map((user, i) => (
                <tr className="hover cursor-pointer" key={user.id}>
                  <th className="border-r border-base-100">
                    {i + 1 + (pNum - 1) * 8}
                  </th>
                  <td className="border-r border-base-100">{user.id}</td>
                  <td className="border-r border-base-100">{user.name}</td>
                  <td className="border-r border-base-100">{user.email}</td>
                  <td className="border-r border-base-100">
                    {new Intl.DateTimeFormat("en-US").format(
                      new Date(user.createdAt)
                    )}
                  </td>
                  <td className="border-r border-base-100">
                    <div className="flex items-center gap-2">
                      <DeleteUserButton id={user.id} />
                      <EditUserButton user={user} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
      <section className="w-full flex justify-center py-4">
        {data.total > 8 && (
          <div className="join">
            {new Array(Math.ceil(data.total / LIMIT_USERS))
              .fill("")
              .map((_, i) => (
                <PaginateButton key={i} number={i + 1} />
              ))}
          </div>
        )}
      </section>
    </>
  );
}
