const API_BASE = import.meta.env.VITE_API_URL || '';

/**
 * Fetch playlist metadata from the backend
 * Falls back gracefully if backend is unavailable
 */
export async function fetchPlaylistData(playlistId) {
  try {
    const response = await fetch(`${API_BASE}/api/playlist?id=${playlistId}`);
    
    if (!response.ok) {
      console.warn(`Backend returned ${response.status}`);
      return { tracks: [], totalTracks: 0 };
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.warn('Backend unavailable, using IFrame API fallback:', err.message);
    return { tracks: [], totalTracks: 0 };
  }
}
