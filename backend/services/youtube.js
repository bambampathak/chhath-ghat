const axios = require('axios');

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

/**
 * Parse ISO 8601 duration (PT#H#M#S) to seconds
 */
function parseDuration(iso) {
  if (!iso) return 0;
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);
  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Format seconds to MM:SS or HH:MM:SS
 */
function formatDuration(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Fetch all items from a YouTube playlist with pagination
 */
async function fetchPlaylistItems(playlistId, apiKey) {
  const items = [];
  let nextPageToken = '';

  do {
    const response = await axios.get(`${YOUTUBE_API_BASE}/playlistItems`, {
      params: {
        part: 'snippet,contentDetails',
        playlistId,
        maxResults: 50,
        pageToken: nextPageToken || undefined,
        key: apiKey,
      },
    });

    const data = response.data;
    items.push(...data.items);
    nextPageToken = data.nextPageToken || '';
  } while (nextPageToken);

  return items;
}

/**
 * Fetch video details (duration, etc.) for a batch of video IDs
 */
async function fetchVideoDetails(videoIds, apiKey) {
  const details = {};

  // YouTube API accepts max 50 IDs per request
  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50);
    const response = await axios.get(`${YOUTUBE_API_BASE}/videos`, {
      params: {
        part: 'contentDetails',
        id: batch.join(','),
        key: apiKey,
      },
    });

    for (const item of response.data.items) {
      details[item.id] = item.contentDetails;
    }
  }

  return details;
}

/**
 * Fetch complete playlist data from YouTube Data API v3
 */
async function fetchPlaylistData(playlistId, apiKey) {
  // Step 1: Get playlist items (titles, thumbnails, channel)
  const items = await fetchPlaylistItems(playlistId, apiKey);

  // Step 2: Get video IDs and fetch durations
  const videoIds = items
    .map((item) => item.contentDetails?.videoId)
    .filter(Boolean);

  const videoDetails = await fetchVideoDetails(videoIds, apiKey);

  // Step 3: Combine into clean track objects
  const tracks = items
    .filter((item) => {
      // Filter out deleted/private videos
      const snippet = item.snippet;
      return snippet && snippet.title !== 'Deleted video' && snippet.title !== 'Private video';
    })
    .map((item, index) => {
      const snippet = item.snippet;
      const videoId = item.contentDetails?.videoId;
      const details = videoDetails[videoId];
      const durationSeconds = details ? parseDuration(details.duration) : 0;

      // Pick best available thumbnail
      const thumbnails = snippet.thumbnails || {};
      const thumbnail =
        thumbnails.medium?.url ||
        thumbnails.default?.url ||
        thumbnails.high?.url ||
        '';

      return {
        videoId,
        title: snippet.title || 'Unknown Track',
        channelTitle: snippet.videoOwnerChannelTitle || snippet.channelTitle || '',
        thumbnail,
        duration: formatDuration(durationSeconds),
        durationSeconds,
        position: index,
      };
    });

  return {
    playlistId,
    tracks,
    totalTracks: tracks.length,
  };
}

module.exports = { fetchPlaylistData };
