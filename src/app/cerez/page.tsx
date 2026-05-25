// src/app/cerez/page.tsx
// Çerez Politikası Sayfası — Web sitesinde kullanılan çerez kategorilerini ve izin durumlarını listeler.

import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CookieBanner from "@/components/ui/CookieBanner";

export default function CookiePage() {
  return (
    <>
      <Navbar />

      <main className="flex-grow pt-32 pb-24 background text-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-left">
          
          <h1 className="font-serif text-4xl font-bold text-accent mb-8 border-b border-card-border pb-4">
            Çerez Politikası
          </h1>

          <div className="space-y-6 text-sm text-muted leading-relaxed">
            <p>
              Son Güncelleme: 24 Mayıs 2026
            </p>
            <p>
              <strong>Sarıhan Gusto</strong> web sitesi olarak, web sitemizin düzgün çalışmasını sağlamak, kullanıcı deneyiminizi geliştirmek ve ziyaretçi istatistiklerini izlemek amacıyla çerezler (cookies) kullanmaktayız. Bu Çerez Politikası, hangi çerezleri hangi amaçlarla kullandığımızı ve bu çerezleri nasıl kontrol edebileceğinizi açıklamaktadır.
            </p>

            <h2 className="font-serif text-xl font-bold text-foreground pt-4">1. Çerez Nedir?</h2>
            <p>
              Çerezler, bir web sitesini ziyaret ettiğinizde bilgisayarınıza veya mobil cihazınıza kaydedilen küçük metin dosyalarıdır. Çerezler, web sitesinin daha verimli çalışmasına ve tercihlerinize uygun şekilde kişiselleştirilmesine yardımcı olur.
            </p>

            <h2 className="font-serif text-xl font-bold text-foreground pt-4">2. Hangi Çerez Kategorilerini Kullanıyoruz?</h2>
            <table className="w-full border-collapse border border-card-border text-xs text-muted my-6">
              <thead>
                <tr className="bg-card">
                  <th className="border border-card-border p-3 font-serif font-bold text-accent text-left">Çerez Kategori</th>
                  <th className="border border-card-border p-3 font-serif font-bold text-accent text-left">İşlevi / Amacı</th>
                  <th className="border border-card-border p-3 font-serif font-bold text-accent text-left">Durum</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-card-border p-3 font-semibold text-foreground">Zorunlu / Teknik Çerezler</td>
                  <td className="border border-card-border p-3">Sitenin güvenli çalışması, form gönderimleri ve Cloudflare Turnstile bot koruması için zorunlu olan temel çerezler.</td>
                  <td className="border border-card-border p-3 text-accent font-semibold">Zorunlu (İptal Edilemez)</td>
                </tr>
                <tr className="bg-card/30">
                  <td className="border border-card-border p-3 font-semibold text-foreground">İstatistik / GA4 Çerezleri</td>
                  <td className="border border-card-border p-3">Sitenin ziyaretçi trafiğini, tıklamaları ve popüler sayfaları tamamen anonim ve şifrelenmiş olarak izlememizi sağlayan çerezler.</td>
                  <td className="border border-card-border p-3">İsteğe Bağlı (Onay Gerektirir)</td>
                </tr>
              </tbody>
            </table>

            <h2 className="font-serif text-xl font-bold text-foreground pt-4">3. Çerezlerin Kontrol Edilmesi</h2>
            <p>
              Web sitemizi ilk ziyaretinizde karşınıza çıkan **Çerez İzin Banner'ı** üzerinden tercihlerinizi dilediğiniz gibi özelleştirebilirsiniz. "İstatistik / GA4 Çerezleri"nin kullanılmasını istemiyorsanız, ayarlar panelinden bu izni kapatarak tercihlerinizi kaydedebilirsiniz.
            </p>
            <p>
              Ayrıca tarayıcınızın ayarlar sekmesine girerek kayıtlı tüm çerezleri temizleyebilir, yeni çerezlerin kaydedilmesini engelleyebilir veya çerez kaydedilmeden önce tarayıcınızın sizi uyarmasını sağlayabilirsiniz.
            </p>

            <h2 className="font-serif text-xl font-bold text-foreground pt-4">4. İletişim</h2>
            <p>
              Çerez politikamız veya kişisel verilerinizle ilgili her türlü sorunuz için bize dilediğiniz zaman `iletisim@sarihan-gusto.com` adresinden ulaşabilirsiniz.
            </p>
          </div>

        </div>
      </main>

      <Footer />
      <CookieBanner />
    </>
  );
}
