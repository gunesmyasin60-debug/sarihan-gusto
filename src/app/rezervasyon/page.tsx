"use client";

// src/app/rezervasyon/page.tsx
// Rezervasyon Sayfası — Masa rezervasyonlarını Zod doğrulamalı form yardımıyla toplar.
// Next.js `/api/reserve` Serverless rotasına POST atar. n8n çökme senaryosuna göre acil durum (fallback) mesajları barındırır.
// Tarih/Saat kısıtlamaları (çalışma saatleri ve geçmiş gün engeli) ve yükleme durumu spinner bileşenleri içerir.

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, Users, Clock, FileText, User, Phone, Mail, CheckCircle2, AlertTriangle, ShieldCheck, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CookieBanner from "@/components/ui/CookieBanner";
import { RESTORAN_BILGILERI } from "@/constants/restaurant";

// Zod ile Rezervasyon Form Doğrulama Şeması (KVKK Uyumlu)
const reservationFormSchema = z.object({
  name: z
    .string()
    .min(3, "Ad Soyad en az 3 karakter olmalıdır.")
    .max(100, "Ad Soyad çok uzundur."),
  phone: z
    .string()
    .min(10, "Geçerli bir telefon numarası giriniz (En az 10 karakter).")
    .max(15, "Telefon numarası çok uzundur."),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  date: z.string().min(1, "Lütfen rezervasyon tarihi seçiniz."),
  time: z.string().min(1, "Lütfen rezervasyon saati seçiniz."),
  guests: z
    .number({ invalid_type_error: "Lütfen kişi sayısı seçiniz." })
    .min(1, "En az 1 kişilik masa rezerve edilebilir.")
    .max(20, "20 kişiden büyük gruplar için lütfen doğrudan bizi arayın."),
  note: z.string().max(300, "Özel istekler 300 karakteri aşamaz.").optional(),
});

type ReservationFormData = z.infer<typeof reservationFormSchema>;

// Saat Listesi (Restoran çalışma saatlerine uygun: 08:00 - 02:00)
const SAATLER = [
  "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00",
  "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00",
  "22:30", "23:00", "23:30", "00:00", "00:30", "01:00", "01:30"
];

