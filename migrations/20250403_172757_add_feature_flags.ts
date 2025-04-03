import { sql } from '@payloadcms/db-postgres';

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
	await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "flags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_shop_enabled" boolean DEFAULT true NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
	await db.execute(sql`
   DROP TABLE "flags" CASCADE;`);
}
