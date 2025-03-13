import Tab from "./Tab";
import LoanListTable from "./LoanListTable";
import BookTable from "./BookTable";
import BookReviews from "./Review";

type Params = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    tab?: string | null;
  }>;
};

export default async function Page({ params, searchParams }: Params) {
  const [{ id }, { tab }] = await Promise.all([params, searchParams]);
  return (
    <section className="py-4">
      <BookTable id={id} />
      <Tab />
      {tab === "reviews" ? (
        <BookReviews bookId={id} />
      ) : (
        <LoanListTable bookId={id} />
      )}
    </section>
  );
}
