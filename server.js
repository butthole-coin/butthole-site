import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Volume tracking file path - use /data for Fly.io persistent volume
const VOLUME_FILE = process.env.VOLUME_FILE || path.join(__dirname, 'volume-data.json');

// Ensure data directory exists
const dataDir = path.dirname(VOLUME_FILE);
if (!fs.existsSync(dataDir)) {
  try {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log('Created data directory:', dataDir);
  } catch (err) {
    console.log('Could not create data directory, using local file');
  }
}
const TOKEN_ADDRESS = 'CboMcTUYUcy9E6B3yGdFn6aEsGUnYV6yWeoeukw6pump';
const UPDATE_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Historical all-time volume from CoinGecko (Dec 29, 2024 to Dec 28, 2025)
// This is the sum of all daily volumes since token launch
const HISTORICAL_VOLUME_TOTAL = 1258816036.49;
const HISTORICAL_CUTOFF_DATE = '2025-12-28T04:30:16.000Z';

// Initialize volume data
function initVolumeData() {
  const defaultData = {
    totalVolume: HISTORICAL_VOLUME_TOTAL, // Start with historical total
    lastUpdated: HISTORICAL_CUTOFF_DATE,
    last24hVolume: 0,
    startDate: '2024-12-29T00:00:00.000Z', // Token launch date
    historicalVolumeIncluded: true,
    history: []
  };

  try {
    if (fs.existsSync(VOLUME_FILE)) {
      const data = JSON.parse(fs.readFileSync(VOLUME_FILE, 'utf8'));
      
      // If existing data doesn't have historical volume, upgrade it
      if (!data.historicalVolumeIncluded) {
        console.log('Upgrading volume data with historical total...');
        data.totalVolume = HISTORICAL_VOLUME_TOTAL + (data.totalVolume || 0);
        data.historicalVolumeIncluded = true;
        data.startDate = '2024-12-29T00:00:00.000Z';
        saveVolumeData(data);
      }
      
      console.log('Loaded existing volume data:', formatVolume(data.totalVolume));
      return data;
    }
  } catch (err) {
    console.error('Error reading volume file:', err);
  }

  // Save default data with historical volume
  saveVolumeData(defaultData);
  console.log('Initialized with historical volume:', formatVolume(HISTORICAL_VOLUME_TOTAL));
  return defaultData;
}

// Save volume data to file
function saveVolumeData(data) {
  try {
    fs.writeFileSync(VOLUME_FILE, JSON.stringify(data, null, 2));
    console.log('Volume data saved:', formatVolume(data.totalVolume));
  } catch (err) {
    console.error('Error saving volume file:', err);
  }
}

// Fetch current 24h volume from DexScreener
async function fetch24hVolume() {
  try {
    const response = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${TOKEN_ADDRESS}`
    );
    const data = await response.json();

    if (data.pairs && data.pairs.length > 0) {
      // Sum volume across all pairs
      const totalVolume24h = data.pairs.reduce((total, pair) => {
        return total + (pair.volume?.h24 || 0);
      }, 0);
      return totalVolume24h;
    }
    return 0;
  } catch (err) {
    console.error('Error fetching volume from DexScreener:', err);
    return 0;
  }
}

// Format number for display (abbreviated)
function formatVolume(num) {
  if (num >= 1000000000) {
    return `$${(num / 1000000000).toFixed(2)}B`;
  } else if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(2)}M`;
  } else if (num >= 1000) {
    return `$${(num / 1000).toFixed(1)}K`;
  }
  return `$${num.toFixed(0)}`;
}

// Format number with full commas (e.g., $1,258,870,940)
function formatVolumeFull(num) {
  return `$${Math.floor(num).toLocaleString('en-US')}`;
}

// Update cumulative volume
async function updateCumulativeVolume() {
  const current24hVolume = await fetch24hVolume();
  
  if (current24hVolume > 0) {
    const now = new Date();
    
    // Check if we should add volume (once per 24h period)
    if (volumeData.lastUpdated) {
      const lastUpdate = new Date(volumeData.lastUpdated);
      const hoursSinceUpdate = (now - lastUpdate) / (1000 * 60 * 60);
      
      // Only add volume if at least 20 hours have passed (to account for timing variations)
      if (hoursSinceUpdate >= 20) {
        // Add the current 24h volume to total
        volumeData.totalVolume += current24hVolume;
        volumeData.history.push({
          date: now.toISOString(),
          added: current24hVolume,
          total: volumeData.totalVolume
        });
        
        // Keep only last 90 days of history
        if (volumeData.history.length > 90) {
          volumeData.history = volumeData.history.slice(-90);
        }
        
        console.log(`Added ${formatVolume(current24hVolume)} to total. New total: ${formatVolume(volumeData.totalVolume)}`);
      }
    } else {
      // First update - just record the 24h volume as starting point
      volumeData.totalVolume = current24hVolume;
      console.log(`Initial volume set to: ${formatVolume(current24hVolume)}`);
    }
    
    volumeData.last24hVolume = current24hVolume;
    volumeData.lastUpdated = now.toISOString();
    saveVolumeData(volumeData);
  }
}

// Initialize data
let volumeData = initVolumeData();

// Run initial update
updateCumulativeVolume();

// Schedule periodic updates (every 24 hours)
setInterval(updateCumulativeVolume, UPDATE_INTERVAL);

// Also update every hour to keep the current 24h volume fresh
setInterval(async () => {
  const current24h = await fetch24hVolume();
  if (current24h > 0) {
    volumeData.last24hVolume = current24h;
  }
}, 60 * 60 * 1000); // 1 hour

// CORS middleware for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// API endpoint for volume data
app.get('/api/volume', (req, res) => {
  res.json({
    totalVolume: volumeData.totalVolume,
    totalVolumeFormatted: formatVolumeFull(volumeData.totalVolume), // Full number with commas
    totalVolumeShort: formatVolume(volumeData.totalVolume), // Abbreviated like $1.26B
    last24hVolume: volumeData.last24hVolume,
    last24hVolumeFormatted: formatVolume(volumeData.last24hVolume),
    lastUpdated: volumeData.lastUpdated,
    startDate: volumeData.startDate,
    daysSinceStart: volumeData.startDate 
      ? Math.floor((new Date() - new Date(volumeData.startDate)) / (1000 * 60 * 60 * 24))
      : 0
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle SPA routing - send all other requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Volume tracking started. Current total: ${formatVolume(volumeData.totalVolume)}`);
});
