import { motion } from 'framer-motion';

/**
 * Footer component matching apnabihar.xyz
 */
export default function Footer() {
  return (
    <footer className="fixed bottom-3 left-0 right-0 z-30 flex items-center justify-center px-6 pointer-events-none text-xs">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-white/60 drop-shadow select-none"
      >
        Made with ❤️ for Chhath Puja
      </motion.div>
    </footer>
  );
}
