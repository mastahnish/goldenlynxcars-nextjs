import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { postgresAdapter } from '@payloadcms/db-postgres';
import { slateEditor } from '@payloadcms/richtext-slate';
import { gcsStorage } from '@payloadcms/storage-gcs';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { env } from '@/lib/env';
import { CarFleet } from '@/payload/collections/CarFleet';
import { ContactRequest } from '@/payload/collections/ContactRequest/ContactRequest';
import { Media } from '@/payload/collections/Media';
import { AboutUsHeader } from '@/payload/globals/about-us/AboutUsHeader';
import { AboutUsOverview } from '@/payload/globals/about-us/AboutUsOverview';
import { AboutUsStatistics } from '@/payload/globals/about-us/AboutUsStatistics';
import { AboutUsTeam } from '@/payload/globals/about-us/AboutUsTeam';
import { CarFleetHeader } from '@/payload/globals/car-fieet/CarFleetHeader';
import { ContactSection } from '@/payload/globals/ContactSection';
import { CarFleetSection } from '@/payload/globals/landing/CarFleetSection';
import { FAQSection } from '@/payload/globals/landing/FAQSection';
import { Hero } from '@/payload/globals/landing/Hero';
import { OpinionSection } from '@/payload/globals/landing/OpinionSection';
import { RealizationsSection } from '@/payload/globals/landing/RealizationsSection';
import { ServicesSection } from '@/payload/globals/landing/ServicesSection';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
	collections: [ContactRequest, Media, CarFleet],
	globals: [
		ContactSection,
		Hero,
		ServicesSection,
		CarFleetSection,
		OpinionSection,
		RealizationsSection,
		FAQSection,
		AboutUsHeader,
		AboutUsOverview,
		AboutUsStatistics,
		AboutUsTeam,
		CarFleetHeader,
	],
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
