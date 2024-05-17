import { getBookLoanData } from "@/actions/bookActions";
import OpenLoanDialogBtn from "@/app/LoanBookForm/OpenLoanDialogBtn";

type Params = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Params) {
  const loanBooks = await getBookLoanData(params.id);
  console.log(loanBooks);
  return (
    <section>
      <h1>{params.id}</h1>
      <div className="fixed bottom-10 right-28">
        <OpenLoanDialogBtn />
      </div>
    </section>
  );
}
