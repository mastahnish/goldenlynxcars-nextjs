import { sql } from '@payloadcms/db-postgres';

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres';

export async function up({ payload }: MigrateUpArgs): Promise<void> {
	await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "faq_section_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "faq_section_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "faq_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Najczęściej Zadawane Pytania' NOT NULL,
  	"label" varchar DEFAULT 'FAQ',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  DO $$ BEGIN
   ALTER TABLE "faq_section_images" ADD CONSTRAINT "faq_section_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "faq_section_images" ADD CONSTRAINT "faq_section_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq_section"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "faq_section_faqs" ADD CONSTRAINT "faq_section_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq_section"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "faq_section_images_order_idx" ON "faq_section_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "faq_section_images_parent_id_idx" ON "faq_section_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "faq_section_faqs_order_idx" ON "faq_section_faqs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "faq_section_faqs_parent_id_idx" ON "faq_section_faqs" USING btree ("_parent_id");`);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
	await payload.db.drizzle.execute(sql`
   DROP TABLE "faq_section_images";
  DROP TABLE "faq_section_faqs";
  DROP TABLE "faq_section";`);
}
