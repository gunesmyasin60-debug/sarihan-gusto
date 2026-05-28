"use client";

// src/app/qr-yorum/page.tsx
// QR Yorum Kampanyası Sayfası — Masalardaki QR kodlardan taranarak girildiğinde açılır.
// Kullanıcıyı lüks bir karşılama ile selamlar, feedback önemini belirtir ve Google Yorumlarına dinamik olarak yönlendirir.

import { useState } from "react";
import { Star, Award, Compass, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { RESTORAN_BILGILERI } from "@/constants/restaurant";

export default function QrReviewPage() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleReviewClick = () => {
    setIsRedirecting(true);
    
    // 1.8 saniyelik şık teşekkür animasyonu sonrası Google Haritalar linkine yönlendir
    setTimeout(() => {
      window.location.href = RESTORAN_BILGILERI.mapsLink;
    }, 1800);
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-32 pb-24 background text-foreground relative min-h-[90vh] flex items-center justify-center">
        {/* Bal Altını Arka Plan Işık Efekti */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,156,61,0.06),transparent_50%)] pointer-events-none" />

        <div className="max-w-md w-full px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-card border border-card-border rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden ember-glow"
          >
            {/* Üst Kısım Soyut Gold Işıma */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,156,61,0.05),transparent_40%)]" />

            <AnimatePresence mode="wait">
              {!isRedirecting ? (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6"
                >
                  {/* Başarı / Marka Rozeti */}
                  <div className="flex justify-center">
                    <div className="w-16 w-16 h-16 rounded-3xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent shadow-lg shadow-accent/5">
                      <Compass className="w-8 h-8 animate-spin-slow" />
                    </div>
                  </div>

                  {/* Hoş Geldin Başlığı */}
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-accent font-bold">ETİLER ŞUBESİ</span>
                    <h1 className="font-serif text-3xl font-extrabold leading-tight text-foreground">
                      Sarıhan Gusto'ya <br />
                      <span className="text-accent">Hoş Geldiniz</span>
                    </h1>
                  </div>

                  {/* 5 Yıldız Alanı */}
                  <div className="flex justify-center space-x-1 py-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-5 h-5 text-accent fill-accent animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
                    ))}
                  </div>

                  {/* İçerik Yazısı */}
                  <p className="text-xs text-muted leading-relaxed max-w-sm mx-auto">
                    Değerli misafirimiz, geleneksel gurme lezzetlerimizi sunarken en büyük motivasyonumuz sizlerin memnuniyetidir. Deneyiminizi bizimle paylaşıp usta ekibimize destek olmak ister misiniz?
                  </p>

                  {/* Yönlendirme Butonu */}
                  <div className="pt-4">
                    <button
                      onClick={handleReviewClick}
                      className="w-full px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-accent text-wood-dark hover:bg-brand-gold-hover hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-accent/15 cursor-pointer flex items-center justify-center space-x-2 focus:outline-none"
                    >
                      <span>Yorum Yaz ve Google'a Git</span>
                      <ArrowRight className="w-4 h-4 text-wood-dark" />
                    </button>
                  </div>

                  <div className="text-[10px] text-muted border-t border-card-border/50 pt-4 flex items-center justify-center space-x-1.5">
                    <Award className="w-3.5 h-3.5 text-accent" />
                    <span>Her geri bildiriminiz hizmet kalitemizi taçlandırır.</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="redirecting"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 py-8"
                >
                  <div className="flex justify-center relative">
                    {/* Sihirli Sparkle Animasyonları */}
                    <div className="absolute inset-0 flex items-center justify-center text-accent/30">
                      <Sparkles className="w-24 h-24 animate-pulse" />
                    </div>
                    <Loader2 className="w-12 h-12 text-accent animate-spin relative z-10" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-serif text-2xl font-bold text-accent">Teşekkür Ederiz!</h3>
                    <p className="text-xs text-muted leading-relaxed max-w-xs mx-auto">
                      Harika yemek deneyimlerinin arkasında çalışan mutfak ve servis ekibimiz adına şükranlarımızı sunarız. Google sayfasına yönlendiriliyorsunuz...
                    </p>
                  </div>

                  <div className="inline-flex items-center space-x-1.5 bg-accent/10 border border-accent/20 px-3.5 py-1.5 rounded-full text-accent text-[9px] font-bold uppercase tracking-wider">
                    <span>Yönlendirme Yapılıyor</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}
