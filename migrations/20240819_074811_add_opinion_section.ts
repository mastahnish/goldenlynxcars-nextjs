import { sql } from '@payloadcms/db-postgres';

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres';

export async function up({ payload }: MigrateUpArgs): Promise<void> {
	await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "opinion_section_opinions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"full_name" varchar NOT NULL,
  	"content" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "opinion_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Opinie o Golden Lynx Cars' NOT NULL,
  	"label" varchar DEFAULT 'Opinie',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  DO $$ BEGIN
   ALTER TABLE "opinion_section_opinions" ADD CONSTRAINT "opinion_section_opinions_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "opinion_section_opinions" ADD CONSTRAINT "opinion_section_opinions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."opinion_section"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "opinion_section_opinions_order_idx" ON "opinion_section_opinions" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "opinion_section_opinions_parent_id_idx" ON "opinion_section_opinions" USING btree ("_parent_id");`);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
	await payload.db.drizzle.execute(sql`
   DROP TABLE "opinion_section_opinions";
  DROP TABLE "opinion_section";`);
}
