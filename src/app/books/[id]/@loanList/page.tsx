import LoanListTable from "@/components/Tables/LoanListTable";

type Params = {
  params: {
    id: string;
  };
};

export default async function LoanList({ params }: Params) {
  return (
    <section className="mt-6">
      <div className="flex items-center pb-4">
        <h1 className="font-semibold text-lg">Loan List</h1>
      </div>
      <LoanListTable bookId={params.id} />
    </section>
  );
}
