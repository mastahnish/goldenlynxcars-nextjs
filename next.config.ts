import { withPayload } from '@payloadcms/next/withPayload';

import { env } from './src/lib/env';

import type { NextConfig } from 'next';

const mediaURL = new URL(env.NEXT_PUBLIC_SERVER_BASE_URL);

const config: NextConfig = {
	experimental: {
		typedRoutes: true,
	},
	images: {
		remotePatterns: [
			{ hostname: 'files.stripe.com' },
			{ hostname: mediaURL.hostname },
		],
	},
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	webpack: config => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const fileLoaderRule = config.module.rules.find((rule: any) =>
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

export default withPayload(config);
