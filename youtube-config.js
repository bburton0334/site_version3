// YouTube Configuration
// Replace these values with your actual YouTube channel information

const YOUTUBE_CONFIG = {
    // Your YouTube channel handle (e.g., '@Sayintt')
    channelHandle: '@Sayintt',
    
    // Your YouTube channel ID (optional, but recommended for better performance)
    // To find your channel ID:
    // 1. Go to your YouTube channel
    // 2. Right-click and "View Page Source"
    // 3. Search for "channelId" - it will look like "UC1234567890abcdef"
    channelId: 'UCYTGs8bEMh7jNl0O8CDuI1w', // Replace with your actual channel ID
    
    // YouTube Data API key (optional, but provides more data like duration and view counts)
    // To get an API key:
    // 1. Go to https://console.cloud.google.com/
    // 2. Create a new project or select existing one
    // 3. Enable YouTube Data API v3
    // 4. Create credentials (API key)
    // 5. Copy the API key here
    apiKey: null, // Replace with your actual API key
    
    // Number of videos to display
    maxResults: 12,
    
    // Enable/disable different methods
    enableRSS: true,      // RSS feed method (no API key required)
    enableAPI: false,     // YouTube Data API method (requires API key)
    enableScraping: true  // Web scraping fallback method
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = YOUTUBE_CONFIG;
} 