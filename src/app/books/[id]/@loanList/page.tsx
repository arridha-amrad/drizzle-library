import LoanListTable from "@/components/Tables/LoanListTable";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LoanList({ params }: Params) {
  const { id } = await params;
  return <LoanListTable bookId={id} />;
}
