import { useCallback, useRef } from 'react';
import { formatTime } from '../utils/formatTime';

/**
 * Seekable progress bar matching reference design (line + 0:00 / 0:00)
 */
export default function ProgressBar({ currentTime, duration, onSeek, isReady }) {
  const barRef = useRef(null);
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = useCallback(
    (e) => {
      if (!isReady || !barRef.current || !duration) return;

      const rect = barRef.current.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const x = clientX - rect.left;
      const percent = Math.max(0, Math.min(1, x / rect.width));
      onSeek(percent * duration);
    },
    [isReady, duration, onSeek]
  );

  return (
    <div className="w-full">
      {/* Track line */}
      <div
        ref={barRef}
        onClick={handleSeek}
        onTouchStart={handleSeek}
        className="relative w-full h-3 flex items-center cursor-pointer group my-0.5"
        role="slider"
        aria-label="Track progress"
        aria-valuenow={Math.floor(currentTime)}
        aria-valuemin={0}
        aria-valuemax={Math.floor(duration)}
        aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (!isReady) return;
          if (e.key === 'ArrowRight') onSeek(Math.min(currentTime + 5, duration));
          if (e.key === 'ArrowLeft') onSeek(Math.max(currentTime - 5, 0));
        }}
      >
        <div className="w-full h-[2px] bg-white/20 rounded-full overflow-hidden transition-all group-hover:h-[3px]">
          <div
            className="h-full bg-amber-100/80 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Time label: 0:00 / 0:00 */}
      <div className="text-[11px] text-amber-200/60 font-mono tracking-wider select-none">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
    </div>
  );
}
