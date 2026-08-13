require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
const Playlist = require('../models/Playlist');
const { fetchPlaylistData } = require('../services/youtube');

const app = express();

// CORS — allow frontend origins
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    methods: ['GET'],
  })
);

app.use(express.json());

/**
 * GET /api/playlist?id=PLAYLIST_ID
 * Returns cached playlist data or fetches fresh from YouTube API
 */
app.get('/api/playlist', async (req, res) => {
  try {
    const playlistId = req.query.id;

    if (!playlistId) {
      return res.status(400).json({
        error: 'Missing playlist ID',
        message: 'Provide a playlist ID via ?id=PLAYLIST_ID',
      });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      return res.status(200).json({
        playlistId,
        tracks: [],
        totalTracks: 0,
        cached: false,
        message:
          'YouTube API key not configured. The frontend will use IFrame Player API data instead.',
      });
    }

    // Try to connect to MongoDB for caching
    const db = await connectDB();

    // Check cache first
    if (db) {
      const cached = await Playlist.findOne({ playlistId });
      if (cached) {
        return res.json({
          playlistId: cached.playlistId,
          title: cached.title,
          tracks: cached.tracks,
          totalTracks: cached.totalTracks,
          cached: true,
        });
      }
    }

    // Fetch fresh data from YouTube
    const data = await fetchPlaylistData(playlistId, apiKey);

    // Cache in MongoDB if connected
    if (db) {
      try {
        await Playlist.findOneAndUpdate(
          { playlistId },
          { ...data, fetchedAt: new Date() },
          { upsert: true, new: true }
        );
      } catch (cacheErr) {
        console.warn('Failed to cache playlist data:', cacheErr.message);
      }
    }

    return res.json({
      ...data,
      cached: false,
    });
  } catch (err) {
    console.error('Playlist API error:', err.message);

    if (err.response?.status === 403) {
      return res.status(403).json({
        error: 'YouTube API quota exceeded or key invalid',
        message: err.response?.data?.error?.message || err.message,
      });
    }

    return res.status(500).json({
      error: 'Failed to fetch playlist data',
      message: err.message,
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
}

// Export for Vercel serverless
module.exports = app;
