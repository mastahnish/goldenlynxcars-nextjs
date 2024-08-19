import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { anyone } from '../access/anyone';

import type { CollectionConfig } from 'payload';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const Media: CollectionConfig = {
	slug: 'media',
	fields: [
		{
			name: 'alt',
			type: 'text',
			required: true,
		},
	],
	access: {
		read: anyone,
	},
	upload: true,
};
