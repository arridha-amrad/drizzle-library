CREATE TABLE IF NOT EXISTS "loan" (
	"user_id" integer NOT NULL,
	"book_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"due_at" timestamp,
	CONSTRAINT "loan_book_id_user_id_pk" PRIMARY KEY("book_id","user_id")
);
--> statement-breakpoint
DROP TABLE "bookss_to_categories";--> statement-breakpoint
ALTER TABLE "books" ADD COLUMN "stocks" jsonb DEFAULT '{"total":3,"available":3}'::jsonb;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "loan" ADD CONSTRAINT "loan_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "loan" ADD CONSTRAINT "loan_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
