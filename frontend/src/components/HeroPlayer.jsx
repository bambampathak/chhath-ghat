import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Music2 } from 'lucide-react';
import ProgressBar from './ProgressBar';
import SeoSection from './SeoSection';

/**
 * Music Player Bar matching reference design with thumbnail disc & complete controls
 */
export default function HeroPlayer({
  containerRef,
  videoData,
  currentIndex,
  playlistLength,
  isReady,
  isPlaying,
  isBuffering,
  currentTime,
  duration,
  error,
  isShuffle,
  controls,
  currentTrackMeta,
  playlistTracks = [],
}) {
  // Use backend metadata if available, fall back to IFrame API data & YouTube HQ thumbnail
  const title = currentTrackMeta?.title || videoData.title || 'Kaanch Hi Baans Ke Bahangiya';
  const artist = currentTrackMeta?.channelTitle || videoData.author || 'Kalpana Patowary';
  const videoId = videoData?.video_id || videoData?.id || videoData?.videoId;
  const thumbnail =
    currentTrackMeta?.thumbnail || (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : '');

  const canPrevious = isReady && (isShuffle || currentIndex > 0);
  const canNext = isReady && (isShuffle || currentIndex < playlistLength - 1);

  return (
    <>
      {/* Hidden YouTube IFrame Player (handles audio in background) */}
      <div className="fixed -left-[9999px] top-0 w-1 h-1 opacity-0 pointer-events-none" aria-hidden="true">
        <div ref={containerRef} id="youtube-player" />
      </div>

      {/* Main Screen Content */}
      <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-start pt-4 sm:pt-6 md:pt-8 pb-32 px-4 select-none">
        {/* Top Hero Title — "छठ घाट" in Devanagari */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center flex flex-col items-center justify-start w-full mt-1 sm:mt-2"
        >
          <h1
            className="text-7xl xs:text-8xl sm:text-9xl md:text-[12rem] lg:text-[13rem] font-extrabold tracking-normal text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
            style={{
              fontFamily: 'var(--font-devnagari)',
              letterSpacing: '0.02em',
              textShadow: '0 8px 30px rgba(0, 0, 0, 0.9), 0 0 50px rgba(232, 134, 58, 0.3)',
            }}
          >
            छठ घाट
          </h1>
          <span className="sr-only">
            Chhath Ghat — Chhath Puja Songs | Chhath Ghat Songs | छठ घाट गीत
          </span>

          {/* Interactive & Crawlable SEO Section */}
          <SeoSection tracks={playlistTracks} />
        </motion.div>

        {/* Reference-Matched Floating Player Capsule */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 w-[96%] max-w-3xl z-40 rounded-full px-5 sm:px-7 py-3 sm:py-3.5 flex items-center justify-between gap-3 sm:gap-5 border border-white/20 backdrop-blur-md overflow-hidden"
          style={{
            background: 'rgba(18, 10, 6, 0.85)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          }}
        >
          {/* Left: Disc Artwork with Song Thumbnail */}
          <div className="relative flex-shrink-0 pl-0.5">
            <div
              className={`w-11 h-11 sm:w-12.5 sm:h-12.5 rounded-full overflow-hidden border border-white/25 shadow-md flex items-center justify-center ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
              style={{
                background: 'radial-gradient(circle, #2a1b12 0%, #0a0604 100%)',
              }}
            >
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt={`${title} — छठ घाट Chhath Puja Songs`}
                  className="w-full h-full object-cover scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-amber-300/80">
                  <Music2 className="w-5 h-5" />
                </div>
              )}
            </div>
          </div>

          {/* Center: Track Title, Artist, Progress Bar & Time */}
          <div className="flex-1 min-w-0 flex flex-col justify-center px-1 sm:px-2">
            <h2 className="font-bold text-white text-xs sm:text-sm truncate drop-shadow-sm leading-tight">
              {title}
            </h2>

            <p className="text-[11px] sm:text-xs text-amber-200/60 truncate mt-0.5 mb-0.5 font-sans">
              {artist}
            </p>

            {/* Seek Bar with Line & 0:00 / 0:00 */}
            <ProgressBar
              currentTime={currentTime}
              duration={duration}
              onSeek={controls.seekTo}
              isReady={isReady}
            />
          </div>

          {/* Right: Controls (Shuffle, Previous, Play/Pause, Next) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0 pr-0.5">
            {/* Shuffle */}
            <button
              onClick={controls.toggleShuffle}
              disabled={!isReady}
              className={`p-1 sm:p-1.5 transition-colors ${
                isShuffle ? 'text-amber-400 opacity-100' : 'text-white/60 hover:text-white'
              }`}
              title={isShuffle ? 'Shuffle On' : 'Shuffle Off'}
            >
              <Shuffle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Previous */}
            <button
              onClick={controls.previous}
              disabled={!canPrevious}
              className={`p-1 sm:p-1.5 transition-opacity ${
                canPrevious ? 'text-white/90 hover:text-white active:scale-90' : 'text-white/30 cursor-not-allowed'
              }`}
              title="Previous Song"
            >
              <SkipBack className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-white" />
            </button>

            {/* Prominent White Play/Pause Circle */}
            <button
              onClick={controls.togglePlay}
              disabled={!isReady}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isBuffering ? (
                <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current text-black" />
              ) : (
                <Play className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current text-black ml-0.5" />
              )}
            </button>

            {/* Next */}
            <button
              onClick={controls.next}
              disabled={!canNext}
              className={`p-1 sm:p-1.5 transition-opacity ${
                canNext ? 'text-white/90 hover:text-white active:scale-90' : 'text-white/30 cursor-not-allowed'
              }`}
              title="Next Song"
            >
              <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-white" />
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}

