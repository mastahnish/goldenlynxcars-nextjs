import { sql } from '@payloadcms/db-postgres';

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
	await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "contact_header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Kontakt' NOT NULL,
  	"label" varchar DEFAULT 'Kontakt',
  	"content" varchar DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac purus turpis. Maecenas vel rutrum ligula, ut tincidunt magna.' NOT NULL,
  	"sub_content" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "car_subscription_header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Subskrypcja Samochodowa' NOT NULL,
  	"label" varchar DEFAULT 'Subskrypcja',
  	"content" varchar DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula vel nunc ac porta. Donec ut ligula nec nunc efficitur facilisis.' NOT NULL,
  	"sub_content" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "car_subscription_content_benefits_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "car_subscription_content_comparison_table_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "car_subscription_content_comparison_table_contents_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "car_subscription_content_comparison_table_contents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"parameter" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "car_subscription_content_choose_reasons_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "car_subscription_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"description" varchar NOT NULL,
  	"benefits_title" varchar NOT NULL,
  	"benefits_label" varchar NOT NULL,
  	"comparison_table_title" varchar NOT NULL,
  	"comparison_table_label" varchar NOT NULL,
  	"choose_reasons_title" varchar NOT NULL,
  	"choose_reasons_label" varchar NOT NULL,
  	"summary" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DO $$ BEGIN
   ALTER TABLE "car_subscription_content_benefits_list" ADD CONSTRAINT "car_subscription_content_benefits_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."car_subscription_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "car_subscription_content_comparison_table_categories" ADD CONSTRAINT "car_subscription_content_comparison_table_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."car_subscription_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "car_subscription_content_comparison_table_contents_content" ADD CONSTRAINT "car_subscription_content_comparison_table_contents_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."car_subscription_content_comparison_table_contents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "car_subscription_content_comparison_table_contents" ADD CONSTRAINT "car_subscription_content_comparison_table_contents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."car_subscription_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "car_subscription_content_choose_reasons_list" ADD CONSTRAINT "car_subscription_content_choose_reasons_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."car_subscription_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "car_subscription_content_benefits_list_order_idx" ON "car_subscription_content_benefits_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "car_subscription_content_benefits_list_parent_id_idx" ON "car_subscription_content_benefits_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "car_subscription_content_comparison_table_categories_order_idx" ON "car_subscription_content_comparison_table_categories" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "car_subscription_content_comparison_table_categories_parent_id_idx" ON "car_subscription_content_comparison_table_categories" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "car_subscription_content_comparison_table_contents_content_order_idx" ON "car_subscription_content_comparison_table_contents_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "car_subscription_content_comparison_table_contents_content_parent_id_idx" ON "car_subscription_content_comparison_table_contents_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "car_subscription_content_comparison_table_contents_order_idx" ON "car_subscription_content_comparison_table_contents" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "car_subscription_content_comparison_table_contents_parent_id_idx" ON "car_subscription_content_comparison_table_contents" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "car_subscription_content_choose_reasons_list_order_idx" ON "car_subscription_content_choose_reasons_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "car_subscription_content_choose_reasons_list_parent_id_idx" ON "car_subscription_content_choose_reasons_list" USING btree ("_parent_id");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
	await db.execute(sql`
   DROP TABLE "contact_header" CASCADE;
  DROP TABLE "car_subscription_header" CASCADE;
  DROP TABLE "car_subscription_content_benefits_list" CASCADE;
  DROP TABLE "car_subscription_content_comparison_table_categories" CASCADE;
  DROP TABLE "car_subscription_content_comparison_table_contents_content" CASCADE;
  DROP TABLE "car_subscription_content_comparison_table_contents" CASCADE;
  DROP TABLE "car_subscription_content_choose_reasons_list" CASCADE;
  DROP TABLE "car_subscription_content" CASCADE;`);
}
