// utils/slugify.ts
// Metin Dönüştürücü (Slugify) — Türkçe karakterleri temizleyerek URL ve SEO uyumlu slug yapısı üretir.

export function slugify(text: string): string {
  const trMap: { [key: string]: string } = {
    ç: "c",
    Ç: "c",
    ğ: "g",
    Ğ: "g",
    ı: "i",
    İ: "i",
    ö: "o",
    Ö: "o",
    ş: "s",
    Ş: "s",
    ü: "u",
    Ü: "u",
  };

  let result = text;
  
  // Türkçe karakter dönüştürme
  Object.keys(trMap).forEach((key) => {
    result = result.replace(new RegExp(key, "g"), trMap[key]);
  });

  return result
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Alfasayısal, boşluk ve tire harici karakterleri sil
    .replace(/[\s_]+/g, "-")  // Boşluk ve alt çizgileri tireye dönüştür
    .replace(/^-+|-+$/g, ""); // Başta ve sondaki tireleri temizle
}
