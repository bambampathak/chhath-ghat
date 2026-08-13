import { motion } from 'framer-motion';
import { Sparkles, Radio } from 'lucide-react';

/**
 * Top Navbar inspired by apnabihar.xyz
 * Features "Apna Bihar / Chhath Geet" brand logo on left and "YT Music" button on right
 */
export default function Navbar({ playlistId }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4 pointer-events-auto">
      {/* Left: Brand Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2"
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-amber-500 to-orange-600 shadow-md shadow-orange-500/20">
          <Sparkles className="w-4 h-4 text-amber-950 fill-current" />
        </div>
        <span
          className="text-lg sm:text-xl font-bold tracking-tight text-white drop-shadow-md"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Apna Bihar
        </span>
      </motion.div>

      {/* Right: YT Music Link / Badge */}
      <motion.a
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        href={`https://www.youtube.com/playlist?list=${playlistId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-amber-100/90 transition-all duration-200 border border-white/10 hover:border-amber-400/40 hover:bg-white/10 backdrop-blur-md shadow-lg"
        style={{
          background: 'rgba(28, 18, 12, 0.6)',
        }}
      >
        <Radio className="w-4 h-4 text-red-500" />
        <span>YT Music</span>
      </motion.a>
    </header>
  );
}
