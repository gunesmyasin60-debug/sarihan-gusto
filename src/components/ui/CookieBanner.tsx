"use client";

// src/components/ui/CookieBanner.tsx
// Çerez İzin Yönetim Banner'ı (Cookie Banner) — KVKK uyumlu çerez izin tercihlerini yönetir.
// Çerezleri "Zorunlu/Teknik" ve "İstatistik/GA4" olarak kategorize eder, kullanıcının tercihini localStorage'da saklar.

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Info } from "lucide-react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    technical: true, // Her zaman zorunlu
    analytics: true,  // İsteğe bağlı
  });

  useEffect(() => {
    // Daha önce onay verilip verilmediğini kontrol et
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // 1.5 saniye sonra yumuşak bir şekilde göster
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const consentSettings = {
      technical: true,
      analytics: true,
      date: new Date().toISOString(),
    };
    localStorage.setItem("cookieConsent", JSON.stringify(consentSettings));
    setIsVisible(false);
    
    // Google Analytics'i etkinleştir (Prod senaryosu)
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  };

  const handleSavePreferences = () => {
    const consentSettings = {
      technical: true,
      analytics: preferences.analytics,
      date: new Date().toISOString(),
    };
    localStorage.setItem("cookieConsent", JSON.stringify(consentSettings));
    setIsVisible(false);

    // Google Analytics izin durumunu güncelle
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: preferences.analytics ? "granted" : "denied",
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 bg-card border border-card-border rounded-2xl p-6 shadow-2xl text-foreground flex flex-col space-y-4"
          role="dialog"
          aria-label="Çerez Politikası ve KVKK Tercihleri"
        >
          <div className="flex items-start space-x-3">
            <ShieldCheck className="w-6 h-6 text-accent shrink-0 mt-1" />
            <div>
              <h4 className="font-serif text-base font-bold text-accent">Çerez Politikası & KVKK</h4>
              <p className="text-xs text-muted leading-relaxed mt-1">
                Sarıhan Gusto olarak, web sitemizin güvenli ve verimli çalışması, ziyaretçi trafiğimizin analiz edilmesi amacıyla çerezler kullanıyoruz. Detaylı bilgiye <Link href="/cerez" className="underline hover:text-accent font-semibold">Çerez Politikası</Link> üzerinden ulaşabilirsiniz.
              </p>
            </div>
          </div>

          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-card-border pt-3 space-y-3"
              >
                <h5 className="text-xs font-bold uppercase tracking-wider text-accent flex items-center space-x-1">
                  <Info className="w-3 h-3" />
                  <span>Çerez Ayarları</span>
                </h5>
                
                {/* Teknik Çerezler */}
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold block">Zorunlu / Teknik Çerezler</span>
                    <span className="text-[10px] text-muted leading-none">Web sitesinin çalışması ve Turnstile bot koruması için zorunludur.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.technical}
                    disabled
                    className="w-4 h-4 accent-accent rounded opacity-70 cursor-not-allowed"
                  />
                </div>

                {/* İstatistik Çerezleri */}
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold block">İstatistik / GA4 Çerezleri</span>
                    <span className="text-[10px] text-muted leading-none">Siteyi nasıl kullandığınızı anonim olarak izlememize olanak sağlar.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences({ ...preferences, analytics: e.target.checked })
                    }
                    className="w-4 h-4 accent-accent rounded cursor-pointer"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Aksiyon Butonları */}
          <div className="flex items-center justify-between space-x-3 pt-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-xs font-medium underline text-muted hover:text-accent cursor-pointer focus:outline-none"
            >
              {showSettings ? "Kapat" : "Ayarları Yönet"}
            </button>
            <div className="flex space-x-2">
              {showSettings ? (
                <button
                  onClick={handleSavePreferences}
                  className="px-4 py-2 rounded-full text-xs font-semibold bg-transparent border border-accent text-accent hover:bg-accent/10 cursor-pointer focus:outline-none transition-all duration-300"
                >
                  Tercihleri Kaydet
                </button>
              ) : (
                <>
                  <button
                    onClick={handleAcceptAll}
                    className="px-4 py-2 rounded-full text-xs font-semibold bg-accent text-wood-dark hover:bg-brand-gold-hover cursor-pointer focus:outline-none transition-all duration-300 shadow-md shadow-accent/10"
                  >
                    Kabul Et
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
