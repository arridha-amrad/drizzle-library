CREATE TABLE IF NOT EXISTS "books_ratings" (
	"id" serial PRIMARY KEY NOT NULL,
	"book_id" uuid NOT NULL,
	"value" real NOT NULL,
	"user_id" serial NOT NULL,
	"comment_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "books_comment" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "books_ratings" ADD CONSTRAINT "books_ratings_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "books_ratings" ADD CONSTRAINT "books_ratings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "books_ratings" ADD CONSTRAINT "books_ratings_comment_id_books_comment_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."books_comment"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
