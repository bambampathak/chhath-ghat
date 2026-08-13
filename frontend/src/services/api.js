const RAW_API_BASE = import.meta.env.VITE_API_URL || '';
const PRODUCTION_FALLBACK_URL = 'https://chhath-ghat.vercel.app';

function getApiBase() {
  if (RAW_API_BASE && !RAW_API_BASE.includes('localhost')) {
    return RAW_API_BASE;
  }
  if (
    typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1'
  ) {
    return PRODUCTION_FALLBACK_URL;
  }
  return RAW_API_BASE;
}

/**
 * Fetch playlist metadata from the backend
 * Falls back gracefully if backend is unavailable
 */
export async function fetchPlaylistData(playlistId) {
  const primaryBase = getApiBase();

  try {
    const response = await fetch(`${primaryBase}/api/playlist?id=${playlistId}`);

    if (!response.ok) {
      console.warn(`Backend returned status ${response.status}`);
      return { tracks: [], totalTracks: 0 };
    }

    const data = await response.json();
    return data;
  } catch (err) {
    // If primary base was relative/localhost and failed in production, try direct Vercel API
    if (primaryBase !== PRODUCTION_FALLBACK_URL) {
      try {
        const fallbackRes = await fetch(`${PRODUCTION_FALLBACK_URL}/api/playlist?id=${playlistId}`);
        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          return fallbackData;
        }
      } catch (fallbackErr) {
        // Fallback also failed
      }
    }
    console.warn('Backend unavailable, using IFrame API fallback:', err.message);
    return { tracks: [], totalTracks: 0 };
  }
}

