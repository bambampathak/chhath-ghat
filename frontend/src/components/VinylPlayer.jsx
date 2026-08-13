import { motion } from 'framer-motion';

/**
 * Aesthetic Spinning Vinyl Record & Album Art MP3 Player Deck
 * Inspired by retro ambient music players like saloon.wtf
 */
export default function VinylPlayer({ thumbnail, isPlaying, isReady }) {
  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto my-6 flex items-center justify-center">
      {/* Outer ambient warmth glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(232, 134, 58, 0.25) 0%, rgba(212, 168, 69, 0.1) 50%, transparent 70%)',
          filter: 'blur(30px)',
        }}
        animate={
          isPlaying
            ? {
                scale: [1, 1.12, 1],
                opacity: [0.6, 0.9, 0.6],
              }
            : {
                scale: 1,
                opacity: 0.4,
              }
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Tonearm (Vinyl Needle) */}
      <motion.div
        className="absolute -top-4 right-4 sm:right-8 z-20 w-24 sm:w-28 h-28 pointer-events-none origin-top-right"
        animate={{
          rotate: isPlaying ? 0 : -25,
        }}
        transition={{
          duration: 0.8,
          ease: 'easeInOut',
        }}
      >
        {/* Pivot base */}
        <div
          className="absolute top-0 right-0 w-6 h-6 rounded-full shadow-lg border border-amber-500/30"
          style={{
            background: 'radial-gradient(circle, #3a2a1d 0%, #1a0f0a 100%)',
          }}
        />
        {/* Arm line */}
        <div
          className="absolute top-3 right-3 w-1.5 h-20 rounded-full"
          style={{
            background: 'linear-gradient(to bottom, #d4a845, #e8863a)',
            transform: 'rotate(-25deg)',
            transformOrigin: 'top right',
            boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}
        />
        {/* Cartridge / Needle head */}
        <div
          className="absolute bottom-2 left-3 w-3 h-5 rounded-sm bg-amber-600 shadow-md border border-amber-300/40"
          style={{ transform: 'rotate(-25deg)' }}
        />
      </motion.div>

      {/* Vinyl Disc */}
      <motion.div
        className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full p-2 shadow-2xl flex items-center justify-center overflow-hidden border border-amber-900/40"
        style={{
          background: 'radial-gradient(circle, #241913 0%, #120b07 60%, #0a0604 100%)',
          boxShadow:
            '0 15px 35px rgba(0, 0, 0, 0.7), inset 0 0 15px rgba(232, 134, 58, 0.15), 0 0 40px rgba(232, 134, 58, 0.1)',
        }}
        animate={{
          rotate: isPlaying ? 360 : 0,
        }}
        transition={{
          duration: 12,
          repeat: isPlaying ? Infinity : 0,
          ease: 'linear',
        }}
      >
        {/* Grooves on the vinyl */}
        <div className="absolute inset-4 rounded-full border border-white/5" />
        <div className="absolute inset-8 rounded-full border border-white/5" />
        <div className="absolute inset-12 rounded-full border border-white/5" />
        <div className="absolute inset-16 rounded-full border border-white/5" />
        <div className="absolute inset-20 rounded-full border border-white/5" />

        {/* Vinyl reflection sheen */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none opacity-20"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.15) 100%)',
          }}
        />

        {/* Center Label (Album Art or Chhath Motif) */}
        <div
          className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden flex items-center justify-center border-4 border-amber-900/60 shadow-inner"
          style={{
            background: 'linear-gradient(135deg, #e8863a, #d4a845)',
          }}
        >
          {thumbnail ? (
            <img
              src={thumbnail}
              alt="Track Artwork"
              className="w-full h-full object-cover scale-110"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-amber-950 font-bold p-2 text-center">
              <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-heading)' }}>
                Chhath Geet
              </span>
              <span className="text-[10px] opacity-75 mt-1">MP3 Player</span>
            </div>
          )}

          {/* Center Spindle Hole */}
          <div className="absolute w-4 h-4 rounded-full bg-neutral-950 border border-amber-600/40 shadow-md" />
        </div>
      </motion.div>
    </div>
  );
}
