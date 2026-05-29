// src/components/ui/AmbianceMusic.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function AmbianceMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [isExpanded, setIsExpanded] = useState(false);

  // Web Audio API Referansları (Gerçek Zamanlı 432 Hz Frekans Sentezi İçin)
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscNodeRef = useRef<OscillatorNode | null>(null);
  const oscGainNodeRef = useRef<GainNode | null>(null);

  // Tarayıcı kapatılırken veya unmount durumunda temizle
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Ses Seviyesi veya Çalma Durumu Değiştiğinde
  useEffect(() => {
    if (oscGainNodeRef.current) {
      if (isPlaying) {
        oscGainNodeRef.current.gain.setValueAtTime(
          isMuted ? 0 : volume * 0.12,
          audioContextRef.current?.currentTime || 0
        );
      } else {
        oscGainNodeRef.current.gain.setValueAtTime(0, audioContextRef.current?.currentTime || 0);
      }
    }
  }, [volume, isMuted, isPlaying]);

  // Web Audio API Hattını Kur (Gerçek Zamanlı 432 Hz Osilatör Sentezleyici)
  const initAudioPipeline = () => {
    if (audioContextRef.current) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      // Osilatör Jeneratörü (Oscillator) - 432 Hz Saf Sinüs Şifa Dalgası
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = 432; // Sabit ve net 432 Hz Evrensel Akort
      
      const oscGain = ctx.createGain();
      oscGain.gain.value = isMuted || !isPlaying ? 0 : volume * 0.12; 
      
      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start();
      
      oscNodeRef.current = osc;
      oscGainNodeRef.current = oscGain;
    } catch (e) {
      console.warn("Web Audio API hattı kurulamadı (Kullanıcı etkileşimi bekleniyor):", e);
    }
  };

  // Çalma / Duraklatma Tetikleyicisi
  const togglePlay = () => {
    initAudioPipeline();

    if (audioContextRef.current && audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }

    setIsPlaying(!isPlaying);
  };

  // Sessize Alma / Sesi Açma
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  // Ses Seviyesini Kaydırma
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol > 0) {
      setIsMuted(false);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-45 font-sans">
      <div 
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className="flex items-center space-x-3"
      >
        {/* Ana Yuvarlak Altın Halka Buton */}
        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-14 h-14 rounded-full flex items-center justify-center border shadow-2xl relative cursor-pointer backdrop-blur-md transition-all duration-300 ${
            isPlaying 
              ? "bg-accent/15 border-accent text-accent animate-pulse-light" 
              : "bg-card border-card-border text-foreground hover:border-accent hover:text-accent"
          }`}
          title="432 Hz Evrensel Şifa Frekansı"
        >
          {isPlaying ? (
            /* CSS Ses Dalgası Barları */
            <div className="flex items-end justify-center space-x-0.5 w-6 h-5">
              <span className="w-[2px] bg-accent animate-audio-bar-1" />
              <span className="w-[2px] bg-accent animate-audio-bar-2" />
              <span className="w-[2px] bg-accent animate-audio-bar-3" />
              <span className="w-[2px] bg-accent animate-audio-bar-4" />
            </div>
          ) : (
            <Music className="w-5 h-5" />
          )}

          {/* Minimal Hz Rozeti */}
          <span className="absolute -top-1.5 -right-1 px-1.5 py-0.5 bg-accent text-wood-dark rounded-md text-[8px] font-extrabold uppercase tracking-wide">
            432Hz
          </span>
        </motion.button>

        {/* Genişleyen Minimal Kontrol Paneli */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-card-border p-4.5 rounded-[1.5rem] flex items-center space-x-4 shadow-2xl backdrop-blur-md text-left min-w-[260px]"
            >
              {/* Oynat / Duraklat */}
              <button
                onClick={togglePlay}
                className="w-9 h-9 rounded-full bg-background border border-card-border flex items-center justify-center hover:text-accent hover:border-accent cursor-pointer shrink-0 transition-colors"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
              </button>

              {/* Müzik İsmi & Durumu */}
              <div className="flex-grow space-y-0.5">
                <span className="text-[10px] text-accent uppercase tracking-widest font-extrabold block">Şifa Frekansı</span>
                <span className="text-[9px] text-foreground/50 font-bold block truncate">
                  {isPlaying ? "432 Hz - Evrensel Dinginlik" : "Zihin Dinlenmede"}
                </span>
              </div>

              {/* Sessiz / Ses Seviyesi */}
              <div className="flex items-center space-x-1.5 border-l border-card-border/50 pl-3">
                <button
                  onClick={toggleMute}
                  className="text-foreground/75 hover:text-accent cursor-pointer transition-colors"
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-14 h-1 bg-card-border rounded-lg appearance-none cursor-pointer accent-accent"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
