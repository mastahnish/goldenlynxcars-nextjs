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
};

export default nextConfig;
