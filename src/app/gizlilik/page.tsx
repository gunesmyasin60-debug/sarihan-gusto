// src/app/gizlilik/page.tsx
// Gizlilik Politikası Sayfası — KVKK standartlarına uygun gizlilik bildirimleri ve kullanıcı hakları metinlerini içerir.

import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CookieBanner from "@/components/ui/CookieBanner";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <main className="flex-grow pt-32 pb-24 background text-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-left">
          
          <h1 className="font-serif text-4xl font-bold text-accent mb-8 border-b border-card-border pb-4">
            Gizlilik Politikası (KVKK)
          </h1>

          <div className="space-y-6 text-sm text-muted leading-relaxed">
            <p>
              Son Güncelleme: 24 Mayıs 2026
            </p>
            <p>
              <strong>Sarıhan Gusto</strong> (bundan böyle "Restoran" veya "Biz" olarak anılacaktır) olarak, misafirlerimizin kişisel verilerinin güvenliğine ve gizliliğine azami önem göstermekteyiz. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde veya rezervasyon formumuzu kullandığınızda kişisel verilerinizin nasıl toplandığı, işlendiği ve saklandığı konusunda sizi bilgilendirmek amacıyla hazırlanmıştır.
            </p>

            <h2 className="font-serif text-xl font-bold text-foreground pt-4">1. Hangi Verileri Topluyoruz?</h2>
            <p>
              Rezervasyon formumuz aracılığıyla yalnızca rezervasyon işlemlerinizi gerçekleştirmek ve onay bildirimlerini göndermek amacıyla aşağıdaki kişisel verileri toplamaktayız:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Ad Soyad</li>
              <li>Telefon Numarası</li>
              <li>E-posta Adresi</li>
              <li>Rezervasyon Tarihi, Saati ve Kişi Sayısı</li>
              <li>Özel İstekleriniz (Belirtmeniz durumunda)</li>
            </ul>

            <h2 className="font-serif text-xl font-bold text-foreground pt-4">2. Verilerin İşlenme Amacı ve Hukuki Sebebi</h2>
            <p>
              Kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun (KVKK) 5. maddesinde belirtilen hukuki sebepler çerçevesinde; sözleşmenin kurulması, rezervasyon hizmetimizin sunulması, onay bildirimlerinin iletilmesi ve yasal yükümlülüklerimizin yerine getirilmesi amacıyla işlenmektedir.
            </p>

            <h2 className="font-serif text-xl font-bold text-foreground pt-4">3. Verilerin Saklanması ve Silinmesi</h2>
            <p>
              Rezervasyon formlarımız ile toplanan veriler, entegre ettiğimiz otomatik otomasyon akışlarımız (n8n) aracılığıyla Google Sheets üzerinde güvenli bir şekilde saklanır.
            </p>
            <p>
              <strong>Önemli Hak ve Güvence:</strong> KVKK uyumluluğu ve veri gizliliği politikamız gereğince, rezervasyon tarihiniz tamamlandıktan **3 iş günü sonra** tüm kişisel verileriniz veri tabanımızdan ve Google Sheets tablolarından n8n otomatik zamanlanmış tetikleyicisi yardımıyla **kalıcı olarak silinmektedir.**
            </p>

            <h2 className="font-serif text-xl font-bold text-foreground pt-4">4. Veri Güvenliği</h2>
            <p>
              Toplanan kişisel verileriniz, XSS ve SQL Injection gibi siber saldırılara karşı koruma altında olan sunucularımızda, şifrelenmiş API ve SSL (Secure Sockets Layer) protokolleri kullanılarak aktarılır ve saklanır.
            </p>

            <h2 className="font-serif text-xl font-bold text-foreground pt-4">5. Kullanıcı Hakları (KVKK Madde 11)</h2>
            <p>
              Dilediğiniz zaman restoranımıza başvurarak; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında verilerin aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini isteme ve kanuni şartlar çerçevesinde **silinmesini talep etme** haklarına sahipsiniz. Geri bildirimleriniz için bize `iletisim@sarihan-gusto.com` adresinden ulaşabilirsiniz.
            </p>
          </div>

        </div>
      </main>

      <Footer />
      <CookieBanner />
    </>
  );
}
