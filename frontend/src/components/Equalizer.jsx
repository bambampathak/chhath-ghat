import { motion } from 'framer-motion';

/**
 * Animated audio equalizer bars for MP3 player aesthetic
 * Bounces smoothly when music is playing
 */
export default function Equalizer({ isPlaying }) {
  const bars = [0.4, 0.8, 0.3, 0.9, 0.5, 0.7, 0.4, 0.85, 0.6, 0.35, 0.75, 0.5];

  return (
    <div className="flex items-end justify-center gap-[3px] h-8 px-4" aria-hidden="true">
      {bars.map((heightFactor, index) => (
        <motion.div
          key={index}
          className="w-1 rounded-full"
          style={{
            background: 'linear-gradient(to top, var(--color-chhath-orange), var(--color-chhath-gold))',
            boxShadow: isPlaying ? '0 0 6px rgba(232, 134, 58, 0.4)' : 'none',
          }}
          animate={
            isPlaying
              ? {
                  height: ['20%', `${heightFactor * 100}%`, '20%'],
                }
              : {
                  height: '15%',
                }
          }
          transition={{
            duration: 0.6 + (index % 4) * 0.15,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: index * 0.05,
          }}
        />
      ))}
    </div>
  );
}
