import { getBookDetail } from "@/actions/bookActions";
import Link from "next/link";
import OpenLoanDialogBtn from "../LoanBookForm/OpenLoanDialogBtn";

type Props = {
  id: string;
};

export default async function BookTable({ id }: Props) {
  const book = await getBookDetail(id);

  return (
    <>
      <div className="h-[50px] flex items-center w-full justify-between ">
        <h1 className="font-semibold text-lg text-neutral-600">Book Detail</h1>
        <OpenLoanDialogBtn available={book[0].stocks.available} />
      </div>
      <div className="overflow-x-auto border border-neutral-600 rounded-lg">
        <table className="table ">
          <thead>
            <tr>
              <th>Title</th>
              <th>Stocks</th>
              <th>Author</th>
              <th>Categories</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{book[0].title}</td>
              <td>
                <div>total : {book[0].stocks.total}</div>
                <div>available : {book[0].stocks.available}</div>
              </td>
              <td>{book[0].author}</td>
              <td className="space-x-1">
                {book[0].categories.map((cat, i) => (
                  <Link
                    key={i}
                    className="space-x-1"
                    href={`/books?isFilter=true&categories=${
                      cat.includes("#") ? cat.replaceAll("#", "%23") : cat
                    }`}
                  >
                    {cat}
                    {i === book[0].categories.length - 1 ? "" : ","}
                  </Link>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
