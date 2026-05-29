// src/app/hakkimizda/page.tsx
// Hakkımızda Sayfası — Sarıhan Gusto markasının tarihçesini, mutfak felsefesini ve kurumsal değerlerini sunar.

import Link from "next/link";
import { Award, ShieldCheck, Clock, Users, ArrowRight, Compass, Target } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CookieBanner from "@/components/ui/CookieBanner";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="flex-grow pt-32 pb-24 background text-foreground">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          {/* Başlık */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold">BİZ KİMİZ</span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold">Hikayemiz & Değerlerimiz</h1>
            <p className="text-sm text-muted">
              Çeyrek asrı aşan geleneksel mutfak tecrübemiz ve lezzet sanatına olan bağlılığımızla Sarıhan Gusto serüveni.
            </p>
          </div>

          {/* Tarihçe ve İçerik */}
          <div className="space-y-20">
            
            {/* Konsept Giriş */}
            <div className="py-8 space-y-8 text-left max-w-4xl">
              <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight text-accent border-l-4 border-accent pl-6">
                Anadolu Sıcaklığı, <br className="hidden md:block" /> Dünya Standartlarında Şıklık
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-muted leading-relaxed pt-2">
                <p>
                  Sarıhan Gusto olarak gastronomik yolculuğumuza başladığımız ilk günden itibaren tek bir misyonu benimsedik: Geleneksel Anadolu mutfağının kadim lezzetlerini, en taze yöresel malzemelerle ve usta ellerin bilgeliğiyle, modern ve lüks bir ortamda misafirlerimize sunmak.
                </p>
                <p>
                  Etiler şubemizde uyguladığımız <strong className="text-foreground">Anadolu Sıcaklığı</strong> mimari konsepti, derin ahşap ve bronz tonlarının asil birlikteliğiyle, misafirlerimize hem ev konforunda bir sıcaklık hem de saray şıklığında bir lüks sunmaktadır.
                </p>
              </div>
            </div>

            {/* Mutfak Prensipleri (Bespoke Editorial List) */}
            <div className="py-12 border-t border-b border-card-border/50 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
              
              {/* Prensip 1 */}
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center text-accent">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground">Seçkin Malzeme</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Kullandığımız tüm etler, baharatlar ve sebzeler yöresinden mevsiminde taze olarak tedarik edilmektedir.
                </p>
              </div>

              {/* Prensip 2 */}
              <div className="space-y-4 md:border-l md:border-card-border/50 md:pl-12">
                <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center text-accent">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground">%100 Doğallık</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Çorbalarımızda ve kebaplarımızda hiçbir yapay tatlandırıcı veya koruyucu kimyasal kullanılmamaktadır.
                </p>
              </div>

              {/* Prensip 3 */}
              <div className="space-y-4 md:border-l md:border-card-border/50 md:pl-12">
                <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/25 flex items-center justify-center text-accent">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground">Ağır Ağır Pişirme</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Suyu ve lezzeti hapsetmek için kemik sularımızı ve çorbalarımızı 24 saat kısık taş fırın ateşinde demliyoruz.
                </p>
              </div>

            </div>

            {/* Misyonumuz & Vizyonumuz (Dual Column Editorial Layout) */}
            <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-16 text-left relative">
              {/* Orta Ayırıcı Çizgi (PC'de Aktif) */}
              <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-card-border/40" />

              {/* Misyonumuz */}
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent">
                  <Target className="w-6 h-6 animate-pulse" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-foreground">Misyonumuz</h2>
                <p className="text-xs text-muted leading-relaxed">
                  Geleneksel Türk ve Anadolu mutfağının asırlık lezzet miraslarını, özünü ve orijinal pişirme tekniklerini bozmadan sevgiyle korumak; bu şifalı tatları en seçkin yöresel malzemelerle ve yüksek hijyen standartlarıyla harmanlayıp, Etiler şubemizin elit ve konforlu ambiyansında eşsiz bir konukseverlikle misafirlerimize sunmaktır.
                </p>
              </div>

              {/* Vizyonumuz */}
              <div className="space-y-4 md:pl-8">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent">
                  <Compass className="w-6 h-6 animate-pulse" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-foreground">Vizyonumuz</h2>
                <p className="text-xs text-muted leading-relaxed">
                  Çeyrek asırlık Sarıhan tecrübesini ve asil konseptimizi, Türk gastronomi kültürünün yerel ve uluslararası arenadaki en seçkin temsilcilerinden biri haline getirmek; modern çağın sunum estetiğini kadim pişirme teknikleriyle birleştirerek, premium restoran konseptinde öncü ve dünyada referans gösterilen bir marka olmaktır.
                </p>
              </div>
            </div>

            {/* Hizmet Seçenekleri & Ayrıcalıklar (Editorial Grid) */}
            <div className="py-16 border-t border-card-border/50 space-y-12">
              
              <div className="space-y-2 text-left">
                <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold">KONFORUNUZ İÇİN</span>
                <h2 className="font-serif text-4xl font-bold text-foreground">Hizmet Seçenekleri & Kolaylıklar</h2>
                <p className="text-xs text-muted max-w-xl">
                  Sarıhan Gusto Etiler şubemizde, misafirlerimizin konforunu ve memnuniyetini en üst düzeye çıkarmak için sunulan ayrıcalıklar.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
                {/* Grup 1: Servis & Düzen */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-accent uppercase tracking-wider border-b border-card-border pb-2">Servis & Düzen</h3>
                  <ul className="space-y-3 text-xs text-muted">
                    <li className="flex items-center space-x-2.5">
                      <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                      <span>Açık Hava Bölümü</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                      <span>Terasta Oturma Alanı</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                      <span>İçeride Servis</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                      <span>Paket Servisi & Arabaya Servis</span>
                    </li>
                  </ul>
                </div>

                {/* Grup 2: Mutfak & Konsept */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-accent uppercase tracking-wider border-b border-card-border pb-2">Mutfak & Konsept</h3>
                  <ul className="space-y-3 text-xs text-muted">
                    <li className="flex items-center space-x-2.5">
                      <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                      <span>Vejetaryen Seçenekler</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                      <span>Zengin Kahve Seçkisi</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                      <span>Geç Akşam Yemeği Servisi</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                      <span>Konforlu Oturma Alanı</span>
                    </li>
                  </ul>
                </div>

                {/* Grup 3: Ödeme & Teknoloji */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-accent uppercase tracking-wider border-b border-card-border pb-2">Ödeme & Teknoloji</h3>
                  <ul className="space-y-3 text-xs text-muted">
                    <li className="flex items-center space-x-2.5">
                      <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                      <span>Ücretsiz Yüksek Hızlı Wi-Fi</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                      <span>Banka & Kredi Kartları Geçerlidir</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                      <span>NFC ile Mobil Ödeme</span>
                    </li>
                  </ul>
                </div>

                {/* Grup 4: Aile & Ulaşım */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-accent uppercase tracking-wider border-b border-card-border pb-2">Aile & Ulaşım</h3>
                  <ul className="space-y-3 text-xs text-muted">
                    <li className="flex items-center space-x-2.5">
                      <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                      <span>Çocuklar için Uygun Atmosfer</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                      <span>Mama & Bebek Sandalyesi</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                      <span>Geniş Güvenli Otopark</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                      <span>Profesyonel Vale Park Hizmeti</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Alnı */}
            <div className="bg-accent text-wood-dark p-8 md:p-12 rounded-3xl text-center space-y-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.1),transparent)]" />
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold relative z-10 text-wood-dark">
                Sizi Eşsiz Bir Gastronomi Deneyimine Davet Ediyoruz
              </h2>
              <p className="text-sm text-wood-dark/80 max-w-xl mx-auto relative z-10 leading-relaxed">
                Mutfak sanatımızı, Anadolu sıcaklığıyla harmanlanmış şık ortamımızda deneyimlemek için masanızı hemen rezerve edebilirsiniz.
              </p>
              <div className="relative z-10 pt-2">
                <Link
                  href="/rezervasyon"
                  className="inline-flex items-center space-x-2 bg-wood-dark text-foreground px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider hover:scale-105 transition-all duration-300 shadow-xl shadow-wood-dark/25"
                >
                  <span>Masa Ayır</span>
                  <ArrowRight className="w-4 h-4 text-accent" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
      <CookieBanner />
    </>
  );
}
