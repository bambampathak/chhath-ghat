import { motion, AnimatePresence } from 'framer-motion';
import { ListMusic, Play } from 'lucide-react';

/**
 * Shows the next 2-3 upcoming tracks from the playlist
 * Clicking a track plays it directly
 */
export default function UpNext({
  tracks = [],
  currentIndex,
  currentVideoId,
  getPlaylistQueue,
  playlistLength,
  onPlayAt,
  isReady,
}) {
  if (!isReady || playlistLength === 0) return null;

  const upNextItems = [];
  const queue = getPlaylistQueue ? getPlaylistQueue() : [];

  if (queue && queue.length > 0 && currentVideoId) {
    const currentQueueIdx = queue.indexOf(currentVideoId);
    const startIdx = currentQueueIdx !== -1 ? currentQueueIdx + 1 : currentIndex + 1;

    for (let i = 0; i < 3; i++) {
      const qIdx = startIdx + i;
      if (qIdx < queue.length) {
        const vId = queue[qIdx];
        const track = tracks.find((t) => t.videoId === vId);
        const origIdx = track ? track.position : qIdx;
        upNextItems.push({
          index: origIdx,
          title: track?.title || `Track ${origIdx + 1}`,
          channelTitle: track?.channelTitle || '',
          thumbnail: track?.thumbnail || '',
          duration: track?.duration || '',
        });
      }
    }
  } else {
    for (let i = 1; i <= 3; i++) {
      const idx = currentIndex + i;
      if (idx < playlistLength) {
        const track = tracks.find((t) => t.position === idx);
        upNextItems.push({
          index: idx,
          title: track?.title || `Track ${idx + 1}`,
          channelTitle: track?.channelTitle || '',
          thumbnail: track?.thumbnail || '',
          duration: track?.duration || '',
        });
      }
    }
  }

  if (upNextItems.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-lg mx-auto px-4 py-6"
      aria-label="Up next"
    >
      {/* Section header */}
      <div className="flex items-center gap-2 mb-4">
        <ListMusic size={16} style={{ color: 'var(--color-chhath-muted)' }} />
        <h2
          className="text-xs tracking-[0.2em] uppercase"
          style={{
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-chhath-muted)',
          }}
        >
          Up Next
        </h2>
      </div>

      {/* Track list */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {upNextItems.map((item, i) => (
            <motion.button
              key={`${item.index}-${item.title}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              onClick={() => onPlayAt(item.index, tracks)}
              className="w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                background: 'var(--color-chhath-surface)',
                border: '1px solid var(--color-chhath-border)',
                '--tw-ring-color': 'var(--color-chhath-orange)',
                '--tw-ring-offset-color': 'var(--color-chhath-warm)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-chhath-surface-hover)';
                e.currentTarget.style.borderColor = 'rgba(232, 134, 58, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-chhath-surface)';
                e.currentTarget.style.borderColor = 'rgba(232, 134, 58, 0.12)';
              }}
              aria-label={`Play ${item.title}`}
            >
              {/* Thumbnail or number */}
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-lg overflow-hidden flex items-center justify-center"
                style={{ background: 'rgba(232, 134, 58, 0.1)' }}
              >
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span
                    className="text-sm font-medium"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-chhath-muted)' }}
                  >
                    {item.index + 1}
                  </span>
                )}

                {/* Play overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Play size={16} fill="white" color="white" />
                </div>
              </div>

              {/* Track info */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-medium truncate"
                  style={{ color: 'var(--color-chhath-cream)' }}
                >
                  {item.title}
                </p>
                {item.channelTitle && (
                  <p
                    className="text-xs truncate mt-0.5"
                    style={{ color: 'var(--color-chhath-muted)' }}
                  >
                    {item.channelTitle}
                  </p>
                )}
              </div>

              {/* Duration */}
              {item.duration && (
                <span
                  className="text-xs tabular-nums flex-shrink-0"
                  style={{ color: 'var(--color-chhath-muted)' }}
                >
                  {item.duration}
                </span>
              )}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
