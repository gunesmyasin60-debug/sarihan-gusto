# 🎨 Sarıhan Gusto - Tasarım Sistemi ve Kod Standartları Rehberi (DESIGN.md)

Bu doküman, **Sarıhan Gusto** web sitesinin premium, lüks ve estetik kimliğini korumak; gelecekte yapılacak ekleme ve geliştirmelerde görsel/teknik tutarlılığı sağlamak amacıyla hazırlanmış **resmi tasarım rehberi ve kodlama standartları kılavuzudur**.

---

## 🌟 1. Görsel Tema & Atmosfer (Atmosphere)

Sarıhan Gusto'nun tasarımı, geleneksel lezzetlerin modern ve lüks bir sunumla buluştuğu **"Premium Koyu Maun & Bal Altını" (Charcoal Mahogany & Gold)** konsepti üzerine kuruludur.

*   **Vibe (Atmosfer):** Sıcak, davetkar, lüks, elit ve "yaşayan/canlı" bir gurme deneyimi.
*   **Derinlik & Katmanlar:** Düz (flat) tasarımlardan kaçınılır. Cam efekti (glassmorphism), hafif dumanlı arka plan geçişleri ve köz sıcaklığı veren kehribar ışıltılarıyla derinlik hissi oluşturulur.
*   **Ritim:** Geniş negatif alanlar (whitespace), okumayı kolaylaştıran zarif harf aralıkları ve premium restoran menüsü hissi veren simetrik hizalamalar.

---

## 🎨 2. Renk Paleti ve Rolleri (Color Palette)

Renk sistemi, karanlık mod (dark mode) odaklı olup, sıcak köz ve ahşap tonları ile parıldayan bal altınını harmanlar.

| Renk Tanımı | Hex Kodu | Kullanım Alanı ve Rolü |
| :--- | :--- | :--- |
| **Bal Altını (Brand Gold)** | `#D99C3D` | Birincil vurgular, ikonlar, aktif durumlar, marka kimliği ögeleri. |
| **Koyu Altın (Gold Hover)** | `#C28B32` | Altın renkli buton ve linklerin hover (üzerine gelme) durumu. |
| **Koyu Maun (Wood Dark)** | `#181210` | Ana arka plan (Body background). Sıcak ve derin bir koyuluk sağlar. |
| **Açık Maun (Wood Light)** | `#231A17` | Kartlar, form elemanları, modal arka planları (Card/Input background). |
| **Kehribar Maun (Wood Amber)** | `#3A2A25` | Sınırlar, çerçeveler ve hafif ayırıcı çizgiler (Border/Divider color). |
| **Krem Melanj (Foreground Cream)**| `#FAF5EC` | Birincil metinler ve okunabilirliği yüksek ana içerikler. |
| **Kül Grisi (Muted Gray)** | `#A89D97` | İkincil metinler, açıklamalar, pasif durumlar ve alt bilgi (footer) yazıları. |

---

## ✍️ 3. Tipografi Kuralları (Typography)

Sitedeki tüm metin hiyerarşisi iki temel yazı tipi ailesiyle yönetilir.

1.  **Playfair Display (Serif):** 
    *   *Kullanım Alanı:* Başlıklar (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`), yemek isimleri, özel bölüm sloganları.
    *   *Karakter:* Geleneksel saray mutfağı ağırlığını ve gurme lüksünü temsil eden klasik, tırnaklı ve asil duruş.
2.  **DM Sans (Sans-serif):**
    *   *Kullanım Alanı:* Gövde metinleri, açıklamalar, menü fiyatları, buton yazıları, form girdileri.
    *   *Karakter:* Dijital ekranlarda yüksek okunabilirlik sağlayan, modern, temiz ve gözü yormayan geometrik yapı.

---

## ✨ 4. Mikro-Animasyonlar & Tasarım Sihirleri (Design Spells)

Arayüzün yaşayan bir organizma gibi hissettirmesi için **küçük ama etkili mikro-etkileşimler** uygulanmıştır:

### A. Kehribar Köz Parıltısı (`.ember-glow`)
Rezervasyon formları veya frekans müzik çalar gibi interaktif alanların sınırlarında, şömine közünün hafifçe parlamasını andıran dinamik bir ışıltı animasyonu döner.
```css
@keyframes ember-glow-pulse {
  0%, 100% {
    box-shadow: 0 4px 20px rgba(24, 18, 16, 0.4), 0 0 8px rgba(217, 156, 61, 0.05);
    border-color: var(--card-border);
  }
  50% {
    box-shadow: 0 4px 25px rgba(24, 18, 16, 0.5), 0 0 25px rgba(217, 156, 61, 0.25);
    border-color: rgba(217, 156, 61, 0.6);
  }
}
```

### B. Premium Hover Efekti (`.premium-hover`)
Kartlar ve butonlar üzerine gelindiğinde yumuşak bir yükselme ve arkasında hafif altın rengi bir gölge bırakma hareketi yapar.
```css
.premium-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.premium-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(212, 175, 55, 0.1);
}
```

### C. Müzik Frekansı Dalgaları (`animate-audio-bar-[1-4]`)
Frekans müzik çalarda (Solfeggio frequencies), müzik aktifken çalan frekansın ritmini yansıtan 4 adet dikey animasyonlu çubuk yükselip alçalır.

---

## 🧩 5. Bileşen Standartları (Component Stylings)

### Butonlar (Buttons)
*   **Primary (Birincil):** Bal altını (`#D99C3D`) dolgulu, koyu maun metinli, köşeleri zarifçe yuvarlatılmış, hover durumunda koyu altına dönen butonlar.
*   **Secondary (İkincil):** İçi boş, altın rengi sınırlı (outline), üzerine gelindiğinde içi altın dolan şeffaf butonlar.

### Kartlar ve Konteynerlar (Cards)
*   Arka planı mutlaka hafif açık maun (`#231A17`) olmalı, kenarlarında çok ince kehribar maun (`#3A2A25`) sınır çizgisi bulunmalıdır.
*   Kenarlar keskin değil, "hafifçe yuvarlatılmış" (`rounded-xl` veya `rounded-2xl`) olmalıdır.

### Formlar (Inputs & Forms)
*   Girdi alanlarının arka planı daha koyu (`#1E1614`), odaklanıldığında (focus) sınır çizgileri bal altını rengine bürünerek parlamalıdır.

---

## 🛠️ 6. Teknik Kodlama ve Performans İlkeleri

1.  **Next.js App Router & SSG (Statik Üretim):** Sunucu maliyetlerini **0 TL**'de tutmak amacıyla dynamic olmayan tüm sayfalar statik olarak derlenmeli, Vercel/Cloudflare Pages üzerinde barındırılmalıdır.
2.  **Turnstile & Zod Entegrasyonu:** Rezervasyon veya yorum formlarında botları engellemek için Cloudflare Turnstile, verilerin güvenliği için ise Zod şema doğrulaması zorunludur.
3.  **n8n ile Veri Yönetimi:** Rezervasyon talepleri ve geri bildirimler doğrudan `sarihan-gusto-n8n-workflow.json` üzerinden Google Sheets veya e-posta servislerine aktarılır. Sitede doğrudan hantal bir veritabanı bağlantısı kurulmaz.
4.  **SEO Optimizasyonu:** Her sayfa için `sitemap.ts` ve `robots.ts` dosyaları tanımlı olmalı, görsel etiketlerinde `alt` niteliği ve semantik HTML (`<header>`, `<main>`, `<section>`, `<footer>`) yapısı titizlikle korunmalıdır.
