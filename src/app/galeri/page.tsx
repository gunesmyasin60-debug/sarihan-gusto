"use client";

// src/app/galeri/page.tsx
// Galeri Sayfası — Restoranın ambiyansını ve yemeklerini gösteren şık editoryal ızgara (Grid).
// Resimlere tıklandığında açılan, framer-motion ile kaydırma (swipe) destekli tam ekran modal içerir.

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Compass, Flame, Leaf, Coffee } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CookieBanner from "@/components/ui/CookieBanner";

const GALERI_GÖRSELLERİ = [
  {
    id: "g-1",
    title: "Geleneksel Kelle Paça Demlenmesi",
    category: "lezzetler",
    icon: <Flame className="w-6 h-6" />,
    desc: "24 saat kısık ateşte demlenen hakiki saray usulü çorbalarımız.",
  },
  {
    id: "g-2",
    title: "Zırh Kebabının Hazırlanışı",
    category: "mutfak",
    icon: <Compass className="w-6 h-6" />,
    desc: "Usta ellerde sıfır metal temasıyla zırh ile kıyılan kuzu kıyması.",
  },
  {
    id: "g-3",
    title: "Doğal Başlangıçlar & Mezeler",
    category: "lezzetler",
    icon: <Leaf className="w-6 h-6" />,
    desc: "Hatay süzme yoğurdu ve yöresel sızma zeytinyağı ile hazırlanan mezelerimiz.",
  },
  {
    id: "g-4",
    title: "Şık ve Sıcak Ambiyansımız",
    category: "mekan",
    icon: <Coffee className="w-6 h-6" />,
    desc: "Anadolu Sıcaklığı konseptinde tasarlanmış şık Etiler şubemiz.",
  },
  {
    id: "g-5",
    title: "Çıtır Fıstıklı Katmer Fırınlanması",
    category: "lezzetler",
    icon: <Flame className="w-6 h-6" />,
    desc: "Antep fıstığı ve manda kaymağıyla el açması katmer fırın şöleni.",
  },
  {
    id: "g-6",
    title: "Özel VIP Yemek Odası",
    category: "mekan",
    icon: <Coffee className="w-6 h-6" />,
    desc: "İş toplantılarınız ve özel davetleriniz için tasarlanmış VIP odamız.",
  },
];

export default function GalleryPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");

  const filteredImages = GALERI_GÖRSELLERİ.filter(
    (img) => filter === "all" || img.category === filter
  );

  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredImages.length);
    }
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + filteredImages.length) % filteredImages.length
      );
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-32 pb-24 background text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Galeri Başlık */}
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold">GÖRSEL ŞÖLEN</span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold">Fotoğraf Galerisi</h1>
            <p className="text-sm text-muted">
              Sarıhan Gusto Etiler şubemizin otantik tasarımını, mutfaktaki özenli hazırlık süreçlerimizi ve ödüllü lezzetlerimizi editoryal sunumumuzla inceleyin.
            </p>
          </div>

          {/* Kategori Filtresi */}
          <div className="flex items-center justify-center space-x-2 mb-10 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 md:mx-0" role="tablist" aria-label="Galeri Filtreleri">
            {[
              { id: "all", label: "Tüm Görseller" },
              { id: "lezzetler", label: "Lezzetler" },
              { id: "mutfak", label: "Mutfak & Hazırlık" },
              { id: "mekan", label: "Ambiyans & Mekan" },
            ].map((cat) => {
              const isActive = filter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  role="tab"
                  aria-selected={isActive}
                  className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer focus:outline-none ${
                    isActive
                      ? "bg-accent text-wood-dark shadow-lg shadow-accent/15"
                      : "bg-card border border-card-border text-foreground hover:border-accent hover:text-accent"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Görsel Izgarası (Grid - Premium Editoryal Kartlar) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img, index) => (
                <motion.div
                  layout
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedImageIndex(index)}
                  className="group relative aspect-[4/3] rounded-3xl bg-card border border-card-border p-8 flex flex-col justify-between items-start transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-accent/5 cursor-pointer premium-hover"
                  role="button"
                  aria-label={`${img.title} detaylarını görmek için tıklayın.`}
                >
                  {/* İkon Bölümü */}
                  <div className="w-14 h-14 rounded-2xl bg-background border border-card-border flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-500">
                    {img.icon}
                  </div>

                  {/* Metin İçeriği */}
                  <div className="text-left w-full mt-4">
                    <span className="text-[9px] uppercase tracking-widest text-accent font-bold">
                      {img.category}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-foreground mt-1 leading-tight group-hover:text-accent transition-colors">
                      {img.title}
                    </h3>
                    <p className="text-xs text-muted mt-2 leading-relaxed">
                      {img.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Tam Ekran Swipeable Modal (Lightbox) */}
          <AnimatePresence>
            {selectedImageIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-[#181210]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-10"
                role="dialog"
                aria-modal="true"
                aria-label="Görsel Detay Ekranı"
              >
                {/* Kapat Butonu */}
                <button
                  onClick={() => setSelectedImageIndex(null)}
                  className="absolute top-6 right-6 w-12 h-12 rounded-full bg-card border border-card-border flex items-center justify-center text-foreground hover:text-accent hover:border-accent cursor-pointer transition-all duration-300 z-50 focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label="Galeriyi Kapat"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Sol Ok Butonu */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 w-12 h-12 rounded-full bg-card border border-card-border flex items-center justify-center text-foreground hover:text-accent hover:border-accent cursor-pointer transition-all duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label="Önceki Görsel"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Sağ Ok Butonu */}
                <button
                  onClick={handleNext}
                  className="absolute right-4 w-12 h-12 rounded-full bg-card border border-card-border flex items-center justify-center text-foreground hover:text-accent hover:border-accent cursor-pointer transition-all duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label="Sonraki Görsel"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Tam Ekran Kart / Görsel Detayı */}
                <motion.div
                  key={selectedImageIndex}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 100) {
                      handlePrev();
                    } else if (info.offset.x < -100) {
                      handleNext();
                    }
                  }}
                  initial={{ x: 100, opacity: 0, scale: 0.95 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  exit={{ x: -100, opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-3xl aspect-[4/3] rounded-3xl bg-card border border-card-border flex flex-col justify-end p-8 text-left relative overflow-hidden select-none cursor-grab active:cursor-grabbing shadow-2xl"
                >
                  {/* Büyük İkon Arkaplanı */}
                  <div className="absolute inset-0 flex items-center justify-center text-accent/5 opacity-30">
                    <div className="scale-[4]">
                      {filteredImages[selectedImageIndex].icon}
                    </div>
                  </div>

                  {/* Detay Paneli */}
                  <div className="relative z-10 space-y-2 bg-background/90 backdrop-blur-md p-6 rounded-2xl border border-card-border shadow-lg">
                    <span className="text-xs uppercase tracking-widest text-accent font-bold">
                      {filteredImages[selectedImageIndex].category}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                      {filteredImages[selectedImageIndex].title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {filteredImages[selectedImageIndex].desc}
                    </p>
                  </div>
                </motion.div>

                {/* Swipe İpucu */}
                <p className="text-muted text-[10px] uppercase tracking-widest mt-6 animate-pulse select-none font-semibold">
                  Mobilde kaydırarak (swipe) veya oklara tıklayarak gezinebilirsiniz.
                </p>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      <Footer />
      <CookieBanner />
    </>
  );
}
