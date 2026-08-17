import { useState, useEffect, useRef, useCallback } from 'react';

const PLAYER_STATES = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
};

/**
 * Custom hook for YouTube IFrame Player API
 * Handles playlist loading, playback control, shuffle mode, and state tracking
 */
export function useYouTubePlayer(playlistId) {
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);
  const initAttemptRef = useRef(0);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playlistLength, setPlaylistLength] = useState(0);
  const [videoData, setVideoData] = useState({ title: '', author: '', video_id: '' });
  const [error, setError] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  // Load the YouTube IFrame API script
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setApiLoaded(true);
      return;
    }

    // Set up the global callback
    const existingCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (existingCallback) existingCallback();
      setApiLoaded(true);
    };

    // Load the script if not already present
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.head.appendChild(script);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          // Player may already be destroyed
        }
      }
    };
  }, []);

  // Initialize player once API is loaded and container is in DOM
  useEffect(() => {
    if (!apiLoaded || playerRef.current) return;

    function tryInit() {
      if (containerRef.current && window.YT && window.YT.Player) {
        try {
          playerRef.current = new window.YT.Player(containerRef.current, {
            height: '100%',
            width: '100%',
            playerVars: {
              listType: 'playlist',
              list: playlistId,
              autoplay: 0,
              controls: 1,
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
              iv_load_policy: 3,
              fs: 1,
              playsinline: 1,
              origin: window.location.origin,
            },
            events: {
              onReady: handleReady,
              onStateChange: handleStateChange,
              onError: handleError,
            },
          });
        } catch (err) {
          console.error('Failed to initialize YouTube player:', err);
          setError('Failed to initialize player');
        }
      } else if (initAttemptRef.current < 20) {
        // Retry — container may not be mounted yet
        initAttemptRef.current += 1;
        setTimeout(tryInit, 200);
      }
    }

    // Fast loading safety fallback: ensure isReady becomes true within 1000ms max
    const fallbackTimer = setTimeout(() => {
      setIsReady(true);
    }, 1000);

    // Small delay to ensure the ref is attached after render
    setTimeout(tryInit, 50);

    return () => clearTimeout(fallbackTimer);
  }, [apiLoaded, playlistId]);

  const handleReady = useCallback((event) => {
    setIsReady(true);
    setError(null);
    updateVideoInfo(event.target);
    updatePlaylistInfo(event.target);
  }, []);

  const handleStateChange = useCallback((event) => {
    const state = event.data;

    switch (state) {
      case PLAYER_STATES.PLAYING:
        setIsPlaying(true);
        setIsBuffering(false);
        setHasInteracted(true);
        startProgressTracking();
        updateVideoInfo(event.target);
        updatePlaylistInfo(event.target);
        break;
      case PLAYER_STATES.PAUSED:
        setIsPlaying(false);
        setIsBuffering(false);
        stopProgressTracking();
        break;
      case PLAYER_STATES.BUFFERING:
        setIsBuffering(true);
        break;
      case PLAYER_STATES.ENDED:
        setIsPlaying(false);
        setIsBuffering(false);
        stopProgressTracking();
        break;
      case PLAYER_STATES.CUED:
        setIsPlaying(false);
        setIsBuffering(false);
        updateVideoInfo(event.target);
        updatePlaylistInfo(event.target);
        break;
      default:
        break;
    }
  }, []);

  const handleError = useCallback((event) => {
    const errorCodes = {
      2: 'Invalid video ID',
      5: 'HTML5 player error',
      100: 'Video not found or private',
      101: 'Video cannot be embedded',
      150: 'Video cannot be embedded',
    };
    const message = errorCodes[event.data] || `Player error (code: ${event.data})`;
    console.error('YouTube player error:', message);
    setError(message);

    // Try to skip to next track on error
    setTimeout(() => {
      if (playerRef.current) {
        try {
          playerRef.current.nextVideo();
          setError(null);
        } catch (e) {
          // Ignore
        }
      }
    }, 2000);
  }, []);

  const updateVideoInfo = useCallback((player) => {
    try {
      const data = player.getVideoData?.();
      if (data) {
        const videoId = data.video_id || data.video_Id || data.id || '';
        setVideoData({
          title: data.title || '',
          author: data.author || '',
          video_id: videoId,
        });
      }
      const dur = player.getDuration?.();
      if (dur) setDuration(dur);
      const idx = player.getPlaylistIndex?.();
      if (idx !== undefined && idx !== null) setCurrentIndex(idx);
    } catch (e) {
      // getVideoData may not be available
    }
  }, []);

  const updatePlaylistInfo = useCallback((player) => {
    try {
      const playlist = player.getPlaylist?.();
      if (playlist && playlist.length > 0) {
        setPlaylistLength(playlist.length);
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  const startProgressTracking = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (playerRef.current) {
        try {
          const time = playerRef.current.getCurrentTime?.();
          const dur = playerRef.current.getDuration?.();
          if (time !== undefined) setCurrentTime(time);
          if (dur) setDuration(dur);

          // Check if current video changed
          const data = playerRef.current.getVideoData?.();
          const currentVideoId = data?.video_id || data?.video_Id || data?.id || '';
          if (currentVideoId) {
            setVideoData((prev) => {
              if (prev.video_id !== currentVideoId || (data?.title && prev.title !== data.title)) {
                return {
                  title: data?.title || prev.title || '',
                  author: data?.author || prev.author || '',
                  video_id: currentVideoId,
                };
              }
              return prev;
            });
          }

          const idx = playerRef.current.getPlaylistIndex?.();
          if (idx !== undefined && idx !== null) {
            setCurrentIndex((prev) => (prev !== idx ? idx : prev));
          }
        } catch (e) {
          // Ignore
        }
      }
    }, 250);
  }, []);

  const stopProgressTracking = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Controls
  const play = useCallback(() => {
    playerRef.current?.playVideo?.();
  }, []);

  const pause = useCallback(() => {
    playerRef.current?.pauseVideo?.();
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => {
      const nextState = !prev;
      if (playerRef.current?.setShuffle) {
        try {
          playerRef.current.setShuffle(nextState);
        } catch (e) {
          console.warn('Failed to set YT shuffle:', e);
        }
      }
      return nextState;
    });
  }, []);

  const next = useCallback(() => {
    playerRef.current?.nextVideo?.();
  }, []);

  const previous = useCallback(() => {
    playerRef.current?.previousVideo?.();
  }, []);

  const seekTo = useCallback((seconds) => {
    playerRef.current?.seekTo?.(seconds, true);
  }, []);

  const playAt = useCallback((index, tracks) => {
    if (!playerRef.current) return;

    let targetVideoId = null;
    if (typeof index === 'string') {
      targetVideoId = index;
    } else if (typeof index === 'number' && tracks && tracks[index]) {
      targetVideoId = tracks[index].videoId;
    }

    if (targetVideoId) {
      try {
        const currentPlaylist = playerRef.current.getPlaylist?.();
        if (Array.isArray(currentPlaylist) && currentPlaylist.length > 0) {
          const ytIndex = currentPlaylist.indexOf(targetVideoId);
          if (ytIndex !== -1) {
            playerRef.current.playVideoAt(ytIndex);
            return;
          }
        }
      } catch (e) {
        // Fallback below
      }
    }

    if (typeof index === 'number') {
      playerRef.current.playVideoAt?.(index);
    }
  }, []);

  const getPlaylistQueue = useCallback(() => {
    try {
      return playerRef.current?.getPlaylist?.() || [];
    } catch (e) {
      return [];
    }
  }, []);

  return {
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
    controls: {
      play,
      pause,
      togglePlay,
      toggleShuffle,
      next,
      previous,
      seekTo,
      playAt,
      getPlaylistQueue,
    },
  };
}
