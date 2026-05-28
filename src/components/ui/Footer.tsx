// src/components/ui/Footer.tsx
// Footer Bileşeni — Restoran genel bilgileri, adres, tıkla-ara özellikli telefon, harita yönlendirmesi, sosyal medya ikonları ve yasal linkler (KVKK vb.) barındırır.

import Link from "next/link";
import { Phone, Mail, MapPin, Award } from "lucide-react";
import { RESTORAN_BILGILERI } from "@/constants/restaurant";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card text-foreground border-t border-card-border pt-16 pb-8" aria-label="Sayfa Altlığı">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Sütun 1: Marka Tanıtım */}
          <div className="space-y-4 text-left">
            <Link href="/" className="flex flex-col items-start focus:outline-none">
              <span className="font-serif text-2xl font-bold tracking-wider text-accent">
                SARIHAN
              </span>
              <span className="text-[10px] tracking-[0.25em] text-foreground/70 -mt-1 uppercase">
                Gusto
              </span>
            </Link>
            <p className="text-sm text-muted leading-relaxed">
              Nisbetiye Caddesi'nde, çeyrek asırlık gelenek ve modern şef dokunuşlarıyla hazırlanan gurme lezzetleri, Anadolu sıcaklığıyla harmanlayıp premium standartlarda sunuyoruz.
            </p>
            <div className="flex items-center space-x-2 text-accent text-xs font-semibold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Ödüllü Lezzet Deneyimi</span>
            </div>
          </div>

          {/* Sütun 2: Gezinme (Linkler) */}
          <div className="text-left">
            <h3 className="font-serif text-lg font-bold text-accent mb-4">Hızlı Menü</h3>
            <ul className="space-y-2 text-sm text-foreground/80" aria-label="Alt Bilgi Gezinme Menüsü">
              <li>
                <Link href="/" className="hover:text-accent transition-colors duration-300">Anasayfa</Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-accent transition-colors duration-300">Menü & Lezzetler</Link>
              </li>
              <li>
                <Link href="/galeri" className="hover:text-accent transition-colors duration-300">Galeri</Link>
              </li>
              <li>
                <Link href="/etkinlikler" className="hover:text-accent transition-colors duration-300">Özel Etkinlikler</Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="hover:text-accent transition-colors duration-300">Hakkımızda</Link>
              </li>
            </ul>
          </div>

          {/* Sütun 3: İletişim Bilgileri */}
          <div className="text-left">
            <h3 className="font-serif text-lg font-bold text-accent mb-4">Masa Rezervasyonu</h3>
            <ul className="space-y-3 text-sm text-foreground/80" aria-label="İletişim ve Adres Bilgileri">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <a
                  href={RESTORAN_BILGILERI.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors duration-300 leading-relaxed"
                  aria-label="Google Haritalar'da adresi göster"
                >
                  {RESTORAN_BILGILERI.address}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <a
                  href={`tel:${RESTORAN_BILGILERI.phoneRaw}`}
                  className="hover:text-accent font-semibold transition-colors duration-300"
                  aria-label={`Sarıhan Gusto Telefon Et: ${RESTORAN_BILGILERI.phone}`}
                >
                  {RESTORAN_BILGILERI.phone}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a
                  href={`mailto:${RESTORAN_BILGILERI.email}`}
                  className="hover:text-accent transition-colors duration-300"
                  aria-label={`E-posta gönder: ${RESTORAN_BILGILERI.email}`}
                >
                  {RESTORAN_BILGILERI.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Sütun 4: Çalışma Saatleri & Sosyal Medya */}
          <div className="space-y-4 text-left">
            <div>
              <h3 className="font-serif text-lg font-bold text-accent mb-2">Çalışma Saatleri</h3>
              <p className="text-xs text-muted leading-relaxed">
                Hafta içi: 08:00 - 02:00<br/>
                Hafta sonu (Cuma-Cmt): 08:00 - 04:00
              </p>
            </div>
            <div>
              <h3 className="font-serif text-sm font-bold text-accent mb-2 uppercase tracking-wider">Bizi Takip Edin</h3>
              <div className="flex space-x-3">
                <a
                  href={RESTORAN_BILGILERI.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-background border border-card-border flex items-center justify-center text-foreground hover:bg-accent hover:text-wood-dark transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label="Sarıhan Gusto Facebook Sayfası"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H7v3h2v9h4v-9h3.682L17 8h-3V6.75C13 5.918 13.5 5.5 14.5 5.5H16V2h-3.5C9.5 2 9 3.5 9 6.25V8z" />
                  </svg>
                </a>
                <a
                  href={RESTORAN_BILGILERI.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-background border border-card-border flex items-center justify-center text-foreground hover:bg-accent hover:text-wood-dark transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label="Sarıhan Gusto Twitter Sayfası"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Footer Bölümü */}
        <div className="border-t border-card-border pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-muted">
          <p className="mb-4 md:mb-0">
            &copy; {currentYear} <strong>Sarıhan Gusto</strong>. Tüm Hakları Saklıdır.
          </p>
          <div className="flex space-x-6">
            <Link href="/gizlilik" className="hover:text-accent transition-colors duration-300">
              Gizlilik Politikası
            </Link>
            <Link href="/cerez" className="hover:text-accent transition-colors duration-300">
              Çerez Politikası
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
