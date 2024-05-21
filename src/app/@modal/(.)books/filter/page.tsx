import ModalFilterBooks from "@/components/ModalFilterBook";
import MultiSelect from "@/components/MultiSelect";
import db from "@/drizzle/db";
import { CategoriesTable } from "@/drizzle/schema";

const fetchCategories = async () => {
  const categories = await db.select().from(CategoriesTable);
  return categories;
};

export default async function Page() {
  const categories = await fetchCategories();
  return (
    <dialog id="filter_book_modal" className="modal modal-open">
      <ModalFilterBooks>
        <MultiSelect categories={categories} />
      </ModalFilterBooks>
    </dialog>
  );
}
