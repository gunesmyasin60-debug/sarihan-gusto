// src/app/page.tsx
// Anasayfa Bileşeni — Sarıhan Gusto'nun premium mobile-first anasayfası.
// Hero alanı, "Anadolu Sıcaklığı" Bento Grid tasarımı, yerleşik Google Yorumları ve JSON-LD Yapılandırılmış Arama Şemalarını barındırır.

import Link from "next/link";
// Handcrafted, premium gold SVG Icons to replace generic Lucide icons
const Star = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    <path d="M12 7.5L13.5 12L12 16.5L10.5 12Z" className="text-[#181210]" fill="currentColor" stroke="none" />
  </svg>
);

const Clock = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="8.5" strokeDasharray="1 3" opacity="0.5" />
    <path d="M12 6v6l4 2.5" />
    <circle cx="12" cy="12" r="0.8" fill="currentColor" />
  </svg>
);

const Phone = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 8c0-1.5 3-4 9-4s9 2.5 9 4c0 0.8-1 1.5-2.5 1.5S16 9 12 9s-4 .5-6.5.5S3 8.8 3 8z" />
    <path d="M9 7.5v3.5M15 7.5v3.5" />
    <path d="M5 18a1 1 0 001 1h12a1 1 0 001-1v-5H5v5z" />
    <path d="M5 13c0-2 2-3 7-3s7 1 7 3" />
    <circle cx="12" cy="15" r="3" />
    <circle cx="12" cy="13.5" r="0.5" fill="currentColor" />
    <circle cx="13.5" cy="15" r="0.5" fill="currentColor" />
    <circle cx="12" cy="16.5" r="0.5" fill="currentColor" />
    <circle cx="10.5" cy="15" r="0.5" fill="currentColor" />
  </svg>
);

const MapPin = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 21.5c-1-1-7.5-6.8-7.5-11.5a7.5 7.5 0 1115 0c0 4.7-6.5 10.5-7.5 11.5z" />
    <path d="M12 7.5L14 10l-2 2.5-2-2.5z" fill="currentColor" />
  </svg>
);

const ArrowUpRight = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6.5 17.5L17.5 6.5M10 6.5h7.5V14" />
    <circle cx="5" cy="19" r="0.75" fill="currentColor" />
  </svg>
);

const Award = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="11" r="5" />
    <circle cx="12" cy="11" r="3.5" strokeDasharray="1 1.5" />
    <path d="M10 15.5l-1.5 5.5 3.5-1.5 3.5 1.5-1.5-5.5" />
    <path d="M6 14a6.5 6.5 0 010-6M18 14a6.5 6.5 0 000-6" />
    <path d="M6 11c-.5-.3-1.2-.3-1.5.2M6 9c-.5-.3-1.2-.3-1.5.2" />
    <path d="M18 11c.5-.3 1.2-.3 1.5.2M18 9c.5-.3 1.2-.3 1.5.2" />
  </svg>
);

const HeartHandshake = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 14l3.5-3.5a1.5 1.5 0 012.1 0l1.4 1.4" />
    <path d="M21 10l-3.5 3.5a1.5 1.5 0 01-2.1 0l-2.9-2.9" />
    <path d="M10 11.9c.3-.3.8-.3 1.1 0l1 1c.3.3.3.8 0 1.1l-1 1" />
    <path d="M11.5 10.4c.3-.3.8-.3 1.1 0l1 1c.3.3.3.8 0 1.1" />
    <path d="M12 5c-1.5-2.5-5.5-2.5-7 0-1.5 2.5 1.5 7 7 11.5 5.5-4.5 8.5-9 7-11.5-1.5-2.5-5.5-2.5-7 0z" strokeDasharray="1.5 2" opacity="0.4" />
  </svg>
);

const Check = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7.5 12.5l3 3 6.5-6.5" />
    <circle cx="6.5" cy="11.5" r="0.5" fill="currentColor" />
  </svg>
);
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CookieBanner from "@/components/ui/CookieBanner";
import HealingSection from "@/components/ui/HealingSection";
import { RESTORAN_BILGILERI } from "@/constants/restaurant";

// Handcrafted minimal gold ornament separator
const GoldOrnament = () => (
  <div className="flex items-center justify-center space-x-4 py-3 select-none" aria-hidden="true">
    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-accent/40" />
    <svg className="w-3.5 h-3.5 text-accent/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M12 2L2 12l10 10 10-10L12 2z" fill="currentColor" fillOpacity="0.1" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
    <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-accent/40" />
  </div>
);

