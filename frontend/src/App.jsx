import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Background from './components/Background';
import Loader from './components/Loader';
import HeroPlayer from './components/HeroPlayer';
import Footer from './components/Footer';
import { useYouTubePlayer } from './hooks/useYouTubePlayer';
import { fetchPlaylistData } from './services/api';

const PLAYLIST_ID = 'PLHzCHYo-v7E4';

export default function App() {
  const [playlistMeta, setPlaylistMeta] = useState({ tracks: [], totalTracks: 0 });
  const [metaLoading, setMetaLoading] = useState(true);

  const {
    containerRef,
    isReady,
    isPlaying,
    isBuffering,
    currentTime,
    duration,
    currentIndex,
    playlistLength,
    videoData,
    error,
    hasInteracted,
    isShuffle,
    controls,
  } = useYouTubePlayer(PLAYLIST_ID);

  // Fetch playlist metadata from backend
  useEffect(() => {
    let cancelled = false;

    async function loadMeta() {
      setMetaLoading(true);
      try {
        const data = await fetchPlaylistData(PLAYLIST_ID);
        if (!cancelled) {
          setPlaylistMeta(data);
        }
      } catch (err) {
        console.warn('Failed to load playlist metadata:', err);
      } finally {
        if (!cancelled) setMetaLoading(false);
      }
    }

    loadMeta();
    return () => { cancelled = true; };
  }, []);

  // Find current track metadata from backend data matching by videoId first, then index
  const currentTrackMeta = useMemo(() => {
    if (!playlistMeta.tracks || playlistMeta.tracks.length === 0) return null;
    if (videoData?.video_id) {
      const matched = playlistMeta.tracks.find((t) => t.videoId === videoData.video_id);
      if (matched) return matched;
    }
    return playlistMeta.tracks.find((t) => t.position === currentIndex) || null;
  }, [playlistMeta.tracks, videoData?.video_id, currentIndex]);

  // Dynamically update document title for real-time browser SEO & track awareness
  useEffect(() => {
    const trackTitle = currentTrackMeta?.title || videoData?.title;
    if (trackTitle && isPlaying) {
      document.title = `▶ ${trackTitle} — छठ घाट | Chhath Puja Songs & Chhath Ghat Songs`;
    } else {
      document.title = 'छठ घाट — Chhath Ghat | Chhath Puja Songs & Chhath Ghat Songs (छठ गीत)';
    }
  }, [currentTrackMeta, videoData, isPlaying]);

  return (
    <>
      {/* Full-bleed Chhath Ghat artwork background */}
      <Background />

      <main className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden">
        {/* Loader overlay */}
        <AnimatePresence>
          {!isReady && (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/90 backdrop-blur-md"
            >
              <Loader />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Viewport */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isReady ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="w-full flex-1 flex flex-col items-center justify-between"
        >
          <HeroPlayer
            containerRef={containerRef}
            videoData={videoData}
            currentIndex={currentIndex}
            playlistLength={playlistLength}
            isReady={isReady}
            isPlaying={isPlaying}
            isBuffering={isBuffering}
            currentTime={currentTime}
            duration={duration}
            error={error}
            hasInteracted={hasInteracted}
            isShuffle={isShuffle}
            controls={controls}
            currentTrackMeta={currentTrackMeta}
            playlistTracks={playlistMeta.tracks}
          />
        </motion.div>

        {/* Bottom Footer */}
        <Footer />
      </main>
    </>
  );
}
