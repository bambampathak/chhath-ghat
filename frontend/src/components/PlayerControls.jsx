import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Shuffle } from 'lucide-react';

/**
 * Playback controls — play/pause, previous, next, shuffle
 * Touch-friendly with hover glow effects
 */
export default function PlayerControls({
  isPlaying,
  isBuffering,
  isShuffle,
  onTogglePlay,
  onToggleShuffle,
  onPrevious,
  onNext,
  isReady,
  currentIndex,
  playlistLength,
}) {
  const canPrevious = isReady && (isShuffle || currentIndex > 0);
  const canNext = isReady && (isShuffle || currentIndex < playlistLength - 1);

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5 py-4" role="group" aria-label="Playback controls">
      {/* Shuffle Button */}
      <motion.button
        whileHover={{ scale: isReady ? 1.1 : 1 }}
        whileTap={{ scale: isReady ? 0.95 : 1 }}
        onClick={onToggleShuffle}
        disabled={!isReady}
        className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          color: isShuffle ? 'var(--color-chhath-gold)' : 'rgba(138, 123, 107, 0.5)',
          background: isShuffle ? 'rgba(232, 134, 58, 0.15)' : 'transparent',
          border: isShuffle ? '1px solid var(--color-chhath-border)' : '1px solid transparent',
          boxShadow: isShuffle ? '0 0 15px rgba(232, 134, 58, 0.2)' : 'none',
          cursor: isReady ? 'pointer' : 'not-allowed',
          '--tw-ring-color': 'var(--color-chhath-orange)',
          '--tw-ring-offset-color': 'var(--color-chhath-warm)',
        }}
        aria-label={isShuffle ? 'Disable shuffle' : 'Enable shuffle'}
        title={isShuffle ? 'Shuffle On' : 'Shuffle Off'}
      >
        <Shuffle size={18} />
        {isShuffle && (
          <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        )}
      </motion.button>

      {/* Previous */}
      <motion.button
        whileHover={{ scale: canPrevious ? 1.1 : 1 }}
        whileTap={{ scale: canPrevious ? 0.95 : 1 }}
        onClick={onPrevious}
        disabled={!canPrevious}
        className="relative flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          color: canPrevious ? 'var(--color-chhath-cream)' : 'rgba(138, 123, 107, 0.4)',
          cursor: canPrevious ? 'pointer' : 'not-allowed',
          background: 'transparent',
          '--tw-ring-color': 'var(--color-chhath-orange)',
          '--tw-ring-offset-color': 'var(--color-chhath-warm)',
        }}
        aria-label="Previous track"
      >
        <SkipBack size={22} fill={canPrevious ? 'currentColor' : 'none'} />
      </motion.button>

      {/* Play / Pause */}
      <motion.button
        whileHover={{ scale: isReady ? 1.05 : 1 }}
        whileTap={{ scale: isReady ? 0.95 : 1 }}
        onClick={onTogglePlay}
        disabled={!isReady}
        className="relative flex items-center justify-center w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          background: isReady
            ? 'linear-gradient(135deg, var(--color-chhath-orange), var(--color-chhath-ember))'
            : 'rgba(138, 123, 107, 0.2)',
          color: isReady ? '#0D0907' : 'rgba(138, 123, 107, 0.5)',
          cursor: isReady ? 'pointer' : 'not-allowed',
          boxShadow: isReady
            ? '0 0 30px rgba(232, 134, 58, 0.3), 0 4px 15px rgba(0,0,0,0.3)'
            : 'none',
          '--tw-ring-color': 'var(--color-chhath-orange)',
          '--tw-ring-offset-color': 'var(--color-chhath-warm)',
        }}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {/* Glow ring on hover */}
        {isReady && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'transparent',
              border: '1px solid rgba(232, 134, 58, 0.3)',
            }}
            animate={
              isPlaying
                ? {
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }
                : {}
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

        {isBuffering ? (
          <motion.div
            className="w-6 h-6 rounded-full border-2 border-current border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        ) : isPlaying ? (
          <Pause size={26} fill="currentColor" />
        ) : (
          <Play size={26} fill="currentColor" className="ml-1" />
        )}
      </motion.button>

      {/* Next */}
      <motion.button
        whileHover={{ scale: canNext ? 1.1 : 1 }}
        whileTap={{ scale: canNext ? 0.95 : 1 }}
        onClick={onNext}
        disabled={!canNext}
        className="relative flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          color: canNext ? 'var(--color-chhath-cream)' : 'rgba(138, 123, 107, 0.4)',
          cursor: canNext ? 'pointer' : 'not-allowed',
          background: 'transparent',
          '--tw-ring-color': 'var(--color-chhath-orange)',
          '--tw-ring-offset-color': 'var(--color-chhath-warm)',
        }}
        aria-label="Next track"
      >
        <SkipForward size={22} fill={canNext ? 'currentColor' : 'none'} />
      </motion.button>
    </div>
  );
}
