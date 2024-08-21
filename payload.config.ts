import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { postgresAdapter } from '@payloadcms/db-postgres';
import { slateEditor } from '@payloadcms/richtext-slate';
import { gcsStorage } from '@payloadcms/storage-gcs';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { env } from '@/lib/env';
import { CarFleet } from '@/payload/collections/CarFleet';
import { Media } from '@/payload/collections/Media';
import { CarFleetSection } from '@/payload/globals/CarFleetSection/CarFleetSection';
import { FAQSection } from '@/payload/globals/FAQSection/FAQSection';
import { Hero } from '@/payload/globals/Hero/Hero';
import { OpinionSection } from '@/payload/globals/OpinionSection/OpinionSection';
import { ServicesSection } from '@/payload/globals/ServicesSection/ServicesSection';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
	collections: [Media, CarFleet],
	globals: [Hero, ServicesSection, CarFleetSection, OpinionSection, FAQSection],
	editor: slateEditor({}),
	secret: env.PAYLOAD_SECRET,
	db: postgresAdapter({
		migrationDir: path.resolve(__dirname, 'migrations'),
		pool: {
			connectionString: env.DATABASE_URL,
		},
	}),
	typescript: {
		outputFile: path.resolve(__dirname, 'src', 'payload', 'payload-types.ts'),
	},
	sharp,
	plugins: [
		gcsStorage({
			collections: {
				[Media.slug]: true,
			},
			bucket: env.GCS_BUCKET,
			options: {
				apiEndpoint: env.GCS_ENDPOINT,
				projectId: env.GCS_PROJECT_ID,
				credentials: JSON.parse(env.GCS_CREDENTIALS),
			},
		}),
	],
});
