import { sql } from '@payloadcms/db-postgres';

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres';

export async function up({ payload }: MigrateUpArgs): Promise<void> {
	await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "contact_request" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"first_name" varchar NOT NULL,
  	"phone_number" varchar NOT NULL,
  	"car_id" integer NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "contact_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Zadzwoń do nas' NOT NULL,
  	"label" varchar DEFAULT 'Kontakt',
  	"image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  DO $$ BEGIN
   ALTER TABLE "contact_request" ADD CONSTRAINT "contact_request_car_id_car_fleet_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."car_fleet"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "contact_section" ADD CONSTRAINT "contact_section_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "contact_request_created_at_idx" ON "contact_request" USING btree ("created_at");`);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
	await payload.db.drizzle.execute(sql`
   DROP TABLE "contact_request";
  DROP TABLE "contact_section";`);
}
