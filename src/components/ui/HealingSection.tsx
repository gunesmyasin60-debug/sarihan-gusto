// src/components/ui/HealingSection.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Flame } from "lucide-react";
import { MenuItem } from "@/types";
import menuData from "@/data/menu.json";

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
          try {
            const res = await fetch("/api/admin/menu");
            const json = await res.json();
            if (json.success && json.data && json.data.length > 0) {
              items = json.data;
            }
          } catch (e) {
            console.warn("Dynamic API fetch failed or empty, falling back to static menu.json", e);
          }
        }

        if (items.length === 0) {
          items = menuData as MenuItem[];
        }

        // isHealing ve active olanları filtrele
        const healingItems = items.filter(
          (item) => item.active && item.isHealing && item.category === "corbalar"
        );
        setSoups(healingItems);
        
        if (healingItems.length > 0) {
          setActiveSoup(healingItems[0]);
        } else if (items.length > 0) {
          // Eğer şifa çorbası yoksa ilk çorbayı göster
          const fallback = items.filter(item => item.category === "corbalar");
          if (fallback.length > 0) {
            setSoups(fallback);
            setActiveSoup(fallback[0]);
          }
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
                    className={`py-6 border-b border-card-border/50 transition-all duration-300 cursor-pointer relative ${
                      isActive 
                        ? "text-accent" 
                        : "text-foreground/80 hover:text-accent"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="text-left">
                        <h3 className={`font-serif text-xl font-bold leading-tight transition-colors ${isActive ? "text-accent" : "text-foreground"}`}>
                          {soup.name}
                        </h3>
                        <p className="text-[10px] text-accent uppercase tracking-wider font-extrabold mt-1">
                          {soup.nameEn}
                        </p>
                        <p className="text-xs text-muted leading-relaxed mt-2.5">
                          {soup.description}
                        </p>
                      </div>

                      {/* İksir Demleme Hızlı İstatistik */}
                      {soup.healingIndex && (
                        <div className="shrink-0 text-right space-y-0.5">
                          <span className="text-[8px] uppercase tracking-widest text-muted font-extrabold block">KOLAJEN</span>
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

                    <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {activeSoup && (
                <motion.div
                  key={activeSoup.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="text-left space-y-8 lg:pl-8"
                >
                  {/* Üst Kısım Bilgisi - Temiz Editoryal Hiyerarşi */}
                  <div className="space-y-2">
                    <span className="text-xs text-accent uppercase tracking-[0.25em] font-extrabold block">
                      Şifa Analizi
                    </span>
                    <h3 className="font-serif text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
                      {activeSoup.name}
                    </h3>
                    <p className="text-xs text-accent uppercase tracking-wider font-extrabold">
                      {activeSoup.nameEn}
                    </p>
                  </div>

                  {/* Şifa Faydaları Gösterimi */}
                  <div className="space-y-3 py-2">
                    <span className="text-xs text-muted uppercase tracking-widest font-extrabold block">
                      Usta Şeflerin Şifa Reçetesi
                    </span>
                    <p className="font-serif text-2xl md:text-3xl font-medium text-foreground leading-relaxed italic">
                      "{activeSoup.benefits || "Hücre yenileyici, yüksek kolajen ve protein deposu şifa iksiri."}"
                    </p>
                    {activeSoup.benefitsEn && (
                      <p className="text-xs text-muted leading-relaxed italic">
                        "{activeSoup.benefitsEn}"
                      </p>
                    )}
                  </div>

                  {/* Gastronomik Açıklama */}
                  <div className="space-y-2 border-t border-card-border/30 pt-6">
                    <span className="text-xs text-muted uppercase tracking-wider font-extrabold block">Gastronomik Ustalık</span>
                    <p className="text-sm text-muted leading-relaxed">{activeSoup.description}</p>
                  </div>

                  {/* Şefin Sırrı pairings */}
                  {activeSoup.pairings && activeSoup.pairings.length > 0 && (
                    <div className="flex flex-wrap items-center gap-3 bg-card/45 border border-card-border/50 p-4.5 rounded-2xl">
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
                            <span key={pId} className="px-2.5 py-1 bg-background/60 border border-card-border rounded-lg text-[9px] font-bold text-foreground/75 uppercase tracking-wide">
                              {pairLabel}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Fiyat ve Masa Ayır Butonu */}
                  <div className="flex items-center justify-between border-t border-card-border/30 pt-8 mt-6">
                    <div className="space-y-1">
                      <span className="text-[10px] text-muted font-bold uppercase tracking-wider block">KASE FİYATI</span>
                      <span className="font-serif text-3xl font-extrabold text-accent block">
                        {activeSoup.price} ₺
                      </span>
                    </div>
                    <Link
                      href="/rezervasyon"
                      className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-accent text-wood-dark hover:bg-brand-gold-hover hover:scale-102 transition-all duration-300 focus:outline-none"
                    >
                      Masa Ayır
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
