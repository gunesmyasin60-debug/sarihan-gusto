"use client";

// src/app/iletisim/page.tsx
// İletişim Sayfası — Restoran genel iletişim bilgilerini sunar ve müşteriden genel mesajları toplar.
// Google Maps Facade tasarımı barındırır (statik/performanslı harita görseli ve tek dokunuşla yol tarifi butonu).
// Zod doğrulamalı genel iletişim formu içerir.

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Navigation, Send, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CookieBanner from "@/components/ui/CookieBanner";
import { RESTORAN_BILGILERI } from "@/constants/restaurant";

const contactFormSchema = z.object({
  name: z.string().min(3, "Ad Soyad en az 3 karakter olmalıdır.").max(100),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz."),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  message: z.string().min(10, "Mesajınız en az 10 karakter olmalıdır.").max(500),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("loading");
    // İletişim form gönderim demo simülasyonu
    setTimeout(() => {
      setSubmitStatus("success");
      reset();
    }, 1000);
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-32 pb-24 background text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* İletişim Başlık */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold">BİZE ULAŞIN</span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold">İletişim & Konum</h1>
            <p className="text-sm text-muted">
              Rezervasyon güncellemeleri, özel davetleriniz veya lezzetlerimiz hakkında her türlü sorunuz için bizimle iletişime geçin.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Sol: İletişim Bilgileri & Google Maps Facade */}
            <div className="space-y-8">
              
              {/* İletişim Kartları */}
              <div className="bg-card border border-card-border p-8 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-6 text-left premium-hover">
                
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-wider text-accent font-bold flex items-center space-x-1">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Bizi Arayın</span>
                  </span>
                  <a
                    href={`tel:${RESTORAN_BILGILERI.phoneRaw}`}
                    className="text-lg font-extrabold text-foreground hover:underline block"
                  >
                    {RESTORAN_BILGILERI.phone}
                  </a>
                  <span className="text-[10px] text-muted block">Rezervasyon & Siparişler</span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-wider text-accent font-bold flex items-center space-x-1">
                    <Mail className="w-3.5 h-3.5" />
                    <span>E-posta</span>
                  </span>
                  <a
                    href={`mailto:${RESTORAN_BILGILERI.email}`}
                    className="text-base font-bold text-foreground hover:underline block truncate"
                  >
                    {RESTORAN_BILGILERI.email}
                  </a>
                  <span className="text-[10px] text-muted block">Geri bildirim ve teklifler</span>
                </div>

                <div className="col-span-full space-y-2 border-t border-card-border pt-4 mt-2">
                  <span className="text-xs uppercase tracking-wider text-accent font-bold flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Adresimiz</span>
                  </span>
                  <p className="text-sm leading-relaxed text-muted">
                    {RESTORAN_BILGILERI.address}
                  </p>
                </div>
              </div>

              {/* GOOGLE MAPS FACADE (Performans Odaklı Harita Görseli) */}
              <div className="bg-card border border-card-border rounded-3xl overflow-hidden relative group shadow-lg">
                {/* Soyut Harita Temsili Arka Planı */}
                <div className="aspect-[16/9] w-full bg-gradient-to-tr from-background to-card-border/60 flex flex-col items-center justify-center p-8 text-center relative group-hover:scale-[1.01] transition-transform duration-500">
                  <MapPin className="w-12 h-12 text-accent mb-3 relative z-10 animate-bounce" />
                  <h3 className="font-serif text-xl font-bold text-foreground relative z-10">Sarıhan Gusto Etiler</h3>
                  <p className="text-xs text-muted mt-1 relative z-10">Nisbetiye Caddesi No:109</p>
                </div>
                
                {/* Yol Tarifi Al Butonu (One-Tap Navigation Trigger) */}
                <div className="p-4 bg-card border-t border-card-border flex items-center justify-between">
                  <span className="text-xs text-muted">Google Haritalar ile yol tarifi alın.</span>
                  <a
                    href={RESTORAN_BILGILERI.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-accent text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-brand-gold-hover transition-all duration-300 focus:outline-none"
                    aria-label="Google Haritalar'da yol tarifi alın"
                  >
                    <Navigation className="w-3.5 h-3.5 fill-white text-white" />
                    <span>Yol Tarifi Al</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Sağ: İletişim Formu */}
            <div className="bg-card border border-card-border p-8 md:p-10 rounded-3xl shadow-lg relative overflow-hidden">
              <h2 className="font-serif text-2xl font-bold mb-6 text-left">Bize Mesaj Gönderin</h2>
              
              <AnimatePresence mode="wait">
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 z-20 bg-card/95 backdrop-blur-sm p-6 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <CheckCircle2 className="w-12 h-12 text-accent" />
                    <h3 className="font-serif text-2xl font-bold text-accent">Mesajınız Alındı!</h3>
                    <p className="text-xs text-muted max-w-xs leading-relaxed">
                      İlettiğiniz mesaj başarıyla alınmıştır. En kısa sürede e-posta adresiniz üzerinden geri dönüş sağlanacaktır.
                    </p>
                    <button
                      onClick={() => setSubmitStatus("idle")}
                      className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-accent text-white hover:bg-brand-gold-hover cursor-pointer"
                    >
                      Kapat
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
                {/* Ad Soyad */}
                <div className="space-y-1">
                  <label htmlFor="name" className="text-[10px] uppercase tracking-wider font-bold text-muted">Ad Soyad</label>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    placeholder="Ad Soyad"
                    aria-label="Ad Soyad"
                    className="w-full px-4 py-3 bg-input border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                </div>

                {/* Telefon */}
                <div className="space-y-1">
                  <label htmlFor="phone" className="text-[10px] uppercase tracking-wider font-bold text-muted">Telefon</label>
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone")}
                    placeholder="Telefon"
                    aria-label="Telefon"
                    className="w-full px-4 py-3 bg-input border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
                </div>

                {/* E-posta */}
                <div className="space-y-1">
                  <label htmlFor="email" className="text-[10px] uppercase tracking-wider font-bold text-muted">E-posta</label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    placeholder="E-posta"
                    aria-label="E-posta"
                    className="w-full px-4 py-3 bg-input border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                </div>

                {/* Mesaj */}
                <div className="space-y-1">
                  <label htmlFor="message" className="text-[10px] uppercase tracking-wider font-bold text-muted">Mesajınız</label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register("message")}
                    placeholder="Mesajınızı detaylıca yazın..."
                    aria-label="Mesajınız"
                    className="w-full px-4 py-3 bg-input border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  />
                  {errors.message && <span className="text-xs text-red-500">{errors.message.message}</span>}
                </div>

                {/* Submit Butonu */}
                <button
                  type="submit"
                  disabled={submitStatus === "loading"}
                  className="w-full py-3.5 bg-accent text-white hover:bg-brand-gold-hover hover:scale-[1.01] rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md shadow-accent/10 flex items-center justify-center space-x-2 focus:outline-none"
                >
                  {submitStatus === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Mesaj Gönder</span>
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <CookieBanner />
    </>
  );
}
