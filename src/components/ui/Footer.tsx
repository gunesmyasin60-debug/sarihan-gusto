// src/components/ui/Footer.tsx
// Footer Bileşeni — Restoran genel bilgileri, adres, tıkla-ara özellikli telefon, harita yönlendirmesi, sosyal medya ikonları ve yasal linkler (KVKK vb.) barındırır.

import Link from "next/link";
import { Phone, Mail, MapPin, Award } from "lucide-react";
import { RESTORAN_BILGILERI } from "@/constants/restaurant";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-wood-dark text-stone-cream border-t border-wood-amber pt-16 pb-8" aria-label="Sayfa Altlığı">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Sütun 1: Marka Tanıtım */}
          <div className="space-y-4">
            <Link href="/" className="flex flex-col items-start focus:outline-none">
              <span className="font-serif text-2xl font-bold tracking-wider text-accent">
                SARIHAN
              </span>
              <span className="text-[10px] tracking-[0.25em] text-stone-cream/70 -mt-1 uppercase">
                Gusto
              </span>
            </Link>
            <p className="text-sm text-stone-cream/70 leading-relaxed">
              Nisbetiye Caddesi'nde, çeyrek asırlık gelenek ve modern şef dokunuşlarıyla hazırlanan gurme lezzetleri, Anadolu sıcaklığıyla harmanlayıp premium standartlarda sunuyoruz.
            </p>
            <div className="flex items-center space-x-2 text-accent text-xs font-semibold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Ödüllü Lezzet Deneyimi</span>
            </div>
          </div>

          {/* Sütun 2: Gezinme (Linkler) */}
          <div>
            <h3 className="font-serif text-lg font-bold text-accent mb-4">Hızlı Menü</h3>
            <ul className="space-y-2 text-sm text-stone-cream/80" aria-label="Alt Bilgi Gezinme Menüsü">
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
          <div>
            <h3 className="font-serif text-lg font-bold text-accent mb-4">Rezervasyon & İletişim</h3>
            <ul className="space-y-3 text-sm text-stone-cream/80" aria-label="İletişim ve Adres Bilgileri">
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
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-accent mb-2">Çalışma Saatleri</h3>
              <p className="text-xs text-stone-cream/70 leading-relaxed">
                Hafta içi: 08:00 - 02:00<br/>
                Hafta sonu (Cuma-Cmt): 08:00 - 04:00
              </p>
            </div>
            <div>
              <h3 className="font-serif text-sm font-bold text-accent mb-2 uppercase tracking-wider">Bizi Takip Edin</h3>
              <div className="flex space-x-3">
                <a
                  href={RESTORAN_BILGILERI.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-wood-amber flex items-center justify-center text-stone-cream hover:bg-accent hover:text-wood-dark transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label="Sarıhan Gusto Instagram Sayfası"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a
                  href={RESTORAN_BILGILERI.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-wood-amber flex items-center justify-center text-stone-cream hover:bg-accent hover:text-wood-dark transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
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
                  className="w-9 h-9 rounded-full bg-wood-amber flex items-center justify-center text-stone-cream hover:bg-accent hover:text-wood-dark transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
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
        <div className="border-t border-wood-amber pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-cream/60">
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
