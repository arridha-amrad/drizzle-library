import { sql } from "drizzle-orm";
import {
  bigint,
  integer,
  numeric,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const UsersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const BooksTable = pgTable("books", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author").notNull(),
  categories: text("categories").array().notNull().$type<string[]>(),
  stocks: integer("stocks").notNull(),
  available: integer("available").notNull(),
});

export const LoansTable = pgTable(
  "loans",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => UsersTable.id),
    bookId: uuid("book_id")
      .notNull()
      .references(() => BooksTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
      .defaultNow()
      .notNull(),
    dueAt: timestamp("due_at", { mode: "date", withTimezone: true })
      .default(sql`NOW() + INTERVAL '2 days'`)
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.bookId, table.userId] })]
);

export const HistoriesTable = pgTable("histories", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .notNull()
    .references(() => UsersTable.id, { onDelete: "cascade" }),
  bookId: uuid("book_id")
    .notNull()
    .references(() => BooksTable.id, { onDelete: "cascade" }),
  charge: bigint("charge", { mode: "number" }).notNull(),
  loanAt: timestamp("loan_at", { mode: "date", withTimezone: true }).notNull(),
  returnAt: timestamp("return_at", {
    mode: "date",
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

export const ReviewsTable = pgTable("reviews", {
  id: serial("id").primaryKey(),
  bookId: uuid("book_id")
    .notNull()
    .references(() => BooksTable.id, { onDelete: "cascade" }),
  rating: numeric("ratings").notNull(),
  userId: serial("user_id")
    .notNull()
    .references(() => UsersTable.id, { onDelete: "cascade" }),
  description: text().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
});
