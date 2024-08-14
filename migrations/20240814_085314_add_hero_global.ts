import { sql } from '@payloadcms/db-postgres';

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres';

export async function up({ payload }: MigrateUpArgs): Promise<void> {
	await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "hero" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_first_part" varchar DEFAULT 'Zmień' NOT NULL,
  	"title_second_part" varchar DEFAULT 'Perspektywę' NOT NULL,
  	"description" varchar DEFAULT 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis justo at consequat finibus. Sed sit amet tempor neque.' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  `);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
	await payload.db.drizzle.execute(sql`
   DROP TABLE "hero";`);
}
