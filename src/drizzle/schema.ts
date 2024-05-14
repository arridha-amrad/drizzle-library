import { relations } from "drizzle-orm";
import {
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
});

export const CategoriesTable = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull().unique(),
});

export const BooksToCategoriesTable = pgTable(
  "bookss_to_categories",
  {
    bookId: uuid("book_id")
      .notNull()
      .references(() => BooksTable.id),
    categoryId: serial("category_id")
      .notNull()
      .references(() => CategoriesTable.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.bookId, t.categoryId] }),
  })
);

// Relation
export const booksRelations = relations(BooksTable, ({ many }) => ({
  booksToCategories: many(BooksToCategoriesTable),
}));

export const categoriesRelations = relations(CategoriesTable, ({ many }) => ({
  booksToCategories: many(BooksToCategoriesTable),
}));

export const booksToCategoriesRelations = relations(
  BooksToCategoriesTable,
  ({ one }) => ({
    book: one(BooksTable, {
      fields: [BooksToCategoriesTable.bookId],
      references: [BooksTable.id],
    }),
    categories: one(CategoriesTable, {
      fields: [BooksToCategoriesTable.categoryId],
      references: [CategoriesTable.id],
    }),
  })
);
