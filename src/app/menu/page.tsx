"use client";

// src/app/menu/page.tsx
// Menü Sayfası — Restoran menüsünü listeler.
// Kategorilere göre filtreleme, arama motoru, alerjen uyarıları, mobilde yatay kaydırma ve skeleton yükleme durumlarını içerir.
// Gelişmiş diyet/alerjen filtreleri, Şifa & Kolajen Endeksi, İnteraktif Gurme Eşleştirme ve derin SEO JSON-LD şemasını barındırır.

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Flame, ShieldAlert, Sparkles, ChevronRight, Heart, Clock, Leaf, Shield, Check } from "lucide-react";
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

  // Alerjen & Diyet Filtreleri State
  const [excludeGluten, setExcludeGluten] = useState(false);
  const [excludeDairy, setExcludeDairy] = useState(false);
  const [excludeGarlic, setExcludeGarlic] = useState(false);
  const [onlyVegetarian, setOnlyVegetarian] = useState(false);

  // Sihirli Eşleştirme Tıklama Vurgusu State
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null);

  useEffect(() => {
    // Demo yüklenme illüzyonu (Skeleton testleri için)
    const timer = setTimeout(() => {
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

  // Gurme Eşleştirme Tıklama Fonksiyonu (Sihirli Tasarım Büyüsü)
  const handlePairingClick = (pairId: string) => {
    const pairedItem = items.find(i => i.id === pairId);
    if (pairedItem) {
      setActiveCategory(pairedItem.category);
      setSearchQuery(""); // Aramayı temizle ki ürünü görebilelim
      setHighlightedItemId(pairId);
      
      // Yumuşakça ürüne kaydır
      setTimeout(() => {
        const element = document.getElementById(pairId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 150);

      // 3 saniye sonra vurguyu kaldır
      setTimeout(() => {
        setHighlightedItemId(null);
      }, 3000);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Alerjen ve Diyet Kısıtlamaları Filtre Mantığı
    if (excludeGluten && item.allergens.some(a => a.toLowerCase().includes("gluten"))) return false;
    if (excludeDairy && item.allergens.some(a => a.toLowerCase().includes("süt") || a.toLowerCase().includes("yoğurt") || a.toLowerCase().includes("peynir") || a.toLowerCase().includes("kaymak") || a.toLowerCase().includes("kuruyemiş"))) return false;
    if (excludeGarlic && item.allergens.some(a => a.toLowerCase().includes("sarımsak"))) return false;
    if (onlyVegetarian && (item.category === "kebaplar" || item.category === "tencere" || item.id.includes("pastirmali"))) return false;

    return matchesCategory && matchesSearch && item.active;
  });

  // Arama Motoru SEO JSON-LD Şeması (Derin Menü Yapısı)
  const menuJsonLd = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "name": "Sarıhan Gusto Menü",
    "description": "Geleneksel zırh kebapları, saatlerce demlenmiş şifalı paça çorbaları ve taş fırın lezzetleri.",
    "hasMenuSection": KATEGORILER.filter(c => c.id !== "all").map(cat => ({
      "@type": "MenuSection",
      "name": cat.label,
      "hasMenuItem": menuData
        .filter(item => item.category === cat.id)
        .map(item => ({
          "@type": "MenuItem",
          "name": item.name,
          "description": item.description,
          "offers": {
            "@type": "Offer",
            "price": item.price,
            "priceCurrency": "TRY"
          }
         }))
    }))
  };

  return (
    <>
      {/* Menü Arama Motoru SEO Şeması */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />

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

          {/* Arama Barı, Filtreler ve Diyet Seçenekleri Konteyneri */}
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

            {/* Diyet & Alerjen Seçenekleri Barı (Premium Modern Filtreler) */}
            <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-3 py-1 bg-card/40 border border-card-border/40 p-4 rounded-3xl backdrop-blur-sm">
              
              {/* Gluten Hassasiyeti */}
              <button
                onClick={() => setExcludeGluten(!excludeGluten)}
                className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all duration-300 cursor-pointer border ${
                  excludeGluten
                    ? "bg-accent/20 border-accent text-accent shadow-md shadow-accent/5"
                    : "bg-card border-card-border text-muted hover:border-accent/45"
                }`}
              >
                <Leaf className="w-3.5 h-3.5 text-accent" />
                <span>Glutensiz</span>
                {excludeGluten && <Check className="w-3 h-3 text-accent" />}
              </button>

              {/* Süt Ürünleri Hassasiyeti */}
              <button
                onClick={() => setExcludeDairy(!excludeDairy)}
                className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all duration-300 cursor-pointer border ${
                  excludeDairy
                    ? "bg-accent/20 border-accent text-accent shadow-md shadow-accent/5"
                    : "bg-card border-card-border text-muted hover:border-accent/45"
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-accent" />
                <span>Laktozsuz</span>
                {excludeDairy && <Check className="w-3 h-3 text-accent" />}
              </button>

              {/* Sarımsak Hassasiyeti */}
              <button
                onClick={() => setExcludeGarlic(!excludeGarlic)}
                className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all duration-300 cursor-pointer border ${
                  excludeGarlic
                    ? "bg-accent/20 border-accent text-accent shadow-md shadow-accent/5"
                    : "bg-card border-card-border text-muted hover:border-accent/45"
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-accent" />
                <span>Sarımsaksız</span>
                {excludeGarlic && <Check className="w-3 h-3 text-accent" />}
              </button>

              {/* Vejetaryen */}
              <button
                onClick={() => setOnlyVegetarian(!onlyVegetarian)}
                className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all duration-300 cursor-pointer border ${
                  onlyVegetarian
                    ? "bg-accent/20 border-accent text-accent shadow-md shadow-accent/5"
                    : "bg-card border-card-border text-muted hover:border-accent/45"
                }`}
              >
                <Leaf className="w-3.5 h-3.5 text-accent" />
                <span>Vejetaryen</span>
                {onlyVegetarian && <Check className="w-3 h-3 text-accent" />}
              </button>

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
                    id={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className={`bg-card border rounded-3xl p-6 flex flex-col justify-between premium-hover overflow-hidden relative transition-all duration-500 ${
                      highlightedItemId === item.id 
                        ? "border-accent ring-2 ring-accent/35 scale-[1.03] shadow-lg shadow-accent/20 animate-pulse" 
                        : "border-card-border"
                    }`}
                    aria-label={item.name}
                  >
                    {/* Alerjen Bildirimi Varsa Üstte Göster */}
                    {item.allergens.length > 0 && (
                      <div className="absolute top-8 left-8 z-10 flex items-center space-x-1.5 bg-background/95 border border-accent/20 px-2.5 py-1 rounded-full text-[10px] font-bold text-accent shadow-sm">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>{item.allergens.join(", ")}</span>
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Kart Görseli Alanı */}
                      <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-card-border relative bg-[#1C1511]">
                        {/* Fallback/Açılış gradyanı ve alev ikonu */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-accent/30 p-6 text-center bg-gradient-to-tr from-background to-card-border/60">
                          <Flame className="w-12 h-12 mb-2 animate-pulse" />
                          <span className="text-[10px] uppercase tracking-widest font-bold text-muted/60">{item.nameEn}</span>
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

                      {/* 🍜 GURME ŞİFA ENDEKSİ (Çorbalar İçin Özel Arayüz Modülü) */}
                      {item.healingIndex && (
                        <div className="mt-4 p-4 bg-accent/5 border border-accent/15 rounded-2xl space-y-2 text-xs text-left animate-fade-in">
                          <div className="flex items-center justify-between text-accent font-bold">
                            <span className="flex items-center space-x-1">
                              <Heart className="w-3.5 h-3.5 fill-accent" />
                              <span>Gurme Şifa Endeksi</span>
                            </span>
                            <span>{item.healingIndex.immuneBoost}/5 Kuvvet</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-muted">
                            <div className="flex items-center space-x-1.5">
                              <Clock className="w-3 h-3 text-accent" />
                              <span>{item.healingIndex.brewTime} Demleme</span>
                            </div>
                            <div className="flex items-center space-x-1 justify-end">
                              <span className="bg-accent/10 text-accent px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider">
                                %{item.healingIndex.collagen} Kolajen
                              </span>
                            </div>
                          </div>
                          {/* İnce Kolajen Yüzde Çubuğu */}
                          <div className="w-full bg-card-border/80 rounded-full h-1 overflow-hidden mt-1">
                            <div 
                              className="bg-accent h-full rounded-full transition-all duration-1000" 
                              style={{ width: `${item.healingIndex.collagen}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Fiyat ve Sipariş / Detay Butonu */}
                    <div>
                      {/* 🍷 ŞEFİN GURME EŞLEŞTİRMELERİ (Sihirli Çapraz Bağlantılar) */}
                      {item.pairings && item.pairings.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-card-border/40 text-left">
                          <span className="text-[9px] font-extrabold uppercase tracking-widest text-muted/70 block mb-1.5">
                            Şefin Yanına Önerisi:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {item.pairings.map((pairId) => {
                              const pairedObj = items.find(i => i.id === pairId);
                              if (!pairedObj) return null;
                              return (
                                <button
                                  key={pairId}
                                  onClick={() => handlePairingClick(pairId)}
                                  className="text-[9px] px-2.5 py-1 rounded-full bg-card-border/50 text-foreground border border-card-border hover:border-accent hover:text-accent hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer flex items-center space-x-0.5 font-semibold"
                                  title={`${pairedObj.name} sayfasına gitmek için tıklayın`}
                                >
                                  <span>{pairedObj.name}</span>
                                  <ChevronRight className="w-2.5 h-2.5 text-accent" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-5 border-t border-card-border mt-5">
                        <span className="font-serif text-xl font-extrabold text-accent">
                          {item.price} ₺
                        </span>
                        <Link
                          href="/rezervasyon"
                          className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-accent text-wood-dark hover:bg-brand-gold-hover hover:scale-102 transition-all duration-300 focus:outline-none"
                        >
                          Masa Ayır
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))
              ) : (
                // SONUÇ BULUNAMADI EKRANI
                <div className="col-span-full py-16 text-center space-y-4">
                  <Sparkles className="w-12 h-12 text-accent mx-auto animate-spin" />
                  <h3 className="font-serif text-xl font-bold">Aradığınız Lezzet Bulunamadı</h3>
                  <p className="text-xs text-muted max-w-sm mx-auto">
                    Arama kriterlerinize veya seçilen diyet/alerjen filtrelerine uygun lezzet bulamadık. Lütfen filtrelerinizi sıfırlayarak tekrar deneyin.
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
