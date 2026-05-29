// src/components/ui/HealingSection.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sparkles, Flame, Clock, Award, Activity, Heart } from "lucide-react";
import { MenuItem } from "@/types";

export default function HealingSection() {
  const [soups, setSoups] = useState<MenuItem[]>([]);
  const [activeSoup, setActiveSoup] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Menü verilerini fetch et (LocalStorage demo verisi veya API üzerinden)
  useEffect(() => {
    const fetchSoups = async () => {
      try {
        let items: MenuItem[] = [];
        
        // Demo Modu Tespiti
        const isDemo = typeof window !== "undefined" && (
          window.location.hostname.includes("vercel.app") || 
          window.location.search.includes("demo=true") ||
          localStorage.getItem("sarihan_menu_data") !== null
        );

        if (isDemo) {
          const localData = localStorage.getItem("sarihan_menu_data");
          if (localData) {
            items = JSON.parse(localData);
          }
        }

        if (items.length === 0) {
          const res = await fetch("/api/admin/menu");
          const json = await res.json();
          if (json.success) {
            items = json.data;
          }
        }

        // isHealing ve active olanları filtrele
        const healingItems = items.filter(
          (item) => item.active && item.isHealing && item.category === "corbalar"
        );
        setSoups(healingItems);
        
        if (healingItems.length > 0) {
          setActiveSoup(healingItems[0]);
        }
      } catch (err) {
        console.error("Şifa çorbaları yüklenemedi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSoups();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center text-foreground/50 text-xs tracking-widest font-bold">
        ŞİFA ANALİZLERİ HAZIRLANIYOR...
      </div>
    );
  }

  if (soups.length === 0) {
    return null; // Eğer şifa işaretli çorba yoksa bu bölümü hiç gösterme
  }

  return (
    <section 
      className="py-28 bg-background relative overflow-hidden border-t border-card-border"
      aria-label="Sarıhan Gusto Şifa Felsefesi"
    >
      {/* Premium Arka Plan Detayları */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#D99C3D]/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Bölüm Başlığı - Klasik editoryal tipografi */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-accent/15 border border-accent/25 px-4.5 py-1.5 rounded-full text-accent text-[10px] font-extrabold uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5 text-accent animate-pulse" />
            <span>Kadim Demleme Ritüeli</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight">
            Şifa Felsefesi & Ağır Demleme
          </h2>
          <p className="text-sm text-muted leading-relaxed max-w-lg mx-auto">
            Sarıhan'ın mutfak felsefesinde çorba bir başlangıç değil, saatlerce demlenmiş bir iksir, asırlık bir şifa reçetesidir.
          </p>
        </div>

        {/* Dinamik İnteraktif Gövde */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Sol Kolon: İnteraktif Çorba Seçici Listesi (Sütunlar halinde) */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <span className="text-[10px] text-accent/70 uppercase tracking-[0.25em] font-extrabold block mb-2">
              Demlenmiş İksirlerimiz
            </span>
            <div className="space-y-4">
              {soups.map((soup) => {
                const isActive = activeSoup?.id === soup.id;
                return (
                  <motion.div
                    key={soup.id}
                    onClick={() => setActiveSoup(soup)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                      isActive 
                        ? "bg-card border-accent shadow-lg shadow-accent/5 text-foreground" 
                        : "bg-card/30 border-card-border/60 text-foreground/80 hover:border-accent/40"
                    }`}
                  >
                    {/* Aktiflik Durumu Altın Çizgi */}
                    {isActive && (
                      <div className="absolute top-0 bottom-0 left-0 w-1 bg-accent" />
                    )}

                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-serif text-lg font-bold leading-tight text-foreground">
                          {soup.name}
                        </h3>
                        <p className="text-[10px] text-accent uppercase tracking-wider font-extrabold mt-1">
                          {soup.nameEn}
                        </p>
                        <p className="text-xs text-foreground/60 leading-relaxed mt-2.5 line-clamp-2">
                          {soup.description}
                        </p>
                      </div>

                      {/* İksir Demleme Hızlı İstatistik */}
                      {soup.healingIndex && (
                        <div className="shrink-0 text-right space-y-1 bg-background/50 border border-card-border px-3 py-2 rounded-xl">
                          <span className="text-[9px] uppercase tracking-widest text-accent font-extrabold block">KOLAJEN</span>
                          <span className="font-serif text-sm font-extrabold text-foreground block">
                            %{soup.healingIndex.collagen}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Sağ Kolon: Aktif Çorba Şifa Laboratuvarı Detayları */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {activeSoup && (
                <motion.div
                  key={activeSoup.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-card border border-card-border p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-left"
                >
                  {/* Dekoratif Işık */}
                  <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-accent/5 blur-[50px] pointer-events-none" />

                  {/* Üst Kart Bilgisi */}
                  <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between border-b border-card-border/60 pb-8">
                    <div>
                      <span className="text-[10px] text-accent uppercase tracking-[0.25em] font-extrabold block mb-1">
                        Şifa Analizi
                      </span>
                      <h3 className="font-serif text-3xl font-extrabold text-foreground">
                        {activeSoup.name}
                      </h3>
                      <p className="text-xs text-foreground/50 mt-1 font-semibold">
                        Geleneksel Reçete / Doğal İlik Suyu Matrisi
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <span className="text-[11px] text-foreground/50 font-bold uppercase tracking-wider block">KASE FİYATI</span>
                      <span className="font-serif text-2xl font-extrabold text-accent block mt-0.5">
                        {activeSoup.price} ₺
                      </span>
                    </div>
                  </div>

                  {/* Şifa Faydaları Gösterimi */}
                  <div className="py-8 space-y-2">
                    <span className="text-[10px] text-accent uppercase tracking-widest font-extrabold block">
                      Tıbbi ve Gastronomik Faydaları
                    </span>
                    <p className="font-serif text-xl font-bold text-foreground leading-relaxed">
                      "{activeSoup.benefits || "Hücre yenileyici, yüksek kolajen ve protein deposu şifa iksiri."}"
                    </p>
                    {activeSoup.benefitsEn && (
                      <p className="text-xs text-foreground/55 font-medium italic">
                        "{activeSoup.benefitsEn}"
                      </p>
                    )}
                  </div>

                  {/* Laboratuvar Göstergeleri (Kolajen, Demleme Saati, Bağışıklık) */}
                  {activeSoup.healingIndex && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-card-border/60">
                      
                      {/* Kolajen Gauge */}
                      <div className="bg-background/40 border border-card-border/60 p-5 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 relative group overflow-hidden">
                        <div className="w-16 h-16 rounded-full border-4 border-card-border flex items-center justify-center relative">
                          {/* Dairesel gauge efekti */}
                          <div className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent animate-spin-slow opacity-25" />
                          <span className="font-serif text-lg font-extrabold text-accent">
                            %{activeSoup.healingIndex.collagen}
                          </span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-foreground/50 font-extrabold uppercase tracking-widest block">Kolajen Oranı</span>
                          <span className="text-[9px] text-accent font-bold uppercase block">Hücre Yenileme</span>
                        </div>
                      </div>

                      {/* Demleme Saati */}
                      <div className="bg-background/40 border border-card-border/60 p-5 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 relative group overflow-hidden">
                        <div className="w-16 h-16 rounded-full bg-accent/5 border border-accent/20 flex items-center justify-center text-accent">
                          <Clock className="w-7 h-7" />
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-foreground/50 font-extrabold uppercase tracking-widest block">Kaynama Süresi</span>
                          <span className="text-xs font-serif font-extrabold text-foreground block">
                            {activeSoup.healingIndex.brewTime}
                          </span>
                        </div>
                      </div>

                      {/* Bağışıklık Gücü (Hearts) */}
                      <div className="bg-background/40 border border-card-border/60 p-5 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 relative group overflow-hidden">
                        <div className="w-16 h-16 rounded-full bg-accent/5 border border-accent/20 flex items-center justify-center text-accent">
                          <Shield className="w-7 h-7 text-accent" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] text-foreground/50 font-extrabold uppercase tracking-widest block">Bağışıklık Gücü</span>
                          <div className="flex items-center space-x-0.5">
                            {Array.from({ length: 5 }).map((_, i) => {
                              const boost = activeSoup.healingIndex?.immuneBoost || 1;
                              return (
                                <Heart 
                                  key={i} 
                                  className={`w-3 h-3 ${
                                    i < boost 
                                      ? "text-accent fill-accent" 
                                      : "text-foreground/20"
                                  }`} 
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Şefin Sırrı pairings */}
                  {activeSoup.pairings && activeSoup.pairings.length > 0 && (
                    <div className="mt-8 flex flex-wrap items-center gap-3 bg-background/50 border border-card-border/40 p-4.5 rounded-2xl">
                      <span className="text-[9px] text-accent font-extrabold uppercase tracking-widest shrink-0">
                        Şefin Eşleştirme Önerisi:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeSoup.pairings.map((pId) => {
                          const pairLabel = pId.includes("ayran") 
                            ? "Yayık Ayranı" 
                            : pId.includes("haydari") 
                            ? "Süzme Haydari" 
                            : pId.includes("humus")
                            ? "Sıcak Humus"
                            : "Geleneksel Meze";
                          return (
                            <span key={pId} className="px-2.5 py-1 bg-card border border-card-border rounded-lg text-[9px] font-bold text-foreground/75 uppercase tracking-wide">
                              {pairLabel}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
