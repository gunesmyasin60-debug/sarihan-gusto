"use client";

// src/app/not-found.tsx
// 404 Sayfa Bulunamadı Ekranı — Özel tasarımlı, premium altın/ahşap tonlarında arayüze ve anasayfaya dönüş butonuna sahip hata sayfası.

import Link from "next/link";
import { Compass, Home } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="flex-grow flex items-center justify-center pt-32 pb-24 background text-foreground">
        <div className="max-w-md w-full px-6 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mx-auto animate-spin-slow">
            <Compass className="w-10 h-10" />
          </div>
          
          <div className="space-y-2">
            <h1 className="font-serif text-5xl font-extrabold text-accent">404</h1>
            <h2 className="font-serif text-2xl font-bold">Aradığınız Yol Bulunamadı</h2>
            <p className="text-xs text-muted leading-relaxed max-w-xs mx-auto">
              Sanırız lezzet haritamızın dışına çıktınız. Aradığınız sayfa silinmiş, ismi değişmiş veya geçici olarak kullanım dışı olabilir.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-accent text-wood-dark hover:bg-brand-gold-hover hover:scale-[1.02] rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-accent/15 focus:outline-none"
            >
              <Home className="w-4 h-4" />
              <span>Anasayfaya Dön</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