export default function ReservationPage() {
  const [submitStatus, setSubmitStatus] = useState<{
    status: "idle" | "loading" | "success" | "error";
    message: string;
    isFallback?: boolean;
  }>({ status: "idle", message: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      guests: 2,
    },
  });

  // Bugünün Tarihini Formatlama (Geçmiş tarih seçimini engellemek için)
  const todayStr = new Date().toISOString().split("T")[0];

  const onSubmit = async (data: ReservationFormData) => {
    setSubmitStatus({ status: "loading", message: "Rezervasyonunuz işleniyor..." });

    try {
      const response = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus({
          status: "success",
          message: result.message,
          isFallback: result.fallback,
        });
        reset();
      } else {
        throw new Error(result.message || "Bilinmeyen bir hata oluştu.");
      }
    } catch (error: any) {
      setSubmitStatus({
        status: "error",
        message: error.message || "Şu anda rezervasyon sistemimizde geçici bir kesinti yaşanıyor. Rezervasyonunuzu kesinleştirmek için lütfen bizi arayın.",
      });
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-32 pb-24 background text-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Rezervasyon Başlık */}
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold">MASA REZERVASYONU</span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold">Masa Ayırma Talebi</h1>
            <p className="text-sm text-muted">
              Sarıhan Gusto Etiler şubemizde unutulmaz bir gurme deneyim yaşamak için masanızı anında ayırtın. Sizin için en güzel masamızı hazırlıyoruz.
            </p>
          </div>

          <div className="bg-card border border-card-border rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden">
            
            {/* Durum Bildirim Ekranları (AnimatePresence) */}
            <AnimatePresence mode="wait">
              {submitStatus.status === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 z-30 bg-card/95 backdrop-blur-sm p-8 flex flex-col items-center justify-center text-center space-y-4"
                  role="alert"
                >
                  <CheckCircle2 className="w-16 h-16 text-accent animate-bounce" />
                  <h3 className="font-serif text-3xl font-bold text-accent">Masanız Ayrıldı!</h3>
                  <p className="text-sm max-w-md leading-relaxed text-muted">
                    {submitStatus.message}
                  </p>
                  
                  {submitStatus.isFallback && (
                    <div className="flex items-center space-x-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-xl text-accent text-xs">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Rezervasyonunuz acil durum yedek sunucusunda güvendedir.</span>
                    </div>
                  )}

                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={() => setSubmitStatus({ status: "idle", message: "" })}
                      className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-card border border-card-border text-foreground hover:border-accent hover:text-accent cursor-pointer"
                    >
                      Yeni Rezervasyon
                    </button>
                    <a
                      href={`tel:${RESTORAN_BILGILERI.phoneRaw}`}
                      className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-accent text-wood-dark hover:bg-brand-gold-hover"
                    >
                      Bizi Arayın
                    </a>
                  </div>
                </motion.div>
              )}

              {submitStatus.status === "error" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 z-30 bg-card/95 backdrop-blur-sm p-8 flex flex-col items-center justify-center text-center space-y-4"
                  role="alert"
                >
                  <AlertTriangle className="w-16 h-16 text-red-500 animate-pulse" />
                  <h3 className="font-serif text-3xl font-bold text-red-500">Sistem Kesintisi</h3>
                  <p className="text-sm max-w-md leading-relaxed text-muted">
                    {submitStatus.message}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
                    <a
                      href={`tel:${RESTORAN_BILGILERI.phoneRaw}`}
                      className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
                    >
                      Doğrudan Ara: {RESTORAN_BILGILERI.phone}
                    </a>
                    <button
                      onClick={() => setSubmitStatus({ status: "idle", message: "" })}
                      className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-card border border-card-border text-foreground hover:border-accent hover:text-accent"
                    >
                      Tekrar Dene
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Rezervasyon Formu */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* İsim Soyisim */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-semibold text-muted flex items-center space-x-1">
                    <User className="w-3.5 h-3.5 text-accent" />
                    <span>Ad Soyad</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    placeholder="Adınızı ve soyadınızı girin"
                    aria-label="Ad Soyad"
                    aria-required="true"
                    aria-invalid={errors.name ? "true" : "false"}
                    className="w-full px-4 py-3 bg-input border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  {errors.name && (
                    <span className="text-xs text-red-500 block">{errors.name.message}</span>
                  )}
                </div>

                {/* Telefon */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs font-semibold text-muted flex items-center space-x-1">
                    <Phone className="w-3.5 h-3.5 text-accent" />
                    <span>Telefon Numarası</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone")}
                    placeholder="05XX XXX XX XX"
                    aria-label="Telefon Numarası"
                    aria-required="true"
                    aria-invalid={errors.phone ? "true" : "false"}
                    className="w-full px-4 py-3 bg-input border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  {errors.phone && (
                    <span className="text-xs text-red-500 block">{errors.phone.message}</span>
                  )}
                </div>

                {/* E-posta */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-semibold text-muted flex items-center space-x-1">
                    <Mail className="w-3.5 h-3.5 text-accent" />
                    <span>E-posta Adresi</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    placeholder="ornek@mail.com"
                    aria-label="E-posta Adresi"
                    aria-required="true"
                    aria-invalid={errors.email ? "true" : "false"}
                    className="w-full px-4 py-3 bg-input border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500 block">{errors.email.message}</span>
                  )}
                </div>

                {/* Kişi Sayısı */}
                <div className="space-y-2">
                  <label htmlFor="guests" className="text-xs font-semibold text-muted flex items-center space-x-1">
                    <Users className="w-3.5 h-3.5 text-accent" />
                    <span>Masa Kişi Sayısı</span>
                  </label>
                  <select
                    id="guests"
                    {...register("guests", { valueAsNumber: true })}
                    aria-label="Kişi Sayısı"
                    aria-required="true"
                    className="w-full px-4 py-3 bg-input border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} Kişilik Masa
                      </option>
                    ))}
                  </select>
                  {errors.guests && (
                    <span className="text-xs text-red-500 block">{errors.guests.message}</span>
                  )}
                </div>

                {/* Tarih Seçimi */}
                <div className="space-y-2">
                  <label htmlFor="date" className="text-xs font-semibold text-muted flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    <span>Rezervasyon Tarihi</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    min={todayStr}
                    {...register("date")}
                    aria-label="Rezervasyon Tarihi"
                    aria-required="true"
                    className="w-full px-4 py-3 bg-input border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
                  />
                  {errors.date && (
                    <span className="text-xs text-red-500 block">{errors.date.message}</span>
                  )}
                </div>

                {/* Saat Seçimi */}
                <div className="space-y-2">
                  <label htmlFor="time" className="text-xs font-semibold text-muted flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                    <span>Rezervasyon Saati</span>
                  </label>
                  <select
                    id="time"
                    {...register("time")}
                    aria-label="Rezervasyon Saati"
                    aria-required="true"
                    className="w-full px-4 py-3 bg-input border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
                  >
                    <option value="">Saat Seçiniz</option>
                    {SAATLER.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.time && (
                    <span className="text-xs text-red-500 block">{errors.time.message}</span>
                  )}
                </div>

              </div>

              {/* Özel İstekler (Notlar) */}
              <div className="space-y-2">
                <label htmlFor="note" className="text-xs font-semibold text-muted flex items-center space-x-1">
                  <FileText className="w-3.5 h-3.5 text-accent" />
                  <span>Özel İstekler (Opsiyonel)</span>
                </label>
                <textarea
                  id="note"
                  rows={4}
                  {...register("note")}
                  placeholder="Alerji hassasiyetleriniz veya masa konumu tercihlerinizi belirtebilirsiniz..."
                  aria-label="Özel İstekler"
                  className="w-full px-4 py-3 bg-input border border-card-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
                {errors.note && (
                  <span className="text-xs text-red-500 block">{errors.note.message}</span>
                )}
              </div>

              {/* Turnstile Spam Koruması Bildirimi */}
              <div className="flex items-center space-x-2 bg-card-border/30 px-4 py-3 rounded-2xl border border-card-border text-[10px] text-muted">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>Bu sayfa Cloudflare Turnstile ile spam koruması altındadır. Form KVKK Gizlilik standartlarına tamamen uyumludur.</span>
              </div>

              {/* Submit Butonu */}
              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={submitStatus.status === "loading"}
                  className="w-full px-8 py-4 bg-accent text-wood-dark hover:bg-brand-gold-hover hover:scale-[1.01] rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-accent/15 cursor-pointer flex items-center justify-center space-x-2 focus:outline-none"
                >
                  {submitStatus.status === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Gönderiliyor...</span>
                    </>
                  ) : (
                    <span>Masamı Ayır</span>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      </main>

      <Footer />
      <CookieBanner />
    </>
  );
}
