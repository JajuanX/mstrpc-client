/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['driven-prod-bucket.s3.us-east-1.amazonaws.com'],
	},
	
};

export default nextConfig;
