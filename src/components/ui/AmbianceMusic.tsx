// src/components/ui/AmbianceMusic.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Play, Pause, Volume2, VolumeX, Sparkles, Flame, ShieldAlert } from "lucide-react";

export default function AmbianceMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedHz, setSelectedHz] = useState<number>(432);
  const [trackName, setTrackName] = useState("432 Hz - Evrensel Dinginlik");
  
  // Web Audio API Referansları (Gerçek Zamanlı Saf Frekans Sentezi İçin)
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

  // Web Audio API Hattını Kur (Gerçek Zamanlı Osilatör Sentezleyici)
  const initAudioPipeline = () => {
    if (audioContextRef.current) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      // Osilatör Jeneratörü (Oscillator) - Saf sinüs şifa dalgası
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = selectedHz;
      
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
    // Web Audio API'yi başlat
    initAudioPipeline();

    if (audioContextRef.current && audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }

    setIsPlaying(!isPlaying);
  };

  // Dinamik Olarak Solfeggio Frekansını Değiştir (396Hz / 432Hz / 528Hz)
  const handleHzChange = (hz: number) => {
    setSelectedHz(hz);

    // Osilatörün sentezlediği saf sinüs dalgasını anında bu frekansa akort et
    if (oscNodeRef.current) {
      oscNodeRef.current.frequency.setValueAtTime(hz, audioContextRef.current?.currentTime || 0);
    }

    // UI etiketlerini ve parça adını güncelle
    let label = "528 Hz - Şifa & Mucize";
    if (hz === 432) label = "432 Hz - Evrensel Dinginlik";
    if (hz === 396) label = "396 Hz - Zihinsel Arınma";
    setTrackName(label);
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
        {/* Ana Yuvarlak Floating Buton (Hz değerine göre parıldama rengi değişir) */}
        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-14 h-14 rounded-full flex items-center justify-center border shadow-2xl relative cursor-pointer backdrop-blur-md transition-all duration-300 ${
            isPlaying 
              ? "bg-accent/15 border-accent text-accent animate-pulse-light" 
              : "bg-card border-card-border text-foreground hover:border-accent hover:text-accent"
          }`}
          title={`${selectedHz} Hz Şifa Frekansı Deneyimi`}
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

          {/* Hz Rozeti */}
          <span className="absolute -top-1.5 -right-1 px-1.5 py-0.5 bg-accent text-wood-dark rounded-md text-[8px] font-extrabold uppercase tracking-wide">
            {selectedHz}Hz
          </span>
        </motion.button>

        {/* Genişleyen Müzik & Frekans Kontrol Paneli */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-card-border p-5 rounded-[1.75rem] flex flex-col space-y-3.5 shadow-2xl backdrop-blur-md text-left min-w-[280px]"
            >
              <div className="flex items-center justify-between space-x-4">
                {/* Oynat / Duraklat */}
                <button
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-full bg-background border border-card-border flex items-center justify-center hover:text-accent hover:border-accent cursor-pointer shrink-0 transition-colors"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                </button>

                {/* Müzik İsmi & Durumu */}
                <div className="flex-grow space-y-0.5">
                  <span className="text-[10px] text-accent uppercase tracking-widest font-extrabold block">Huzur Frekansı</span>
                  <span className="text-[9px] text-foreground/50 font-bold block truncate">
                    {isPlaying ? trackName : "Zihin Dinlenmede"}
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
              </div>

              {/* 🎚️ Dinamik Solfeggio Frekans Seçici (396Hz / 432Hz / 528Hz) */}
              <div className="border-t border-card-border/50 pt-3 flex flex-col space-y-2">
                <span className="text-[8px] font-extrabold uppercase tracking-widest text-foreground/40 block">
                  Şifa Frekansı Akort Değeri (Hz)
                </span>
                
                <div className="grid grid-cols-3 gap-1.5">
                  {/* 396 Hz */}
                  <button
                    onClick={() => handleHzChange(396)}
                    className={`py-1.5 rounded-xl border text-[9px] font-extrabold transition-all cursor-pointer ${
                      selectedHz === 396
                        ? "bg-accent text-wood-dark border-accent shadow-sm"
                        : "bg-background border-card-border text-foreground/60 hover:border-accent hover:text-accent"
                    }`}
                    title="396 Hz - Korku ve Suçluluktan Arınma / Zihinsel Temizlik"
                  >
                    396 Hz
                  </button>

                  {/* 432 Hz */}
                  <button
                    onClick={() => handleHzChange(432)}
                    className={`py-1.5 rounded-xl border text-[9px] font-extrabold transition-all cursor-pointer ${
                      selectedHz === 432
                        ? "bg-accent text-wood-dark border-accent shadow-sm"
                        : "bg-background border-card-border text-foreground/60 hover:border-accent hover:text-accent"
                    }`}
                    title="432 Hz - Doğal Evrensel Akort / Kalp Ritmi Uyumlandırma"
                  >
                    432 Hz
                  </button>

                  {/* 528 Hz */}
                  <button
                    onClick={() => handleHzChange(528)}
                    className={`py-1.5 rounded-xl border text-[9px] font-extrabold transition-all cursor-pointer ${
                      selectedHz === 528
                        ? "bg-accent text-wood-dark border-accent shadow-sm"
                        : "bg-background border-card-border text-foreground/60 hover:border-accent hover:text-accent"
                    }`}
                    title="528 Hz - Hücre Yenileme / DNA Dönüşümü / Mucize & Şifa"
                  >
                    528 Hz
                  </button>
                </div>

                {/* Kısa Frekans Açıklaması */}
                <span className="text-[8px] text-accent/80 font-bold block leading-normal text-center bg-accent/5 p-1 rounded-lg border border-accent/10">
                  {selectedHz === 396 && "Kaygı giderici, derin zihinsel dinginlik frekansı."}
                  {selectedHz === 432 && "Kalp ritmini sakinleştiren, doğal evrensel akort."}
                  {selectedHz === 528 && "Hücre yenileyici, şifa ve mucize frekansı."}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
