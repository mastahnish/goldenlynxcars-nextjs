import { sql } from '@payloadcms/db-postgres';

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres';

export async function up({ payload }: MigrateUpArgs): Promise<void> {
	await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_car_fleet_details_transmission" AS ENUM('manual', 'sequential', 'automatic');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   CREATE TYPE "public"."enum_car_fleet_details_fuel" AS ENUM('gasoline', 'diesel', 'lpg', 'hybrid');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );

  CREATE TABLE IF NOT EXISTS "car_fleet" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"name" varchar NOT NULL,
  	"price" numeric NOT NULL,
  	"details_hp" numeric NOT NULL,
  	"details_transmission" "enum_car_fleet_details_transmission" NOT NULL,
  	"details_seats" numeric NOT NULL,
  	"details_fuel" "enum_car_fleet_details_fuel" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "car_fleet_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Flota samochodów' NOT NULL,
  	"label" varchar DEFAULT 'Samochody',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE IF NOT EXISTS "car_fleet_section_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"car_fleet_id" integer
  );

  DO $$ BEGIN
   ALTER TABLE "car_fleet" ADD CONSTRAINT "car_fleet_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "car_fleet_section_rels" ADD CONSTRAINT "car_fleet_section_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."car_fleet_section"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "car_fleet_section_rels" ADD CONSTRAINT "car_fleet_section_rels_car_fleet_fk" FOREIGN KEY ("car_fleet_id") REFERENCES "public"."car_fleet"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "car_fleet_created_at_idx" ON "car_fleet" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "car_fleet_section_rels_order_idx" ON "car_fleet_section_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "car_fleet_section_rels_parent_idx" ON "car_fleet_section_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "car_fleet_section_rels_path_idx" ON "car_fleet_section_rels" USING btree ("path");`);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
	await payload.db.drizzle.execute(sql`
   DROP TABLE "media";
  DROP TABLE "car_fleet";
  DROP TABLE "car_fleet_section";
  DROP TABLE "car_fleet_section_rels";`);
}
