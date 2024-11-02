import { fileURLToPath } from 'node:url';

import { withPayload } from '@payloadcms/next/withPayload';
import createJiti from 'jiti';

const jiti = createJiti(fileURLToPath(import.meta.url));

const { env } = jiti('./src/lib/env.ts');

const mediaURL = new URL(env.NEXT_PUBLIC_SERVER_BASE_URL);

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		ppr: true,
		typedRoutes: true,
	},
	images: {
		remotePatterns: [
			{ hostname: 'files.stripe.com' },
			{
				protocol: mediaURL.protocol.slice(0, -1),
				hostname: mediaURL.hostname,
			},
		],
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
