ALTER TABLE "cards" ADD COLUMN "description" text;
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");