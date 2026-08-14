/**
 * SeoSection Component
 * Provides crawlable, semantic HTML content (H1, H2, structured song info, cultural context)
 * Visually hidden (sr-only) so it does not show on the user screen while keeping 100% Googlebot search indexability on:
 * - Chhath Ghat
 * - Chhath Puja Songs
 * - Chhath Ghat Songs
 * - छठ घाट
 */
export default function SeoSection({ tracks = [] }) {
  const defaultSongs = [
    { title: 'Kaanch Hi Baans Ke Bahangiya', artist: 'Kalpana Patowary' },
    { title: 'Kelwa Ke Paat Par Ugalen Suruj Dev', artist: 'Sharda Sinha' },
    { title: 'Pahile Pahil Chhathi Maiya', artist: 'Sharda Sinha' },
    { title: 'Uthau Suruj Dev Arghya Ke Beri', artist: 'Anuradha Paudwal' },
    { title: 'Marbo Re Sugwa Dhanush Se', artist: 'Sharda Sinha' },
    { title: 'Patna Ke Ghat Par Chhath Manayeem', artist: 'Pawan Singh' },
  ];

  const songList = tracks && tracks.length > 0 ? tracks : defaultSongs;

  return (
    <div className="sr-only" aria-hidden="false">
      <header>
        <h1>छठ घाट — Chhath Ghat &amp; Chhath Puja Songs Collection</h1>
        <p>
          Listen to authentic Chhath Ghat songs, devotional Chhath Puja songs, and traditional छठ घाट &amp; छठ गीत online.
        </p>
      </header>

      <section>
        <h2>Popular Chhath Ghat Songs (लोकप्रिय छठ घाट गीत)</h2>
        <p>
          Chhath Mahaparv is celebrated with pure devotion, clean ghats, and divine folk music. Iconic Chhath Puja Songs sung by legendary artists like Padma Bhushan Sharda Sinha, Anuradha Paudwal, Kalpana Patowary, and Pawan Singh:
        </p>
        <ul>
          {songList.map((song, idx) => (
            <li key={idx}>
              <h3>{song.title || song.snippet?.title}</h3>
              <p>{song.artist || song.snippet?.channelTitle || 'Devotional Artist'}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>About Chhath Ghat &amp; Chhath Mahaparv (छठ घाट एवं महापर्व का महत्त्व)</h2>
        <p>
          Chhath Ghat (छठ घाट) is the sacred riverbank or water body where devotees gather during Sandhya Arghya and Usha Arghya to perform ancient Vedic rituals. Traditional Chhath Ghat songs evoke deep reverence, purity, and unity across Bihar, Jharkhand, Uttar Pradesh, and worldwide diaspora.
        </p>
        <ul>
          <li>Bahangi Geet: Kaanch Hi Baans Ke Bahangiya Bahangi Lachakat Jaaye</li>
          <li>Arghya Songs: Kelwa Ke Paat Par Ugalen Suruj Dev Arghya Ke Beri</li>
          <li>Chhathi Maiya Stuti: Pahile Pahil Chhathi Maiya Karal Anusthan</li>
        </ul>
      </section>

      <footer>
        <p>Keywords: Chhath Ghat, Chhath Puja Songs, Chhath Ghat Songs, छठ घाट, छठ गीत, Sharda Sinha Chhath Geet, Bhojpuri Devotional Songs</p>
      </footer>
    </div>
  );
}

