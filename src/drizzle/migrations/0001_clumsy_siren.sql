CREATE TABLE IF NOT EXISTS "books" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"author" varchar NOT NULL,
	"categories" text[] NOT NULL
);
