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

  // Web Audio API Referansları (Gerçek Zamanlı Kozmik 432 Hz Sentezleyici İçin)
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscsRef = useRef<OscillatorNode[]>([]);
  const lfoNodeRef = useRef<OscillatorNode | null>(null);
  const oscGainNodeRef = useRef<GainNode | null>(null);

  // Tarayıcı kapatılırken veya unmount durumunda temizle
  useEffect(() => {
    return () => {
      cleanAudioPipeline();
    };
  }, []);

  // Ses Seviyesi veya Mute Durumu Değiştiğinde master gain'i güncelle
  useEffect(() => {
    if (oscGainNodeRef.current) {
      oscGainNodeRef.current.gain.setValueAtTime(
        isMuted ? 0 : volume * 0.12,
        audioContextRef.current?.currentTime || 0
      );
    }
  }, [volume, isMuted]);

  // Audio Pipeline Temizleyici (Kaynakları serbest bırakmak için)
  const cleanAudioPipeline = () => {
    try {
      if (lfoNodeRef.current) {
        lfoNodeRef.current.stop();
        lfoNodeRef.current.disconnect();
        lfoNodeRef.current = null;
      }
      oscsRef.current.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (_) {}
      });
      oscsRef.current = [];
      if (oscGainNodeRef.current) {
        oscGainNodeRef.current.disconnect();
        oscGainNodeRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }
    } catch (e) {
      console.warn("Audio hattı temizlenirken hata:", e);
    }
  };

  // Web Audio API Hattını Kur (Gerçek Zamanlı Çok Sesli Kozmik Akort Sentezleyici)
  const initAudioPipeline = () => {
    if (audioContextRef.current) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      // 1. Ana Master Gain (Tüm ses seviyesini kontrol eden çıkış düğümü)
      const masterGain = ctx.createGain();
      masterGain.gain.value = isMuted ? 0 : volume * 0.12; // Yumuşak ve rahatlatıcı ambient seviyesi
      oscGainNodeRef.current = masterGain;
      masterGain.connect(ctx.destination);

      // --- 🎼 ARMONİK KATMANLARIN SENTEZLENMESİ ---

      // KATMAN A: Temel Frekans (432 Hz) - Saf Dinginlik
      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.value = 432;
      const gain1 = ctx.createGain();
      gain1.gain.value = 0.50; // Toplam gücün %50'si temel frekanstan gelir
      osc1.connect(gain1);
      gain1.connect(masterGain);
      osc1.start();
      oscsRef.current.push(osc1);

      // KATMAN B: Binaural Korosu (432.5 Hz) - Genişlik ve Boyut
      // Temel sesten 0.5 Hz detune edilerek stereo koro derinliği kazandırır
      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.value = 432.5; 
      const gain2 = ctx.createGain();
      gain2.gain.value = 0.25; 
      osc2.connect(gain2);
      gain2.connect(masterGain);
      osc2.start();
      oscsRef.current.push(osc2);

      // KATMAN C: Topraklama ve Derin Bas (216 Hz) - Tapınak Çanağı Tınısı
      // Frekansın 1 oktav altı (432 / 2). Sıcaklık ve derin bir mistik uğultu sağlar
      const osc3 = ctx.createOscillator();
      osc3.type = "sine";
      osc3.frequency.value = 216; 
      const gain3 = ctx.createGain();
      gain3.gain.value = 0.35; 
      osc3.connect(gain3);
      gain3.connect(masterGain);
      osc3.start();
      oscsRef.current.push(osc3);

      // KATMAN D: Mistik Beşli Akor (648 Hz) - Celestial Heaven
      // Frekansın kusursuz beşlisi (432 * 1.5). Zihni dinlendiren ince, göksel bir esinti
      const osc4 = ctx.createOscillator();
      osc4.type = "sine";
      osc4.frequency.value = 648; 
      const gain4 = ctx.createGain();
      gain4.gain.value = 0.12; 
      osc4.connect(gain4);
      gain4.connect(masterGain);
      osc4.start();
      oscsRef.current.push(osc4);

      // --- 🌊 KOZMİK NEFES EFEKTİ (LFO MODÜLASYONU) ---
      // Sesin dümdüz ve mekanik tınlamasını önlemek için yavaşça nefes alan dalga LFO'su
      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.value = 0.15; // 6-7 saniyede bir yavaş nefes döngüsü
      
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.22; // Ses seviyesini %22 oranında dalgalandıracak yavaş nefes
      
      lfo.connect(lfoGain);
      lfoGain.connect(masterGain.gain); // Master gain düğümünü doğrudan modüle ediyoruz
      lfo.start();
      
      lfoNodeRef.current = lfo;

    } catch (e) {
      console.warn("Kozmik Web Audio API sentezleyici hattı kurulamadı:", e);
    }
  };

  // Çalma / Duraklatma Tetikleyicisi
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      cleanAudioPipeline();
    } else {
      initAudioPipeline();
      if (audioContextRef.current && audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }
      setIsPlaying(true);
    }
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
          title="432 Hz Kozmik Şifa Frekansı"
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
                  {isPlaying ? "432 Hz - Kozmik Akort Pedi" : "Zihin Dinlenmede"}
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
