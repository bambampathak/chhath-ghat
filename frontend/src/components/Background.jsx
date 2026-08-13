import { motion } from 'framer-motion';

/**
 * Full-bleed artistic Chhath Ghat background inspired by apnabihar.xyz
 */
export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-neutral-950" aria-hidden="true">
      {/* Background artwork */}
      <img
        src="/chhath_ghat.png"
        alt="Authentic Chhath Ghat Scene"
        className="w-full h-full object-cover object-center scale-105"
        style={{
          filter: 'brightness(0.92) contrast(1.08) saturate(1.15)',
        }}
      />

      {/* Atmospheric Sunrise Glow Pulse */}
      <motion.div
        className="absolute top-1/4 right-1/3 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 185, 70, 0.3) 0%, rgba(232, 120, 30, 0.12) 45%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.85, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Gradient Vignette overlay for text legibility and aesthetic mood */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 35%, rgba(13, 9, 7, 0.35) 75%, rgba(13, 9, 7, 0.75) 100%), ' +
            'linear-gradient(to bottom, rgba(13, 9, 7, 0.45) 0%, rgba(13, 9, 7, 0.1) 40%, rgba(13, 9, 7, 0.3) 75%, rgba(13, 9, 7, 0.8) 100%)',
        }}
      />

      {/* Subtle glowing ambient edges */}
      <div
        className="absolute inset-0 pointer-events-none border-[12px] border-transparent"
        style={{
          boxShadow: 'inset 0 0 60px rgba(232, 134, 58, 0.15)',
        }}
      />
    </div>
  );
}
