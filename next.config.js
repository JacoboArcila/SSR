/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["ecran.s3.amazonaws.com", "hydramovies.com"],
	},
	async rewrites() {
		return [
			{
				source: "/:any*",
				destination: "/",
			},
		];
	},
};

module.exports = nextConfig;
