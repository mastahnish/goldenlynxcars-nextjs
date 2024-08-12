const path = require('node:path');

module.exports = {
	'*.{js,mjs,css,json,md}': ['prettier -w'],
	'*.{ts,mts,tsx}': [
		filenames =>
			`next lint --fix --file ${filenames
				.map(file => path.relative(process.cwd(), file))
				.join(' --file ')}`,
	],
};
