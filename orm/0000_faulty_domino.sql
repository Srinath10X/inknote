CREATE TABLE "notes" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" json NOT NULL
);
