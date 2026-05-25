// src/app/etkinlikler/page.tsx
// Etkinlikler Sayfası — Restoranda gerçekleştirilen VIP iş yemekleri, gala, özel iftar davetleri vb. organizasyonları listeler.

import Link from "next/link";
import { Sparkles, Calendar, ArrowRight, Compass, ShieldAlert, Star } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CookieBanner from "@/components/ui/CookieBanner";

const ETKINLIKLER = [
  {
    id: "e-1",
    title: "Özel VIP İş Yemekleri & Toplantılar",
    desc: "12 kişiye kadar hizmet sunan, akustiği ve donanımı özel olarak tasarlanmış VIP odamızda prestijli iş yemeklerinizi organize edin.",
    tag: "VIP ODASI",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: "e-2",
    title: "Ramazan Ayı & Geleneksel İftar Davetleri",
    desc: "Zengin iftariyelik tabağımız, dumanı tüten geleneksel çorbalarımız ve zırh kebaplarımız ile sevdiklerinizle iftar bereketini paylaşın.",
    tag: "RAMAZAN",
    icon: <Calendar className="w-6 h-6" />,
  },
  {
    id: "e-3",
    title: "Grup Rezervasyonları & Aile Davetleri",
    desc: "Doğum günleri, yıldönümleri veya kalabalık aile buluşmalarınız için Anadolu Sıcaklığı konseptimizle en şık masaları sizin için birleştiriyoruz.",
    tag: "ORGANİZASYON",
    icon: <Compass className="w-6 h-6" />,
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

          {/* Etkinlik Listesi */}
          <div className="space-y-8">
            {ETKINLIKLER.map((evt) => (
              <div
                key={evt.id}
                className="bg-card border border-card-border p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left premium-hover"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent shrink-0">
                    {evt.icon}
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-accent">
                      {evt.tag}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-foreground">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed max-w-2xl">
                      {evt.desc}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 pt-2 md:pt-0">
                  <Link
                    href="/rezervasyon"
                    className="inline-flex items-center space-x-2 bg-transparent border border-accent text-accent px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-accent hover:text-wood-dark transition-all duration-300 focus:outline-none"
                  >
                    <span>Masa Ayır</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Özel Teklif Uyarı Kutusu */}
          <div className="mt-12 bg-card-border/30 border border-card-border rounded-3xl p-6 flex items-start space-x-3 text-left">
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
