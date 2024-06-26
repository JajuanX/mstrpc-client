import Head from 'next/head';

function CustomHead({ displayName, imageUrl, description }) {
	return (
		<Head>
			<title>{displayName}</title>
			<meta name="description" content={description || "Generated by create next app"} />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/favicon.ico" />
			<link rel="apple-touch-icon" sizes="192x192" href={imageUrl || "/default-icon.png"} />

			{/* Open Graph / Facebook Meta Tags */}
			<meta property="og:title" content={displayName} />
			<meta property="og:description" content={description || "Generated by create next app"} />
			<meta property="og:type" content="website" />
			<meta property="og:image" content={imageUrl || "/default-image.jpg"} />
			<meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />

			{/* Twitter Card Meta Tags */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={displayName} />
			<meta name="twitter:description" content={description || "Generated by create next app"} />
			<meta name="twitter:image" content={imageUrl || "/default-image.jpg"} />

			{/* Meta Tags for X (formerly Twitter) */}
			<meta name="x:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
			<meta name="x:title" content={displayName} />
			<meta name="x:description" content={description || "Generated by create next app"} />
			<meta name="x:image" content={imageUrl || "/default-image.jpg"} />
		</Head>
	);
}
export default CustomHead;