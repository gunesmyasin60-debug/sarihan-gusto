// constants/restaurant.ts
// Restoran Sabitleri — Telefon, adres, çalışma saatleri, sosyal medya ve harita linklerini tek kaynaktan yönetir.

import { RestaurantDetails } from "@/types";

export const RESTORAN_BILGILERI: RestaurantDetails = {
  name: "Sarıhan Gusto",
  phone: "0212 358 48 48",
  phoneRaw: "+902123584848",
  email: "iletisim@sarihan-gusto.com",
  address: "Nisbetiye Cad. No:109, Etiler, Beşiktaş, İstanbul, Türkiye",
  addressEn: "109 Nisbetiye Cad., Etiler, Beşiktaş, Istanbul, Turkey",
  mapsLink: "https://maps.app.goo.gl/idnWNJ2kGWv4ZRih9",
  socials: {
    instagram: "https://instagram.com/sarihangusto",
    facebook: "https://facebook.com/sarihangusto",
    twitter: "https://twitter.com/sarihangusto",
  },
  workingHours: [
    { day: "Pazartesi", open: "08:00", close: "02:00" },
    { day: "Salı", open: "08:00", close: "02:00" },
    { day: "Çarşamba", open: "08:00", close: "02:00" },
    { day: "Perşembe", open: "08:00", close: "02:00" },
    { day: "Cuma", open: "08:00", close: "04:00" },
    { day: "Cumartesi", open: "08:00", close: "04:00" },
    { day: "Pazar", open: "08:00", close: "02:00" },
  ],
};
