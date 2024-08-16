import { sql } from '@payloadcms/db-postgres';

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres';

export async function up({ payload }: MigrateUpArgs): Promise<void> {
	await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "services_section_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"content" varchar NOT NULL,
  	"is_new" boolean DEFAULT false NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "services_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Nasze usługi' NOT NULL,
  	"label" varchar DEFAULT 'Usługi',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  DO $$ BEGIN
   ALTER TABLE "services_section_services" ADD CONSTRAINT "services_section_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_section"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "services_section_services_order_idx" ON "services_section_services" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "services_section_services_parent_id_idx" ON "services_section_services" USING btree ("_parent_id");`);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
	await payload.db.drizzle.execute(sql`
   DROP TABLE "services_section_services";
  DROP TABLE "services_section";`);
}
