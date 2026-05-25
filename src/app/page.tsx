// src/app/page.tsx
// Anasayfa Bileşeni — Sarıhan Gusto'nun premium mobile-first anasayfası.
// Hero alanı, "Anadolu Sıcaklığı" Bento Grid tasarımı, yerleşik Google Yorumları ve JSON-LD Yapılandırılmış Arama Şemalarını barındırır.

import Link from "next/link";
import Image from "next/image";
import { Star, Clock, Phone, MapPin, ArrowUpRight, Award, Compass, HeartHandshake } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CookieBanner from "@/components/ui/CookieBanner";
import { RESTORAN_BILGILERI } from "@/constants/restaurant";

export default function HomePage() {
  // Google Arama Sonuçları İçin Yapılandırılmış Veri Şeması (JSON-LD)
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Restaurant",
        "@id": "https://sarihan-gusto.com/#restaurant",
        "name": RESTORAN_BILGILERI.name,
        "image": "https://sarihan-gusto.com/images/hero.webp",
        "priceRange": "$$",
        "telephone": RESTORAN_BILGILERI.phoneRaw,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Nisbetiye Cad. No:109, Etiler, Beşiktaş",
          "addressLocality": "İstanbul",
          "addressRegion": "Beşiktaş",
          "postalCode": "34337",
          "addressCountry": "TR",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "41.0772",
          "longitude": "29.0289",
        },
        "url": "https://sarihan-gusto.com",
        "menu": "https://sarihan-gusto.com/menu",
        "servesCuisine": "Traditional Turkish Cuisine, Soup, Kebab",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
            "opens": "08:00",
            "closes": "02:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Friday", "Saturday"],
            "opens": "08:00",
            "closes": "04:00",
          },
        ],
      },
    ],
  };

  return (
    <>
      {/* Arama Motorları İçin JSON-LD Şeması */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <Navbar />

      <main className="flex-grow pt-20">
        {/* 1. HERO BÖLÜMÜ */}
        <section 
          className="relative min-h-[90vh] flex items-center bg-wood-dark overflow-hidden"
          aria-label="Sarıhan Gusto Karşılama Alanı"
        >
          {/* Soyut Anadolu Güneşi Desenli Arka Plan Katmanı */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.15),transparent_60%)] z-1" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(18,14,12,0.6),rgba(18,14,12,0.95))] z-1" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Sol: Metin İçeriği */}
            <div className="space-y-6 text-stone-cream text-left">
              <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full text-accent text-xs font-semibold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Nisbetiye Caddesi'nin Klasik Lezzeti</span>
              </div>
              <h1 className="font-serif text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight text-stone-light">
                Gelenekten Gelen <br />
                <span className="text-accent">Premium Tatlar</span>
              </h1>
              <p className="text-stone-cream/80 text-base md:text-lg leading-relaxed max-w-xl">
                Çeyrek asırlık Sarıhan tecrübesiyle, zırhla kıyılmış geleneksel kebaplardan, saatlerce demlenmiş şifa kaynağı çorbalara kadar tüm gurme lezzetleri, Anadolu sıcaklığıyla harmanlayıp kusursuz şekilde sunuyoruz.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <Link
                  href="/rezervasyon"
                  className="px-8 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider bg-accent text-wood-dark hover:bg-brand-gold-hover hover:scale-[1.02] shadow-lg shadow-accent/15 transition-all duration-300 text-center"
                  aria-label="Hızlı rezervasyon yapın"
                >
                  Masa Rezerve Et
                </Link>
                <Link
                  href="/menu"
                  className="px-8 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider bg-transparent border border-stone-cream/40 text-stone-cream hover:bg-stone-cream/10 hover:border-stone-light transition-all duration-300 text-center"
                  aria-label="Restoran menüsünü görüntüleyin"
                >
                  Menüyü Keşfet
                </Link>
              </div>
            </div>

            {/* Sağ: İkonik Kahraman Görseli */}
            <div className="relative aspect-square w-full max-w-[480px] mx-auto lg:max-w-none lg:h-[500px] rounded-3xl overflow-hidden border border-wood-amber shadow-2xl">
              {/* Buraya placeholder yerine şık bir soyut renk/fotoğraf geçişi katmanı yerleştiriyoruz */}
              <div className="absolute inset-0 bg-gradient-to-tr from-wood-dark via-wood-amber to-accent/20 flex flex-col justify-end p-8 text-stone-cream">
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-accent/25 backdrop-blur-sm border border-accent/40 flex items-center justify-center text-accent">
                  <Compass className="w-6 h-6 animate-pulse" />
                </div>
                <div className="bg-wood-dark/80 backdrop-blur-md p-6 rounded-2xl border border-wood-amber">
                  <span className="text-[10px] uppercase tracking-widest text-accent font-bold">Özel Çorbalarımız</span>
                  <h3 className="font-serif text-2xl font-bold mt-1 text-stone-light">Kelle Paça & Kral İşkembe</h3>
                  <p className="text-xs text-stone-cream/70 mt-2">
                    Geleneksel saray usulü baharatlar ve hakiki manda tereyağı eşliğinde hazırlanan eşsiz şifa kaynakları.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ANADOLU SICAKLIĞI BENTO GRID ALANI */}
        <section 
          className="py-24 bg-background border-t border-card-border"
          aria-label="Sarıhan Gusto Bento Deneyimi"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold">Lezzet & Konsept</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold">Anadolu Sıcaklığı Etiler'de</h2>
              <p className="text-sm text-muted">
                Her bir detayını premium konseptimizle ilmek ilmek dokuduğumuz bento yerleşiminde gastronomik felsefemizi keşfedin.
              </p>
            </div>

            {/* Bento Grid Yapısı */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[220px]">
              
              {/* Kart 1: Kebaplar (Büyük Kart) */}
              <div className="md:col-span-2 md:row-span-2 rounded-3xl bg-card border border-card-border p-8 flex flex-col justify-between overflow-hidden relative group premium-hover">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-wood-dark/40 group-hover:scale-105 transition-all duration-500" />
                <div className="relative z-10 flex justify-between items-start">
                  <span className="text-xs uppercase tracking-wider font-bold text-accent">Geleneksel Kıyım</span>
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <div className="relative z-10 space-y-2 text-left">
                  <h3 className="font-serif text-3xl font-extrabold text-stone-light md:text-4xl">Zırh Kebabı & Kebaplar</h3>
                  <p className="text-sm text-stone-cream/90 max-w-lg leading-relaxed">
                    Eti hiçbir makine değdirmeden, sadece usta ellerde zırh ile kıyarak kömür ateşinde ağır ağır pişiriyoruz. Gerçek kebap deneyimi.
                  </p>
                  <Link 
                    href="/menu" 
                    className="inline-flex items-center space-x-1 text-xs font-semibold uppercase tracking-wider text-accent pt-2 hover:underline focus:outline-none"
                  >
                    <span>Kebapları Gör</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Kart 2: Çalışma Saatleri (Küçük Kart) */}
              <div className="rounded-3xl bg-card border border-card-border p-6 flex flex-col justify-between text-left premium-hover">
                <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold">Çalışma Saatleri</h3>
                  <p className="text-xs text-muted leading-relaxed">
                    Haftanın 7 günü, Etiler'de 08:00 - 02:00 saatleri arasında kesintisiz hizmet. (Cuma - Cmt 04:00'e kadar açığız).
                  </p>
                </div>
              </div>

              {/* Kart 3: Telefon & WhatsApp İletişim */}
              <div className="rounded-3xl bg-accent text-wood-dark p-6 flex flex-col justify-between text-left premium-hover relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.15),transparent)]" />
                <div className="w-10 h-10 rounded-full bg-wood-dark/10 flex items-center justify-center text-wood-dark">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1 relative z-10">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-wood-dark/70">Tek Tıkla Ulaşın</span>
                  <h3 className="font-serif text-lg font-bold">Rezervasyon & Sipariş</h3>
                  <a
                    href={`tel:${RESTORAN_BILGILERI.phoneRaw}`}
                    className="text-base font-extrabold block hover:underline"
                    aria-label={`Sarıhan Gusto Arama Yap: ${RESTORAN_BILGILERI.phone}`}
                  >
                    {RESTORAN_BILGILERI.phone}
                  </a>
                </div>
              </div>

              {/* Kart 4: Google Yorumları (GMB - Bento) */}
              <div className="md:col-span-3 rounded-3xl bg-card border border-card-border p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-left premium-hover">
                <div className="space-y-3 max-w-xl">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                    ))}
                    <span className="text-sm font-extrabold text-foreground ml-2">4.8 / 5.0</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold">Misafirlerimizin Gözünden Biz</h3>
                  <p className="text-xs text-muted leading-relaxed">
                    "Etiler'deki en iyi kelle paça çorbası ve zırh kebabı burada. Ortamın Anadolu esintili koyu şık ahşap konsepti ve personelin olağanüstü misafirperverliği premium düzeyde."
                  </p>
                </div>
                <div className="shrink-0 flex flex-col items-center md:items-end justify-center">
                  <a
                    href={RESTORAN_BILGILERI.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-wood-dark text-stone-cream dark:bg-stone-cream dark:text-wood-dark px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:scale-105 transition-all duration-300 focus:outline-none"
                    aria-label="Google Haritalar'da tüm yorumları gör"
                  >
                    <span>Google'da İnceleyin</span>
                    <ArrowUpRight className="w-4 h-4 text-accent" />
                  </a>
                  <span className="text-[10px] text-muted mt-2">1,250+ Google Değerlendirmesi</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. TAAHHÜDÜMÜZ - PREMIUM GARANTİ */}
        <section className="py-20 bg-card border-t border-b border-card-border" aria-label="Hizmet Taahhüdümüz">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <MapPin className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-serif text-lg font-bold mb-2">Merkezi Konum</h3>
              <p className="text-xs text-muted leading-relaxed">
                Beşiktaş Etiler Nisbetiye Caddesi üzerinde, rahatça ulaşabileceğiniz ve valemizin bulunduğu kolay konum.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <HeartHandshake className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-serif text-lg font-bold mb-2">Misafirperverlik</h3>
              <p className="text-xs text-muted leading-relaxed">
                Geleneksel Türk misafirperverliğini şık, lüks ve konforlu premium hizmet standartlarıyla sunuyoruz.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Award className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-serif text-lg font-bold mb-2">Ödüllü Lezzet</h3>
              <p className="text-xs text-muted leading-relaxed">
                Her malzeme yöresinden taze gelir. Çorbalarımız ve etlerimiz hijyenik ve geleneksel koşullarda demlenir.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CookieBanner />
    </>
  );
}
