"use client";

// src/components/ui/Navbar.tsx
// Mobil Uyumlu Gezinme Çubuğu (Navbar) — Restoran logo, dil geçişi, karanlık tema butonu ve akıcı mobil çekmece menü içerir.
// Dil desteği (TR/EN) demo aşamasında yerel state ile gösterilmektedir.

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { RESTORAN_BILGILERI } from "@/constants/restaurant";

const NAV_LINKS = [
  { href: "/", label: "Anasayfa", labelEn: "Home" },
  { href: "/menu", label: "Menü", labelEn: "Menu" },
  { href: "/galeri", label: "Galeri", labelEn: "Gallery" },
  { href: "/etkinlikler", label: "Etkinlikler", labelEn: "Events" },
  { href: "/hakkimizda", label: "Hakkımızda", labelEn: "About Us" },
  { href: "/iletisim", label: "İletişim", labelEn: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<"tr" | "en">("tr");
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLang = lang === "tr" ? "en" : "tr";
    setLang(nextLang);
    // Dil değişimi ileride next-intl ile entegre edilebilir
    alert(
      nextLang === "en" 
        ? "Language changed to English (Prod sürümünde next-intl ile /en rotasına yönlendirilecektir)." 
        : "Dil Türkçe olarak değiştirildi."
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-card-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex flex-col items-start cursor-pointer focus:outline-none"
            aria-label="Sarıhan Gusto Anasayfa"
          >
            <span className="font-serif text-2xl font-bold tracking-wider text-accent">
              SARIHAN
            </span>
            <span className="text-[10px] tracking-[0.25em] text-foreground/70 -mt-1 uppercase">
              Gusto
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Masaüstü Gezinme Menüsü">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 relative py-1 focus:outline-none hover:text-accent ${
                    isActive ? "text-accent" : "text-foreground/80"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {lang === "tr" ? link.label : link.labelEn}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Controls (Theme, Language, Reservation Button) */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            <button
              onClick={toggleLanguage}
              className="w-10 h-10 rounded-full bg-card border border-card-border hover:text-accent hover:border-accent flex items-center justify-center cursor-pointer transition-all duration-300 focus:outline-none"
              aria-label="Dili Değiştir / Change Language"
              title="TR / EN"
            >
              <Globe className="w-5 h-5" />
            </button>

            <Link
              href="/rezervasyon"
              className="inline-flex items-center justify-center px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent text-wood-dark hover:bg-brand-gold-hover hover:scale-[1.02] shadow-md shadow-accent/10 transition-all duration-300 focus:outline-none"
            >
              {lang === "tr" ? "Masa Ayır" : "Book Table"}
            </Link>
          </div>

          {/* Mobile Menu Trigger & Controls */}
          <div className="flex items-center space-x-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-full bg-card border border-card-border flex items-center justify-center text-foreground hover:text-accent hover:border-accent cursor-pointer transition-all duration-300 focus:outline-none"
              aria-label={isOpen ? "Menüyü Kapat" : "Menüyü Aç"}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Çekmece Menü) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-background border-b border-card-border overflow-hidden shadow-xl"
            aria-label="Mobil Gezinme Menüsü"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? "bg-accent/10 text-accent font-semibold"
                        : "text-foreground/80 hover:bg-card hover:text-accent"
                    }`}
                  >
                    {lang === "tr" ? link.label : link.labelEn}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-card-border flex items-center justify-between px-4">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 text-sm text-foreground/80 hover:text-accent cursor-pointer"
                >
                  <Globe className="w-4 h-4" />
                  <span>{lang === "tr" ? "English (EN)" : "Türkçe (TR)"}</span>
                </button>
                <Link
                  href="/rezervasyon"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent text-wood-dark hover:bg-brand-gold-hover transition-all duration-300"
                >
                  {lang === "tr" ? "Masa Ayır" : "Book Table"}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
