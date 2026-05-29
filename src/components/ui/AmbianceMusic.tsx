// src/components/ui/AmbianceMusic.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Play, Pause, Volume2, VolumeX, Sparkles } from "lucide-react";

export default function AmbianceMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [isExpanded, setIsExpanded] = useState(false);
  const [trackName, setTrackName] = useState("Huzur Frekansı");
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio Nesnesini İlklendir (Yalnızca Client Side)
  useEffect(() => {
    // Telifsiz, derin ve son derece dinlendirici pürüzsüz huzur/şifa frekansı eseri
    const audio = new Audio("https://assets.mixkit.co/music/preview/mixkit-meditation-mind-2195.mp3");
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    // Tarayıcı kapatılırken veya unmount durumunda temizle
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Ses Seviyesi Değiştiğinde
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // Çalma / Duraklatma Tetikleyicisi
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Tarayıcı autoplay engellerse güvenli başlama
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Autoplay politikası nedeniyle müzik tetiklenemedi:", err);
        });
    }
  };

  // Sessize Alma / Sesi Açma
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Butona tıklarken genişlemeyi tetiklemesin
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
    <div className="fixed bottom-8 left-8 z-40 font-sans">
      <div 
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className="flex items-center space-x-3"
      >
        {/* Ana Yuvarlak Floating Buton */}
        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-14 h-14 rounded-full flex items-center justify-center border shadow-2xl relative cursor-pointer backdrop-blur-md transition-all duration-300 ${
            isPlaying 
              ? "bg-accent/15 border-accent text-accent animate-pulse-light" 
              : "bg-card border-card-border text-foreground hover:border-accent hover:text-accent"
          }`}
          title="Huzur Frekansı Müzik Deneyimi"
        >
          {isPlaying ? (
            /* CSS Ses Dalgası Barları (Çalarken hareketli, durduğunda sabit) */
            <div className="flex items-end justify-center space-x-0.5 w-6 h-5">
              <span className="w-[2px] bg-accent animate-audio-bar-1" />
              <span className="w-[2px] bg-accent animate-audio-bar-2" />
              <span className="w-[2px] bg-accent animate-audio-bar-3" />
              <span className="w-[2px] bg-accent animate-audio-bar-4" />
            </div>
          ) : (
            <Music className="w-5 h-5" />
          )}

          {/* Dinamik parıltı süsü */}
          {isPlaying && (
            <Sparkles className="w-3.5 h-3.5 absolute -top-1.5 -right-1 text-accent animate-bounce" />
          )}
        </motion.button>

        {/* Genişleyen Müzik Kontrol Paneli */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-card-border p-4.5 rounded-2xl flex items-center space-x-4 shadow-xl backdrop-blur-md text-left"
            >
              {/* Oynat / Duraklat */}
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-background border border-card-border flex items-center justify-center hover:text-accent hover:border-accent cursor-pointer shrink-0 transition-colors"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
              </button>

              {/* Müzik İsmi & Durumu */}
              <div className="min-w-[100px] space-y-0.5 pr-2.5">
                <p className="text-[10px] text-accent uppercase tracking-widest font-extrabold block">Huzur Frekansı</p>
                <p className="text-[9px] text-foreground/50 font-bold block truncate">
                  {isPlaying ? "Şu an Çalıyor..." : "Sessiz Dinlenme"}
                </p>
              </div>

              {/* Ses Seviyesi Kontrol Grubu */}
              <div className="flex items-center space-x-2 border-l border-card-border/50 pl-3">
                <button
                  onClick={toggleMute}
                  className="text-foreground/75 hover:text-accent cursor-pointer transition-colors"
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-card-border rounded-lg appearance-none cursor-pointer accent-accent"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
