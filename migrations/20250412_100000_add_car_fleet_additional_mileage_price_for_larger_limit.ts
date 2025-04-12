import { sql } from '@payloadcms/db-postgres';

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
	await db.execute(sql`
   ALTER TABLE "car_fleet" ALTER COLUMN "additional_mileage_price" SET DEFAULT 1;
  ALTER TABLE "car_fleet" ADD COLUMN "additional_mileage_price_for_larger_limit" numeric DEFAULT 1 NOT NULL;`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
	await db.execute(sql`
   ALTER TABLE "car_fleet" ALTER COLUMN "additional_mileage_price" SET DEFAULT 0;
  ALTER TABLE "car_fleet" DROP COLUMN IF EXISTS "additional_mileage_price_for_larger_limit";`);
}
