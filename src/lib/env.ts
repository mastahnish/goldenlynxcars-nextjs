import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	client: {
		NEXT_PUBLIC_MEDIA_BASE_URL: z.string().url(),
	},
	server: {
		NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
		DATABASE_URL: z.string(),
		PAYLOAD_SECRET: z.string(),
		BLOB_READ_WRITE_TOKEN: z.string(),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_MEDIA_BASE_URL: process.env.NEXT_PUBLIC_MEDIA_BASE_URL,
	},
});
