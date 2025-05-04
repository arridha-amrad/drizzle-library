ALTER TABLE "loans" ALTER COLUMN "due_at" SET DEFAULT NOW() + INTERVAL '10 days';--> statement-breakpoint
ALTER TABLE "books" ADD COLUMN "slug" text DEFAULT '' NOT NULL;