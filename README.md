# Butthole Coin Website

An immersive 3D scroll-driven website for $BUTTHOLE coin, built with React, Three.js, and Tone.js.

## 🚀 Live Site

- **Production**: https://buttholecoin.fly.dev (or buttholecoin.dev once DNS propagates)
- **Swap**: https://butthole.exchange/

## ✨ Features

- **3D Ring Animation**: Animated dashed ring with 9 pinch points that contract and release
- **Particle Burst Effects**: Particles burst from the ring at the same 3D angle when it opens
- **Parallax Scroll Journey**: Camera orbits smoothly through 3D space as you scroll
- **Sound Design**: Ambient drone and whoosh effects (toggle on/off)
- **Bloom/Glow Effects**: Post-processing for visual impact
- **Real-time Stats**: Market cap and holders fetched from DexScreener & Helius RPC
- **All-Time Volume Counter**: Animated counter showing cumulative trading volume since launch ($1.26B+)
- **Social Proof Section**: Embedded tweets from influencers (Gordon Gekko, Ivan on Tech, etc.)
- **Forbes Feature**: Highlighted feature in Forbes Digital Assets
- **Exchange Listings**: MEXC, Moonshot, CoinGecko, BitGet, CoinEx, XT.COM
- **Butthole Swap Integration**: Embedded iframe to butthole.exchange
- **Responsive Design**: Optimized for desktop and mobile

## 🛠️ Tech Stack

- **Frontend**: React 18, Three.js (@react-three/fiber), Post-processing (@react-three/postprocessing)
- **Audio**: Tone.js
- **Routing**: react-router-dom
- **Bundler**: Vite
- **Backend**: Express.js (for volume API)
- **Deployment**: Fly.io with persistent volumes
- **Scheduling**: node-cron for daily volume accumulation

## 📁 Project Structure

```
butthole-site/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx              # Main React component with 3D scene
│   ├── main.jsx             # Entry point with BrowserRouter
│   ├── index.css            # Global styles
│   └── pages/
│       ├── Whitepaper.jsx   # Standalone whitepaper page
│       └── Roadmap.jsx      # Standalone roadmap page
├── server.js                # Express server for volume API
├── Dockerfile               # Multi-stage build for Fly.io
├── fly.toml                 # Fly.io configuration with volumes
└── package.json
```

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Create .env file for Helius API (optional)
echo "VITE_HELIUS_API_KEY=your-key-here" > .env

# Start dev server (Vite)
npm run dev

# Build for production
npm run build

# Start production server (Express + static)
npm start
```

## 🚢 Deploy to Fly.io

### First Time Setup

```bash
# Login to Fly.io
fly auth login

# Create the app (if not exists)
fly apps create buttholecoin

# Create persistent volumes (2 for redundancy)
fly volumes create butthole_data --region dfw --size 1 -a buttholecoin --yes
fly volumes create butthole_data --region dfw --size 1 -a buttholecoin --yes

# Set Helius API key as secret
fly secrets set VITE_HELIUS_API_KEY=your-key-here -a buttholecoin
```

### Deploy

```bash
# Deploy with Helius API key build arg
fly deploy --build-arg VITE_HELIUS_API_KEY=your-key-here
```

### Custom Domain (GoDaddy)

Add these DNS records in GoDaddy:
- **A Record**: `@` → `66.241.124.220`
- **AAAA Record**: `@` → `2a09:8280:1::4c:b685`
- **CNAME Record**: `www` → `buttholecoin.fly.dev`

Then verify:
```bash
fly certs add buttholecoin.dev -a buttholecoin
```

## 📊 API Endpoints

### Volume API
- **GET** `/api/volume` - Returns all-time volume data

```json
{
  "totalVolume": 1258816036.49,
  "totalVolumeFormatted": "$1.26B",
  "last24hVolume": 3681.96,
  "last24hVolumeFormatted": "$3.7K",
  "lastUpdated": "2025-12-28T10:47:16.238Z",
  "startDate": "2024-12-29T00:00:00.000Z",
  "daysSinceStart": 364
}
```

## 🎨 Key Components

### 3D Animation (App.jsx)
- **GlitchRing**: Main ring with 9 pinch points, animated contraction/release
- **BurstParticles**: Particles that burst from ring orientation
- **StarField**: Background ambient particles
- **CameraController**: Smooth parallax camera movement on scroll

### Stats Section
- Real-time market cap from DexScreener API
- Holder count from Helius RPC
- Animated all-time volume counter with spinning ring decoration

### Social Proof
- Tweet cards from influential crypto accounts
- Profile images, follower counts, engagement metrics
- Links to original tweets on X

## 📱 Mobile Optimizations

- Responsive grid layouts with CSS clamp()
- Hidden decorative spinning rings on mobile (< 768px)
- Adjusted font sizes for small screens
- Touch-friendly navigation

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_HELIUS_API_KEY` | Helius RPC API key for holder data | Optional |
| `DATA_DIR` | Directory for volume data persistence | Auto-set by Fly.io |

## 📝 Recent Updates (Dec 28, 2025)

- ✅ Added animated all-time volume counter ($1.26B)
- ✅ Backend server with daily volume accumulation
- ✅ Persistent Fly.io volumes for data storage
- ✅ Mobile stats section overflow fix
- ✅ Removed "double cheek pattern" tweet
- ✅ Hidden spinning rings on mobile
- ✅ Responsive font sizing for stats

## 📄 License

© 2025 Butthole Coin Limited Company
