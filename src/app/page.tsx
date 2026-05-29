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
                Gelenekten Gelen <br />
                <span className="text-accent">Premium Tatlar</span>
              </h1>
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
          className="py-24 bg-background border-t border-card-border"
          aria-label="Sarıhan Gusto Deneyimi"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold">Lezzet & Konsept</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold">Anadolu Sıcaklığı Etiler'de</h2>
              <p className="text-sm text-muted">
                Her bir detayını premium konseptimizle ilmek ilmek dokuduğumuz modern editoryal yerleşiminde gastronomik felsefemizi keşfedin.
              </p>
            </div>

            {/* Kebaplar Showcase ve Bilgiler (Bespoke Tasarım) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Sol taraf: Kebaplar Showcase Kartı */}
              <div className="lg:col-span-8 rounded-3xl bg-card border border-card-border p-8 md:p-12 flex flex-col justify-between overflow-hidden relative group premium-hover ember-glow min-h-[350px]">
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

              {/* Sağ taraf: Çalışma Saatleri & Masa Rezervasyon (Clean, Cardless Typography) */}
              <div className="lg:col-span-4 flex flex-col justify-between gap-8 py-4 text-left">
                
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

            {/* Alternatif Satır 4: Taş Fırın & Pide (Görsel Solda, Metin Sağda) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              {/* Sol Sütun: Görsel Alanı */}
              <div className="lg:col-span-6 lg:order-first order-last relative h-[320px] md:h-[420px] w-full rounded-3xl overflow-hidden border border-card-border shadow-2xl group premium-hover">
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
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full text-accent text-xs font-semibold uppercase tracking-wider">
                  <span>Geleneksel Odun Ateşi</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
                  Taş Fırından Çıtır <br />
                  <span className="text-accent">Pide & Lahmacunlar</span>
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              {/* Sol Sütun: Metin Bilgisi */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full text-accent text-xs font-semibold uppercase tracking-wider">
                  <span>Saray Usulü Tatlı Şöleni</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
                  Fıstıklı Katmer & <br />
                  <span className="text-accent">Geleneksel Tatlılar</span>
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
              <div className="lg:col-span-6 relative h-[320px] md:h-[420px] w-full rounded-3xl overflow-hidden border border-card-border shadow-2xl group premium-hover">
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center border-t border-card-border/50 pt-20">
              {/* Sol Sütun: Gerçek Google Yorumları Grid/Stack (Masaüstünde solda, mobilde önce gelir) */}
              <div className="lg:col-span-6 space-y-6 lg:order-first order-last">
                {/* Yorum 1 */}
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

                {/* Yorum 2 */}
                <div className="bg-card/45 border border-card-border/60 backdrop-blur-sm p-6 rounded-2xl relative shadow-md hover:scale-[1.01] transition-all duration-300 text-left">
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

                {/* Yorum 3 */}
                <div className="bg-card/45 border border-card-border/60 backdrop-blur-sm p-6 rounded-2xl relative shadow-md hover:scale-[1.01] transition-all duration-300 text-left">
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
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full text-accent text-xs font-semibold uppercase tracking-wider">
                  <span>Misafirlerimizin Gözünden</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
                  Sarıhan Deneyimini <br />
                  <span className="text-accent">Taçlandıran Yorumlar</span>
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
