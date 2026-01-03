import React, { useEffect, useRef, useState, Suspense, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import * as Tone from 'tone';

// ============================================
// TOKEN CONFIG
// ============================================
const TOKEN_ADDRESS = 'CboMcTUYUcy9E6B3yGdFn6aEsGUnYV6yWeoeukw6pump';
const X_HANDLE = 'thebuttholecoin';
const LOGO_URL = 'https://quantum-assets.fly.dev/assets/bhl.png';

// ============================================
// WORLD BUTTHOLE COUNTER COMPONENT
// ============================================
function WorldButtholeCounter() {
  // World population base: ~8.12 billion as of Jan 2025
  // Growth rate: approximately 2.5 people per second
  const basePopulation = 8123456789;
  const baseDate = new Date('2025-01-01T00:00:00Z').getTime();
  const growthPerSecond = 2.5;
  
  const [population, setPopulation] = useState(() => {
    const elapsed = (Date.now() - baseDate) / 1000;
    return Math.floor(basePopulation + elapsed * growthPerSecond);
  });
  const [recentlyUpdated, setRecentlyUpdated] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = (Date.now() - baseDate) / 1000;
      const newPop = Math.floor(basePopulation + elapsed * growthPerSecond);
      if (newPop !== population) {
        setPopulation(newPop);
        setRecentlyUpdated(true);
        setTimeout(() => setRecentlyUpdated(false), 150);
      }
    }, 400); // Update every 400ms for visible ticking
    
    return () => clearInterval(interval);
  }, [population]);
  
  // Format with commas
  const formatted = population.toLocaleString();
  const digits = formatted.split('');
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      padding: '25px 40px',
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '16px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle pulsing ring behind counter */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '180px',
        height: '180px',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '50%',
        animation: 'breathe-ring 4s ease-in-out infinite',
        pointerEvents: 'none'
      }} />
      
      <div style={{
        fontSize: '9px',
        letterSpacing: '3px',
        color: '#555',
        textTransform: 'uppercase'
      }}>
        The Butthole Index
      </div>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1px',
        fontFamily: 'Space Mono, monospace',
        position: 'relative',
        zIndex: 1
      }}>
        {digits.map((digit, i) => {
          const isNumber = digit !== ',';
          const isLastDigits = i >= digits.length - 3;
          
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                fontSize: isNumber ? 'clamp(18px, 3vw, 28px)' : 'clamp(14px, 2vw, 20px)',
                fontWeight: '400',
                minWidth: isNumber ? 'clamp(14px, 2vw, 20px)' : '8px',
                textAlign: 'center',
                color: recentlyUpdated && isLastDigits ? '#fff' : '#888',
                textShadow: recentlyUpdated && isLastDigits 
                  ? '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.4)' 
                  : '0 0 10px rgba(255,255,255,0.1)',
                transition: 'all 0.15s ease',
                transform: recentlyUpdated && isLastDigits ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              {digit}
            </span>
          );
        })}
      </div>
      
      <div style={{
        fontSize: '10px',
        letterSpacing: '2px',
        color: '#444',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <span style={{
          display: 'inline-block',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: recentlyUpdated ? '#4ade80' : '#333',
          boxShadow: recentlyUpdated ? '0 0 8px #4ade80' : 'none',
          transition: 'all 0.15s ease'
        }} />
        BUTTHOLES ON EARTH
      </div>
      
      <style>{`
        @keyframes breathe-ring {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}

// ============================================
// TYPEWRITER LOGO COMPONENT
// ============================================
function TypewriterLogo() {
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState('typing'); // 'typing', 'pausing', 'deleting'
  const fullText = 'BUTTHOLE';
  
  useEffect(() => {
    let timeout;
    
    if (phase === 'typing') {
      if (displayText.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setPhase('pausing'), 100);
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 2500);
    } else if (phase === 'deleting') {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 60);
      } else {
        timeout = setTimeout(() => setPhase('typing'), 500);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [displayText, phase]);
  
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '10px',
      textDecoration: 'none',
      color: '#fff'
    }}>
      <img 
        src={LOGO_URL} 
        alt="Butthole Coin" 
        style={{ 
          width: '32px', 
          height: '32px',
          borderRadius: '50%'
        }} 
      />
      <span style={{ 
        fontSize: '14px', 
        fontWeight: 'bold', 
        letterSpacing: '2px',
        minWidth: '110px'
      }}>
        ${displayText}
        <span style={{ 
          marginLeft: '2px',
          animation: 'blink 0.8s infinite'
        }}>|</span>
      </span>
      <style>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ============================================
// ANIMATED VOLUME COUNTER COMPONENT
// ============================================
function AnimatedVolumeCounter({ value, isLoading }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const targetValue = useMemo(() => {
    // Parse value like "$1.26B" to number
    if (!value || value === '$--' || value.includes('--')) return 0;
    const numStr = value.replace(/[$,]/g, '');
    const multiplier = numStr.includes('B') ? 1e9 : numStr.includes('M') ? 1e6 : numStr.includes('K') ? 1e3 : 1;
    const num = parseFloat(numStr.replace(/[BMK]/g, ''));
    return isNaN(num) ? 0 : num * multiplier;
  }, [value]);

  useEffect(() => {
    if (targetValue === 0) return;
    
    setIsAnimating(true);
    const duration = 2500; // 2.5 seconds
    const startValue = displayValue || targetValue * 0.7; // Start from 70% for effect
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function - ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      
      const current = startValue + (targetValue - startValue) * eased;
      setDisplayValue(current);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };
    
    requestAnimationFrame(animate);
  }, [targetValue]);

  // Format the display value
  const formatDisplay = (num) => {
    if (num >= 1e9) {
      return { value: (num / 1e9).toFixed(2), suffix: 'B' };
    } else if (num >= 1e6) {
      return { value: (num / 1e6).toFixed(2), suffix: 'M' };
    } else if (num >= 1e3) {
      return { value: (num / 1e3).toFixed(1), suffix: 'K' };
    }
    return { value: num.toFixed(0), suffix: '' };
  };

  const formatted = formatDisplay(displayValue);
  const digits = formatted.value.split('');
  
  // Show loading state if no value yet
  if (displayValue === 0 && isLoading) {
    return (
      <div style={{
        fontSize: 'clamp(28px, 4vw, 44px)',
        fontWeight: '100',
        textShadow: '0 0 30px rgba(255,255,255,0.3)',
        opacity: 0.5,
        animation: 'pulse 1.5s infinite'
      }}>
        $--
      </div>
    );
  }
  
  // Show placeholder if no data
  if (displayValue === 0 && !isLoading) {
    return (
      <div style={{
        fontSize: 'clamp(28px, 4vw, 44px)',
        fontWeight: '100',
        textShadow: '0 0 30px rgba(255,255,255,0.3)',
        opacity: 0.7
      }}>
        $--
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2px',
      perspective: '1000px'
    }}>
      <span style={{ 
        fontSize: 'clamp(28px, 4vw, 44px)',
        fontWeight: '100',
        color: isAnimating ? '#fff' : '#fff',
        textShadow: isAnimating 
          ? '0 0 40px rgba(255,255,255,0.8), 0 0 80px rgba(255,255,255,0.4)' 
          : '0 0 30px rgba(255,255,255,0.3)'
      }}>$</span>
      
      {digits.map((digit, i) => (
        <div
          key={i}
          style={{
            display: 'inline-block',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: '100',
            minWidth: digit === '.' ? '12px' : '24px',
            textAlign: 'center',
            color: '#fff',
            textShadow: isAnimating 
              ? '0 0 40px rgba(255,255,255,0.8), 0 0 80px rgba(255,255,255,0.4)' 
              : '0 0 30px rgba(255,255,255,0.3)',
            transform: isAnimating && digit !== '.' 
              ? `translateY(${Math.sin(Date.now() / 100 + i) * 2}px)` 
              : 'none',
            transition: 'all 0.1s ease'
          }}
        >
          {digit}
        </div>
      ))}
      
      <span style={{ 
        fontSize: 'clamp(28px, 4vw, 44px)',
        fontWeight: '100',
        color: '#fff',
        textShadow: isAnimating 
          ? '0 0 40px rgba(255,255,255,0.8), 0 0 80px rgba(255,255,255,0.4)' 
          : '0 0 30px rgba(255,255,255,0.3)',
        marginLeft: '4px'
      }}>{formatted.suffix}</span>
      
      {isAnimating && (
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
          animation: 'pulse-glow 1s ease-in-out infinite'
        }} />
      )}
      
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes spin-digit {
          0% { transform: rotateX(0deg); }
          100% { transform: rotateX(360deg); }
        }
      `}</style>
    </div>
  );
}

