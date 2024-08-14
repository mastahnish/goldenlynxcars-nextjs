import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	client: {},
	server: {
		NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
		DATABASE_URL: z.string(),
		PAYLOAD_SECRET: z.string(),
	},
	experimental__runtimeEnv: {},
});
