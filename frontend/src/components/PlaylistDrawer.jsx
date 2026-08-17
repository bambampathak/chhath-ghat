import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Music } from 'lucide-react';

/**
 * Slide-up Playlist Drawer for exploring all tracks
 */
export default function PlaylistDrawer({
  isOpen,
  onClose,
  tracks,
  currentIndex,
  currentTrackMeta,
  playlistLength,
  onPlayAt,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[75vh] min-h-[400px] flex flex-col rounded-t-3xl border-t border-white/10 shadow-2xl overflow-hidden"
            style={{
              background: 'rgba(24, 15, 10, 0.92)',
              backdropFilter: 'blur(30px)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                  <Music className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                    छठ गीत प्लेलिस्ट
                  </h3>
                  <p className="text-xs text-amber-200/60">
                    {playlistLength > 0 ? `${playlistLength} Devotional Tracks` : 'Loading tracks...'}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 text-white/80 hover:bg-white/20 transition-colors"
                aria-label="Close playlist"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Track List */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1.5 custom-scrollbar">
              {tracks && tracks.length > 0 ? (
                tracks.map((track, idx) => {
                  const isCurrent = currentTrackMeta
                    ? track.videoId === currentTrackMeta.videoId
                    : idx === currentIndex;
                  return (
                    <motion.button
                      key={track.videoId || track.id || idx}
                      whileHover={{ x: 4 }}
                      onClick={() => {
                        onPlayAt(idx, tracks);
                        onClose();
                      }}
                      className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        isCurrent
                          ? 'bg-amber-500/20 border border-amber-500/40 text-amber-200 shadow-md shadow-amber-500/10'
                          : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/5'
                      }`}
                    >
                      <span className="w-6 text-xs text-center font-mono opacity-60">
                        {isCurrent ? '▶' : String(idx + 1).padStart(2, '0')}
                      </span>

                      {track.thumbnail && (
                        <img
                          src={track.thumbnail}
                          alt=""
                          className="w-10 h-10 rounded-lg object-cover border border-white/10"
                        />
                      )}

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate text-white">
                          {track.title || `Track ${idx + 1}`}
                        </p>
                        <p className="text-xs text-amber-200/50 truncate">
                          {track.channelTitle || 'Chhath Puja Devotional'}
                        </p>
                      </div>

                      {isCurrent && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500 text-amber-950">
                          Playing
                        </span>
                      )}
                    </motion.button>
                  );
                })
              ) : (
                <div className="py-12 text-center text-sm text-white/50">
                  Loading playlist tracks...
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
