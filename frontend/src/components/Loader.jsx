import { motion } from 'framer-motion';

/**
 * Highly Authentic Maithili (Madhubani) Surya Dev Loader
 * Features:
 * 1. Traditional Madhubani Sun God with Kachni/Bharni Line Work, Mustache & Tilak
 * 2. Flickering Brass Clay Diya
 * 3. "जय छठी मइया" Devanagari Hindi Text
 */
export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 select-none text-center px-4">
      {/* Top: Authentic Maithili (Madhubani) Sun God Painting */}
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
        {/* Soft Golden Solar Rays Aura */}
        <motion.div
          className="absolute inset-0 m-auto rounded-full"
          style={{
            width: 185,
            height: 185,
            background:
              'radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, rgba(185, 28, 28, 0.18) 60%, transparent 80%)',
          }}
          animate={{
            scale: [0.94, 1.06, 0.94],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* SVG Maithili Folk Art Sun Painting */}
        <svg
          viewBox="0 0 200 200"
          className="w-44 h-44 sm:w-52 sm:h-52 relative z-10 drop-shadow-[0_0_22px_rgba(245,158,11,0.8)]"
        >
          {/* Animated Outer Maithili Rays (Rotating slow) */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '100px 100px' }}
          >
            {/* 16 Alternating Madhubani Petal Rays (Kachni & Bharni Style) */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * 360) / 16;
              const rad = (angle * Math.PI) / 180;
              const cx = 100 + 84 * Math.cos(rad);
              const cy = 100 + 84 * Math.sin(rad);

              return (
                <g key={i} transform={`rotate(${angle}, 100, 100)`}>
                  {/* Outer Flame/Leaf Petal Motif */}
                  <path
                    d="M 100 22 C 94 10, 106 10, 100 2 Z"
                    fill={i % 2 === 0 ? '#DC2626' : '#F59E0B'}
                    stroke="#451A03"
                    strokeWidth="1.2"
                  />
                  {/* Inner Ray Line */}
                  <line x1="100" y1="22" x2="100" y2="6" stroke="#FEF08A" strokeWidth="1" />
                  {/* Madhubani Ray Tip Dot */}
                  <circle cx="100" cy="2" r="2" fill="#FEF08A" stroke="#451A03" strokeWidth="0.5" />
                </g>
              );
            })}
          </motion.g>

          {/* Maithili Outer Double Border Ring */}
          <circle cx="100" cy="100" r="78" fill="#F59E0B" opacity="0.2" />
          <circle cx="100" cy="100" r="78" stroke="#FBBF24" strokeWidth="3" fill="none" />
          <circle cx="100" cy="100" r="74" stroke="#451A03" strokeWidth="1.5" fill="none" />

          {/* Traditional Mithila Kachni Dot Border Ring */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24;
            const rad = (angle * Math.PI) / 180;
            return (
              <circle
                key={i}
                cx={100 + 70 * Math.cos(rad)}
                cy={100 + 70 * Math.sin(rad)}
                r="2"
                fill="#DC2626"
                stroke="#FBBF24"
                strokeWidth="0.5"
              />
            );
          })}

          {/* Main Sun Disk Base (Warm Terracotta Gold) */}
          <circle cx="100" cy="100" r="66" fill="url(#maithiliSunGrad)" stroke="#451A03" strokeWidth="2.5" />

          {/* Maithili Inner Circle Frame with Double Hatching */}
          <circle cx="100" cy="100" r="60" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />

          {/* --- Traditional Madhubani Surya Dev Facial Features --- */}
          {/* Sacred Forehead Tilak (त्रिपुंड एवं कुमकुम तिलक) */}
          <path d="M 100 44 L 106 64 L 94 64 Z" fill="#DC2626" stroke="#FEF08A" strokeWidth="1.2" />
          <circle cx="100" cy="68" r="3.5" fill="#FBBF24" stroke="#451A03" strokeWidth="1" />
          {/* Crescent Moon Above Tilak */}
          <path d="M 92 42 Q 100 47 108 42 Q 100 44 92 42 Z" fill="#FEF08A" stroke="#451A03" strokeWidth="0.8" />

          {/* Left Almond Eye (पारंपरिक मैथिली लोचन) */}
          <g>
            <path d="M 68 88 Q 82 76 96 88 Q 82 100 68 88 Z" fill="#FFFBEB" stroke="#451A03" strokeWidth="2" />
            <circle cx="82" cy="88" r="4.5" fill="#451A03" />
            <circle cx="83.5" cy="86.5" r="1.5" fill="#FFFFFF" />
            {/* Double Eyelash Lines */}
            <path d="M 66 86 Q 82 72 98 86" stroke="#78350F" strokeWidth="1.5" fill="none" />
          </g>

          {/* Right Almond Eye (पारंपरिक मैथिली लोचन) */}
          <g>
            <path d="M 104 88 Q 118 76 132 88 Q 118 100 104 88 Z" fill="#FFFBEB" stroke="#451A03" strokeWidth="2" />
            <circle cx="118" cy="88" r="4.5" fill="#451A03" />
            <circle cx="119.5" cy="86.5" r="1.5" fill="#FFFFFF" />
            {/* Double Eyelash Lines */}
            <path d="M 102 86 Q 118 72 134 86" stroke="#78350F" strokeWidth="1.5" fill="none" />
          </g>

          {/* Maithili Nose Motif (नासा) */}
          <path d="M 100 70 L 96 104 L 104 104 Z" fill="#FBBF24" stroke="#451A03" strokeWidth="1.5" />

          {/* Classic Madhubani Mustache (मैथिली सूर्य देव मूंछ) */}
          <path
            d="M 100 110 C 90 108, 76 112, 70 106 C 76 116, 92 116, 100 112 C 108 116, 124 116, 130 106 C 124 112, 110 108, 100 110 Z"
            fill="#3B1605"
            stroke="#FBBF24"
            strokeWidth="0.8"
          />

          {/* Traditional Smiling Mouth (हर्षित ओष्ठ) */}
          <path d="M 88 118 Q 100 128 112 118" stroke="#DC2626" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Cheek Red Bindi Motifs */}
          <circle cx="66" cy="104" r="3" fill="#DC2626" stroke="#FBBF24" strokeWidth="0.8" />
          <circle cx="134" cy="104" r="3" fill="#DC2626" stroke="#FBBF24" strokeWidth="0.8" />

          {/* Gradients */}
          <defs>
            <radialGradient id="maithiliSunGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="40%" stopColor="#F59E0B" />
              <stop offset="80%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#7F1D1D" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Center: Flickering Brass Clay Diya Animation */}
      <div className="relative w-28 h-20 flex items-center justify-center -mt-2">
        <svg
          viewBox="0 0 100 80"
          className="w-24 h-20 relative z-10 drop-shadow-[0_0_20px_rgba(245,158,11,0.85)]"
        >
          {/* Traditional Brass Diya Base */}
          <path
            d="M 28 42 C 28 58, 72 58, 72 42 Z"
            fill="url(#diyaGold)"
            stroke="#F59E0B"
            strokeWidth="1.5"
          />

          {/* Diya Rim */}
          <ellipse cx="50" cy="42" rx="22" ry="4" fill="#B45309" stroke="#FBBF24" strokeWidth="1" />

          {/* Animated Flickering Diya Flame */}
          <motion.path
            d="M 50 40 C 43 32, 44 22, 50 12 C 56 22, 57 32, 50 40 Z"
            fill="url(#flameGlow)"
            animate={{
              d: [
                'M 50 40 C 43 32, 44 22, 50 12 C 56 22, 57 32, 50 40 Z',
                'M 50 40 C 41 30, 46 19, 50 10 C 54 19, 59 30, 50 40 Z',
                'M 50 40 C 44 33, 43 23, 50 12 C 57 23, 56 33, 50 40 Z',
              ],
              scale: [0.98, 1.06, 0.98],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Inner White Flame Core */}
          <motion.ellipse
            cx="50"
            cy="32"
            rx="3"
            ry="6"
            fill="#FFFBEB"
            animate={{
              opacity: [0.8, 1, 0.8],
              scaleY: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <defs>
            <linearGradient id="diyaGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="50%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            <linearGradient id="flameGlow" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#DC2626" />
              <stop offset="35%" stopColor="#F59E0B" />
              <stop offset="75%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Bottom: Devotional Devanagari Hindi Text */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col items-center gap-1.5"
      >
        <h2
          className="text-3xl sm:text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-200 drop-shadow-[0_4px_18px_rgba(245,158,11,0.85)]"
          style={{ fontFamily: 'var(--font-devnagari)' }}
        >
          जय छठी मैया
        </h2>

        <motion.p
          className="text-xs sm:text-sm text-amber-200/80 font-serif tracking-widest font-semibold"
          style={{ fontFamily: 'var(--font-devnagari)' }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          ॥ ॐ सूर्याय नमः ॥
        </motion.p>
      </motion.div>
    </div>
  );
}
