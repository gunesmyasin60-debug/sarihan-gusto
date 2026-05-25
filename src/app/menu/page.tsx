"use client";

// src/app/menu/page.tsx
// Menü Sayfası — Restoran menüsünü listeler.
// Kategorilere göre filtreleme, arama motoru, alerjen uyarıları, mobilde yatay kaydırma ve skeleton yükleme durumlarını içerir.

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Flame, ShieldAlert, Sparkles, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CookieBanner from "@/components/ui/CookieBanner";
import menuData from "@/data/menu.json";
import { MenuItem } from "@/types";

const KATEGORILER = [
  { id: "all", label: "Tüm Lezzetler", labelEn: "All Flavors" },
  { id: "corbalar", label: "Çorbalar", labelEn: "Soups" },
  { id: "kebaplar", label: "Kebaplar & Izgaralar", labelEn: "Grills & Kebabs" },
  { id: "firin", label: "Taş Fırın & Pide", labelEn: "Stone Oven & Pide" },
  { id: "tencere", label: "Tencere Yemekleri", labelEn: "Traditional Stews" },
  { id: "baslangiclar", label: "Mezeler & Başlangıçlar", labelEn: "Appetizers" },
  { id: "salatalar", label: "Gurme Salatalar", labelEn: "Gourmet Salads" },
  { id: "tatlilar", label: "Geleneksel Tatlılar", labelEn: "Traditional Desserts" },
  { id: "icecekler", label: "Özel İçecekler", labelEn: "Special Beverages" },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Demo yüklenme illüzyonu (Skeleton testleri için)
    const timer = setTimeout(() => {
      // LocalStorage'da güncel veri var mı kontrol et
      const localData = typeof window !== "undefined" ? localStorage.getItem("sarihan_menu_data") : null;
      if (localData) {
        setItems(JSON.parse(localData));
      } else {
        setItems(menuData as MenuItem[]);
      }
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && item.active;
  });

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-32 pb-24 background text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Menü Başlık */}
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold">GURME SEÇKİSİ</span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold">Lezzet Menümüz</h1>
            <p className="text-sm text-muted">
              Geleneksel tariflerimizle hazırlanan, taze yöresel malzemelerle ve usta ellerin dokunuşlarıyla sunulan Sarıhan lezzetleri.
            </p>
          </div>

          {/* Arama Barı ve Filtreler Konteyneri */}
          <div className="space-y-6 mb-12">
            
            {/* Arama Input */}
            <div className="max-w-md mx-auto relative">
              <Search className="w-5 h-5 text-muted absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Yemek, çorba veya içerik ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-card border border-card-border rounded-full text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 placeholder-muted shadow-inner"
                aria-label="Menü içinde arama yapın"
              />
            </div>

            {/* Yatay Kaydırılabilir Kategori Filtresi (Mobile Swipe) */}
            <div className="relative">
              <div 
                className="flex items-center space-x-3 overflow-x-auto no-scrollbar py-2 px-2 -mx-4 md:mx-0 justify-start md:justify-center"
                role="tablist"
                aria-label="Menü Kategorileri"
              >
                {KATEGORILER.map((category) => {
                  const isActive = activeCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      role="tab"
                      aria-selected={isActive}
                      className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-accent text-wood-dark shadow-lg shadow-accent/15"
                          : "bg-card border border-card-border text-foreground hover:border-accent hover:text-accent"
                      }`}
                    >
                      {category.label}
                    </button>
                  );
                })}
              </div>
              {/* Sağ tarafta mobil için küçük bir kaydırma ipucu */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden flex items-center justify-end pr-1 text-accent">
                <ChevronRight className="w-4 h-4 animate-bounce-horizontal" />
              </div>
            </div>
          </div>

          {/* Menü Kartları Grid veya Skeletons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {loading ? (
                // SKELETON EKRANLAR (Yükleme İllüzyonu)
                Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="bg-card border border-card-border rounded-3xl p-6 space-y-4 animate-pulse"
                  >
                    <div className="aspect-[4/3] w-full bg-card-border/50 rounded-2xl" />
                    <div className="h-6 bg-card-border/50 rounded-lg w-2/3" />
                    <div className="space-y-2">
                      <div className="h-4 bg-card-border/40 rounded-lg w-full" />
                      <div className="h-4 bg-card-border/40 rounded-lg w-5/6" />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="h-6 bg-card-border/50 rounded-lg w-1/4" />
                      <div className="h-8 bg-card-border/50 rounded-full w-1/3" />
                    </div>
                  </div>
                ))
              ) : filteredItems.length > 0 ? (
                // GERÇEK LEZZET KARTLARI
                filteredItems.map((item) => (
                  <motion.article
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-card border border-card-border rounded-3xl p-6 flex flex-col justify-between premium-hover overflow-hidden relative"
                    aria-label={item.name}
                  >
                    {/* Alerjen Bildirimi Varsa Üstte Göster */}
                    {item.allergens.length > 0 && (
                      <div className="absolute top-8 left-8 z-10 flex items-center space-x-1.5 bg-wood-dark/70 backdrop-blur-sm border border-accent/25 px-2.5 py-1 rounded-full text-[10px] font-bold text-accent">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>{item.allergens.join(", ")}</span>
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Kart Görseli Alanı */}
                      <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-card-border relative bg-[#1C1511]">
                        {/* Fallback/Açılış gradyanı ve alev ikonu */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-accent/20 p-6 text-center bg-gradient-to-tr from-wood-dark to-wood-amber">
                          <Flame className="w-12 h-12 mb-2 animate-pulse" />
                          <span className="text-[10px] uppercase tracking-widest font-bold text-stone-cream/40">{item.nameEn}</span>
                        </div>

                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover z-10 transition-transform duration-500 hover:scale-105"
                            onError={(e) => {
                              // Görsel yüklenemezse veya kırık yolsa resmi gizleyip fallback'in görünmesini sağla
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        )}
                      </div>

                      {/* Metin İçerikleri */}
                      <div className="space-y-2 text-left">
                        <div className="flex items-start justify-between">
                          <h3 className="font-serif text-2xl font-bold text-foreground">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-xs text-muted leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Fiyat ve Sipariş / Detay Butonu */}
                    <div className="flex items-center justify-between pt-6 border-t border-card-border mt-6">
                      <span className="font-serif text-xl font-extrabold text-accent">
                        {item.price} ₺
                      </span>
                      <Link
                        href="/rezervasyon"
                        className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-accent/10 border border-accent/20 text-accent hover:bg-accent hover:text-wood-dark transition-all duration-300 focus:outline-none"
                      >
                        Masa Ayır
                      </Link>
                    </div>
                  </motion.article>
                ))
              ) : (
                // SONUÇ BULUNAMADI EKRANI
                <div className="col-span-full py-16 text-center space-y-4">
                  <Sparkles className="w-12 h-12 text-accent mx-auto animate-spin" />
                  <h3 className="font-serif text-xl font-bold">Aradığınız Lezzet Bulunamadı</h3>
                  <p className="text-xs text-muted max-w-sm mx-auto">
                    Arama kriterlerinize veya seçilen kategoriye uygun lezzet bulamadık. Lütfen farklı kelimelerle tekrar deneyin.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </main>

      <Footer />
      <CookieBanner />
    </>
  );
}
