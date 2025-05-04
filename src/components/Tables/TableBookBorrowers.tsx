import { fetchBookBorrowers } from "@/queries/fetchBookBorrowers";

type Props = {
  bookId: string;
};

export default async function TableBookBorrowers({ bookId }: Props) {
  const loanList = await fetchBookBorrowers(bookId);

  return (
    <div className="rounded-box mt-4 overflow-hidden border border-base-content/10 bg-base-100">
      <table className="table ">
        <thead>
          <tr className="bg-neutral">
            <th className="border-r border-base-content/10">No.</th>
            <th className="border-r border-base-content/10">Name</th>
            <th className="border-r border-base-content/10">Book Title</th>
            <th className="border-r border-base-content/10">Loan at</th>
            <th className="border-r border-base-content/10">Due at</th>
          </tr>
        </thead>
        <tbody>
          {loanList.length === 0 ? (
            <tr>
              <td>
                <h1 className="text-xl font-semibold">No borrowers</h1>
              </td>
            </tr>
          ) : (
            loanList.map((data, i) => (
              <tr key={data.user.id}>
                <td className="border-r border-base-content/10">{i + 1}</td>
                <td className="border-r border-base-content/10">
                  {data.user.name}
                </td>
                <td className="border-r border-base-content/10">
                  {data.book.title}
                </td>
                <td className="border-r border-base-content/10">
                  {new Intl.DateTimeFormat("id").format(
                    new Date(data.loan.loanAt)
                  )}
                </td>
                <td className="border-r border-base-content/10">
                  {new Intl.DateTimeFormat("id").format(
                    new Date(data.loan.dueAt)
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
