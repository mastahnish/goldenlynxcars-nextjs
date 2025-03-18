import { sql } from '@payloadcms/db-postgres';

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres';

export async function up({ payload }: MigrateUpArgs): Promise<void> {
	await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_users_roles" AS ENUM('employee', 'admin');
  CREATE TYPE "public"."enum_customers_personal_data_gender" AS ENUM('Male', 'Female');
  CREATE TYPE "public"."enum_rentals_rental_currency" AS ENUM('PLN', 'USD', 'EUR', 'GBP', 'CHF', 'NOK', 'BTC');
  CREATE TYPE "public"."enum_rentals_deposit_currency" AS ENUM('PLN', 'USD', 'EUR', 'GBP', 'CHF', 'NOK', 'BTC');
  CREATE TYPE "public"."enum_rentals_installment_currency" AS ENUM('PLN', 'USD', 'EUR', 'GBP', 'CHF', 'NOK', 'BTC');
  CREATE TYPE "public"."enum_rentals_status" AS ENUM('Provisional', 'Offer Sent', 'Confirmed', 'In Progress', 'Completed', 'Rejected');
  CREATE TABLE IF NOT EXISTS "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "customers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"personal_data_email" varchar NOT NULL,
  	"personal_data_gender" "enum_customers_personal_data_gender" NOT NULL,
  	"personal_data_full_name" varchar,
  	"personal_data_phone_number" varchar,
  	"personal_data_address" varchar,
  	"personal_data_pesel" varchar,
  	"personal_data_id_number" varchar,
  	"driving_license_series_and_number" varchar,
  	"driving_license_blank_number" varchar,
  	"driving_license_issue_date" timestamp(3) with time zone,
  	"driving_license_expiration_date" timestamp(3) with time zone,
  	"driving_license_issuing_authority" varchar,
  	"invoice_details_company_name" varchar,
  	"invoice_details_nip" varchar,
  	"invoice_details_address" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "rentals_caveats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" varchar
  );

  CREATE TABLE IF NOT EXISTS "rentals" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"customer_id" integer NOT NULL,
  	"additional_driver_id" integer,
  	"car_id" integer NOT NULL,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone NOT NULL,
  	"rental_currency" "enum_rentals_rental_currency" DEFAULT 'PLN' NOT NULL,
  	"rental_price" numeric DEFAULT 0 NOT NULL,
  	"deposit_currency" "enum_rentals_deposit_currency" DEFAULT 'PLN' NOT NULL,
  	"deposit_amount" numeric DEFAULT 5000 NOT NULL,
  	"installment_currency" "enum_rentals_installment_currency" DEFAULT 'PLN' NOT NULL,
  	"installment_amount" numeric,
  	"installment_date" timestamp(3) with time zone,
  	"pick_up_address" varchar DEFAULT 'ul. Krótka 2/2, Dębgórze-Wybudowanie 84-230 (siedziba)' NOT NULL,
  	"return_address" varchar DEFAULT 'ul. Krótka 2/2, Dębgórze-Wybudowanie 84-230 (siedziba)' NOT NULL,
  	"mileage_limit" numeric DEFAULT 500 NOT NULL,
  	"mileage_before" numeric DEFAULT 0 NOT NULL,
  	"mileage_after" numeric DEFAULT 0 NOT NULL,
  	"status" "enum_rentals_status" DEFAULT 'Provisional' NOT NULL,
  	"customer_signature_j_s_o_n" jsonb,
  	"employee_signature_j_s_o_n" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "contract_templates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"template" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "car_fleet_brands" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "car_fleet_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "car_fleet_reminders" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"days_before_notification" numeric DEFAULT 7 NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "car_fleet_media_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );

  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"customers_id" integer,
  	"rentals_id" integer,
  	"contract_templates_id" integer,
  	"contact_request_id" integer,
  	"media_id" integer,
  	"car_fleet_brands_id" integer,
  	"car_fleet_types_id" integer,
  	"car_fleet_id" integer
  );

  CREATE TABLE IF NOT EXISTS "contract_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"vehicle_pick_up_id" integer NOT NULL,
  	"vehicle_release_id" integer NOT NULL,
  	"vehicle_rental_id" integer NOT NULL,
  	"vehicle_rental_authorized_id" integer NOT NULL,
  	"layout_header" varchar NOT NULL,
  	"layout_footer" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE IF NOT EXISTS "realizations_section_realizations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "realizations_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Realizacje z udziałem naszych samochodów' NOT NULL,
  	"label" varchar DEFAULT 'Realizacje',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE IF NOT EXISTS "about_us_header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'O Golden Lynx Cars' NOT NULL,
  	"label" varchar DEFAULT 'O Firmie',
  	"content" varchar DEFAULT 'W Golden Lynx cars cenimy zaufanie - dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' NOT NULL,
  	"sub_content" varchar DEFAULT 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE IF NOT EXISTS "about_us_overview" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_id" integer NOT NULL,
  	"title" varchar DEFAULT 'Misja i Wizja' NOT NULL,
  	"sub_title" varchar DEFAULT 'W Golden Lynx cars cenimy zaufanie - dolor sit amet, consectetur adipiscing' NOT NULL,
  	"content" varchar DEFAULT 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE IF NOT EXISTS "about_us_statistics" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Nasza firma w liczbach' NOT NULL,
  	"label" varchar DEFAULT 'Budujemy Zaufanie',
  	"statistics_clients" numeric DEFAULT 142 NOT NULL,
  	"statistics_kilometers" numeric DEFAULT 780 NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE IF NOT EXISTS "about_us_team_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"first_name" varchar NOT NULL,
  	"description" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "about_us_team" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Kto stoi za Golden Lynx Cars' NOT NULL,
  	"label" varchar DEFAULT 'Właściciele',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE IF NOT EXISTS "car_fleet_header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Flota Samochodów' NOT NULL,
  	"label" varchar DEFAULT 'Samochody',
  	"content" varchar DEFAULT 'W Golden Lynx cars cenimy zaufanie - dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' NOT NULL,
  	"sub_content" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE IF NOT EXISTS "rental_calculator_header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Kalkulator Najmu' NOT NULL,
  	"label" varchar DEFAULT 'Wycena',
  	"content" varchar DEFAULT 'Jeśli zastanawiasz się ile zapłacisz za wynajem u nas tp  ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.' NOT NULL,
  	"sub_content" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE IF NOT EXISTS "shop_header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Nasz Merch' NOT NULL,
  	"label" varchar DEFAULT 'Merch',
  	"content" varchar DEFAULT 'W Golden Lynx cars cenimy zaufanie - dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' NOT NULL,
  	"sub_content" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE IF NOT EXISTS "vip_transfer_header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Oferta transferów VIP' NOT NULL,
  	"label" varchar DEFAULT 'Transfery',
  	"content" varchar DEFAULT 'Twój pobyt w Warszawie zaczyna się od momentu wylądowania na lotnisku? Chcesz, aby ten moment był równie wyjątkowy jak reszta Twojej podróży?' NOT NULL,
  	"sub_content" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE IF NOT EXISTS "vip_transfer_content_why_worth_needments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "vip_transfer_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"service_description_media_id" integer NOT NULL,
  	"service_description_title" varchar DEFAULT 'Opis usługi' NOT NULL,
  	"service_description_content" varchar DEFAULT 'Dysponujemy szerokim wyborem ekskluzywnych samochodów, które spełnią najbardziej wymagające oczekiwania. Bez względu na to, czy potrzebujesz eleganckiej limuzyny czy szybkiego sportowego auta, mamy odpowiedni pojazd, który podkreśli Twój styl i nadaje się do Twoich potrzeb.' NOT NULL,
  	"why_worth_title" varchar DEFAULT 'Dlaczego warto?' NOT NULL,
  	"why_worth_description" varchar DEFAULT 'Dysponujemy szerokim wyborem ekskluzywnych samochodów, które spełnią najbardziej wymagające oczekiwania:' NOT NULL,
  	"process_media_id" integer NOT NULL,
  	"process_title" varchar DEFAULT 'Jak wygląda proces?' NOT NULL,
  	"process_content" varchar DEFAULT 'Dysponujemy szerokim wyborem ekskluzywnych samochodów, które spełnią najbardziej wymagające oczekiwania. Bez względu na to, czy potrzebujesz eleganckiej limuzyny czy szybkiego sportowego auta, mamy odpowiedni pojazd, który podkreśli Twój styl i nadaje się do Twoich potrzeb.' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE IF NOT EXISTS "investor_model_header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Model Inwestorski' NOT NULL,
  	"label" varchar DEFAULT 'Inwestowanie',
  	"content" varchar DEFAULT 'Dołącz do Golden Lynx Cars i zacznij zarabiać, udostępniając swój pojazd na naszej platformie.' NOT NULL,
  	"sub_content" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE IF NOT EXISTS "investor_model_content_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"content" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "investor_model_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer NOT NULL,
  	"description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  CREATE TABLE IF NOT EXISTS "rentals_schedule" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );

  ALTER TABLE "car_fleet" ADD COLUMN "slug" varchar NOT NULL;
  ALTER TABLE "car_fleet" ADD COLUMN "brand_id" integer NOT NULL;
  ALTER TABLE "car_fleet" ADD COLUMN "model" varchar NOT NULL;
  ALTER TABLE "car_fleet" ADD COLUMN "description" varchar DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' NOT NULL;
  ALTER TABLE "car_fleet" ADD COLUMN "type_id" integer NOT NULL;
  ALTER TABLE "car_fleet" ADD COLUMN "deposit" numeric DEFAULT 0 NOT NULL;
  ALTER TABLE "car_fleet" ADD COLUMN "additional_mileage_price" numeric DEFAULT 0 NOT NULL;
  ALTER TABLE "car_fleet" ADD COLUMN "contract_registration_number" varchar;
  ALTER TABLE "car_fleet" ADD COLUMN "contract_registration_certificate_number" varchar;
  ALTER TABLE "car_fleet" ADD COLUMN "contract_vin" varchar;
  ALTER TABLE "car_fleet" ADD COLUMN "contract_oc" varchar;
  ALTER TABLE "car_fleet" ADD COLUMN "contract_keys_amount" numeric DEFAULT 1 NOT NULL;
  ALTER TABLE "car_fleet" ADD COLUMN "contract_tires" varchar;
  ALTER TABLE "car_fleet" ADD COLUMN "contract_accessories" varchar;
  ALTER TABLE "car_fleet" ADD COLUMN "media_info_id" integer;
  ALTER TABLE "car_fleet" ADD COLUMN "media_rental_price_id" integer;
  ALTER TABLE "car_fleet" ADD COLUMN "prices_d_1_2" numeric NOT NULL;
  ALTER TABLE "car_fleet" ADD COLUMN "prices_d_3_6" numeric NOT NULL;
  ALTER TABLE "car_fleet" ADD COLUMN "prices_d_7_13" numeric NOT NULL;
  ALTER TABLE "car_fleet" ADD COLUMN "prices_d_14_20" numeric NOT NULL;
  ALTER TABLE "car_fleet" ADD COLUMN "prices_d_21_30" numeric NOT NULL;
  ALTER TABLE "car_fleet" ADD COLUMN "prices_m_1" numeric NOT NULL;
  ALTER TABLE "car_fleet" ADD COLUMN "prices_m_3" numeric NOT NULL;
  ALTER TABLE "car_fleet" ADD COLUMN "mileage_limits_d_1_2" numeric DEFAULT 0 NOT NULL;
  ALTER TABLE "car_fleet" ADD COLUMN "mileage_limits_d_3_6" numeric DEFAULT 0 NOT NULL;
  ALTER TABLE "car_fleet" ADD COLUMN "mileage_limits_d_7_13" numeric DEFAULT 0 NOT NULL;
  ALTER TABLE "car_fleet" ADD COLUMN "mileage_limits_d_14_20" numeric DEFAULT 0 NOT NULL;
  ALTER TABLE "car_fleet" ADD COLUMN "mileage_limits_d_21_30" numeric DEFAULT 0 NOT NULL;
  ALTER TABLE "car_fleet" ADD COLUMN "mileage_limits_m_1" numeric DEFAULT 0 NOT NULL;
  ALTER TABLE "car_fleet" ADD COLUMN "mileage_limits_m_3" numeric DEFAULT 0 NOT NULL;
  ALTER TABLE "users" ADD COLUMN "full_name" varchar NOT NULL;
  ALTER TABLE "users" ADD COLUMN "phone_number" varchar NOT NULL;
  ALTER TABLE "services_section" ADD COLUMN "reel_section_title" varchar DEFAULT 'Obejrzyj REEL' NOT NULL;
  ALTER TABLE "services_section" ADD COLUMN "reel_section_label" varchar DEFAULT 'REEL';
  ALTER TABLE "services_section" ADD COLUMN "reel_section_video_id" integer NOT NULL;
  ALTER TABLE "services_section" ADD COLUMN "reel_section_is_hidden" boolean DEFAULT false NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "rentals_caveats" ADD CONSTRAINT "rentals_caveats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rentals"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "rentals" ADD CONSTRAINT "rentals_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "rentals" ADD CONSTRAINT "rentals_additional_driver_id_customers_id_fk" FOREIGN KEY ("additional_driver_id") REFERENCES "public"."customers"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "rentals" ADD CONSTRAINT "rentals_car_id_car_fleet_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."car_fleet"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "car_fleet_reminders" ADD CONSTRAINT "car_fleet_reminders_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."car_fleet"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "car_fleet_media_gallery" ADD CONSTRAINT "car_fleet_media_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "car_fleet_media_gallery" ADD CONSTRAINT "car_fleet_media_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."car_fleet"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_customers_fk" FOREIGN KEY ("customers_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rentals_fk" FOREIGN KEY ("rentals_id") REFERENCES "public"."rentals"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contract_templates_fk" FOREIGN KEY ("contract_templates_id") REFERENCES "public"."contract_templates"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_request_fk" FOREIGN KEY ("contact_request_id") REFERENCES "public"."contact_request"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_car_fleet_brands_fk" FOREIGN KEY ("car_fleet_brands_id") REFERENCES "public"."car_fleet_brands"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_car_fleet_types_fk" FOREIGN KEY ("car_fleet_types_id") REFERENCES "public"."car_fleet_types"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_car_fleet_fk" FOREIGN KEY ("car_fleet_id") REFERENCES "public"."car_fleet"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contract_settings" ADD CONSTRAINT "contract_settings_vehicle_pick_up_id_contract_templates_id_fk" FOREIGN KEY ("vehicle_pick_up_id") REFERENCES "public"."contract_templates"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contract_settings" ADD CONSTRAINT "contract_settings_vehicle_release_id_contract_templates_id_fk" FOREIGN KEY ("vehicle_release_id") REFERENCES "public"."contract_templates"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contract_settings" ADD CONSTRAINT "contract_settings_vehicle_rental_id_contract_templates_id_fk" FOREIGN KEY ("vehicle_rental_id") REFERENCES "public"."contract_templates"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contract_settings" ADD CONSTRAINT "contract_settings_vehicle_rental_authorized_id_contract_templates_id_fk" FOREIGN KEY ("vehicle_rental_authorized_id") REFERENCES "public"."contract_templates"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "realizations_section_realizations" ADD CONSTRAINT "realizations_section_realizations_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "realizations_section_realizations" ADD CONSTRAINT "realizations_section_realizations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."realizations_section"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_us_overview" ADD CONSTRAINT "about_us_overview_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_us_team_team" ADD CONSTRAINT "about_us_team_team_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "about_us_team_team" ADD CONSTRAINT "about_us_team_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_us_team"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "vip_transfer_content_why_worth_needments" ADD CONSTRAINT "vip_transfer_content_why_worth_needments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vip_transfer_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "vip_transfer_content" ADD CONSTRAINT "vip_transfer_content_service_description_media_id_media_id_fk" FOREIGN KEY ("service_description_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "vip_transfer_content" ADD CONSTRAINT "vip_transfer_content_process_media_id_media_id_fk" FOREIGN KEY ("process_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "investor_model_content_steps" ADD CONSTRAINT "investor_model_content_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."investor_model_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "investor_model_content" ADD CONSTRAINT "investor_model_content_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "customers_updated_at_idx" ON "customers" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "customers_created_at_idx" ON "customers" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "rentals_caveats_order_idx" ON "rentals_caveats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "rentals_caveats_parent_id_idx" ON "rentals_caveats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "rentals_customer_idx" ON "rentals" USING btree ("customer_id");
  CREATE INDEX IF NOT EXISTS "rentals_additional_driver_idx" ON "rentals" USING btree ("additional_driver_id");
  CREATE INDEX IF NOT EXISTS "rentals_car_idx" ON "rentals" USING btree ("car_id");
  CREATE INDEX IF NOT EXISTS "rentals_updated_at_idx" ON "rentals" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "rentals_created_at_idx" ON "rentals" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "contract_templates_updated_at_idx" ON "contract_templates" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "contract_templates_created_at_idx" ON "contract_templates" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "car_fleet_reminders_order_idx" ON "car_fleet_reminders" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "car_fleet_reminders_parent_id_idx" ON "car_fleet_reminders" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "car_fleet_media_gallery_order_idx" ON "car_fleet_media_gallery" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "car_fleet_media_gallery_parent_id_idx" ON "car_fleet_media_gallery" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "car_fleet_media_gallery_image_idx" ON "car_fleet_media_gallery" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_customers_id_idx" ON "payload_locked_documents_rels" USING btree ("customers_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_rentals_id_idx" ON "payload_locked_documents_rels" USING btree ("rentals_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_contract_templates_id_idx" ON "payload_locked_documents_rels" USING btree ("contract_templates_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_contact_request_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_request_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_car_fleet_brands_id_idx" ON "payload_locked_documents_rels" USING btree ("car_fleet_brands_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_car_fleet_types_id_idx" ON "payload_locked_documents_rels" USING btree ("car_fleet_types_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_car_fleet_id_idx" ON "payload_locked_documents_rels" USING btree ("car_fleet_id");
  CREATE INDEX IF NOT EXISTS "contract_settings_vehicle_pick_up_idx" ON "contract_settings" USING btree ("vehicle_pick_up_id");
  CREATE INDEX IF NOT EXISTS "contract_settings_vehicle_release_idx" ON "contract_settings" USING btree ("vehicle_release_id");
  CREATE INDEX IF NOT EXISTS "contract_settings_vehicle_rental_idx" ON "contract_settings" USING btree ("vehicle_rental_id");
  CREATE INDEX IF NOT EXISTS "contract_settings_vehicle_rental_authorized_idx" ON "contract_settings" USING btree ("vehicle_rental_authorized_id");
  CREATE INDEX IF NOT EXISTS "realizations_section_realizations_order_idx" ON "realizations_section_realizations" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "realizations_section_realizations_parent_id_idx" ON "realizations_section_realizations" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "realizations_section_realizations_video_idx" ON "realizations_section_realizations" USING btree ("video_id");
  CREATE INDEX IF NOT EXISTS "about_us_overview_video_idx" ON "about_us_overview" USING btree ("video_id");
  CREATE INDEX IF NOT EXISTS "about_us_team_team_order_idx" ON "about_us_team_team" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_us_team_team_parent_id_idx" ON "about_us_team_team" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_us_team_team_image_idx" ON "about_us_team_team" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "vip_transfer_content_why_worth_needments_order_idx" ON "vip_transfer_content_why_worth_needments" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "vip_transfer_content_why_worth_needments_parent_id_idx" ON "vip_transfer_content_why_worth_needments" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "vip_transfer_content_service_description_service_description_media_idx" ON "vip_transfer_content" USING btree ("service_description_media_id");
  CREATE INDEX IF NOT EXISTS "vip_transfer_content_process_process_media_idx" ON "vip_transfer_content" USING btree ("process_media_id");
  CREATE INDEX IF NOT EXISTS "investor_model_content_steps_order_idx" ON "investor_model_content_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "investor_model_content_steps_parent_id_idx" ON "investor_model_content_steps" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "investor_model_content_media_idx" ON "investor_model_content" USING btree ("media_id");
  DO $$ BEGIN
   ALTER TABLE "car_fleet" ADD CONSTRAINT "car_fleet_brand_id_car_fleet_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."car_fleet_brands"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "car_fleet" ADD CONSTRAINT "car_fleet_type_id_car_fleet_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."car_fleet_types"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "car_fleet" ADD CONSTRAINT "car_fleet_media_info_id_media_id_fk" FOREIGN KEY ("media_info_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "car_fleet" ADD CONSTRAINT "car_fleet_media_rental_price_id_media_id_fk" FOREIGN KEY ("media_rental_price_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "services_section" ADD CONSTRAINT "services_section_reel_section_video_id_media_id_fk" FOREIGN KEY ("reel_section_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "contact_request_car_idx" ON "contact_request" USING btree ("car_id");
  CREATE INDEX IF NOT EXISTS "contact_request_updated_at_idx" ON "contact_request" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "car_fleet_image_idx" ON "car_fleet" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "car_fleet_brand_idx" ON "car_fleet" USING btree ("brand_id");
  CREATE INDEX IF NOT EXISTS "car_fleet_type_idx" ON "car_fleet" USING btree ("type_id");
  CREATE INDEX IF NOT EXISTS "car_fleet_media_media_info_idx" ON "car_fleet" USING btree ("media_info_id");
  CREATE INDEX IF NOT EXISTS "car_fleet_media_media_rental_price_idx" ON "car_fleet" USING btree ("media_rental_price_id");
  CREATE INDEX IF NOT EXISTS "car_fleet_updated_at_idx" ON "car_fleet" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "services_section_reel_section_reel_section_video_idx" ON "services_section" USING btree ("reel_section_video_id");
  CREATE INDEX IF NOT EXISTS "car_fleet_section_rels_car_fleet_id_idx" ON "car_fleet_section_rels" USING btree ("car_fleet_id");
  CREATE INDEX IF NOT EXISTS "opinion_section_opinions_image_idx" ON "opinion_section_opinions" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "faq_section_images_image_idx" ON "faq_section_images" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "contact_section_image_idx" ON "contact_section" USING btree ("image_id");
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "price";`);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
	await payload.db.drizzle.execute(sql`
   DROP TABLE "users_roles";
  DROP TABLE "customers";
  DROP TABLE "rentals_caveats";
  DROP TABLE "rentals";
  DROP TABLE "contract_templates";
  DROP TABLE "car_fleet_brands";
  DROP TABLE "car_fleet_types";
  DROP TABLE "car_fleet_reminders";
  DROP TABLE "car_fleet_media_gallery";
  DROP TABLE "payload_locked_documents";
  DROP TABLE "payload_locked_documents_rels";
  DROP TABLE "contract_settings";
  DROP TABLE "realizations_section_realizations";
  DROP TABLE "realizations_section";
  DROP TABLE "about_us_header";
  DROP TABLE "about_us_overview";
  DROP TABLE "about_us_statistics";
  DROP TABLE "about_us_team_team";
  DROP TABLE "about_us_team";
  DROP TABLE "car_fleet_header";
  DROP TABLE "rental_calculator_header";
  DROP TABLE "shop_header";
  DROP TABLE "vip_transfer_header";
  DROP TABLE "vip_transfer_content_why_worth_needments";
  DROP TABLE "vip_transfer_content";
  DROP TABLE "investor_model_header";
  DROP TABLE "investor_model_content_steps";
  DROP TABLE "investor_model_content";
  DROP TABLE "rentals_schedule";
  ALTER TABLE "car_fleet" DROP CONSTRAINT "car_fleet_brand_id_car_fleet_brands_id_fk";
  
  ALTER TABLE "car_fleet" DROP CONSTRAINT "car_fleet_type_id_car_fleet_types_id_fk";
  
  ALTER TABLE "car_fleet" DROP CONSTRAINT "car_fleet_media_info_id_media_id_fk";
  
  ALTER TABLE "car_fleet" DROP CONSTRAINT "car_fleet_media_rental_price_id_media_id_fk";
  
  ALTER TABLE "services_section" DROP CONSTRAINT "services_section_reel_section_video_id_media_id_fk";
  
  DROP INDEX IF EXISTS "users_updated_at_idx";
  DROP INDEX IF EXISTS "contact_request_car_idx";
  DROP INDEX IF EXISTS "contact_request_updated_at_idx";
  DROP INDEX IF EXISTS "media_updated_at_idx";
  DROP INDEX IF EXISTS "car_fleet_image_idx";
  DROP INDEX IF EXISTS "car_fleet_brand_idx";
  DROP INDEX IF EXISTS "car_fleet_type_idx";
  DROP INDEX IF EXISTS "car_fleet_media_media_info_idx";
  DROP INDEX IF EXISTS "car_fleet_media_media_rental_price_idx";
  DROP INDEX IF EXISTS "car_fleet_updated_at_idx";
  DROP INDEX IF EXISTS "payload_preferences_updated_at_idx";
  DROP INDEX IF EXISTS "payload_preferences_rels_users_id_idx";
  DROP INDEX IF EXISTS "payload_migrations_updated_at_idx";
  DROP INDEX IF EXISTS "contact_section_image_idx";
  DROP INDEX IF EXISTS "services_section_reel_section_reel_section_video_idx";
  DROP INDEX IF EXISTS "car_fleet_section_rels_car_fleet_id_idx";
  DROP INDEX IF EXISTS "opinion_section_opinions_image_idx";
  DROP INDEX IF EXISTS "faq_section_images_image_idx";
  ALTER TABLE "car_fleet" ADD COLUMN "price" numeric NOT NULL;
  ALTER TABLE "users" DROP COLUMN IF EXISTS "full_name";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "phone_number";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "slug";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "brand_id";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "model";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "type_id";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "deposit";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "additional_mileage_price";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "contract_registration_number";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "contract_registration_certificate_number";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "contract_vin";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "contract_oc";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "contract_keys_amount";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "contract_tires";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "contract_accessories";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "media_info_id";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "media_rental_price_id";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "prices_d_1_2";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "prices_d_3_6";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "prices_d_7_13";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "prices_d_14_20";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "prices_d_21_30";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "prices_m_1";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "prices_m_3";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "mileage_limits_d_1_2";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "mileage_limits_d_3_6";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "mileage_limits_d_7_13";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "mileage_limits_d_14_20";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "mileage_limits_d_21_30";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "mileage_limits_m_1";
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "mileage_limits_m_3";
  ALTER TABLE "services_section" DROP COLUMN IF EXISTS "reel_section_title";
  ALTER TABLE "services_section" DROP COLUMN IF EXISTS "reel_section_label";
  ALTER TABLE "services_section" DROP COLUMN IF EXISTS "reel_section_video_id";
  ALTER TABLE "services_section" DROP COLUMN IF EXISTS "reel_section_is_hidden";
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_customers_personal_data_gender";
  DROP TYPE "public"."enum_rentals_rental_currency";
  DROP TYPE "public"."enum_rentals_deposit_currency";
  DROP TYPE "public"."enum_rentals_installment_currency";
  DROP TYPE "public"."enum_rentals_status";`);
}
