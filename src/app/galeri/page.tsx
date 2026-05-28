"use client";

// src/app/galeri/page.tsx
// Galeri Sayfası — Restoranın ambiyansını ve yemeklerini gösteren şık editoryal ızgara (Grid).
// Resimlere tıklandığında açılan, framer-motion ile kaydırma (swipe) destekli tam ekran modal içerir.

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CookieBanner from "@/components/ui/CookieBanner";

const GALERI_GÖRSELLERİ = [
  {
    id: "g-1",
    title: "Özel Tasarım Geleneksel Ocakbaşı Köşesi",
    category: "Mutfak & Hazırlık",
    image: "/images/interior_1.png",
    desc: "Zırh kebaplarımızın ve geleneksel lezzetlerimizin meşe kömürü ateşinde ağır ağır piştiği imza ocakbaşı alanımız.",
  },
  {
    id: "g-2",
    title: "Etiler Şubesi Lüks Giriş Lobisi",
    category: "Mekan & Ambiyans",
    image: "/images/interior_2.png",
    desc: "Misafirlerimizi karşıladığımız; modern mermer yüzeyler, bronz detaylar ve asil Anadolu sıcaklığı ile bezenmiş lobimiz.",
  },
  {
    id: "g-3",
    title: "Geniş Aile ve Grup Yemek Salonu",
    category: "Mekan & Ambiyans",
    image: "/images/interior_3.png",
    desc: "Kalabalık aile davetleriniz ve grup buluşmalarınız için özel olarak tasarlanmış ferah ve konforlu yemek salonumuz.",
  },
  {
    id: "g-4",
    title: "Premium Deri Localar ve Sıcak Işıklandırmalar",
    category: "Mekan & Ambiyans",
    image: "/images/interior_4.png",
    desc: "Sevdiklerinizle baş başa, dinlendirici mum ışıkları ve loş aydınlatmalar eşliğinde yemek yiyebileceğiniz konforlu localarımız.",
  },
  {
    id: "g-5",
    title: "Özel VIP Salonu & Akustik Tasarım",
    category: "Mekan & Ambiyans",
    image: "/images/interior_5.png",
    desc: "İş toplantılarınız ve özel sunumlarınız için ses akustiği ve donanımı özel olarak kurgulanmış lüks VIP salonumuz.",
  },
  {
    id: "g-6",
    title: "Ferah ve Bitkilerle Bezeli Teras Alanı",
    category: "Mekan & Ambiyans",
    image: "/images/interior_6.png",
    desc: "Açık hava konforunu lüks detaylarla birleştiren, yeşilliklerle çevrili ve loş akşam aydınlatmalı keyifli terasımız.",
  },
  {
    id: "g-7",
    title: "Taş Fırın ve Pide Hazırlık İstasyonu",
    category: "Mutfak & Hazırlık",
    image: "/images/interior_7.png",
    desc: "Taş fırınımızın kızgın odun ateşinde kabaran çıtır pidelerimizin ve sıcak lavaşlarımızın hazırlandığı fırın köşemiz.",
  },
  {
    id: "g-8",
    title: "Gurme Mutfak ve Şefin Sunum Alanı",
    category: "Mutfak & Hazırlık",
    image: "/images/interior_8.png",
    desc: "Usta şeflerimizin tabaklarımızı son dokunuşlarla sanat eserine dönüştürdüğü, yüksek hijyen standartlarındaki mutfağımız.",
  },
  {
    id: "g-9",
    title: "Loş ve Asil Akşam Yemeği Ambiyansı",
    category: "Mekan & Ambiyans",
    image: "/images/interior_9.png",
    desc: "Etiler'in elit atmosferine yakışır ahşap panel kaplamaları, özel tasarım şamdanlar ve dinlendirici akşam ambiyansımız.",
  },
];

export default function GalleryPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % GALERI_GÖRSELLERİ.length);
    }
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + GALERI_GÖRSELLERİ.length) % GALERI_GÖRSELLERİ.length
      );
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-32 pb-24 background text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Galeri Başlık */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold">GÖRSEL ŞÖLEN</span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold">Fotoğraf Galerisi</h1>
            <p className="text-sm text-muted">
              Sarıhan Gusto Etiler şubemizin otantik tasarımını, mutfaktaki özenli hazırlık süreçlerimizi ve ödüllü lezzetlerimizi editoryal sunumumuzla inceleyin.
            </p>
          </div>

          {/* Görsel Izgarası (Grid - Premium Fotoğraflar) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GALERI_GÖRSELLERİ.map((img, index) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedImageIndex(index)}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden border border-card-border cursor-pointer shadow-lg premium-hover"
                role="button"
                aria-label={`${img.title} görselini tam ekran görmek için tıklayın.`}
              >
                {/* Resim */}
                <img
                  src={img.image}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                
                {/* Overlay Açıklama ve Kategori */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] uppercase tracking-widest text-accent font-bold">
                    {img.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-foreground mt-1 leading-tight">
                    {img.title}
                  </h3>
                  <p className="text-[11px] text-muted mt-1 leading-relaxed">
                    {img.desc}
                  </p>
                </div>

                {/* Normal Durumda Başlık Barı (Loş/Zarif) */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background/90 via-background/60 to-transparent p-4 flex items-center justify-between group-hover:opacity-0 transition-opacity duration-300">
                  <div className="text-left">
                    <span className="text-[8px] uppercase tracking-widest text-accent font-bold">{img.category}</span>
                    <h4 className="font-serif text-sm font-bold text-foreground">{img.title}</h4>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <Compass className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
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
                  className="w-full max-w-4xl aspect-[16/10] rounded-3xl bg-card border border-card-border flex flex-col justify-end text-left relative overflow-hidden select-none cursor-grab active:cursor-grabbing shadow-2xl"
                >
                  <img
                    src={GALERI_GÖRSELLERİ[selectedImageIndex].image}
                    alt={GALERI_GÖRSELLERİ[selectedImageIndex].title}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent" />

                  {/* Detay Paneli */}
                  <div className="relative z-10 space-y-2 bg-background/90 backdrop-blur-md p-6 md:p-8 rounded-t-3xl border-t border-card-border shadow-lg">
                    <span className="text-xs uppercase tracking-widest text-accent font-bold">
                      {GALERI_GÖRSELLERİ[selectedImageIndex].category}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                      {GALERI_GÖRSELLERİ[selectedImageIndex].title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted leading-relaxed">
                      {GALERI_GÖRSELLERİ[selectedImageIndex].desc}
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

