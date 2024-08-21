import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	client: {
		NEXT_PUBLIC_SERVER_BASE_URL: z.string().url(),
	},
	server: {
		NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
		DATABASE_URL: z.string(),
		PAYLOAD_SECRET: z.string(),
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
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_SERVER_BASE_URL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
	},
});
