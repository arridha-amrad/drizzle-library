import { db } from "./migrate";
import { BooksTable, LoanTable } from "./schema";

const main = async () => {
  await db.update(BooksTable).set({
    stocks: {
      total: 3,
      available: 3,
    },
  });
  // await db.delete(LoanTable);
};

main();
