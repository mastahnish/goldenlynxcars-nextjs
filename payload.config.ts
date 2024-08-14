import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { postgresAdapter } from '@payloadcms/db-postgres';
import { slateEditor } from '@payloadcms/richtext-slate';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { env } from '@/lib/env';
import { Hero } from '@/payload/globals/Hero/Hero';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
	globals: [Hero],
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
});
