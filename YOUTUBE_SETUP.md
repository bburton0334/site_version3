# YouTube Videos Integration Setup

This guide will help you configure the YouTube videos section to display your actual videos dynamically.

## Quick Setup (No API Key Required)

The videos section is already configured to work without an API key using RSS feeds and web scraping. However, to get the best results, you should:

### 1. Find Your YouTube Channel ID

1. Go to your YouTube channel: https://www.youtube.com/@Sayintt
2. Right-click on the page and select "View Page Source"
3. Press Ctrl+F (or Cmd+F on Mac) and search for "channelId"
4. Copy the channel ID (it will look like `UC1234567890abcdef`)

### 2. Update the Configuration

Open `youtube-config.js` and update the `channelId` field:

```javascript
const YOUTUBE_CONFIG = {
    channelHandle: '@Sayintt',
    channelId: 'UCYTGs8bEMh7jNl0O8CDuI1w', // Replace this
    // ... rest of config
};
```

## Advanced Setup (With API Key - Recommended)

For the best experience with video durations, view counts, and more reliable data:

### 1. Get a YouTube Data API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the "YouTube Data API v3"
4. Go to "Credentials" and create an API key
5. Copy the API key

### 2. Update Configuration

Open `youtube-config.js` and update:

```javascript
const YOUTUBE_CONFIG = {
    channelHandle: '@Sayintt',
    channelId: 'UCYTGs8bEMh7jNl0O8CDuI1w',
    apiKey: 'YOUR_API_KEY_HERE', // Add your API key
    maxResults: 12,
    enableRSS: true,
    enableAPI: true,  // Enable API method
    enableScraping: true
};
```

## Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| `channelHandle` | Your YouTube channel handle (e.g., '@Sayintt') | '@Sayintt' |
| `channelId` | Your YouTube channel ID (recommended) | 'UC123456789' |
| `apiKey` | YouTube Data API key (optional) | null |
| `maxResults` | Number of videos to display | 12 |
| `enableRSS` | Enable RSS feed method | true |
| `enableAPI` | Enable YouTube Data API method | false |
| `enableScraping` | Enable web scraping fallback | true |

## How It Works

The system tries multiple methods to fetch your videos:

1. **RSS Feed** (No API key required)
   - Uses YouTube's RSS feed
   - Basic video information
   - No duration or view counts

2. **YouTube Data API** (Requires API key)
   - Full video information
   - Duration, view counts, descriptions
   - Most reliable method

3. **Web Scraping** (Fallback)
   - Scrapes your channel page
   - Basic video information
   - Used when other methods fail

## Troubleshooting

### Videos Not Loading

1. Check your browser's console for errors
2. Verify your channel ID is correct
3. Make sure your channel is public
4. Try refreshing the page

### API Key Issues

1. Ensure the YouTube Data API v3 is enabled
2. Check that your API key is valid
3. Verify the API key has the correct permissions

### CORS Issues

The system uses a CORS proxy to avoid cross-origin issues. If you experience problems:

1. Check your internet connection
2. Try a different browser
3. Disable browser extensions that might interfere

## Security Notes

- Never commit your API key to version control
- Consider using environment variables for production
- The API key is only used client-side and is visible to users

## Support

If you're still having issues:

1. Check the browser console for error messages
2. Verify your YouTube channel is accessible
3. Try the different methods by enabling/disabling them in the config 