import BookTable from "@/components/BookTable";
import BookReviews from "@/components/Review";
import Tab from "@/components/Tab";
import LoanListTable from "@/components/Tables/LoanListTable";

type Params = {
  params: {
    id: string;
  };
  searchParams: {
    tab?: string | null;
  };
};

export default async function Page({
  params: { id },
  searchParams: { tab },
}: Params) {
  return (
    <section className="py-4">
      <BookTable id={id} />
      <Tab />
      {tab === "review" ? (
        <BookReviews bookId={id} />
      ) : (
        <LoanListTable bookId={id} />
      )}
    </section>
  );
}
