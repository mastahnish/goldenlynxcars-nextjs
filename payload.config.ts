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
import { ContractTemplates } from '@/payload/collections/dashboard/ContractTemplates';
import { Customers } from '@/payload/collections/dashboard/Customers';
import { Rentals } from '@/payload/collections/dashboard/Rentals/Rentals';
import { RentalsSchedule } from '@/payload/collections/dashboard/RentalsSchedule/RentalsSchedule';
import { Media } from '@/payload/collections/Media';
import { Users } from '@/payload/collections/Users/Users';
import { AboutUsHeader } from '@/payload/globals/about-us/AboutUsHeader';
import { AboutUsOverview } from '@/payload/globals/about-us/AboutUsOverview';
import { AboutUsStatistics } from '@/payload/globals/about-us/AboutUsStatistics';
import { AboutUsTeam } from '@/payload/globals/about-us/AboutUsTeam';
import { CarFleetBrands } from '@/payload/globals/car-fieet/CarFleetBrands';
import { CarFleetHeader } from '@/payload/globals/car-fieet/CarFleetHeader';
import { CarFleetTypes } from '@/payload/globals/car-fieet/CarFleetTypes';
import { CarSubscriptionContent } from '@/payload/globals/car-subscription/CarSubscriptionContent';
import { CarSubscriptionHeader } from '@/payload/globals/car-subscription/CarSubscriptionHeader';
import { ContactHeader } from '@/payload/globals/contact/ContactHeader';
import { ContactSection } from '@/payload/globals/contact/ContactSection';
import { ContractSettings } from '@/payload/globals/dashboard/ContractSettings';
import { InvestorModelContent } from '@/payload/globals/investor-model/InvestorModelContent';
import { InvestorModelHeader } from '@/payload/globals/investor-model/InvestorModelHeader';
import { CarFleetSection } from '@/payload/globals/landing/CarFleetSection';
import { FAQSection } from '@/payload/globals/landing/FAQSection';
import { Hero } from '@/payload/globals/landing/Hero';
import { OpinionSection } from '@/payload/globals/landing/OpinionSection';
import { RealizationsSection } from '@/payload/globals/landing/RealizationsSection';
import { ServicesSection } from '@/payload/globals/landing/ServicesSection';
import { RentalCalculatorHeader } from '@/payload/globals/rental-calculator/RentalCalculatorHeader';
import { ShopHeader } from '@/payload/globals/ShopHeader';
import { VIPTransferContent } from '@/payload/globals/vip-transfer/VIPTransferContent';
import { VIPTransferHeader } from '@/payload/globals/vip-transfer/VIPTransferHeader';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
	admin: {
		user: Users.slug,
	},
	collections: [
		Users,
		Customers,
		Rentals,
		ContractTemplates,
		ContactRequest,
		Media,
		CarFleetBrands,
		CarFleetTypes,
		CarFleet,
	],
	globals: [
		ContactHeader,
		ContractSettings,
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
		RentalCalculatorHeader,
		ShopHeader,
		VIPTransferHeader,
		VIPTransferContent,
		InvestorModelHeader,
		InvestorModelContent,
		RentalsSchedule,
		CarSubscriptionHeader,
		CarSubscriptionContent,
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
