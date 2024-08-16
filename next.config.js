import { fileURLToPath } from 'node:url';

import { withPayload } from '@payloadcms/next/withPayload';
import createJiti from 'jiti';

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti('./src/lib/env.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		ppr: true,
		reactCompiler: true,
		typedRoutes: true,
	},
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	webpack: config => {
		const fileLoaderRule = config.module.rules.find(rule =>
			rule.test?.test?.('.svg'),
		);

		config.module.rules.push(
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/,
			},
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
				use: ['@svgr/webpack'],
			},
		);

		fileLoaderRule.exclude = /\.svg$/i;

		return config;
	},
};

export default withPayload(nextConfig);
