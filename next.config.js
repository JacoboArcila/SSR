/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		domains: ["ecran.s3.amazonaws.com", "hydramovies.com"],
	},
};

module.exports = nextConfig;
