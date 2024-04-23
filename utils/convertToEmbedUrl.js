export default function convertToEmbedUrl(appleMusicUrl) {
    // Check if the URL is a valid Apple Music URL
    if (appleMusicUrl.includes('https://music.apple.com/')) {
        // Replace 'music.apple.com' with 'embed.music.apple.com'
        return appleMusicUrl.replace('music.apple.com', 'embed.music.apple.com');
    } else {
        // Return an error message if the URL is not a valid Apple Music URL
        return '';
    }
}