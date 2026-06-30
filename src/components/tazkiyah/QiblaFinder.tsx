"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Compass, Crosshair, MapPin, Target, AlertTriangle } from "lucide-react";

// Kaaba Coordinates
const KAABA_LAT = 21.422487;
const KAABA_LNG = 39.826206;

function calculateBearing(lat1: number, lng1: number, lat2: number, lng2: number) {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const dLng = toRad(lng2 - lng1);
  const y = Math.sin(dLng) * Math.cos(toRad(lat2));
  const x =
    Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
    Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLng);
  
  let brng = Math.atan2(y, x);
  brng = toDeg(brng);
  return (brng + 360) % 360;
}

export function QiblaFinder() {
  const [active, setActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [heading, setHeading] = useState<number>(0);
  const [qiblaBearing, setQiblaBearing] = useState<number | null>(null);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  // Activate sensors (Requires user interaction for iOS permission)
  const initializeSensors = async () => {
    try {
      setError(null);
      // 1. Request Geolocation
      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by your browser");
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation({ lat, lng });
          setQiblaBearing(calculateBearing(lat, lng, KAABA_LAT, KAABA_LNG));
        },
        (err) => {
          setError(`Location error: ${err.message}`);
        }
      );

      // 2. Request Device Orientation Permission (iOS 13+)
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        const permissionState = await (DeviceOrientationEvent as any).requestPermission();
        if (permissionState !== 'granted') {
          throw new Error("Compass permission denied");
        }
      }

      // 3. Listen to Orientation
      const handleOrientation = (event: DeviceOrientationEvent) => {
        // webkitCompassHeading is absolute heading for iOS
        let alpha = (event as any).webkitCompassHeading;
        
        if (alpha !== undefined) {
          setHeading(alpha);
        } else if (event.alpha !== null) {
          // Absolute orientation for Android (if deviceorientationabsolute is used)
          // Normal deviceorientation alpha is relative to where the phone started.
          // To make it simple, we just use event.alpha assuming it is absolute or fallback.
          setHeading(360 - event.alpha);
        }
      };

      // Try absolute first, fallback to standard
      if ('ondeviceorientationabsolute' in window) {
        (window as any).addEventListener("deviceorientationabsolute", handleOrientation);
      } else {
        (window as any).addEventListener("deviceorientation", handleOrientation);
      }

      setActive(true);
    } catch (e: any) {
      setError(e.message || "Failed to initialize sensors");
    }
  };

  const isAligned = qiblaBearing !== null && Math.abs((heading - qiblaBearing + 540) % 360 - 180) < 5;

  return (
    <div className="border border-white/10 bg-[#101010] p-6 sm:p-10 relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[16px_16px] opacity-40" />
      
      {!active ? (
        <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
          <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
            <Compass className="h-8 w-8 text-white/40" />
          </div>
          <h2 className="font-display text-2xl text-white mb-2">QIBLA HUD</h2>
          <p className="text-white/60 font-mono text-xs mb-8 leading-relaxed">
            INITIATE TACTICAL HUD TO CALCULATE BEARING TO MAKKAH (21.4225° N, 39.8262° E). REQUIRES LOCATION AND COMPASS PERMISSIONS.
          </p>
          {error && (
            <div className="flex items-center gap-2 text-[#D64045] font-mono text-xs mb-6 bg-[#D64045]/10 px-3 py-2 border border-[#D64045]/30">
              <AlertTriangle className="h-4 w-4" />
              {error}
            </div>
          )}
          <button
            onClick={initializeSensors}
            className="px-6 py-3 bg-white text-[#0a0a0a] font-mono text-sm tracking-widest uppercase hover:bg-white/90 transition-colors flex items-center gap-2"
          >
            <Target className="h-4 w-4" />
            ACTIVATE SENSORS
          </button>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col items-center w-full">
          {/* Top HUD */}
          <div className="absolute top-0 left-0 right-0 flex justify-between font-mono text-[10px] text-white/50 w-full mb-10">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-white/80" />
              {location ? `${location.lat.toFixed(4)}°N ${location.lng.toFixed(4)}°E` : "ACQUIRING..."}
            </div>
            <div className="flex flex-col items-end">
              <span>TGT: 21.4225°N 39.8262°E</span>
              {qiblaBearing !== null && <span className="text-[#B4A05A]">BRNG: {qiblaBearing.toFixed(1)}°</span>}
            </div>
          </div>

          <div className="mt-16 sm:mt-12 mb-8">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
              {/* Static Outer Ring */}
              <div className="absolute inset-0 border border-white/10 rounded-full" />
              <div className="absolute inset-2 border border-white/5 rounded-full border-dashed" />
              
              {/* Crosshairs */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-full h-px bg-white/50" />
                <div className="h-full w-px bg-white/50 absolute" />
              </div>

              {/* The Compass Dial (Rotates based on heading) */}
              <motion.div 
                className="absolute inset-4 rounded-full"
                animate={{ rotate: -heading }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                {/* North Indicator */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 flex flex-col items-center text-white/40 font-mono text-xs">
                  <span>N</span>
                  <div className="w-0.5 h-3 bg-white/40 mt-1" />
                </div>
                {/* East Indicator */}
                <div className="absolute right-0 top-1/2 translate-x-2 -translate-y-1/2 flex items-center text-white/20 font-mono text-[10px]">
                  <div className="w-3 h-0.5 bg-white/20 mr-1" />
                  <span>E</span>
                </div>
                {/* South Indicator */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 flex flex-col items-center text-white/20 font-mono text-[10px]">
                  <div className="w-0.5 h-3 bg-white/20 mb-1" />
                  <span>S</span>
                </div>
                {/* West Indicator */}
                <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 flex items-center text-white/20 font-mono text-[10px]">
                  <span>W</span>
                  <div className="w-3 h-0.5 bg-white/20 ml-1" />
                </div>

                {/* Qibla Marker on the Dial */}
                {qiblaBearing !== null && (
                  <div 
                    className="absolute inset-0"
                    style={{ transform: `rotate(${qiblaBearing}deg)` }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 flex flex-col items-center">
                      <div className={`w-3 h-3 rotate-45 ${isAligned ? 'bg-[#3C8C6E]' : 'bg-[#B4A05A]'} transition-colors duration-500`} />
                      <div className={`w-0.5 h-6 ${isAligned ? 'bg-[#3C8C6E]' : 'bg-[#B4A05A]'} transition-colors duration-500`} />
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Center Device Arrow (Static, pointing UP) */}
              <div className="absolute z-10 flex flex-col items-center">
                <Crosshair className={`h-12 w-12 ${isAligned ? 'text-[#3C8C6E]' : 'text-white/60'} transition-colors duration-500`} />
              </div>
            </div>
          </div>

          <div className="font-mono text-center space-y-1">
            <div className="text-[10px] text-white/50 tracking-[0.2em]">HDG</div>
            <div className={`text-4xl tabular-nums tracking-tighter ${isAligned ? 'text-[#3C8C6E]' : 'text-white'}`}>
              {Math.round(heading).toString().padStart(3, '0')}°
            </div>
            {isAligned && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[#3C8C6E] text-xs tracking-[0.3em] pt-4 flex items-center justify-center gap-2"
              >
                <div className="w-1.5 h-1.5 bg-[#3C8C6E] rounded-full animate-pulse" />
                QIBLA ALIGNED
                <div className="w-1.5 h-1.5 bg-[#3C8C6E] rounded-full animate-pulse" />
              </motion.div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
