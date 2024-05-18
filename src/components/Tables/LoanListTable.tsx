import { getBookLoanData } from "@/actions/bookActions";

type Props = {
  bookId: string;
};

export default async function LoanListTable({ bookId }: Props) {
  const loanList = await getBookLoanData(bookId);

  return (
    <div className="overflow-x-auto border border-neutral-700">
      <table className="table ">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Book Title</th>
            <th>Loan at</th>
            <th>Return at</th>
          </tr>
        </thead>
        <tbody>
          {loanList.map((data, i) => (
            <tr key={data.user.id}>
              <td>{i + 1}</td>
              <td>{data.user.name}</td>
              <td>{data.book.title}</td>
              <td>
                {new Intl.DateTimeFormat("id").format(
                  new Date(data.loan.loanAt)
                )}
              </td>
              <td>
                {new Intl.DateTimeFormat("id").format(
                  new Date(data.loan.dueAt)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
