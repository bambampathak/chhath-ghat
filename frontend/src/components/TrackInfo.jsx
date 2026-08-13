import { motion, AnimatePresence } from 'framer-motion';
import { Music } from 'lucide-react';

/**
 * Displays current track title, artist, and track number
 * Animates on track change
 */
export default function TrackInfo({ title, artist, currentIndex, totalTracks, isReady }) {
  const displayTitle = title || 'Select a song to play';
  const displayArtist = artist || '';
  const trackNumber = isReady && totalTracks > 0 ? `${currentIndex + 1} / ${totalTracks}` : '';

  return (
    <div className="text-center px-4 py-4 max-w-lg mx-auto">
      {/* Track number pill */}
      <AnimatePresence mode="wait">
        {trackNumber && (
          <motion.div
            key={trackNumber}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className="mb-3"
          >
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs tracking-widest uppercase"
              style={{
                fontFamily: 'var(--font-heading)',
                background: 'var(--color-chhath-surface)',
                color: 'var(--color-chhath-orange)',
                border: '1px solid var(--color-chhath-border)',
              }}
            >
              <Music size={12} />
              Track {trackNumber}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Song title */}
      <AnimatePresence mode="wait">
        <motion.h1
          key={displayTitle}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="text-xl sm:text-2xl md:text-3xl font-semibold leading-tight mb-2 line-clamp-2"
          style={{
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-chhath-cream)',
          }}
        >
          {displayTitle}
        </motion.h1>
      </AnimatePresence>

      {/* Artist */}
      <AnimatePresence mode="wait">
        {displayArtist && (
          <motion.p
            key={displayArtist}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-sm"
            style={{ color: 'var(--color-chhath-muted)' }}
          >
            {displayArtist}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
