import { relations } from "drizzle-orm";
import {
  integer,
  jsonb,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const BooksTable = pgTable("books", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author").notNull(),
  categories: text("categories").array().notNull().$type<string[]>(),
  stocks: jsonb("stocks")
    .$type<{ total: number; available: number }>()
    .default({ total: 3, available: 3 })
    .notNull(),
});

export const CategoriesTable = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull().unique(),
});

const setDue = () => {
  const now = new Date().getTime();
  const dueLength = 1000 * 60 * 60 * 24 * 10;
  return new Date(now + dueLength);
};

export const LoanTable = pgTable(
  "loan",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    bookId: uuid("book_id")
      .notNull()
      .references(() => BooksTable.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    // due after 10 days from created_at
    dueAt: timestamp("due_at").$defaultFn(setDue),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.bookId, table.userId] }),
  })
);

// Relations
export const UsersRelation = relations(users, ({ many }) => ({
  usersToLoanBooks: many(LoanTable),
}));

export const BooksRelation = relations(BooksTable, ({ many }) => ({
  booksToLoanUsers: many(LoanTable),
}));

export const UserToLoanBooksRelation = relations(LoanTable, ({ one }) => ({
  book: one(BooksTable, {
    fields: [LoanTable.bookId],
    references: [BooksTable.id],
  }),
  user: one(users, {
    fields: [LoanTable.userId],
    references: [users.id],
  }),
}));
