import path from 'node:path';

export default {
	'*.{js,mjs,css,json,md}': ['prettier -w'],
	'*.{ts,mts,tsx}': [
		filenames =>
			`next lint --fix --file ${filenames
				.map(file => path.relative(process.cwd(), file))
				.join(' --file ')}`,
	],
};
