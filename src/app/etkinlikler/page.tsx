// src/app/etkinlikler/page.tsx
// Etkinlikler Sayfası — Restoranda gerçekleştirilen VIP iş yemekleri, gala, özel iftar davetleri vb. organizasyonları listeler.

import Link from "next/link";
import { Sparkles, Calendar, ArrowRight, Compass, ShieldAlert } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CookieBanner from "@/components/ui/CookieBanner";

const ETKINLIKLER = [
  {
    id: "e-1",
    title: "Özel VIP İş Yemekleri & Elite Toplantılar",
    desc: "Sarıhan Gusto Etiler şubemizin kalbinde, tüm detayları gizlilik ve konfor odaklı tasarlanmış VIP odamızda prestijli iş yemeklerinizi ve özel aile davetlerinizi organize edin. Özel ses akustiği, lüks deri ve ahşap mobilyaları, bağımsız iklimlendirme sistemi ve size özel atanan profesyonel servis personelimizle; 12 kişiye kadar olan buluşmalarınızı unutulmaz bir gastronomi deneyimine dönüştürüyoruz. Mutfak şefimizin size özel hazırlayacağı gurme tadım menüleri ve enfes kebap çeşitlerimiz ile işinizi ve sevdiklerinizi şımartın.",
    tag: "VIP SALONU",
    icon: <Sparkles className="w-4 h-4" />,
    image: "/images/vip_room.png",
    highlights: ["12 Kişilik Özel Kapasite", "Kişisel Servis Personeli", "Akustik Ses Yalıtımı", "Gurme Tadım Menüleri"],
    note: "Kişiye Özel Konfor",
  },
  {
    id: "e-2",
    title: "Ramazan Ayı & Geleneksel İftar Davetleri",
    desc: "Dumanı üzerinde tüten taş fırın pidesi, 24 saat ağır fırın ateşinde demlenmiş şifalı kemik sulu çorbalarımız, organik yöresel iftariyeliklerimiz ve odun ateşinde karamelize olmuş nefis zırh kebaplarımız ile Ramazan'ın bereketini Sarıhan Gusto'da yaşayın. Kurumsal şirket iftarlarınızdan, sevdiklerinizle buluşacağınız büyük aile sofralarına kadar her detayın kusursuz planlandığı bu kutsal ayda, geleneksel Türk konukseverliğinin en asil örneğini sunuyoruz. Geleneksel şerbetlerimiz ve çıtır katmerimiz iftar sonrasını tatlandıracak.",
    tag: "RAMAZAN BEREKETİ",
    icon: <Calendar className="w-4 h-4" />,
    image: "/images/iftar_event.png",
    highlights: ["Yöresel İftariyelik Tabağı", "Demleme Çorbalar & Kebaplar", "Geleneksel Şerbet İkramı", "Geniş Grup Rezervasyonları"],
    note: "Paylaştıkça Çoğalan Bereket",
  },
  {
    id: "e-3",
    title: "Seçkin Grup Rezervasyonları & Davetler",
    desc: "Doğum günleri, yıldönümleri, nişan törenleri veya kalabalık kurumsal kutlamalarınız için Sarıhan Gusto'nun göz kamaştıran 'Anadolu Sıcaklığı' konseptini davetlerinize taşıyın. Geniş oturma alanlarımız, teras bölümümüz ve esnek masa yerleşim tasarımlarımız ile 10 kişiden 100 kişiye kadar tüm davetlerinizi kusursuz bir ziyafete dönüştürüyoruz. Canlı çiçek süslemeleri, size özel basılı menü kartları ve deneyimli mutfak kadromuzun imza sunumları ile davetlilerinizin zihninde iz bırakacak bir gece organize edin.",
    tag: "ÖZEL GÜNLER",
    icon: <Compass className="w-4 h-4" />,
    image: "/images/general_event.png",
    highlights: ["100 Kişilik Masa Düzeni", "Kişiselleştirilmiş Süslemeler", "Teras & Açık Hava Alanı", "Profesyonel Etkinlik Yönetimi"],
    note: "Unutulmaz Anılar",
  },
];

export default function EventsPage() {
  return (
    <>
      <Navbar />

      <main className="flex-grow pt-32 pb-24 background text-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Başlık */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold">ORGANİZASYONLAR</span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold">Özel Etkinlikler</h1>
            <p className="text-sm text-muted">
              Sarıhan Gusto kalitesini ve premium hizmet standartlarını özel günlerinize taşıyın. Detaylar ve grup rezervasyonları için bizimle iletişime geçin.
            </p>
          </div>

          {/* Etkinlik Grid (Zigzag Layout) */}
          <div className="grid grid-cols-1 gap-12">
            {ETKINLIKLER.map((evt, idx) => (
              <div
                key={evt.id}
                className={`bg-card border border-card-border rounded-3xl overflow-hidden flex flex-col lg:flex-row gap-8 premium-hover p-4 lg:p-6 text-left ${
                  idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Görsel */}
                <div className="lg:w-1/2 aspect-[16/10] w-full rounded-2xl overflow-hidden relative group">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  />
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm border border-card-border px-3 py-1 rounded-full flex items-center space-x-1.5 text-accent shadow-md">
                    {evt.icon}
                    <span className="text-[10px] font-bold uppercase tracking-wider">{evt.tag}</span>
                  </div>
                </div>

                {/* Açıklama */}
                <div className="lg:w-1/2 flex flex-col justify-between py-2 px-2 lg:px-4">
                  <div className="space-y-4">
                    <h3 className="font-serif text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed">
                      {evt.desc}
                    </p>
                    
                    {/* Öne Çıkanlar (Highlights) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4 border-t border-card-border/50">
                      {evt.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-center space-x-2 text-xs text-muted">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Alt Kısım Rezervasyon Butonu */}
                  <div className="pt-6 flex items-center justify-between border-t border-card-border/30 mt-6 lg:mt-0">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider bg-accent/5 px-3 py-1.5 rounded-lg border border-accent/10">
                      {evt.note}
                    </span>
                    <Link
                      href="/rezervasyon"
                      className="inline-flex items-center space-x-2 bg-accent text-wood-dark px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-brand-gold-hover transition-all duration-300 shadow-md shadow-accent/15 focus:outline-none"
                    >
                      <span>Masa Rezervasyonu</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Özel Teklif Uyarı Kutusu */}
          <div className="mt-12 bg-card-border/20 border border-card-border rounded-3xl p-6 flex items-start space-x-3 text-left">
            <ShieldAlert className="w-6 h-6 text-accent shrink-0 mt-0.5 animate-pulse" />
            <div className="space-y-1">
              <h4 className="font-serif text-base font-bold text-accent">Kurumsal & Toplu Organizasyon Talepleri</h4>
              <p className="text-xs text-muted leading-relaxed">
                15 kişi ve üzeri davetleriniz için özel menü fiyatlandırmaları ve kapatma seçenekleri sunmaktayız. Taleplerinizi planlamak için lütfen en az **3 iş günü öncesinden** bize ulaşın.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <CookieBanner />
    </>
  );
}

