CREATE TABLE "files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"title" text NOT NULL,
	"icon_id" text NOT NULL,
	"data" text,
	"in_trash" text,
	"banner_url" text,
	"workspace_id" uuid,
	"folder_id" uuid
);
--> statement-breakpoint
CREATE TABLE "folders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"title" text NOT NULL,
	"icon_id" text NOT NULL,
	"data" text,
	"in_trash" text,
	"banner_url" text,
	"workspace_id" uuid
);
--> statement-breakpoint
CREATE TABLE "workspace" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"workspace_owner" uuid NOT NULL,
	"title" text NOT NULL,
	"icon_id" text NOT NULL,
	"data" text,
	"in_trash" text,
	"logo" text,
	"banner_url" text
);
--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_folder_id_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."folders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "folders" ADD CONSTRAINT "folders_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;