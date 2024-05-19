CREATE TABLE IF NOT EXISTS "loan_histories" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"book_id" uuid NOT NULL,
	"loan_at" timestamp NOT NULL,
	"return_at" timestamp NOT NULL,
	"charge" bigint DEFAULT 0 NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "loan_histories" ADD CONSTRAINT "loan_histories_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "loan_histories" ADD CONSTRAINT "loan_histories_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
