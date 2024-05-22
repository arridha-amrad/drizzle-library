import LoanListTable from "@/components/Tables/LoanListTable";

type Params = {
  params: {
    id: string;
  };
};

export default async function LoanList({ params }: Params) {
  return <LoanListTable bookId={params.id} />;
}
