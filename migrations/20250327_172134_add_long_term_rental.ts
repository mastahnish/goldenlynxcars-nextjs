import { sql } from '@payloadcms/db-postgres';

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
	await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "long_term_rental_header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Wynajem Długoterminowy' NOT NULL,
  	"label" varchar DEFAULT 'Wynajem',
  	"content" varchar DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula vel nunc ac porta. Donec ut ligula nec nunc efficitur facilisis.' NOT NULL,
  	"sub_content" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "long_term_rental_content_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "long_term_rental_content_additional_information_informations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "long_term_rental_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"process_title" varchar NOT NULL,
  	"process_label" varchar,
  	"additional_information_title" varchar NOT NULL,
  	"additional_information_label" varchar,
  	"summary" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DO $$ BEGIN
   ALTER TABLE "long_term_rental_content_process_steps" ADD CONSTRAINT "long_term_rental_content_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."long_term_rental_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "long_term_rental_content_additional_information_informations" ADD CONSTRAINT "long_term_rental_content_additional_information_informations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."long_term_rental_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "long_term_rental_content_process_steps_order_idx" ON "long_term_rental_content_process_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "long_term_rental_content_process_steps_parent_id_idx" ON "long_term_rental_content_process_steps" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "long_term_rental_content_additional_information_informations_order_idx" ON "long_term_rental_content_additional_information_informations" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "long_term_rental_content_additional_information_informations_parent_id_idx" ON "long_term_rental_content_additional_information_informations" USING btree ("_parent_id");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
	await db.execute(sql`
   DROP TABLE "long_term_rental_header" CASCADE;
  DROP TABLE "long_term_rental_content_process_steps" CASCADE;
  DROP TABLE "long_term_rental_content_additional_information_informations" CASCADE;
  DROP TABLE "long_term_rental_content" CASCADE;`);
}
