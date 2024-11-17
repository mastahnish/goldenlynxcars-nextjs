import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	client: {
		NEXT_PUBLIC_SERVER_BASE_URL: z.string().url(),
		NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
	},
	server: {
		NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
		DATABASE_URL: z.string(),
		PAYLOAD_SECRET: z.string(),
		STRIPE_SECRET_KEY: z.string(),
		STRIPE_WEBHOOKS_ENDPOINT_SECRET: z.string(),
		GCS_BUCKET: z.string(),
		GCS_ENDPOINT: z.string().url(),
		GCS_PROJECT_ID: z.string(),
		GCS_CREDENTIALS: z.string().refine(
			value => {
				try {
					JSON.parse(value);
					return true;
				} catch {
					return false;
				}
			},
			{ message: 'Invalid JSON' },
		),
		EMAIL_SERVICE: z.string(),
		EMAIL_USERNAME: z.string(),
		EMAIL_PASSWORD: z.string(),
		CONTACT_TARGET_EMAIL: z.string(),
		GOOGLE_PLACES_API_KEY: z.string(),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_SERVER_BASE_URL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
		NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
			process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
	},
});