// Handdrawn-style gold flourish ornament for overlapping corners
const GoldFlourish = ({ className }: { className?: string }) => (
  <svg 
    className={`w-16 h-16 text-accent/25 pointer-events-none select-none ${className}`} 
    viewBox="0 0 100 100" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="0.75"
    aria-hidden="true"
  >
    <path d="M10 90 C 25 80, 50 55, 60 20" strokeDasharray="2 2" />
    <path d="M60 20 C 56 28, 44 36, 28 40 C 40 32, 52 24, 60 20 Z" fill="currentColor" fillOpacity="0.08" />
    <path d="M60 20 C 64 28, 76 36, 92 40 C 80 32, 68 24, 60 20 Z" fill="currentColor" fillOpacity="0.08" />
    <path d="M44 50 C 40 54, 28 58, 16 60 C 26 56, 38 52, 44 50 Z" fill="currentColor" fillOpacity="0.08" />
    <path d="M52 36 C 54 42, 60 48, 72 52 C 62 48, 56 42, 52 36 Z" fill="currentColor" fillOpacity="0.08" />
    <circle cx="60" cy="20" r="1.5" fill="currentColor" />
  </svg>
);

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
          className="relative min-h-[90vh] flex items-center bg-background overflow-hidden"
          aria-label="Sarıhan Gusto Karşılama Alanı"
        >
          {/* Elegant Background Watermark for Hero */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[26rem] md:text-[40rem] font-serif font-extralight text-accent/[0.015] select-none pointer-events-none leading-none z-0 hidden md:block">
            S
          </div>

          {/* Arka Plan Video Katmanı (PC'de Aktif, Mobilde Gizli) */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hidden md:block absolute inset-0 w-full h-full object-cover z-0 opacity-30 pointer-events-none"
            aria-hidden="true"
          >
            <source src="/videos/kebap_hero.mp4" type="video/mp4" />
          </video>

          {/* Arka Plan Statik Görsel Katmanı (Mobilde Aktif, PC'de Gizli) */}
          <img
            src="/images/kebap_hero_mobile.png"
            alt="Sarıhan Gusto Kebap Ocakbaşı"
            className="block md:hidden absolute inset-0 w-full h-full object-cover z-0 opacity-65 pointer-events-none"
            aria-hidden="true"
          />

          {/* Soyut Anadolu Güneşi Desenli Arka Plan Katmanı (Bal Altını Rengi) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(217,156,61,0.15),transparent_60%)] z-1" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(24,18,16,0.3),rgba(24,18,16,0.9))] z-1" />
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 md:py-36 text-center">
            {/* Merkezileştirilmiş Metin İçeriği */}
            <div className="space-y-8 text-foreground flex flex-col items-center">
              <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 px-4 py-1.5 rounded-full text-accent text-xs font-semibold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Nisbetiye Caddesi'nin Klasik Lezzeti</span>
              </div>
              <h1 className="font-serif text-5xl md:text-8xl font-extrabold leading-[1.1] tracking-tight">
                Ateşten ve Demden <br />
                <span className="font-serif italic font-normal tracking-wide text-accent/90">Asil</span> Gastronomi
              </h1>
              <GoldOrnament />
              <p className="text-muted text-base md:text-xl leading-relaxed max-w-2xl mx-auto">
                Çeyrek asırlık Sarıhan tecrübesiyle, zırhla kıyılmış geleneksel kebaplardan, saatlerce demlenmiş şifa kaynağı çorbalara kadar tüm gurme lezzetleri, Anadolu sıcaklığıyla harmanlayıp kusursuz şekilde sunuyoruz.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
                <Link
                  href="/rezervasyon"
                  className="px-10 py-4 rounded-full text-sm font-semibold uppercase tracking-wider bg-accent text-wood-dark hover:bg-brand-gold-hover hover:scale-[1.02] shadow-lg shadow-accent/15 transition-all duration-300 text-center cursor-pointer w-full sm:w-auto"
                  aria-label="Hızlı rezervasyon yapın"
                >
                  Masa Ayır
                </Link>
                <Link
                  href="/menu"
                  className="px-10 py-4 rounded-full text-sm font-semibold uppercase tracking-wider bg-transparent border border-card-border text-foreground hover:bg-card hover:border-accent transition-all duration-300 text-center cursor-pointer w-full sm:w-auto"
                  aria-label="Restoran menüsünü görüntüleyin"
                >
                  Menüyü Keşfet
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ANADOLU SICAKLIĞI DENEYİMİ ALANI */}
        <section 
          className="py-24 bg-background border-t border-card-border relative overflow-hidden"
          aria-label="Sarıhan Gusto Deneyimi"
        >
          {/* Massive artistic background watermark */}
          <div className="absolute -right-24 top-1/2 -translate-y-1/2 text-[26rem] font-serif font-extralight text-accent/[0.015] select-none pointer-events-none z-0 hidden lg:block leading-none">
            G
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] text-accent/80 font-bold block mb-1">Lezzet & Konsept</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight">
                Anadolu <span className="font-serif italic font-normal text-accent/90">Sıcaklığı</span> Etiler&apos;de
              </h2>
              <GoldOrnament />
              <p className="text-sm text-muted">
                Her bir detayını premium konseptimizle ilmek ilmek dokuduğumuz modern editoryal yerleşiminde gastronomik felsefemizi keşfedin.
              </p>
            </div>

            {/* Kebaplar Showcase ve Bilgiler (Bespoke Tasarım) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Sol taraf: Kebaplar Showcase Kartı - Asymmetric Shift and Overlap */}
              <div className="lg:col-span-8 rounded-3xl bg-card border border-card-border p-8 md:p-12 flex flex-col justify-between overflow-hidden relative group premium-hover ember-glow min-h-[350px] lg:-translate-y-4 lg:hover:-translate-y-6 transition-all duration-500 z-10 shadow-2xl">
                {/* Gold Laurel corner flourishes */}
                <GoldFlourish className="absolute -top-4 -left-4 rotate-90 opacity-40 group-hover:opacity-75 transition-opacity duration-300" />
                <GoldFlourish className="absolute -bottom-4 -right-4 -rotate-90 opacity-40 group-hover:opacity-75 transition-opacity duration-300" />
                
                {/* Zırh Kebabı Arka Plan Resmi ve Karartma Maskesi */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="/images/kebab.png"
                    alt="Zırh Kebabı"
                    className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/80 to-transparent" />
                </div>
                <div className="relative z-10 flex justify-between items-start">
                  <span className="text-xs uppercase tracking-wider font-bold text-accent">Geleneksel Kıyım</span>
                  <Award className="w-6 h-6 text-accent animate-pulse" />
                </div>
                <div className="relative z-10 space-y-3 text-left">
                  <h3 className="font-serif text-3xl font-extrabold text-foreground md:text-4xl">Zırh Kebabı & Kebaplar</h3>
                  <p className="text-sm text-muted max-w-xl leading-relaxed">
                    Eti hiçbir makine değdirmeden, sadece usta ellerde zırh ile kıyarak kömür ateşinde ağır ağır pişiriyoruz. Gerçek kebap deneyimini, aydınlık ve ferah ambiyansımızda sunuyoruz.
                  </p>
                  <div className="pt-2">
                    <Link 
                      href="/menu" 
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-accent border-b border-accent/25 pb-1 hover:border-accent transition-all duration-300"
                    >
                      <span>Kebapları Gör</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sağ taraf: Çalışma Saatleri & Masa Rezervasyon (Clean, Cardless Typography) - Offset and elegant margins */}
              <div className="lg:col-span-4 flex flex-col justify-between gap-8 py-4 lg:pl-6 text-left relative z-10">
                
                {/* Çalışma Saatleri (Bespoke Typography) */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-accent">
                    <Clock className="w-5 h-5" />
                    <span className="text-xs uppercase tracking-[0.15em] font-bold">Çalışma Saatleri</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-foreground">Haftanın 7 Günü</h3>
                  <p className="text-xs text-muted leading-relaxed max-w-sm">
                    Etiler Nisbetiye Caddesi'nde her gün **08:00 - 02:00** saatleri arasında kesintisiz hizmetinizdeyiz. 
                    <br />
                    <span className="text-accent font-semibold">(Cuma ve Cumartesi günleri 04:00'e kadar açığız).</span>
                  </p>
                </div>

                {/* Masa Rezervasyonu (Bespoke Typography) */}
                <div className="space-y-3 border-t border-card-border/50 pt-8">
                  <div className="flex items-center space-x-2 text-accent">
                    <Phone className="w-5 h-5" />
                    <span className="text-xs uppercase tracking-[0.15em] font-bold">Masa Rezervasyonu</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-foreground">Hemen Yer Ayırın</h3>
                  <p className="text-xs text-muted leading-relaxed max-w-sm">
                    Sevdiklerinizle geçireceğiniz özel anlar ve iş yemekleriniz için tek tıkla masanızı ayırtın:
                  </p>
                  <a
                    href={`tel:${RESTORAN_BILGILERI.phoneRaw}`}
                    className="text-3xl font-serif font-extrabold text-accent hover:text-brand-gold-hover hover:scale-[1.01] transition-all duration-300 block pt-1"
                    aria-label={`Sarıhan Gusto Arama Yap: ${RESTORAN_BILGILERI.phone}`}
                  >
                    {RESTORAN_BILGILERI.phone}
                  </a>
                </div>

              </div>

            </div>
          </div>
        </section>

        <HealingSection />

        {/* 3. HİKAYEMİZ & LEZZET YOLCULUĞU (Alternating Split / Zikzak Düzen) */}
        <section 
          className="py-24 bg-background border-t border-card-border overflow-hidden relative"
          aria-label="Sarıhan Gusto Lezzet Hikayesi"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 relative z-10">
            
            {/* Bölüm Başlığı */}
            <div className="text-center max-w-2xl mx-auto space-y-3 relative z-10">
              <span className="text-xs uppercase tracking-[0.2em] text-accent/80 font-bold block mb-1">Bir Sarıhan Geleneği</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight">
                Lezzetimizin <span className="font-serif italic font-normal text-accent/90">Asırlık</span> Sırrı
              </h2>
              <GoldOrnament />
              <p className="text-sm text-muted">
                Her tabağın arkasında yatan deneyim, sabır ve tutkuyla örülmüş özgün hikayemiz.
              </p>
            </div>

            {/* Alternatif Satır 1: Kebabın Ustalığı (Görsel Sağda, Metin Solda) */}
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              {/* Massive background watermark letter */}
              <div className="absolute -left-16 top-1/2 -translate-y-1/2 text-[22rem] font-serif font-extralight text-accent/[0.015] select-none pointer-events-none z-0 hidden lg:block leading-none">
                S
              </div>
              
              {/* Sol Sütun: Metin Bilgisi */}
              <div className="lg:col-span-6 space-y-6 text-left relative z-10">
                <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full text-accent text-xs font-semibold uppercase tracking-wider">
                  <span>Usta Ellerin Sanatı</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
                  Zırh ile Kıyılan <br />
                  <span className="font-serif italic font-normal text-accent/90">Eşsiz</span> Kebaplar
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Gerçek bir Adana kebabı yüksek ustalık ve sadakat gerektirir. Etlerimiz, hiçbir metal makine teması olmaksızın, tamamen geleneksel yöntemlerle usta ellerde masif zırh bıçakları kullanılarak kıyılır. Özel baharat formülümüz ve taze kuyruk yağıyla harmanlanan harç, meşe odunu kömürünün asil kor ateşinde yavaş yavaş demlenerek pişirilir.
                </p>
                
                <ul className="space-y-3 pt-2">
                  <li className="flex items-center space-x-3 text-sm text-muted">
                    <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <span>%100 Yerli ve Dinlendirilmiş Premium Etler</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-muted">
                    <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <span>Makinesiz, Geleneksel Masif Zırh Kıyımı</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-muted">
                    <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <span>Meşe Kömürünün Közünde İdeal Kıvamda Pişirme</span>
                  </li>
                </ul>

                <div className="pt-4">
                  <Link
                    href="/menu"
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-accent border-b border-accent/30 pb-1 hover:border-accent transition-all duration-300"
                  >
                    <span>Kebap Menüsünü İnceleyin</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Sağ Sütun: Görsel Alanı */}
              <div className="lg:col-span-6 relative h-[320px] md:h-[420px] w-full rounded-3xl overflow-hidden border border-card-border shadow-2xl group premium-hover lg:translate-x-6 lg:-translate-y-4 transition-all duration-500 z-10">
                {/* Gold Laurel flourishes absolute inside the image card */}
                <GoldFlourish className="absolute -top-4 -left-4 rotate-90 opacity-30 group-hover:opacity-75 transition-opacity duration-300" />
                <GoldFlourish className="absolute -bottom-4 -right-4 -rotate-90 opacity-30 group-hover:opacity-75 transition-opacity duration-300" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#181210]/60 via-transparent to-transparent z-10" />
                <img 
                  src="/images/kebab.png" 
                  alt="Zırh Kebabı Ustalığı" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-6 left-6 z-20 bg-background/90 backdrop-blur-sm border border-card-border px-4 py-2 rounded-2xl">
                  <span className="text-[10px] uppercase tracking-widest font-extrabold text-accent">Köz Ateşinden Tabağa</span>
                </div>
              </div>
            </div>

            {/* Alternatif Satır 2: Ağır Ateş Çorbaları (Görsel Solda, Metin Sağda) */}
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              {/* Massive background watermark letter */}
              <div className="absolute -right-16 top-1/2 -translate-y-1/2 text-[22rem] font-serif font-extralight text-accent/[0.015] select-none pointer-events-none z-0 hidden lg:block leading-none">
                G
              </div>

              {/* Sol Sütun: Görsel Alanı (Masaüstünde solda olması için order-last lg:order-first olarak ayarlandı, mobilde önce görsel gelir) */}
              <div className="lg:col-span-6 lg:order-first order-last relative h-[320px] md:h-[420px] w-full rounded-3xl overflow-hidden border border-card-border shadow-2xl group premium-hover lg:-translate-x-6 lg:-translate-y-4 transition-all duration-500 z-10">
                {/* Gold Laurel flourishes absolute inside the image card */}
                <GoldFlourish className="absolute -top-4 -left-4 rotate-90 opacity-30 group-hover:opacity-75 transition-opacity duration-300" />
                <GoldFlourish className="absolute -bottom-4 -right-4 -rotate-90 opacity-30 group-hover:opacity-75 transition-opacity duration-300" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#181210]/60 via-transparent to-transparent z-10" />
                <img 
                  src="/images/soup.png" 
                  alt="Şifa Kaynağı Çorbalar" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-6 left-6 z-20 bg-background/90 backdrop-blur-sm border border-card-border px-4 py-2 rounded-2xl">
                  <span className="text-[10px] uppercase tracking-widest font-extrabold text-accent">8 Saatlik Eşsiz Demleme</span>
                </div>
              </div>

              {/* Sağ Sütun: Metin Bilgisi */}
              <div className="lg:col-span-6 space-y-6 text-left relative z-10">
                <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full text-accent text-xs font-semibold uppercase tracking-wider">
                  <span>Asırlık Şifa Geleneği</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
                  Ağır Ateşte Demlenen <br />
                  <span className="font-serif italic font-normal text-accent/90">Şifa Kaynağı</span> Çorbalar
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Gurme lezzet yolculuğumuzun en narin parçası çorbalarımızdır. Özenle seçilmiş kelle, paça ve ilikli kemik suları, usta şeflerimizin gözetiminde tam 8 saat boyunca en kısık ateşte demlenerek kaynatılır. Restoranımızın asil ortamında, dumanı tüten bir şifa kasesiyle güne başlamanın veya geceyi sonlandırmanın tadı başkadır.
                </p>
                
                <ul className="space-y-3 pt-2">
                  <li className="flex items-center space-x-3 text-sm text-muted">
                    <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <span>Katkısız, Tamamen Doğal İlikli Kemik Suyu</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-muted">
                    <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <span>Özel Soslar ve Taze Sarımsak-Limon Terbiyesi</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-muted">
                    <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <span>Günün Her Saati Taze ve Sıcak Sunum</span>
                  </li>
                </ul>

                <div className="pt-4">
                  <Link
                    href="/menu"
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-accent border-b border-accent/30 pb-1 hover:border-accent transition-all duration-300"
                  >
                    <span>Çorba Çeşitlerimizi Keşfedin</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Alternatif Satır 3: Seçkin Ambiyans (Görsel Sağda, Metin Solda) */}
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              {/* Massive background watermark letter */}
              <div className="absolute -left-16 top-1/2 -translate-y-1/2 text-[22rem] font-serif font-extralight text-accent/[0.015] select-none pointer-events-none z-0 hidden lg:block leading-none">
                A
              </div>

              {/* Sol Sütun: Metin Bilgisi */}
              <div className="lg:col-span-6 space-y-6 text-left relative z-10">
                <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full text-accent text-xs font-semibold uppercase tracking-wider">
                  <span>Nisbetiye'nin Asil Ambiyansı</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
                  Mum Işığında Lüks ve <br />
                  <span className="font-serif italic font-normal text-accent/90">Konforlu</span> Akşamlar
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Sarıhan Gusto Etiler, sadece gastronomik bir ziyafet değil, aynı zamanda gözlerinizi ve ruhunuzu dinlendiren lüks bir kaçış noktasıdır. Premium maun ahşap kaplamalarımız, dinlendirici mum ışıkları ve usta mimari dokunuşlarımız, size ve sevdiklerinize unutulmaz ve seçkin bir akşam yemeği atmosferi hazırlar.
                </p>
                
                <ul className="space-y-3 pt-2">
                  <li className="flex items-center space-x-3 text-sm text-muted">
                    <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <span>Etiler Nisbetiye Caddesi'nde Seçkin Lokasyon</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-muted">
                    <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <span>İş Yemekleri ve Özel Davetler İçin VIP Salonlar</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-muted">
                    <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <span>Valet Parking ve Kusursuz Karşılama Hizmeti</span>
                  </li>
                </ul>

                <div className="pt-4">
                  <Link
                    href="/rezervasyon"
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-accent border-b border-accent/30 pb-1 hover:border-accent transition-all duration-300"
                  >
                    <span>Hemen Rezervasyon Yapın</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Sağ Sütun: Görsel Alanı */}
              <div className="lg:col-span-6 relative h-[320px] md:h-[420px] w-full rounded-3xl overflow-hidden border border-card-border shadow-2xl group premium-hover lg:translate-x-6 lg:-translate-y-4 transition-all duration-500 z-10">
                {/* Gold Laurel flourishes absolute inside the image card */}
                <GoldFlourish className="absolute -top-4 -left-4 rotate-90 opacity-30 group-hover:opacity-75 transition-opacity duration-300" />
                <GoldFlourish className="absolute -bottom-4 -right-4 -rotate-90 opacity-30 group-hover:opacity-75 transition-opacity duration-300" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#181210]/60 via-transparent to-transparent z-10" />
                <img 
                  src="/images/ambiance.png" 
                  alt="Lüks Restoran Ambiyansı" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-6 left-6 z-20 bg-background/90 backdrop-blur-sm border border-card-border px-4 py-2 rounded-2xl">
                  <span className="text-[10px] uppercase tracking-widest font-extrabold text-accent">Nezih & Prestijli Yaşam</span>
                </div>
              </div>
            </div>

            {/* Alternatif Satır 4: Taş Fırın & Pide (Görsel Solda, Metin Sağda) */}
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              {/* Massive background watermark letter */}
              <div className="absolute -right-16 top-1/2 -translate-y-1/2 text-[22rem] font-serif font-extralight text-accent/[0.015] select-none pointer-events-none z-0 hidden lg:block leading-none">
                F
              </div>

              {/* Sol Sütun: Görsel Alanı */}
              <div className="lg:col-span-6 lg:order-first order-last relative h-[320px] md:h-[420px] w-full rounded-3xl overflow-hidden border border-card-border shadow-2xl group premium-hover lg:-translate-x-6 lg:-translate-y-4 transition-all duration-500 z-10">
                {/* Gold Laurel flourishes absolute inside the image card */}
                <GoldFlourish className="absolute -top-4 -left-4 rotate-90 opacity-30 group-hover:opacity-75 transition-opacity duration-300" />
                <GoldFlourish className="absolute -bottom-4 -right-4 -rotate-90 opacity-30 group-hover:opacity-75 transition-opacity duration-300" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#181210]/60 via-transparent to-transparent z-10" />
                <img 
                  src="/images/pide_oven.png" 
                  alt="Taş Fırın & Pide Lezzetleri" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-6 left-6 z-20 bg-background/90 backdrop-blur-sm border border-card-border px-4 py-2 rounded-2xl">
                  <span className="text-[10px] uppercase tracking-widest font-extrabold text-accent">Odun Ateşinde Taş Fırın</span>
                </div>
              </div>

              {/* Sağ Sütun: Metin Bilgisi */}
              <div className="lg:col-span-6 space-y-6 text-left relative z-10">
                <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full text-accent text-xs font-semibold uppercase tracking-wider">
                  <span>Geleneksel Odun Ateşi</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
                  Taş Fırından Çıtır <br />
                  <span className="font-serif italic font-normal text-accent/90">Pide &amp; Lahmacunlar</span>
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Sarıhan Gusto fırın ustaları, el açması incecik hamurları taş fırınımızın kızgın odun ateşinde pişirerek gerçek taş fırın lezzetini sofranıza getirir. Karadeniz köy tereyağı, özel kuzu kavurması ve eriyen kaşar peyniriyle hazırlanan çıtır pidelerimiz ve lahmacunlarımız, fırından yeni çıkmış sıcacık dumanıyla iştah kabartır.
                </p>
                
                <ul className="space-y-3 pt-2">
                  <li className="flex items-center space-x-3 text-sm text-muted">
                    <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <span>Geleneksel Odun Ateşiyle Isıtılan Kubbeli Taş Fırın</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-muted">
                    <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <span>Karadeniz'den Gelen Hakiki Yayla Köy Tereyağı</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-muted">
                    <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <span>İncecik Çıtır Hamur ve Bol Taze Malzemeli İç Harç</span>
                  </li>
                </ul>

                <div className="pt-4">
                  <Link
                    href="/menu"
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-accent border-b border-accent/30 pb-1 hover:border-accent transition-all duration-300"
                  >
                    <span>Pide Çeşitlerimizi İnceleyin</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Alternatif Satır 5: Geleneksel Tatlılar (Görsel Sağda, Metin Solda) */}
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              {/* Massive background watermark letter */}
              <div className="absolute -left-16 top-1/2 -translate-y-1/2 text-[22rem] font-serif font-extralight text-accent/[0.015] select-none pointer-events-none z-0 hidden lg:block leading-none">
                T
              </div>

              {/* Sol Sütun: Metin Bilgisi */}
              <div className="lg:col-span-6 space-y-6 text-left relative z-10">
                <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full text-accent text-xs font-semibold uppercase tracking-wider">
                  <span>Saray Usulü Tatlı Şöleni</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
                  Fıstıklı Katmer &amp; <br />
                  <span className="font-serif italic font-normal text-accent/90">Geleneksel</span> Tatlılar
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Yemek ziyafetini lüks bir şölenle sonlandırmak isteyen gurmeler için tatlılarımız birer başyapıttır. İncecik el açması hamurun arasına bolca serpiştirilen taze Antep fıstıkları ve hakiki manda kaymağıyla hazırlanan çıtır katmerimiz ile taş fırında nar gibi kızarmış Hamsiköy fırın sütlacımız, damaklarda unutulmaz izler bırakır.
                </p>
                
                <ul className="space-y-3 pt-2">
                  <li className="flex items-center space-x-3 text-sm text-muted">
                    <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <span>Hakiki Manda Kaymağı ve Bol Coğrafi İşaretli Antep Fıstığı</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-muted">
                    <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <span>Hamsiköy Usulü Taş Fırında Fırınlanmış Sütlaç</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-muted">
                    <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <span>Her Gün Taze Hazırlanan ve Sıcak Sunulan Tatlı Seçenekleri</span>
                  </li>
                </ul>

                <div className="pt-4">
                  <Link
                    href="/menu"
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-accent border-b border-accent/30 pb-1 hover:border-accent transition-all duration-300"
                  >
                    <span>Tatlı Çeşitlerimizi Keşfedin</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Sağ Sütun: Görsel Alanı */}
              <div className="lg:col-span-6 relative h-[320px] md:h-[420px] w-full rounded-3xl overflow-hidden border border-card-border shadow-2xl group premium-hover lg:translate-x-6 lg:-translate-y-4 transition-all duration-500 z-10">
                {/* Gold Laurel flourishes absolute inside the image card */}
                <GoldFlourish className="absolute -top-4 -left-4 rotate-90 opacity-30 group-hover:opacity-75 transition-opacity duration-300" />
                <GoldFlourish className="absolute -bottom-4 -right-4 -rotate-90 opacity-30 group-hover:opacity-75 transition-opacity duration-300" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#181210]/60 via-transparent to-transparent z-10" />
                <img 
                  src="/images/katmer_dessert.png" 
                  alt="Geleneksel Katmer & Sütlaç Tatlıları" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-6 left-6 z-20 bg-background/90 backdrop-blur-sm border border-card-border px-4 py-2 rounded-2xl">
                  <span className="text-[10px] uppercase tracking-widest font-extrabold text-accent">Taze & Eşsiz Malzemeler</span>
                </div>
              </div>
            </div>

            {/* Alternatif Satır 6: Misafir Yorumları (Yorum Kartları Solda, Açıklama Sağda - Zikzak Konsepti) */}
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center border-t border-card-border/50 pt-20">
              {/* Massive background watermark letter */}
              <div className="absolute -right-16 top-1/2 -translate-y-1/2 text-[22rem] font-serif font-extralight text-accent/[0.015] select-none pointer-events-none z-0 hidden lg:block leading-none">
                Y
              </div>

              {/* Sol Sütun: Gerçek Google Yorumları Grid/Stack (Masaüstünde solda, mobilde önce gelir) - Asymmetric off-grid card displacements */}
              <div className="lg:col-span-6 space-y-6 lg:order-first order-last relative z-10">
                {/* Yorum 1 - Normal layout */}
                <div className="bg-card/45 border border-card-border/60 backdrop-blur-sm p-6 rounded-2xl relative shadow-md hover:scale-[1.01] transition-all duration-300 text-left">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-sm text-foreground">Murat Kaya</span>
                    <div className="flex space-x-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-accent fill-accent" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    "Yıllardır Sarıhan kalitesini bilirim ama Etiler şubesi ambiyansıyla seviyeyi apayrı bir boyuta taşımış. Kelle paça çorbası ve zırh kebabı tam anlamıyla kusursuz. Servis hızı ve personelin kibarlığı muazzam."
                  </p>
                  <span className="text-[9px] text-muted/60 block mt-2">Google Maps Değerlendirmesi</span>
                </div>

                {/* Yorum 2 - Offset to the right */}
                <div className="bg-card/45 border border-card-border/60 backdrop-blur-sm p-6 rounded-2xl relative shadow-md lg:translate-x-10 hover:scale-[1.01] lg:hover:translate-x-12 transition-all duration-500 text-left">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-sm text-foreground">Selin Demir</span>
                    <div className="flex space-x-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-accent fill-accent" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    "Ege esintili dekorasyonu çok ferah ve lüks hissettiriyor. Çorbaların terbiyesi tam kıvamında ve içimi çok yumuşak. Fırından yeni çıkmış sıcak pideleri ve Antep katmeri kesinlikle denenmeli."
                  </p>
                  <span className="text-[9px] text-muted/60 block mt-2">Google Maps Değerlendirmesi</span>
                </div>

                {/* Yorum 3 - Offset slightly to the left */}
                <div className="bg-card/45 border border-card-border/60 backdrop-blur-sm p-6 rounded-2xl relative shadow-md lg:-translate-x-6 hover:scale-[1.01] lg:hover:-translate-x-8 transition-all duration-500 text-left">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-sm text-foreground">Dr. Ahmet Şahin</span>
                    <div className="flex space-x-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-accent fill-accent" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    "Nisbetiye'nin en nezih ocakbaşı ve çorba restoranı. Hijyen standartları son derece yüksek, malzemelerin tazeliği her tatta kendini belli ediyor. Valeden karşılama ekibine kadar profesyonel bir kadro."
                  </p>
                  <span className="text-[9px] text-muted/60 block mt-2">Google Maps Değerlendirmesi</span>
                </div>
              </div>

              {/* Sağ Sütun: Metin Bilgisi */}
              <div className="lg:col-span-6 space-y-6 text-left relative z-10">
                <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full text-accent text-xs font-semibold uppercase tracking-wider">
                  <span>Misafirlerimizin Gözünden</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
                  Sarıhan Deneyimini <br />
                  <span className="font-serif italic font-normal text-accent/90">Taçlandıran</span> Yorumlar
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Sarıhan Gusto olarak, geleneksel Türk gastronomi mirasını lüks ve konforlu Etiler şubemizde sunarken en büyük motivasyonumuz misafirlerimizin memnuniyetidir. Google Haritalar üzerindeki 1.250'den fazla değerlendirmede yakaladığımız 4.8 memnuniyet skoru, detaylara verdiğimiz önemin ve lezzet tutkumuzun en somut kanıtıdır.
                </p>

                <div className="flex items-center space-x-4 py-2">
                  <div className="text-center bg-card border border-card-border px-5 py-3 rounded-2xl">
                    <span className="text-2xl font-serif font-extrabold text-accent block">4.8</span>
                    <span className="text-[10px] text-muted">Google Skoru</span>
                  </div>
                  <div className="text-center bg-card border border-card-border px-5 py-3 rounded-2xl">
                    <span className="text-2xl font-serif font-extrabold text-accent block">1,250+</span>
                    <span className="text-[10px] text-muted">Toplam Yorum</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={RESTORAN_BILGILERI.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-accent border-b border-accent/30 pb-1 hover:border-accent transition-all duration-300"
                  >
                    <span>Google'da Tüm Yorumları İnceleyin</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. TAAHHÜDÜMÜZ - PREMIUM GARANTİ */}
        <section className="py-20 bg-card border-t border-b border-card-border relative overflow-hidden" aria-label="Hizmet Taahhüdümüz">
          {/* Subtle background graphic line */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-card-border/40 to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* Card 1 - Slightly shifted up */}
            <div className="flex flex-col items-center text-center p-6 bg-background/30 border border-card-border/40 rounded-2xl backdrop-blur-sm lg:-translate-y-3 hover:-translate-y-4 transition-all duration-300">
              <MapPin className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-serif text-lg font-bold mb-2 tracking-wide text-foreground">
                Merkezi <span className="font-serif italic font-normal text-accent/90">Konum</span>
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Beşiktaş Etiler Nisbetiye Caddesi üzerinde, rahatça ulaşabileceğiniz ve valemizin bulunduğu kolay konum.
              </p>
            </div>
            
            {/* Card 2 - Slightly shifted down */}
            <div className="flex flex-col items-center text-center p-6 bg-background/30 border border-card-border/40 rounded-2xl backdrop-blur-sm lg:translate-y-3 hover:translate-y-2 transition-all duration-300">
              <HeartHandshake className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-serif text-lg font-bold mb-2 tracking-wide text-foreground">
                Asil <span className="font-serif italic font-normal text-accent/90">Misafirperverlik</span>
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Geleneksel Türk misafirperverliğini şık, lüks ve konforlu premium hizmet standartlarıyla sunuyoruz.
              </p>
            </div>
            
            {/* Card 3 - Slightly shifted up */}
            <div className="flex flex-col items-center text-center p-6 bg-background/30 border border-card-border/40 rounded-2xl backdrop-blur-sm lg:-translate-y-3 hover:-translate-y-4 transition-all duration-300">
              <Award className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-serif text-lg font-bold mb-2 tracking-wide text-foreground">
                Seçkin <span className="font-serif italic font-normal text-accent/90">Lezzetler</span>
              </h3>
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
