import Tab from "./Tab";
import LoanListTable from "./LoanListTable";
import BookTable from "./BookTable";
import BookReviews from "./Review";
import { SearchParams } from "@/types";

type Params = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: SearchParams;
};

export default async function Page({ params, searchParams }: Params) {
  const [{ slug }, { tab }] = await Promise.all([params, searchParams]);

  console.log({ slug, tab });

  return (
    <section className="py-4">
      {/* <BookTable id={id} />
      <Tab />
      {tab === "reviews" ? (
        <BookReviews bookId={id} />
      ) : (
        <LoanListTable bookId={id} />
      )} */}
    </section>
  );
}
