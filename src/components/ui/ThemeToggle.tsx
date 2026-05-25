"use client";

// ThemeToggle.tsx
// Tema Değiştirici Buton — Açık ve Koyu tema arasında geçiş sağlar.
// Tarayıcı yerel depolamasını (localStorage) kontrol eder ve <html> etiketine 'dark' sınıfını ekler/çıkarır.

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // İlk render sonrası tema kontrolü
    const savedTheme = localStorage.theme as "light" | "dark" | undefined;
    const initialTheme = savedTheme || "light";
    
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.theme = nextTheme;

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Hydration eşleşme hatasını önlemek için mount edilene kadar boş veya varsayılan buton gösterilir
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-card border border-card-border flex items-center justify-center opacity-0" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full bg-card border border-card-border text-foreground hover:text-accent hover:border-accent flex items-center justify-center cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
      aria-label={theme === "light" ? "Koyu temaya geç" : "Açık temaya geç"}
      title={theme === "light" ? "Koyu Tema" : "Açık Tema"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -10, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 10, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2 }}
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
