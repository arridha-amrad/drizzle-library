import { getBookDetail } from "@/actions/bookActions";
import OpenLoanDialogBtn from "@/components/LoanBookForm/OpenLoanDialogBtn";
import Link from "next/link";

type Params = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Params) {
  const book = await getBookDetail(params.id);

  return (
    <section>
      <div className="h-[70px] flex items-center">
        <h1 className="font-semibold text-lg">Book Detail</h1>
      </div>
      <div className="overflow-x-auto border border-neutral-700">
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
              <th>{book[0].title}</th>
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
      <div className="fixed bottom-10 right-28">
        <OpenLoanDialogBtn available={book[0].stocks.available} />
      </div>
    </section>
  );
}