// Helius API key from environment variable (set via fly secrets)
// For local dev, create a .env file with VITE_HELIUS_API_KEY=your-key
const HELIUS_API_KEY = import.meta.env.VITE_HELIUS_API_KEY || '';

// ============================================
// REAL-TIME STATS HOOK
// ============================================
function useTokenStats() {
  const [stats, setStats] = useState({
    marketCap: null,
    holders: null,
    allTimeVolume: null,
    allTimeVolumeShort: null,
    community: '22.5K',
    loading: true,
    error: null
  });

  const formatNumber = useCallback((num) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      // Fetch from DexScreener API (free, no auth required)
      const dexResponse = await fetch(
        `https://api.dexscreener.com/latest/dex/tokens/${TOKEN_ADDRESS}`
      );
      const dexData = await dexResponse.json();
      
      let marketCap = null;
      let holders = null;
      
      if (dexData.pairs && dexData.pairs.length > 0) {
        // Get the pair with highest liquidity
        const topPair = dexData.pairs.reduce((a, b) => 
          (a.liquidity?.usd || 0) > (b.liquidity?.usd || 0) ? a : b
        );
        marketCap = topPair.marketCap || topPair.fdv;
        
        // DexScreener sometimes includes holder info in token info
        if (topPair.info?.holders) {
          holders = topPair.info.holders;
        }
      }

      // Try Helius REST API for holder count
      if (!holders && HELIUS_API_KEY) {
        try {
          // Use Helius token holders endpoint
          const heliusResponse = await fetch(
            `https://api.helius.xyz/v0/addresses/${TOKEN_ADDRESS}/balances?api-key=${HELIUS_API_KEY}`
          );
          const heliusData = await heliusResponse.json();
          console.log('Helius balances:', heliusData);
        } catch (e) {
          console.log('Helius balances fetch failed:', e);
        }
      }
      
      // Use a static fallback for holder count
      // This can be updated manually or via a backend service
      // The exact holder count requires iterating all token accounts
      // which is computationally expensive
      if (!holders) {
        // Static value - update this periodically or set up a backend
        holders = 31700; // Last known holder count
      }
      
      // Fallback: Try to get holder count from DexScreener's token info endpoint
      if (!holders) {
        try {
          const tokenInfoResponse = await fetch(
            `https://api.dexscreener.com/latest/dex/tokens/${TOKEN_ADDRESS}`
          );
          const tokenInfo = await tokenInfoResponse.json();
          // Some tokens have holder data in the response
          if (tokenInfo.pairs?.[0]?.info?.holders) {
            holders = tokenInfo.pairs[0].info.holders;
          }
        } catch (e) {
          console.log('Token info fetch failed');
        }
      }

      // Fetch all-time volume from our API (if available)
      let allTimeVolume = null;
      let allTimeVolumeShort = null;
      try {
        const volumeResponse = await fetch('/api/volume');
        if (volumeResponse.ok) {
          const volumeData = await volumeResponse.json();
          allTimeVolume = volumeData.totalVolumeFormatted;
          allTimeVolumeShort = volumeData.totalVolumeShort;
        }
      } catch (e) {
        console.log('Volume API not available');
      }

      setStats({
        marketCap: marketCap ? `$${formatNumber(marketCap)}` : null,
        holders: holders ? `${formatNumber(holders)}+` : null,
        allTimeVolume: allTimeVolume,
        allTimeVolumeShort: allTimeVolumeShort,
        community: '22.5K',
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats(prev => ({ ...prev, loading: false, error: error.message }));
    }
  }, [formatNumber]);

  useEffect(() => {
    fetchStats();
    // Refresh every 60 seconds
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  return stats;
}

// ============================================
// SOUND MANAGER
// ============================================
const HALO_THEME_URL = 'https://quantum-assets.fly.dev/assets/Halo%20Theme%20Song%20Original.mp3';

class SoundManager {
  constructor() {
    this.initialized = false;
    this.enabled = false;
    this.audio = null;
  }

  async init() {
    if (this.initialized) return;
    
    // Use native HTML5 Audio for better cross-origin support
    this.audio = new Audio(HALO_THEME_URL);
    this.audio.loop = true;
    this.audio.volume = 0.5;
    this.audio.crossOrigin = 'anonymous';
    
    // Preload the audio
    this.audio.load();
    
    this.initialized = true;
  }

  start() {
    if (!this.initialized || this.enabled) return;
    this.enabled = true;
    
    // Start playing the MP3
    if (this.audio) {
      this.audio.play().catch(err => {
        console.log('Audio play failed:', err);
      });
    }
  }

  stop() {
    if (!this.enabled) return;
    this.enabled = false;
    
    // Pause the MP3
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  updateWithScroll(progress) {
    // Optional: modulate volume based on scroll
    if (!this.enabled || !this.audio) return;
    this.audio.volume = Math.min(1, 0.4 + progress * 0.3);
  }

  playWhoosh() {
    // No-op for now
  }
}

const soundManager = new SoundManager();

// ============================================
// 3D RING COMPONENTS
// ============================================

// Number of pinch points on the ring
const NUM_PINCH_POINTS = 9;
// Cycle duration in seconds
const CYCLE_DURATION = 5;
// Shared rotation state for syncing ring and particles
const ringRotation = { x: 0, y: 0, z: 0 };

// Individual dash mesh for the ring with multi-point pinch effect
function RingDash({ angle, radius, index, totalDashes, scrollProgress }) {
  const meshRef = useRef();
  const baseAngle = angle;
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  const speed = useMemo(() => 0.5 + Math.random() * 0.5, []);
  const radiusOffset = useMemo(() => (Math.random() - 0.5) * 0.15, []); // Reduced randomness
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const t = state.clock.elapsedTime;
    const noise = Math.sin(t * speed + phase) * 0.05; // Reduced noise
    const breathe = Math.sin(t * 0.5) * 0.03;
    
    // Pinch cycle - every CYCLE_DURATION seconds
    const cycleProgress = (t % CYCLE_DURATION) / CYCLE_DURATION; // 0 to 1
    
    // Pinch phases:
    // 0.0 - 0.3: Contract inward (pinch)
    // 0.3 - 0.5: Hold contracted
    // 0.5 - 0.7: Release/expand (burst moment)
    // 0.7 - 1.0: Rest at full size
    
    let pinchAmount = 0;
    if (cycleProgress < 0.3) {
      // Contract: ease in
      pinchAmount = Math.pow(cycleProgress / 0.3, 2);
    } else if (cycleProgress < 0.5) {
      // Hold at max contraction
      pinchAmount = 1;
    } else if (cycleProgress < 0.7) {
      // Release: ease out with slight overshoot
      const releaseProgress = (cycleProgress - 0.5) / 0.2;
      pinchAmount = 1 - Math.pow(releaseProgress, 0.5);
    } else {
      // Rest
      pinchAmount = 0;
    }
    
    // Calculate distance to nearest pinch point
    const dashAngle = index / totalDashes; // 0 to 1 around ring
    let minDistToPinch = 1;
    for (let p = 0; p < NUM_PINCH_POINTS; p++) {
      const pinchAngle = p / NUM_PINCH_POINTS;
      const dist = Math.abs(((dashAngle - pinchAngle + 0.5) % 1) - 0.5);
      minDistToPinch = Math.min(minDistToPinch, dist);
    }
    
    // Pinch effect is stronger near pinch points (reduced by 20%)
    const pinchInfluence = Math.exp(-minDistToPinch * 12); // Sharp falloff
    const localPinch = pinchAmount * pinchInfluence * 0.48; // Reduced from 0.6 to 0.48 (20% less)
    
    // Also add a global contraction for the "hold" phase (also reduced)
    const globalContraction = pinchAmount * 0.12; // Reduced from 0.15
    
    const r = radius + radiusOffset + noise + breathe - localPinch * radius - globalContraction * radius;
    const adjustedAngle = baseAngle + t * 0.08; // Slower rotation
    
    // Slight Z movement during pinch
    const zOffset = localPinch * 0.3;
    
    meshRef.current.position.x = Math.cos(adjustedAngle) * r;
    meshRef.current.position.y = Math.sin(adjustedAngle) * r;
    meshRef.current.position.z = Math.sin(t * 0.3 + phase) * 0.05 + zOffset;
    
    meshRef.current.rotation.z = adjustedAngle + Math.PI / 2;
    
    // Scale dashes - thinner during pinch
    const scaleX = 1 - localPinch * 0.4;
    const scaleY = 1 + localPinch * 0.3;
    meshRef.current.scale.set(scaleX, scaleY, 1);
    
    // Opacity - brighter during pinch
    const baseOpacity = 0.5 + Math.sin(t * 2 + phase) * 0.2;
    meshRef.current.material.opacity = baseOpacity + localPinch * 0.4;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[0.12, 0.025]} />
      <meshBasicMaterial 
        color="#ffffff" 
        transparent 
        opacity={0.7} 
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Main ring made of dashes
function GlitchRing({ scrollProgress, ringIndex = 0, scale = 1, color = '#ffffff' }) {
  const groupRef = useRef();
  const numDashes = 120;
  const radius = 2 * scale;
  
  const dashes = useMemo(() => {
    return Array.from({ length: numDashes }, (_, i) => ({
      angle: (i / numDashes) * Math.PI * 2,
      key: i
    }));
  }, [numDashes]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    
    // Ring rotation based on scroll and time
    const rotX = scrollProgress * Math.PI * 0.3 + Math.sin(t * 0.2) * 0.1;
    const rotY = t * 0.05 + scrollProgress * Math.PI * 0.5;
    const rotZ = Math.sin(t * 0.1 + ringIndex) * 0.05;
    
    groupRef.current.rotation.x = rotX;
    groupRef.current.rotation.y = rotY;
    groupRef.current.rotation.z = rotZ;
    
    // Store rotation for particles to sync with
    ringRotation.x = rotX;
    ringRotation.y = rotY;
    ringRotation.z = rotZ;
  });

  return (
    <group ref={groupRef}>
      {dashes.map((dash) => (
        <RingDash 
          key={dash.key}
          angle={dash.angle}
          radius={radius}
          index={dash.key}
          totalDashes={numDashes}
          scrollProgress={scrollProgress}
        />
      ))}
    </group>
  );
}

// Inner particles floating inside ring
// Burst particles that emerge from ring center after contraction
// Particles match the ring's 3D rotation angle
function BurstParticles({ count = 80, scrollProgress }) {
  const groupRef = useRef();
  const pointsRef = useRef();
  const materialRef = useRef();
  
  // Store initial random values for each particle
  const particleData = useMemo(() => {
    return Array.from({ length: count }, () => ({
      angle: Math.random() * Math.PI * 2,
      speed: 0.8 + Math.random() * 2.0, // Slightly faster
      zOffset: (Math.random() - 0.5) * 0.3, // Reduced z spread so particles stay closer to ring plane
      delay: Math.random() * 0.25, // Slightly tighter stagger
      size: 0.015 + Math.random() * 0.01,
    }));
  }, [count]);

  // Create position buffer
  const positions = useMemo(() => new Float32Array(count * 3), [count]);

  useFrame((state) => {
    if (!pointsRef.current || !materialRef.current || !groupRef.current) return;
    
    const t = state.clock.elapsedTime;
    const geometry = pointsRef.current.geometry;
    const positionAttr = geometry.attributes.position;
    
    // Sync rotation with ring - particles burst from same 3D angle
    groupRef.current.rotation.x = ringRotation.x;
    groupRef.current.rotation.y = ringRotation.y;
    groupRef.current.rotation.z = ringRotation.z;
    
    // Sync with ring cycle
    const cycleProgress = (t % CYCLE_DURATION) / CYCLE_DURATION;
    
    // Particles only visible during burst phase (0.5 - 0.95)
    const burstStart = 0.5;
    const burstEnd = 0.95;
    const inBurstPhase = cycleProgress >= burstStart && cycleProgress < burstEnd;
    
    // Calculate burst progress (0 to 1 during burst phase)
    const burstProgress = inBurstPhase 
      ? (cycleProgress - burstStart) / (burstEnd - burstStart)
      : 0;
    
    // Update each particle position (in local space - rotation handled by group)
    for (let i = 0; i < count; i++) {
      const data = particleData[i];
      
      // Particle travels outward during burst
      const particleProgress = Math.max(0, burstProgress - data.delay) / (1 - data.delay);
      const eased = Math.pow(particleProgress, 0.5); // Faster start, slower end
      
      // Start from ring edge (not center), expand outward
      const startRadius = 1.8; // Start near ring edge
      const maxRadius = 3.5 + data.speed; // Expand past ring
      const currentRadius = startRadius + eased * (maxRadius - startRadius);
      
      // Position in ring's local XY plane
      const x = Math.cos(data.angle) * currentRadius;
      const y = Math.sin(data.angle) * currentRadius;
      const z = data.zOffset * eased * 2; // Slight z spread as they travel
      
      positionAttr.setXYZ(i, x, y, z);
    }
    
    positionAttr.needsUpdate = true;
    
    // More intense opacity - brighter and stays visible longer
    const opacity = inBurstPhase ? Math.max(0, 1.0 * (1 - Math.pow(burstProgress, 2.5))) : 0;
    materialRef.current.opacity = opacity;
    
    // Dynamic size - particles grow slightly as they travel
    const dynamicSize = 0.035 + burstProgress * 0.02;
    materialRef.current.size = dynamicSize;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={materialRef}
          size={0.035}
          color="#ffffff"
          transparent
          opacity={0}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

// Background star field with parallax
// Subtle background stars - reduced to keep focus on ring
function StarField({ scrollProgress }) {
  const pointsRef = useRef();
  const count = 300; // Reduced from 800
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60 - 30; // Push further back
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    
    pointsRef.current.rotation.y = t * 0.003; // Slower rotation
    pointsRef.current.position.z = scrollProgress * -20;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04} // Smaller
        color="#ffffff"
        transparent
        opacity={0.3} // More subtle
        sizeAttenuation
      />
    </points>
  );
}

// Camera controller with scroll-driven scenes - smoother transitions
function CameraController({ scrollProgress }) {
  const { camera } = useThree();
  const prevProgress = useRef(0);

  useFrame(() => {
    const scroll = scrollProgress;
    
    // Simplified scene breakdown with gentler movements:
    // 0-0.20: Hero - facing ring with subtle drift
    // 0.20-0.40: Gentle pull back and slight orbit
    // 0.40-0.60: Continue orbit smoothly (no direction reversal)
    // 0.60-0.80: Approach ring
    // 0.80-1.0: Pull out to final view

    let targetPos = { x: 0, y: 0, z: 5 };
    let targetRot = { x: 0, y: 0 };

    if (scroll < 0.20) {
      // Hero view - gentle drift forward
      const t = scroll / 0.20;
      targetPos = { x: 0, y: 0, z: 5 - t * 0.3 };
    } else if (scroll < 0.40) {
      // Pull back with gentle upward drift
      const t = (scroll - 0.20) / 0.20;
      targetPos = { x: 0, y: t * 1.5, z: 4.7 + t * 5 };
      targetRot = { x: t * 0.15, y: 0 };
    } else if (scroll < 0.60) {
      // Gentle orbit - consistent direction, no reversal
      const t = (scroll - 0.40) / 0.20;
      const angle = t * Math.PI * 0.3; // Reduced orbit angle
      targetPos = { 
        x: Math.sin(angle) * 3, 
        y: 1.5 - t * 0.5, 
        z: 9.7 - t * 2 
      };
      targetRot = { x: 0.15 - t * 0.05, y: -angle * 0.3 };
    } else if (scroll < 0.80) {
      // Approach ring - smooth return to center
      const t = (scroll - 0.60) / 0.20;
      const prevAngle = Math.PI * 0.3;
      const currentAngle = prevAngle * (1 - t); // Smoothly reduce angle
      targetPos = { 
        x: Math.sin(currentAngle) * 3 * (1 - t), 
        y: 1 - t * 1, 
        z: 7.7 - t * 4 
      };
      targetRot = { x: 0.1 * (1 - t), y: -currentAngle * 0.3 * (1 - t) };
    } else {
      // Final view - gentle pull out
      const t = (scroll - 0.80) / 0.20;
      targetPos = { x: 0, y: t * 1, z: 3.7 + t * 4 };
      targetRot = { x: t * 0.05, y: 0 };
    }

    // Smoother interpolation (increased lerp factor)
    const lerpSpeed = 0.025;
    camera.position.x += (targetPos.x - camera.position.x) * lerpSpeed;
    camera.position.y += (targetPos.y - camera.position.y) * lerpSpeed;
    camera.position.z += (targetPos.z - camera.position.z) * lerpSpeed;
    camera.rotation.x += (targetRot.x - camera.rotation.x) * lerpSpeed;
    camera.rotation.y += (targetRot.y - camera.rotation.y) * lerpSpeed;

    // Sound whoosh on significant scroll changes
    if (Math.abs(scroll - prevProgress.current) > 0.05) {
      soundManager.playWhoosh();
    }
    prevProgress.current = scroll;
  });

  return null;
}

// Main 3D Scene
function Scene({ scrollProgress }) {
  return (
    <>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 5, 50]} />
      
      <CameraController scrollProgress={scrollProgress} />
      
      {/* Single ring with shading effects */}
      <GlitchRing scrollProgress={scrollProgress} ringIndex={0} scale={1} />
      
      {/* Burst particles that emerge from ring after contraction */}
      <BurstParticles count={100} scrollProgress={scrollProgress} />
      
      {/* Subtle background stars */}
      <StarField scrollProgress={scrollProgress} />
      
      {/* Ambient light for subtle illumination */}
      <ambientLight intensity={0.2} />
      
      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom 
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          radius={0.8}
        />
        <Noise opacity={0.03} />
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
      </EffectComposer>
    </>
  );
}


// ============================================
// PARALLAX TEXT COMPONENT
// ============================================
function ParallaxText({ children, speed = 0.5, style = {} }) {
  const ref = useRef();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distance = centerY - viewportCenter;
      setOffset(distance * speed * 0.1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div 
      ref={ref} 
      style={{ 
        transform: `translateY(${offset}px)`,
        transition: 'transform 0.1s ease-out',
        ...style 
      }}
    >
      {children}
    </div>
  );
}

// ============================================
// INTRO SCENE (For Splash Screen)
// ============================================
function IntroScene({ triggerBurst }) {
  return (
    <>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 5, 50]} />
      
      {/* Camera that zooms in on burst */}
      <IntroCamera triggerBurst={triggerBurst} />
      
      {/* Calm ring that animates on trigger */}
      <IntroRing triggerBurst={triggerBurst} />
      
      {/* Burst particles only show when triggered */}
      <IntroBurstParticles triggerBurst={triggerBurst} />
      
      {/* Subtle background stars */}
      <StarField scrollProgress={0} />
      
      <ambientLight intensity={0.2} />
      
      <EffectComposer>
        <Bloom 
          intensity={triggerBurst ? 4 : 1}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          radius={0.8}
        />
        <Noise opacity={0.03} />
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
      </EffectComposer>
    </>
  );
}

