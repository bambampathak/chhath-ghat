# 🌅 Chhath Geet

A beautiful, cinematic music player for Chhath Puja devotional songs. Built with React, Tailwind CSS, and the YouTube IFrame Player API.

![Chhath Geet](https://img.shields.io/badge/Chhath-Geet-E8863A?style=for-the-badge&labelColor=1A0F0A)

## ✨ Features

- 🎵 Streams Chhath Puja songs from a YouTube playlist
- 🎨 Dark cinematic design with warm orange/gold accents
- 📱 Fully responsive (mobile, tablet, desktop)
- ▶️ Play/pause, previous/next, and seek controls
- 📋 Up Next queue showing upcoming tracks
- ⚡ Fast loading with elegant loading states
- ♿ Accessible with keyboard navigation and ARIA labels
- 🎬 Smooth Framer Motion animations
- 🚀 Deployable to Vercel

## 🏗 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite, Tailwind CSS v4, Framer Motion, Lucide React |
| Backend | Node.js, Express |
| Database | MongoDB Atlas (playlist caching) |
| Player | YouTube IFrame Player API |
| Deployment | Vercel |

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- (Optional) YouTube Data API v3 key
- (Optional) MongoDB Atlas cluster

### Clone and install

```bash
git clone <your-repo-url>
cd music

# Install frontend
cd frontend
npm install

# Install backend
cd ../backend
npm install
```

### Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:

```env
# Required for playlist metadata (thumbnails, durations)
YOUTUBE_API_KEY=your_youtube_api_key_here

# Required for caching
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/chhath-geet

# Frontend URL for CORS (production)
FRONTEND_URL=https://your-frontend.vercel.app

# Local dev port
PORT=3001
```

> **Note:** The app works without the backend — the YouTube IFrame Player API provides basic playback and track info. The backend adds rich metadata (thumbnails, durations, channel names).

## 🛠 Development

### Start both servers

Terminal 1 — Backend:
```bash
cd backend
npm run dev
```

Terminal 2 — Frontend:
```bash
cd frontend
npm run dev
```

The frontend dev server proxies `/api` requests to `localhost:3001`.

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Frontend only (no backend)

```bash
cd frontend
npm run dev
```

The player will work but without thumbnails/durations in the "Up Next" section.

## 🏗 Build

```bash
cd frontend
npm run build
```

Build output will be in `frontend/dist/`.

## 🚀 Deployment to Vercel

### Deploy as two separate projects

#### Backend

1. In the Vercel dashboard, create a new project
2. Connect your repository
3. Set **Root Directory** to `backend`
4. Add environment variables:
   - `YOUTUBE_API_KEY`
   - `MONGODB_URI`
   - `FRONTEND_URL` (your frontend Vercel URL)
5. Deploy

#### Frontend

1. Create another Vercel project
2. Connect the same repository
3. Set **Root Directory** to `frontend`
4. Add environment variable:
   - `VITE_API_URL` = your backend Vercel URL (e.g., `https://chhath-geet-api.vercel.app`)
5. Update `frontend/vercel.json` — replace the backend URL:
   ```json
   {
     "rewrites": [
       {
         "source": "/api/:path*",
         "destination": "https://your-backend.vercel.app/api/:path*"
       }
     ]
   }
   ```
6. Deploy

## 🔧 Changing the YouTube Playlist

The playlist ID is defined in two places:

1. **Frontend** — `frontend/src/App.jsx`, line 10:
   ```js
   const PLAYLIST_ID = 'PLHzCHYo-v7E4';
   ```

2. The backend automatically fetches metadata for whatever playlist ID the frontend requests via the `/api/playlist?id=...` endpoint.

To change the playlist, simply update the `PLAYLIST_ID` constant in `App.jsx`.

## 📝 YouTube IFrame API Limitations

- **`getVideoData()`** is undocumented and may not always return complete data. The backend provides reliable metadata as a supplement.
- **Autoplay** is restricted by browsers until user interaction. The player respects this by not auto-playing.
- **Volume control** is not shown in the web UI (per design requirements). Volume is controlled through the YouTube player's built-in controls or device volume.
- **Mobile playback** may behave differently due to OS-level media controls.

## 📄 License

MIT
