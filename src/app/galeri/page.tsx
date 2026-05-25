"use client";

// src/app/galeri/page.tsx
// Galeri Sayfası — Restoranın ambiyansını ve yemeklerini gösteren şık görsel ızgara (Grid).
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
    icon: <Flame className="w-8 h-8" />,
    desc: "24 saat kısık ateşte demlenen hakiki saray usulü çorbalarımız.",
  },
  {
    id: "g-2",
    title: "Zırh Kebabının Hazırlanışı",
    category: "mutfak",
    icon: <Compass className="w-8 h-8" />,
    desc: "Usta ellerde sıfır metal temasıyla zırh ile kıyılan kuzu kıyması.",
  },
  {
    id: "g-3",
    title: "Doğal Başlangıçlar & Mezeler",
    category: "lezzetler",
    icon: <Leaf className="w-8 h-8" />,
    desc: "Hatay süzme yoğurdu ve yöresel sızma zeytinyağı ile hazırlanan mezelerimiz.",
  },
  {
    id: "g-4",
    title: "Şık ve Sıcak Ambiyansımız",
    category: "mekan",
    icon: <Coffee className="w-8 h-8" />,
    desc: "Anadolu Sıcaklığı konseptinde tasarlanmış şık Etiler şubemiz.",
  },
  {
    id: "g-5",
    title: "Çıtır Fıstıklı Katmer Fırınlanması",
    category: "lezzetler",
    icon: <Flame className="w-8 h-8" />,
    desc: "Antep fıstığı ve manda kaymağıyla el açması katmer şöleni.",
  },
  {
    id: "g-6",
    title: "Özel VIP Yemek Odası",
    category: "mekan",
    icon: <Coffee className="w-8 h-8" />,
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
              Sarıhan Gusto Etiler şubemizin otantik tasarımını, mutfaktaki özenli hazırlık süreçlerimizi ve ödüllü lezzetlerimizi inceleyin.
            </p>
          </div>

          {/* Kategori Filtresi */}
          <div className="flex items-center justify-center space-x-2 mb-10 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 md:mx-0">
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
                  className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-accent text-wood-dark"
                      : "bg-card border border-card-border text-foreground hover:border-accent hover:text-accent"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Görsel Izgarası (Grid) */}
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
                  className="group relative aspect-[4/3] rounded-3xl overflow-hidden border border-card-border bg-gradient-to-tr from-wood-dark to-wood-amber cursor-pointer premium-hover"
                  role="button"
                  aria-label={`${img.title} görselini tam ekran görüntüleyin.`}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-accent/30 p-8 text-center group-hover:scale-105 transition-all duration-500">
                    {img.icon}
                    <h3 className="font-serif text-xl font-bold mt-4 text-stone-light">{img.title}</h3>
                    <p className="text-[10px] text-stone-cream/70 mt-1 uppercase tracking-widest">{img.category}</p>
                  </div>
                  <div className="absolute inset-0 bg-wood-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                    <span className="text-[9px] uppercase tracking-widest text-accent font-bold">{img.category}</span>
                    <h4 className="font-serif text-lg font-bold text-stone-light mt-1">{img.title}</h4>
                    <p className="text-xs text-stone-cream/70 mt-1">{img.desc}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Tam Ekran Swipeable Modal */}
          <AnimatePresence>
            {selectedImageIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-wood-dark/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-10"
                role="dialog"
                aria-modal="true"
                aria-label="Görsel Detay Ekranı"
              >
                {/* Kapat Butonu */}
                <button
                  onClick={() => setSelectedImageIndex(null)}
                  className="absolute top-6 right-6 w-12 h-12 rounded-full bg-wood-amber/55 border border-accent/25 flex items-center justify-center text-stone-cream hover:bg-accent hover:text-wood-dark cursor-pointer transition-all duration-300 z-50 focus:outline-none"
                  aria-label="Galeriyi Kapat"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Sol Ok Butonu */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 w-12 h-12 rounded-full bg-wood-amber/55 border border-accent/25 flex items-center justify-center text-stone-cream hover:bg-accent hover:text-wood-dark cursor-pointer transition-all duration-300 z-10 focus:outline-none"
                  aria-label="Önceki Görsel"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Sağ Ok Butonu */}
                <button
                  onClick={handleNext}
                  className="absolute right-4 w-12 h-12 rounded-full bg-wood-amber/55 border border-accent/25 flex items-center justify-center text-stone-cream hover:bg-accent hover:text-wood-dark cursor-pointer transition-all duration-300 z-10 focus:outline-none"
                  aria-label="Sonraki Görsel"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Tam Ekran Kart / Görsel Detayı (Framer Motion Swipe Desteği) */}
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
                  className="w-full max-w-3xl aspect-[4/3] rounded-3xl bg-gradient-to-tr from-wood-dark to-wood-amber border border-accent/25 flex flex-col justify-end p-8 text-left relative overflow-hidden select-none cursor-grab active:cursor-grabbing shadow-2xl"
                >
                  {/* Büyük İkon */}
                  <div className="absolute inset-0 flex items-center justify-center text-accent/5 opacity-40">
                    {filteredImages[selectedImageIndex].icon}
                  </div>

                  <div className="relative z-10 space-y-2 bg-wood-dark/80 backdrop-blur-md p-6 rounded-2xl border border-wood-amber">
                    <span className="text-xs uppercase tracking-widest text-accent font-bold">
                      {filteredImages[selectedImageIndex].category}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-stone-light">
                      {filteredImages[selectedImageIndex].title}
                    </h3>
                    <p className="text-sm text-stone-cream/80 leading-relaxed">
                      {filteredImages[selectedImageIndex].desc}
                    </p>
                  </div>
                </motion.div>

                {/* Swipe İpucu */}
                <p className="text-stone-cream/50 text-[10px] uppercase tracking-widest mt-6 animate-pulse select-none">
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