// Intro ring - calm floating initially, dramatic animation on trigger
function IntroRing({ triggerBurst }) {
  const groupRef = useRef();
  const dashRefs = useRef([]);
  const triggerTime = useRef(null);
  const numDashes = 120;
  const radius = 2;
  
  const dashes = useMemo(() => {
    return Array.from({ length: numDashes }, (_, i) => ({
      angle: (i / numDashes) * Math.PI * 2,
      key: i,
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.3
    }));
  }, [numDashes]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    
    // Gentle rotation - slower and more peaceful before trigger
    if (!triggerBurst) {
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.1;
      groupRef.current.rotation.y = t * 0.03;
      groupRef.current.rotation.z = Math.sin(t * 0.1) * 0.03;
    } else {
      // Dramatic rotation on burst
      if (!triggerTime.current) triggerTime.current = t;
      const elapsed = t - triggerTime.current;
      
      // Spin faster during burst
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.1 + elapsed * 0.5;
      groupRef.current.rotation.y = t * 0.03 + elapsed * 2;
      groupRef.current.rotation.z = Math.sin(t * 0.1) * 0.03;
    }
    
    // Animate each dash
    dashRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      
      const dash = dashes[i];
      const baseAngle = dash.angle;
      
      if (!triggerBurst) {
        // CALM STATE: Just gentle breathing, no pinch
        const breathe = Math.sin(t * 0.5 + dash.phase) * 0.05;
        const r = radius + breathe;
        
        mesh.position.x = Math.cos(baseAngle) * r;
        mesh.position.y = Math.sin(baseAngle) * r;
        mesh.position.z = Math.sin(t * dash.speed + dash.phase) * 0.1;
        
        // Point along ring
        mesh.rotation.z = baseAngle + Math.PI / 2;
        
        // Gentle opacity pulsing
        if (mesh.material) {
          mesh.material.opacity = 0.6 + Math.sin(t * 0.5 + dash.phase) * 0.2;
        }
      } else {
        // BURST STATE: Dramatic pinch then explode
        if (!triggerTime.current) triggerTime.current = t;
        const elapsed = t - triggerTime.current;
        
        // Animation phases:
        // 0.0 - 0.4s: Contract to center (pinch)
        // 0.4 - 0.6s: Hold
        // 0.6 - 1.5s: Explode outward
        
        let r = radius;
        let opacity = 0.8;
        
        if (elapsed < 0.4) {
          // Contract inward
          const progress = elapsed / 0.4;
          const eased = Math.pow(progress, 2);
          r = radius * (1 - eased * 0.85); // Contract to 15% size
          opacity = 0.8 + eased * 0.2;
        } else if (elapsed < 0.6) {
          // Hold at center
          r = radius * 0.15;
          opacity = 1;
        } else if (elapsed < 1.5) {
          // Explode outward
          const progress = (elapsed - 0.6) / 0.9;
          const eased = 1 - Math.pow(1 - progress, 3);
          r = radius * 0.15 + eased * (radius * 3); // Expand to 3x
          opacity = 1 - eased;
        } else {
          // Gone
          r = radius * 4;
          opacity = 0;
        }
        
        // Add some chaos during burst
        const chaos = elapsed > 0.6 ? (elapsed - 0.6) * 0.5 : 0;
        const chaosX = Math.sin(i * 0.5 + elapsed * 10) * chaos;
        const chaosY = Math.cos(i * 0.7 + elapsed * 8) * chaos;
        
        mesh.position.x = Math.cos(baseAngle) * r + chaosX;
        mesh.position.y = Math.sin(baseAngle) * r + chaosY;
        mesh.position.z = Math.sin(t * dash.speed + dash.phase) * 0.1 + chaos * 0.5;
        
        mesh.rotation.z = baseAngle + Math.PI / 2 + chaos * 2;
        
        if (mesh.material) {
          mesh.material.opacity = Math.max(0, opacity);
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      {dashes.map((dash, i) => (
        <mesh
          key={dash.key}
          ref={el => dashRefs.current[i] = el}
          position={[Math.cos(dash.angle) * radius, Math.sin(dash.angle) * radius, 0]}
          rotation={[0, 0, dash.angle + Math.PI / 2]}
        >
          <planeGeometry args={[0.08, 0.015]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.7}
            side={2}
          />
        </mesh>
      ))}
    </group>
  );
}

// Burst particles that only appear when triggered
function IntroBurstParticles({ triggerBurst }) {
  const pointsRef = useRef();
  const materialRef = useRef();
  const triggerTime = useRef(null);
  const count = 150;
  
  const particleData = useMemo(() => {
    return Array.from({ length: count }, () => ({
      angle: Math.random() * Math.PI * 2,
      speed: 1 + Math.random() * 3,
      zOffset: (Math.random() - 0.5) * 2,
      size: 0.02 + Math.random() * 0.02,
    }));
  }, [count]);

  const positions = useMemo(() => new Float32Array(count * 3), [count]);

  useFrame((state) => {
    if (!pointsRef.current || !materialRef.current) return;
    if (!triggerBurst) {
      materialRef.current.opacity = 0;
      return;
    }
    
    const t = state.clock.elapsedTime;
    if (!triggerTime.current) triggerTime.current = t;
    const elapsed = t - triggerTime.current;
    
    // Only show particles after the pinch (0.5s delay)
    if (elapsed < 0.5) {
      materialRef.current.opacity = 0;
      return;
    }
    
    const burstElapsed = elapsed - 0.5;
    const geometry = pointsRef.current.geometry;
    const positionAttr = geometry.attributes.position;
    
    for (let i = 0; i < count; i++) {
      const data = particleData[i];
      const progress = Math.min(burstElapsed * data.speed * 0.5, 1);
      const distance = progress * 5; // Expand outward
      
      positions[i * 3] = Math.cos(data.angle) * distance;
      positions[i * 3 + 1] = Math.sin(data.angle) * distance;
      positions[i * 3 + 2] = data.zOffset * progress;
    }
    
    positionAttr.needsUpdate = true;
    
    // Fade out particles
    materialRef.current.opacity = Math.max(0, 1 - burstElapsed * 0.8);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        color="#ffffff"
        size={0.04}
        transparent
        opacity={0}
        sizeAttenuation
        depthWrite={false}
        blending={2}
      />
    </points>
  );
}

// Intro camera that zooms into the ring on burst
function IntroCamera({ triggerBurst }) {
  const { camera } = useThree();
  const triggerTime = useRef(null);
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (triggerBurst) {
      if (!triggerTime.current) triggerTime.current = t;
      const elapsed = t - triggerTime.current;
      
      // Wait for pinch, then zoom during burst
      if (elapsed < 0.5) {
        // Hold position during pinch
        camera.position.set(0, 0, 5);
      } else {
        // Zoom into the ring after pinch
        const zoomElapsed = elapsed - 0.5;
        const progress = Math.min(zoomElapsed / 1.0, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        
        camera.position.z = 5 - eased * 5; // Zoom from 5 to 0
        camera.position.y = eased * 0.3; // Slight upward movement
      }
    } else {
      // Gentle floating camera before trigger
      camera.position.x = Math.sin(t * 0.1) * 0.1;
      camera.position.y = Math.cos(t * 0.15) * 0.1;
      camera.position.z = 5;
    }
  });
  
  return null;
}

// ============================================
// SPLASH SCREEN COMPONENT
// ============================================
function SplashScreen({ onEnter }) {
  const [isHovered, setIsHovered] = useState(false);
  const [triggerBurst, setTriggerBurst] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  
  const handleEnter = async () => {
    // Trigger the burst animation
    setTriggerBurst(true);
    
    // Initialize and start audio after a brief moment (during pinch)
    setTimeout(async () => {
      await soundManager.init();
      soundManager.start();
    }, 400);
    
    // Wait for pinch + burst animation, then fade out and enter
    // Pinch: 0-0.6s, Burst/Zoom: 0.6-1.5s
    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        onEnter();
      }, 600);
    }, 1400);
  };
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: '#000',
      zIndex: 9999,
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.8s ease-out',
      pointerEvents: fadeOut ? 'none' : 'auto'
    }}>
      {/* 3D Canvas with intro scene */}
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Suspense fallback={null}>
          <IntroScene triggerBurst={triggerBurst} />
        </Suspense>
      </Canvas>
      
      {/* Enter Button - positioned lower */}
      <div style={{
        position: 'absolute',
        bottom: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: triggerBurst ? 0 : 1,
        transition: 'opacity 0.3s ease'
      }}>
        <button
          onClick={handleEnter}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            background: 'transparent',
            border: `1px solid ${isHovered ? '#fff' : 'rgba(255,255,255,0.3)'}`,
            color: isHovered ? '#fff' : 'rgba(255,255,255,0.6)',
            padding: '15px 35px',
            fontSize: '11px',
            fontFamily: 'Space Mono, monospace',
            letterSpacing: '3px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            boxShadow: isHovered ? '0 0 30px rgba(255,255,255,0.2)' : 'none'
          }}
        >
          ENTER BUTTHOLE
        </button>
      </div>
    </div>
  );
}

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);
  const lastSectionRef = useRef(-1);
  
  // Handle entering from splash screen
  const handleEnter = useCallback(() => {
    setHasEntered(true);
    setSoundEnabled(true); // Audio was started in splash screen
  }, []);
  
  // Responsive mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Fetch real-time token stats
  const tokenStats = useTokenStats();

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / scrollHeight, 1);
      setScrollProgress(progress);
      
      // Update sound with scroll
      soundManager.updateWithScroll(progress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for sections - lower threshold for mobile compatibility
  // Re-run when hasEntered changes to attach to newly rendered sections
  useEffect(() => {
    if (!hasEntered) return; // Don't set up observer until main content is rendered
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setVisibleSections(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { 
        threshold: 0.1, // Lower threshold for better mobile detection
        rootMargin: '50px 0px' // Trigger slightly before element enters viewport
      }
    );
    
    // Small delay to ensure sections are in the DOM after transition
    const timeout = setTimeout(() => {
      document.querySelectorAll('section[id]').forEach(section => {
        observer.observe(section);
      });
    }, 100);
    
    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [hasEntered]);

  // Toggle sound
  const toggleSound = async () => {
    if (!soundEnabled) {
      await soundManager.init();
      soundManager.start();
      setSoundEnabled(true);
    } else {
      soundManager.stop();
      setSoundEnabled(false);
    }
  };

  const exchanges = [
    { name: 'MEXC', color: '#00B897', href: 'https://www.mexc.com/exchange/BUTTHOLE_USDT' },
    { name: 'Moonshot', color: '#FF6B35', href: 'https://moonshot.money/' },
    { name: 'CoinGecko', color: '#8BC53F', href: 'https://www.coingecko.com/en/coins/butthole-coin' },
    { name: 'BitGet', color: '#00F0FF', href: 'https://web3.bitget.com/en/swap/sol/CboMcTUYUcy9E6B3yGdFn6aEsGUnYV6yWeoeukw6pump' },
    { name: 'CoinEx', color: '#3772FF', href: 'https://www.coinex.com/en/exchange/butthole-usdt' },
    { name: 'XT.COM', color: '#1BA27A', href: 'https://www.xt.com/en/trade/butthole_usdt' },
  ];

  // Show splash screen if not entered yet
  if (!hasEntered) {
    return <SplashScreen onEnter={handleEnter} />;
  }

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>
      {/* Three.js Canvas */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <Suspense fallback={null}>
            <Scene scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      </div>

      {/* Sound Toggle */}
      <button 
        className="sound-toggle"
        onClick={toggleSound}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff',
          padding: '10px 15px',
          fontFamily: 'Space Mono, monospace',
          fontSize: '10px',
          letterSpacing: '1px',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)'
        }}
      >
        {soundEnabled ? '♪ SOUND ON' : '♪ SOUND OFF'}
      </button>

      {/* Scroll Progress Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '2px',
        width: `${scrollProgress * 100}%`,
        background: 'linear-gradient(90deg, #333, #fff)',
        zIndex: 1000
      }} />

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: window.innerWidth < 480 ? '15px 15px' : '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        background: `rgba(0,0,0,${Math.min(scrollProgress * 3, 0.9)})`,
        backdropFilter: scrollProgress > 0.1 ? 'blur(10px)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        <TypewriterLogo />
        <div style={{ display: 'flex', gap: window.innerWidth < 480 ? '15px' : '30px', fontSize: window.innerWidth < 480 ? '10px' : '12px' }}>
          {[
            { label: 'SWAP', href: '#swap' },
            { label: 'WHITEPAPER', href: '/whitepaper', internal: true },
            { label: 'ROADMAP', href: '/roadmap', internal: true },
            { label: 'MERCH', href: 'https://buttholecoin.store' }
          ].map(item => (
            item.internal ? (
              <Link 
                key={item.label}
                to={item.href}
                style={{ color: '#888', textDecoration: 'none', letterSpacing: '1px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = '#888'}
              >
                {item.label}
              </Link>
            ) : (
              <a 
                key={item.label}
                href={item.href}
                target={item.href.startsWith('#') ? '_self' : '_blank'}
                rel={item.href.startsWith('#') ? undefined : 'noopener noreferrer'}
                style={{ color: '#888', textDecoration: 'none', letterSpacing: '1px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = '#888'}
              >
                {item.label}
              </a>
            )
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="hero"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1
        }}
      >
        <ParallaxText speed={-0.3}>
          <div style={{
            textAlign: 'center',
            opacity: Math.max(0, 1 - scrollProgress * 4),
            transform: `scale(${1 - scrollProgress * 0.3})`
          }}>
            <h1 style={{
              fontSize: 'clamp(40px, 10vw, 120px)',
              fontWeight: '100',
              letterSpacing: '0.3em',
              marginBottom: '20px',
              textShadow: '0 0 80px rgba(255,255,255,0.3)'
            }}>
              BUTTHOLE
            </h1>
            
            <p style={{
              color: '#666',
              fontSize: 'clamp(10px, 2vw, 14px)',
              letterSpacing: '0.2em',
              marginBottom: '50px'
            }}>
              ONE CANNOT HAVE A FART WITHOUT A BUTTHOLE
            </p>
            
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a 
                href="#swap"
                style={{
                  background: 'transparent',
                  border: '1px solid #fff',
                  color: '#fff',
                  padding: '15px 40px',
                  fontSize: '12px',
                  letterSpacing: '2px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => { e.target.style.background = '#fff'; e.target.style.color = '#000'; }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#fff'; }}
              >
                BUY NOW
              </a>
              <a 
                href="#stats"
                style={{
                  background: 'transparent',
                  border: '1px solid #fff',
                  color: '#fff',
                  padding: '15px 40px',
                  fontSize: '12px',
                  letterSpacing: '2px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => { e.target.style.background = '#fff'; e.target.style.color = '#000'; }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#fff'; }}
              >
                EXPLORE
              </a>
            </div>
          </div>
        </ParallaxText>
        
        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: Math.max(0, 1 - scrollProgress * 6),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{ fontSize: '10px', letterSpacing: '2px', color: '#666' }}>SCROLL TO EXPLORE</span>
          <div style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, #666, transparent)',
            animation: 'pulse 2s infinite'
          }} />
        </div>
      </section>

      {/* Stats Section */}
      <section 
        id="stats"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          padding: '100px 20px'
        }}
      >
        <ParallaxText speed={0.2}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(15px, 3vw, 40px)',
            maxWidth: 'min(900px, calc(100vw - 40px))',
            width: '100%',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(20px)',
            padding: 'clamp(20px, 5vw, 60px)',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxSizing: 'border-box',
            margin: '0 auto'
          }}>
            {[
              { 
                label: 'MARKET CAP', 
                value: tokenStats.marketCap || '$--',
                loading: tokenStats.loading && !tokenStats.marketCap
              },
              { 
                label: 'HOLDERS', 
                value: tokenStats.holders || '--',
                loading: tokenStats.loading && !tokenStats.holders
              },
              { 
                label: 'COMMUNITY', 
                value: tokenStats.community || '22.5K',
                loading: false
              }
            ].map((stat, i) => {
              const content = (
                <div 
                  key={stat.label}
                  style={{
                    textAlign: 'center',
                    opacity: visibleSections.stats ? 1 : 0,
                    transform: visibleSections.stats ? 'translateY(0)' : 'translateY(40px)',
                    transition: `all 0.6s ease ${i * 0.15}s`,
                    cursor: stat.href ? 'pointer' : 'default'
                  }}
                >
                  <div style={{
                    fontSize: 'clamp(24px, 4vw, 56px)',
                    fontWeight: '100',
                    marginBottom: '8px',
                    textShadow: '0 0 30px rgba(255,255,255,0.3)',
                    opacity: stat.loading ? 0.5 : 1,
                    animation: stat.loading ? 'pulse 1.5s infinite' : 'none',
                    whiteSpace: 'nowrap'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 'clamp(8px, 1.5vw, 11px)', color: '#666', letterSpacing: 'clamp(1px, 0.5vw, 3px)' }}>
                    {stat.label}
                    {stat.href && <span style={{ marginLeft: '5px' }}>↗</span>}
                  </div>
                </div>
              );
              
              return stat.href ? (
                <a 
                  key={stat.label}
                  href={stat.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {content}
                </a>
              ) : (
                <div key={stat.label}>{content}</div>
              );
            })}
          </div>
          
          {/* All-Time Volume - Centered Below Stats with Animation */}
          <div style={{
            textAlign: 'center',
            marginTop: '40px',
            opacity: visibleSections.stats ? 1 : 0,
            transform: visibleSections.stats ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.6s ease 0.5s',
            position: 'relative'
          }}>
            <div style={{
              marginBottom: '10px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              {tokenStats.allTimeVolumeShort ? (
                <div style={{
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  fontWeight: '100',
                  textShadow: '0 0 30px rgba(255,255,255,0.3)',
                  fontFamily: 'Space Mono, monospace',
                  letterSpacing: '2px'
                }}>
                  {tokenStats.allTimeVolumeShort}
                </div>
              ) : (
                <div style={{
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  fontWeight: '100',
                  textShadow: '0 0 30px rgba(255,255,255,0.3)',
                  opacity: tokenStats.loading ? 0.5 : 0.7,
                  animation: tokenStats.loading ? 'pulse 1.5s infinite' : 'none'
                }}>
                  $--
                </div>
              )}
              
              {/* Spinning ring decoration - hidden on mobile via CSS */}
              <div className="desktop-only-rings" style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '200px',
                height: '200px',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%',
                borderTopColor: 'rgba(255,255,255,0.4)',
                animation: 'spin-ring 8s linear infinite',
                pointerEvents: 'none'
              }} />
              <div className="desktop-only-rings" style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '240px',
                height: '240px',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '50%',
                borderBottomColor: 'rgba(255,255,255,0.2)',
                animation: 'spin-ring-reverse 12s linear infinite',
                pointerEvents: 'none'
              }} />
            </div>
            
            <div style={{ 
              fontSize: '11px', 
              color: '#666', 
              letterSpacing: '3px',
              position: 'relative',
              zIndex: 1
            }}>
              ALL-TIME VOLUME
            </div>
            
            <style>{`
              @keyframes spin-ring {
                from { transform: translate(-50%, -50%) rotate(0deg); }
                to { transform: translate(-50%, -50%) rotate(360deg); }
              }
              @keyframes spin-ring-reverse {
                from { transform: translate(-50%, -50%) rotate(360deg); }
                to { transform: translate(-50%, -50%) rotate(0deg); }
              }
              @media (max-width: 768px) {
                .desktop-only-rings {
                  display: none !important;
                }
              }
            `}</style>
          </div>
        </ParallaxText>
      </section>

      {/* Forbes Feature Section */}
      <section 
        id="featured"
        style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          padding: '80px 20px'
        }}
      >
        <h2 style={{
          fontSize: '12px',
          letterSpacing: '4px',
          color: '#666',
          marginBottom: '40px',
          textAlign: 'center',
          opacity: visibleSections.featured ? 1 : 0,
          transition: 'opacity 0.6s ease'
        }}>
          AS FEATURED IN
        </h2>
        
        <a
          href="https://www.forbes.com/digital-assets/assets/butthole-coin-butthole/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            padding: '40px 60px',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            textDecoration: 'none',
            color: '#fff',
            opacity: visibleSections.featured ? 1 : 0,
            transform: visibleSections.featured ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease, border-color 0.3s, box-shadow 0.3s'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#fff';
            e.currentTarget.style.boxShadow = '0 0 60px rgba(255,255,255,0.1)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: '700',
            fontStyle: 'italic',
            letterSpacing: '3px',
            fontFamily: 'Georgia, serif'
          }}>
            Forbes
          </div>
          <div style={{
            fontSize: '13px',
            color: '#888',
            letterSpacing: '2px',
            textAlign: 'center'
          }}>
            DIGITAL ASSETS
          </div>
          <div style={{
            fontSize: '11px',
            color: '#666',
            letterSpacing: '1px',
            marginTop: '10px'
          }}>
            READ ARTICLE →
          </div>
        </a>
      </section>

      {/* Social Proof - Tweets Section */}
      <section 
        id="social"
        style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          padding: '80px 20px'
        }}
      >
        <h2 style={{
          fontSize: '12px',
          letterSpacing: '4px',
          color: '#666',
          marginBottom: '50px',
          textAlign: 'center',
          opacity: visibleSections.social ? 1 : 0,
          transition: 'opacity 0.6s ease'
        }}>
          THE COMMUNITY SPEAKS
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          gap: '20px',
          maxWidth: '1100px',
          width: '100%',
          padding: '0 20px',
          boxSizing: 'border-box'
        }}>
          {/* High-engagement tweets from influential accounts */}
          {[
            {
              author: 'Wall Street Bets',
              handle: 'wallstreetbets',
              content: '$BUTTHOLE 🚀',
              likes: '5.2K',
              retweets: '892',
              tweetId: '1876049501292769760',
              followers: '2.5M',
              profileImage: 'https://pbs.twimg.com/profile_images/1993334677604560896/GYOBDEmH_normal.jpg',
              verified: true
            },
            {
              author: 'Ivan on Tech 🍳📈💰',
              handle: 'IvanOnTech', 
              content: 'WOW BUTTHOLE ON SOLANA CAN IT GO TO $1?',
              likes: '460',
              retweets: '140',
              tweetId: '1884706060918820951',
              followers: '493K',
              profileImage: 'https://pbs.twimg.com/profile_images/1654548524472696834/GR4VOP4Y_normal.png',
              verified: false
            },
            {
              author: 'lyxe',
              handle: 'cryptolyxe',
              content: 'butthole coin is showing that the most simple + kinda cringe memes can do well too. Refreshing to turn off your brain and make money 💰',
              likes: '462',
              retweets: '60',
              tweetId: '1876355156792733927',
              followers: '201K',
              profileImage: 'https://pbs.twimg.com/profile_images/1968761157960794112/dkCklM1b_normal.jpg',
              verified: false
            },
            {
              author: 'Marcell',
              handle: 'MarcellxMarcell',
              content: 'aight hear me out, i\'m pretty sure i have the next billion dollar coin @thebuttholecoin - went from 0 to 150m in 7 days. 26,000 holders 🚀',
              likes: '292',
              retweets: '80',
              tweetId: '1879885284977840495',
              followers: '136K',
              profileImage: 'https://pbs.twimg.com/profile_images/1974292177942413313/BH62DHgA_normal.jpg',
              verified: false
            },
            {
              author: 'beeple',
              handle: 'beeple',
              content: 'ONLY CRYING IN THE CASINO',
              likes: '4.2K',
              retweets: '580',
              tweetId: '1899308246323655014',
              followers: '2.4M',
              profileImage: 'https://pbs.twimg.com/profile_images/264316321/beeple_headshot_beat_up_normal.jpg',
              verified: true
            },
            {
              author: 'Artchick 🔥👠',
              handle: 'digitalartchick',
              content: 'Doing some analysis on Butthole coin, follow me for an in depth report on this exciting new crypto 📊',
              likes: '205',
              retweets: '26',
              tweetId: '1876423968904929400',
              followers: '204K',
              profileImage: 'https://pbs.twimg.com/profile_images/1976087381255000064/N8CxON2B_normal.jpg',
              verified: false
            },
            {
              author: 'Gordon 🐂',
              handle: 'GordonGekko',
              content: 'When you are on Forbes you know it\'s serious. 2025 is the year of the Butthole. 🏆',
              likes: '340',
              retweets: '67',
              tweetId: '1874731049122750873',
              followers: '844K',
              profileImage: 'https://pbs.twimg.com/profile_images/1999805878849953794/KaM1kL13_normal.jpg',
              verified: false
            },
            {
              author: 'Gordon 🐂',
              handle: 'GordonGekko',
              content: 'Butthole coin is made in America 🇺🇸 Billion dollar Butthole is coded. @thebuttholecoin is here to take over 🫡',
              likes: '543',
              retweets: '102',
              tweetId: '1879865263312765000',
              followers: '844K',
              profileImage: 'https://pbs.twimg.com/profile_images/1999805878849953794/KaM1kL13_normal.jpg',
              verified: false
            },
            {
              author: 'Ourbit',
              handle: 'ourbit',
              content: '( ‿ * ‿ ) 𝙉𝙚𝙬 𝙎𝙥𝙤𝙩 𝙇𝙞𝙨𝙩𝙞𝙣𝙜 $BUTTHOLE is now trading LIVE! "A fart cannot exist without a butthole." 🟢',
              likes: '357',
              retweets: '145',
              tweetId: '1880601053403717642',
              followers: '85K',
              profileImage: 'https://pbs.twimg.com/profile_images/2003073026091556864/A1B2cAz7_normal.png',
              verified: true
            },
            {
              author: 'Sam Price',
              handle: 'CryptoLifer33',
              content: 'What happens when your wife finds out you invested all the families money in $butthole coin 😂 alt season is here.',
              likes: '295',
              retweets: '25',
              tweetId: '1879898594356174874',
              followers: '40K',
              profileImage: 'https://pbs.twimg.com/profile_images/1507080725576753157/S7tFHE63_normal.jpg',
              verified: false
            },
            {
              author: 'Rypto',
              handle: 'Rypto__',
              content: 'Butthole Coin Shows Bullish Signs – Potential Breakout Incoming! #BUTTHOLE 📈',
              likes: '193',
              retweets: '51',
              tweetId: '1887976715135369532',
              followers: '32K',
              profileImage: 'https://pbs.twimg.com/profile_images/1934539740428267520/eufbYMqb_normal.jpg',
              verified: false
            },
            {
              author: 'LBank Updates',
              handle: 'LBankUpdates',
              content: '🌈 New #listing 🌟 $BUTTHOLE (Butthole Coin) will be listed on LBank! Built on Solana, combining humor, innovation, and community 🚀',
              likes: '209',
              retweets: '63',
              tweetId: '1881220550632362313',
              followers: '19K',
              profileImage: 'https://pbs.twimg.com/profile_images/1988903574277926912/gKlwzED6_normal.jpg',
              verified: true
            },
            {
              author: 'scoot',
              handle: 'Scooter_420',
              content: 'I have invested more money into the butthole coin on the solana blockchain 💀',
              likes: '221',
              retweets: '36',
              tweetId: '1877778111758029063',
              followers: '49K',
              profileImage: 'https://pbs.twimg.com/profile_images/1973592988677722112/pcQU0Han_normal.jpg',
              verified: false
            },
            {
              author: 'Dip Wheeler',
              handle: 'DipWheeler',
              content: 'time for some butthole ? 🤔',
              likes: '199',
              retweets: '13',
              tweetId: '1909037846729744398',
              followers: '76K',
              profileImage: 'https://pbs.twimg.com/profile_images/1823830773524520965/1WZyKjex_normal.jpg',
              verified: false
            },
            {
              author: 'Butthole Coin',
              handle: 'thebuttholecoin',
              content: 'It\'s that simple 🕳️',
              likes: '185',
              retweets: '48',
              tweetId: '1922140271497687352',
              followers: '22K',
              profileImage: 'https://pbs.twimg.com/profile_images/1915917234846699520/JkkbDStr_normal.jpg',
              verified: false
            }
          ].map((tweet, i) => (
            <a
              key={i}
              href={`https://x.com/${tweet.handle}/status/${tweet.tweetId}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                padding: '25px',
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)',
                textDecoration: 'none',
                color: '#fff',
                opacity: visibleSections.social ? 1 : 0.15, // Keep slightly visible for mobile
                transform: visibleSections.social ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s ease ${Math.min(i * 0.05, 0.3)}s, transform 0.5s ease ${Math.min(i * 0.05, 0.3)}s, border-color 0.3s`,
                willChange: 'opacity, transform'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#1DA1F2'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img 
                    src={tweet.profileImage} 
                    alt={tweet.author}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid rgba(255,255,255,0.1)'
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      {tweet.author}
                      {tweet.followers && (
                        <span style={{
                          fontSize: '10px',
                          background: 'rgba(29, 161, 242, 0.15)',
                          color: '#1DA1F2',
                          padding: '3px 8px',
                          borderRadius: '12px',
                          fontWeight: '500'
                        }}>
                          {tweet.followers}
                        </span>
                      )}
                    </div>
                    <div style={{ color: '#666', fontSize: '12px' }}>@{tweet.handle}</div>
                  </div>
                </div>
                <div style={{ color: '#1DA1F2', fontSize: '20px' }}>𝕏</div>
              </div>
              
              <p style={{
                fontSize: '15px',
                lineHeight: '1.5',
                margin: 0,
                color: '#eee'
              }}>
                {tweet.content}
              </p>
              
              <div style={{
                display: 'flex',
                gap: '20px',
                fontSize: '12px',
                color: '#666'
              }}>
                <span>❤️ {tweet.likes}</span>
                <span>🔁 {tweet.retweets}</span>
              </div>
            </a>
          ))}
        </div>
        
        <a
          href="https://x.com/thebuttholecoin"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: '40px',
            padding: '15px 30px',
            border: '1px solid #333',
            color: '#888',
            fontSize: '12px',
            letterSpacing: '2px',
            textDecoration: 'none',
            transition: 'all 0.3s'
          }}
          onMouseEnter={e => { e.target.style.borderColor = '#1DA1F2'; e.target.style.color = '#1DA1F2'; }}
          onMouseLeave={e => { e.target.style.borderColor = '#333'; e.target.style.color = '#888'; }}
        >
          FOLLOW ON 𝕏 →
        </a>
      </section>

      {/* Exchanges Section */}
      <section 
        id="exchanges"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          padding: '100px 20px'
        }}
      >
        <ParallaxText speed={0.15}>
          <h2 style={{
            fontSize: '12px',
            letterSpacing: '4px',
            color: '#666',
            marginBottom: '60px',
            textAlign: 'center',
            opacity: visibleSections.exchanges ? 1 : 0,
            transition: 'opacity 0.6s ease'
          }}>
            LISTED ON
          </h2>
        </ParallaxText>
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px',
          maxWidth: '900px'
        }}>
          {exchanges.map((ex, i) => (
            <a 
              key={ex.name}
              href={ex.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '20px 40px',
                border: '1px solid #222',
                fontSize: '14px',
                letterSpacing: '2px',
                textDecoration: 'none',
                color: '#fff',
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(10px)',
                opacity: visibleSections.exchanges ? 1 : 0,
                transform: visibleSections.exchanges ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.5s ease ${i * 0.08}s`
              }}
              onMouseEnter={e => {
                e.target.style.borderColor = ex.color;
                e.target.style.color = ex.color;
                e.target.style.boxShadow = `0 0 40px ${ex.color}30`;
                e.target.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={e => {
                e.target.style.borderColor = '#222';
                e.target.style.color = '#fff';
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              {ex.name}
            </a>
          ))}
        </div>
        
        <p style={{ marginTop: '40px', color: '#444', fontSize: '12px', letterSpacing: '1px' }}>
          + MORE EXCHANGES
        </p>
      </section>

      {/* Swap Section */}
      <section 
        id="swap"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          padding: '100px 20px'
        }}
      >
        <h2 style={{
          fontSize: '12px',
          letterSpacing: '4px',
          color: '#666',
          marginBottom: '40px',
          opacity: visibleSections.swap ? 1 : 0,
          transition: 'opacity 0.6s ease'
        }}>
          BUTTHOLE SWAP
        </h2>
        
        <div style={{
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(20px)',
          padding: '20px',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 0 80px rgba(255,255,255,0.05)',
          opacity: visibleSections.swap ? 1 : 0,
          transform: visibleSections.swap ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <iframe
            src="https://butthole.exchange/"
            title="Butthole Exchange"
            style={{
              width: '520px',
              maxWidth: '95vw',
              height: '700px',
              border: 'none',
              borderRadius: '16px',
              background: '#000'
            }}
            allow="clipboard-write"
          />
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '80px 40px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(20px)'
      }}>
        {/* World Butthole Counter */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '50px'
        }}>
          <WorldButtholeCounter />
        </div>
        
        {/* Social Links */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          marginBottom: '40px'
        }}>
          <a
            href="https://x.com/thebuttholecoin"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#666',
              textDecoration: 'none',
              fontSize: '12px',
              letterSpacing: '2px',
              padding: '10px 20px',
              border: '1px solid #333',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => { e.target.style.color = '#fff'; e.target.style.borderColor = '#fff'; }}
            onMouseLeave={e => { e.target.style.color = '#666'; e.target.style.borderColor = '#333'; }}
          >
            𝕏
          </a>
          <a
            href="https://t.me/buttholecoin"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#666',
              textDecoration: 'none',
              fontSize: '12px',
              letterSpacing: '2px',
              padding: '10px 20px',
              border: '1px solid #333',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => { e.target.style.color = '#0088cc'; e.target.style.borderColor = '#0088cc'; }}
            onMouseLeave={e => { e.target.style.color = '#666'; e.target.style.borderColor = '#333'; }}
          >
            TELEGRAM
          </a>
        </div>

        {/* Footer Links */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}>
          {[
            { label: 'WHITEPAPER', href: '/whitepaper', internal: true },
            { label: 'ROADMAP', href: '/roadmap', internal: true },
            { label: 'MERCH', href: 'https://buttholecoin.store' },
            { label: 'SWAP', href: 'https://butthole.exchange' }
          ].map(link => (
            link.internal ? (
              <Link
                key={link.label}
                to={link.href}
                style={{
                  color: '#444',
                  textDecoration: 'none',
                  fontSize: '11px',
                  letterSpacing: '2px',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = '#444'}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#444',
                  textDecoration: 'none',
                  fontSize: '11px',
                  letterSpacing: '2px',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = '#444'}
              >
                {link.label}
              </a>
            )
          ))}
        </div>
        
        <div style={{ fontSize: '10px', color: '#333', letterSpacing: '1px' }}>
          © 2025 BUTTHOLE COIN LIMITED COMPANY
        </div>
      </footer>
    </div>
  );
}
