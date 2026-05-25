"use client";

// src/app/error.tsx
// 500 Sunucu Hatası Ekranı — Özel tasarımlı, kesinti durumlarında restoran telefon numarasına doğrudan tıkla-ara yönlendirmesi içeren acil durum kurtarma sayfası.

import { useEffect } from "react";
import { AlertTriangle, Phone, RefreshCw } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { RESTORAN_BILGILERI } from "@/constants/restaurant";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Kritik Arayüz Kesinti Hatası (500):", error);
  }, [error]);

  return (
    <>
      <Navbar />

      <main className="flex-grow flex items-center justify-center pt-32 pb-24 background text-foreground">
        <div className="max-w-md w-full px-6 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mx-auto animate-pulse">
            <AlertTriangle className="w-10 h-10" />
          </div>
          
          <div className="space-y-2">
            <h1 className="font-serif text-4xl font-extrabold text-red-500">Hata Oluştu</h1>
            <h2 className="font-serif text-xl font-bold">Sistemde Geçici Bir Aksaklık Yaşanıyor</h2>
            <p className="text-xs text-muted leading-relaxed max-w-xs mx-auto">
              Size en iyi deneyimi sunarken teknik bir sorunla karşılaştık. Rezervasyon veya acil sorularınız için lütfen doğrudan bizi arayın.
            </p>
          </div>

          {/* Acil Arama Alanı */}
          <div className="bg-card border border-card-border p-5 rounded-2xl space-y-2">
            <span className="text-[9px] uppercase tracking-widest text-accent font-bold">Doğrudan İletişim Hattı</span>
            <a
              href={`tel:${RESTORAN_BILGILERI.phoneRaw}`}
              className="text-2xl font-extrabold text-foreground hover:text-accent hover:underline flex items-center justify-center space-x-2"
              aria-label={`Sarıhan Gusto İletişim Hattı: ${RESTORAN_BILGILERI.phone}`}
            >
              <Phone className="w-6 h-6 text-accent shrink-0 animate-bounce" />
              <span>{RESTORAN_BILGILERI.phone}</span>
            </a>
          </div>

          <div className="flex space-x-3 justify-center pt-2">
            <button
              onClick={() => reset()}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-accent text-wood-dark hover:bg-brand-gold-hover hover:scale-[1.02] rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-accent/15 cursor-pointer focus:outline-none"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Sayfayı Yenile</span>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
