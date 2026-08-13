const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  title: { type: String, default: '' },
  channelTitle: { type: String, default: '' },
  thumbnail: { type: String, default: '' },
  duration: { type: String, default: '' },
  durationSeconds: { type: Number, default: 0 },
  position: { type: Number, default: 0 },
});

const playlistSchema = new mongoose.Schema({
  playlistId: { type: String, required: true, unique: true, index: true },
  title: { type: String, default: '' },
  tracks: [trackSchema],
  totalTracks: { type: Number, default: 0 },
  fetchedAt: { type: Date, default: Date.now },
});

// TTL index — cache expires after 1 hour
playlistSchema.index({ fetchedAt: 1 }, { expireAfterSeconds: 3600 });

module.exports = mongoose.model('Playlist', playlistSchema);
