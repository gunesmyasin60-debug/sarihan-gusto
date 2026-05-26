// src/app/page.tsx
// Anasayfa Bileşeni — Sarıhan Gusto'nun premium mobile-first anasayfası.
// Hero alanı, "Anadolu Sıcaklığı" Bento Grid tasarımı, yerleşik Google Yorumları ve JSON-LD Yapılandırılmış Arama Şemalarını barındırır.

import Link from "next/link";
import { Star, Clock, Phone, MapPin, ArrowUpRight, Award, Compass, HeartHandshake, Check } from "lucide-react";
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
          className="relative min-h-[90vh] flex items-center bg-background overflow-hidden"
          aria-label="Sarıhan Gusto Karşılama Alanı"
        >
          {/* Soyut Anadolu Güneşi Desenli Arka Plan Katmanı (Bal Altını Rengi) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(217,156,61,0.15),transparent_60%)] z-1" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(24,18,16,0.3),rgba(24,18,16,0.9))] z-1" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Sol: Metin İçeriği */}
            <div className="space-y-6 text-foreground text-left">
              <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full text-accent text-xs font-semibold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Nisbetiye Caddesi'nin Klasik Lezzeti</span>
              </div>
              <h1 className="font-serif text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
                Gelenekten Gelen <br />
                <span className="text-accent">Premium Tatlar</span>
              </h1>
              <p className="text-muted text-base md:text-lg leading-relaxed max-w-xl">
                Çeyrek asırlık Sarıhan tecrübesiyle, zırhla kıyılmış geleneksel kebaplardan, saatlerce demlenmiş şifa kaynağı çorbalara kadar tüm gurme lezzetleri, Anadolu sıcaklığıyla harmanlayıp kusursuz şekilde sunuyoruz.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <Link
                  href="/rezervasyon"
                  className="px-8 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider bg-accent text-wood-dark hover:bg-brand-gold-hover hover:scale-[1.02] shadow-lg shadow-accent/15 transition-all duration-300 text-center cursor-pointer"
                  aria-label="Hızlı rezervasyon yapın"
                >
                  Masa Ayır
                </Link>
                <Link
                  href="/menu"
                  className="px-8 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider bg-transparent border border-card-border text-foreground hover:bg-card hover:border-accent transition-all duration-300 text-center cursor-pointer"
                  aria-label="Restoran menüsünü görüntüleyin"
                >
                  Menüyü Keşfet
                </Link>
              </div>
            </div>

            {/* Sağ: İkonik Kahraman Marka Görsel Alanı (Ayrı Çalışılmak Üzere Yemek Kartsız Premium Sunum) */}
            <div className="relative aspect-square w-full max-w-[480px] mx-auto lg:max-w-none lg:h-[500px] rounded-3xl overflow-hidden border border-card-border bg-card shadow-xl p-8 flex flex-col justify-between text-left group premium-hover">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(74,107,86,0.03),transparent)]" />
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-background border border-card-border flex items-center justify-center text-accent">
                  <Compass className="w-6 h-6 animate-pulse" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-accent font-bold">EST. 1999</span>
              </div>
              <div className="space-y-4 relative z-10">
                <h3 className="font-serif text-3xl font-extrabold leading-tight text-foreground">
                  Gastronomi & <br/>Kusursuz Hizmet Felsefesi
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Her yörenin kendine has baharatları, taze demlenmiş et suları ve geleneksel pişirme yöntemlerimizle hazırlanan tabaklarımız, lüks Etiler şubemizin asil ve dinlendirici ambiyansında unutulmaz anlara dönüşüyor.
                </p>
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-accent uppercase tracking-wider">
                    Sarıhan Gusto Gastronomi Deneyimi
                  </span>
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
              
              {/* Kart 1: Kebaplar (Büyük Kart - Açık Renk ve Mükemmel Metin Kontrastı) */}
              <div className="md:col-span-2 md:row-span-2 rounded-3xl bg-card border border-card-border p-8 flex flex-col justify-between overflow-hidden relative group premium-hover">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(74,107,86,0.02),transparent)]" />
                <div className="relative z-10 flex justify-between items-start">
                  <span className="text-xs uppercase tracking-wider font-bold text-accent">Geleneksel Kıyım</span>
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <div className="relative z-10 space-y-2 text-left">
                  <h3 className="font-serif text-3xl font-extrabold text-foreground md:text-4xl">Zırh Kebabı & Kebaplar</h3>
                  <p className="text-sm text-muted max-w-lg leading-relaxed">
                    Eti hiçbir makine değdirmeden, sadece usta ellerde zırh ile kıyarak kömür ateşinde ağır ağır pişiriyoruz. Gerçek kebap deneyimini, aydınlık ve ferah ambiyansımızda sunuyoruz.
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

              {/* Kart 3: Telefon & Rezervasyon İletişim (Adaçayı Yeşili ve Beyaz Yazı ile Premium Uyum) */}
              <div className="rounded-3xl bg-accent text-wood-dark p-6 flex flex-col justify-between text-left premium-hover relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(24,18,16,0.08),transparent)]" />
                <div className="w-10 h-10 rounded-full bg-wood-dark/10 flex items-center justify-center text-wood-dark">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1 relative z-10">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-wood-dark/80">Tek Tıkla Ulaşın</span>
                  <h3 className="font-serif text-lg font-bold text-wood-dark">Masa Rezervasyonu</h3>
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
                    "Etiler'deki en iyi kelle paça çorbası ve zırh kebabı burada. Ortamın Ege esintili aydınlık ve son derece şık konsepti ve personelin olağanüstü misafirperverliği premium düzeyde."
                  </p>
                </div>
                <div className="shrink-0 flex flex-col items-center md:items-end justify-center">
                  <a
                    href={RESTORAN_BILGILERI.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-accent text-wood-dark px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-brand-gold-hover hover:scale-105 transition-all duration-300 focus:outline-none cursor-pointer"
                    aria-label="Google Haritalar'da tüm yorumları gör"
                  >
                    <span>Google'da İnceleyin</span>
                    <ArrowUpRight className="w-4 h-4 text-wood-dark" />
                  </a>
                  <span className="text-[10px] text-muted mt-2">1,250+ Google Değerlendirmesi</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. HİKAYEMİZ & LEZZET YOLCULUĞU (Alternating Split / Zikzak Düzen) */}
        <section 
          className="py-24 bg-background border-t border-card-border overflow-hidden"
          aria-label="Sarıhan Gusto Lezzet Hikayesi"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
            
            {/* Bölüm Başlığı */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold">Bir Sarıhan Geleneği</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold">Lezzetimizin Asırlık Sırrı</h2>
              <p className="text-sm text-muted">
                Her tabağın arkasında yatan deneyim, sabır ve tutkuyla örülmüş özgün hikayemiz.
              </p>
            </div>

            {/* Alternatif Satır 1: Kebabın Ustalığı (Görsel Sağda, Metin Solda) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              {/* Sol Sütun: Metin Bilgisi */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full text-accent text-xs font-semibold uppercase tracking-wider">
                  <span>Usta Ellerin Sanatı</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
                  Zırh ile Kıyılan <br />
                  <span className="text-accent">Eşsiz Kebaplar</span>
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
              <div className="lg:col-span-6 relative h-[320px] md:h-[420px] w-full rounded-3xl overflow-hidden border border-card-border shadow-2xl group premium-hover">
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              {/* Sol Sütun: Görsel Alanı (Masaüstünde solda olması için order-last lg:order-first olarak ayarlandı, mobilde önce görsel gelir) */}
              <div className="lg:col-span-6 lg:order-first order-last relative h-[320px] md:h-[420px] w-full rounded-3xl overflow-hidden border border-card-border shadow-2xl group premium-hover">
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
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full text-accent text-xs font-semibold uppercase tracking-wider">
                  <span>Asırlık Şifa Geleneği</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
                  Ağır Ateşte Demlenen <br />
                  <span className="text-accent">Şifa Kaynağı Çorbalar</span>
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              {/* Sol Sütun: Metin Bilgisi */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full text-accent text-xs font-semibold uppercase tracking-wider">
                  <span>Nisbetiye'nin Asil Ambiyansı</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
                  Mum Işığında Lüks ve <br />
                  <span className="text-accent">Konforlu Akşamlar</span>
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
              <div className="lg:col-span-6 relative h-[320px] md:h-[420px] w-full rounded-3xl overflow-hidden border border-card-border shadow-2xl group premium-hover">
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

          </div>
        </section>

        {/* 4. TAAHHÜDÜMÜZ - PREMIUM GARANTİ */}
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
