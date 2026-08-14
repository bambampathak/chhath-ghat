import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Music, Sun, Heart, Sparkles, Radio } from 'lucide-react';

/**
 * SeoSection Component
 * Provides crawlable, semantic HTML content (H1, H2, structured song info, cultural context)
 * Optimized for Google search ranking on:
 * - Chhath Ghat
 * - Chhath Puja Songs
 * - Chhath Ghat Songs
 * - छठ घाट
 */
export default function SeoSection({ tracks = [], onSelectTrack }) {
  const [isOpen, setIsOpen] = useState(false);

  const defaultSongs = [
    { title: 'Kaanch Hi Baans Ke Bahangiya', artist: 'Kalpana Patowary', role: 'Traditional Bahangi Geet' },
    { title: 'Kelwa Ke Paat Par Ugalen Suruj Dev', artist: 'Sharda Sinha', role: 'Classic Arghya Geet' },
    { title: 'Pahile Pahil Chhathi Maiya', artist: 'Sharda Sinha', role: 'Devotional Chhath Geet' },
    { title: 'Uthau Suruj Dev Arghya Ke Beri', artist: 'Anuradha Paudwal', role: 'Morning Arghya Song' },
    { title: 'Marbo Re Sugwa Dhanush Se', artist: 'Sharda Sinha', role: 'Traditional Folk Song' },
    { title: 'Patna Ke Ghat Par Chhath Manayeem', artist: 'Pawan Singh', role: 'Bhojpuri Chhath Ghat Song' },
  ];

  const songList = tracks && tracks.length > 0 ? tracks : defaultSongs;

  return (
    <section className="w-full max-w-4xl mx-auto px-4 mt-8 mb-24 select-text">
      {/* Expand/Collapse Toggle Button for Visual Elegance */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide text-amber-200 bg-amber-950/40 border border-amber-500/30 hover:bg-amber-900/50 hover:border-amber-400/60 transition-all backdrop-blur-md shadow-lg"
          aria-expanded={isOpen}
          aria-controls="seo-content-panel"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{isOpen ? 'छठ घाट गीत जानकारी छिपाएं' : 'छठ घाट & Chhath Puja Songs guide'}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-amber-300 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* Crawlable SEO Content Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="seo-content-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden bg-neutral-950/80 border border-amber-500/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 text-neutral-200 shadow-2xl space-y-6"
          >
            {/* Primary Heading H1 */}
            <div className="border-b border-amber-500/20 pb-4 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-100 tracking-tight flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <Sun className="w-6 h-6 text-amber-400 animate-pulse" />
                <span>छठ घाट — Chhath Ghat &amp; Chhath Puja Songs Collection</span>
              </h1>
              <p className="text-xs sm:text-sm text-amber-300/80 mt-2 font-medium">
                Listen to authentic <strong className="text-amber-200">Chhath Ghat songs</strong>, devotional{' '}
                <strong className="text-amber-200">Chhath Puja songs</strong>, and traditional{' '}
                <strong className="text-amber-200">छठ घाट</strong> &amp; <strong className="text-amber-200">छठ गीत</strong> online.
              </p>
            </div>

            {/* Section 1: H2 Track Breakdown */}
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-amber-300 flex items-center gap-2">
                <Music className="w-5 h-5 text-amber-400" />
                <span>Popular Chhath Ghat Songs (लोकप्रिय छठ घाट गीत)</span>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Chhath Mahaparv is celebrated with pure devotion, clean ghats, and divine folk music. Below is a curated list of iconic <strong>Chhath Puja Songs</strong> sung by legendary artists like Padma Bhushan Sharda Sinha, Anuradha Paudwal, Kalpana Patowary, and Pawan Singh:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {songList.slice(0, 8).map((song, idx) => (
                  <div
                    key={idx}
                    onClick={() => onSelectTrack && onSelectTrack(idx)}
                    className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/10 hover:border-amber-400/40 hover:bg-amber-900/30 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="min-w-0 pr-2">
                      <h3 className="text-xs sm:text-sm font-semibold text-amber-100 truncate group-hover:text-amber-300">
                        {song.title || song.snippet?.title}
                      </h3>
                      <p className="text-[11px] text-amber-400/70 truncate">
                        {song.artist || song.snippet?.channelTitle || 'Devotional Artist'}
                      </p>
                    </div>
                    <Radio className="w-4 h-4 text-amber-400/50 group-hover:text-amber-400 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: H2 Cultural Importance of Chhath Ghat */}
            <div className="space-y-3 pt-2 border-t border-amber-500/15">
              <h2 className="text-lg sm:text-xl font-bold text-amber-300 flex items-center gap-2">
                <Heart className="w-5 h-5 text-amber-400" />
                <span>About Chhath Ghat &amp; Chhath Mahaparv (छठ घाट एवं महापर्व का महत्त्व)</span>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                <strong>Chhath Ghat (छठ घाट)</strong> is the sacred riverbank or water body where devotees gathering during <em>Sandhya Arghya</em> (evening offering to setting Sun God) and <em>Usha Arghya</em> (morning offering to rising Sun God) perform ancient Vedic rituals. Traditional <strong>Chhath Ghat songs</strong> evoke deep reverence, purity, and unity across Bihar, Jharkhand, Uttar Pradesh, and worldwide diaspora.
              </p>
              <ul className="list-disc list-inside text-xs sm:text-sm text-neutral-300 space-y-1 pl-2">
                <li><strong className="text-amber-200">Bahangi Geet:</strong> Kaanch Hi Baans Ke Bahangiya Bahangi Lachakat Jaaye.</li>
                <li><strong className="text-amber-200">Arghya Songs:</strong> Kelwa Ke Paat Par Ugalen Suruj Dev Arghya Ke Beri.</li>
                <li><strong className="text-amber-200">Chhathi Maiya Stuti:</strong> Pahile Pahil Chhathi Maiya Karal Anusthan.</li>
              </ul>
            </div>

            {/* Footer keywords tag list */}
            <div className="pt-3 border-t border-amber-500/15 text-[11px] text-amber-400/60 flex flex-wrap gap-2">
              <span className="font-semibold text-amber-300">Keywords:</span>
              <span>Chhath Ghat</span> • <span>Chhath Puja Songs</span> • <span>Chhath Ghat Songs</span> • <span>छठ घाट</span> • <span>छठ गीत</span> • <span>Sharda Sinha Chhath Geet</span> • <span>Bhojpuri Devotional Songs</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
