// src/app/admin/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Plus, Search, Edit2, Trash2, Lock, LogOut, Check, X, 
  Upload, AlertTriangle, Sparkles, ChefHat, Eye, EyeOff, Loader2,
  TrendingUp, Activity, ExternalLink, Edit3
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItem } from "@/types";

const KATEGORILER = [
  { id: "corbalar", label: "Çorbalar" },
  { id: "kebaplar", label: "Kebaplar & Izgaralar" },
  { id: "firin", label: "Taş Fırın & Pide" },
  { id: "tencere", label: "Saray Tencere Yemekleri" },
  { id: "baslangiclar", label: "Mezeler & Başlangıçlar" },
  { id: "salatalar", label: "Gurme Salatalar" },
  { id: "tatlilar", label: "Geleneksel Tatlılar" },
  { id: "icecekler", label: "Özel İçecekler" },
];

const ALERJENLER = [
  "Gluten", "Sarımsak", "Süt Ürünleri", "Kuruyemiş", "Susam", 
  "Deniz Ürünleri", "Yumurta", "Hardal", "Soya", "Kereviz", 
  "Yer Fıstığı", "Kükürt Dioksit"
];

export default function AdminPage() {
  // Kimlik Doğrulama Durumu
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  // Menü Verileri
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Form & Düzenleme Durumları
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Satır içi (inline) fiyat düzenleme durumları
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [inlinePriceVal, setInlinePriceVal] = useState("");

  // Vercel Demo Modu Tespiti
  const [isVercelDemo, setIsVercelDemo] = useState(false);

  // Form State'leri
  const [formName, setFormName] = useState("");
  const [formNameEn, setFormNameEn] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formCategory, setFormCategory] = useState("corbalar");
  const [formDescription, setFormDescription] = useState("");
  const [formDescriptionEn, setFormDescriptionEn] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formAllergens, setFormAllergens] = useState<string[]>([]);
  const [formActive, setFormActive] = useState(true);

  // Toast Bildirimleri
  const [toasts, setToasts] = useState<{ id: number; message: string; type: "success" | "error" | "info" }[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Toast Ekleme Yardımcısı
  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  // Ortam Tespiti ve localStorage'da kayıtlı şifre kontrolü
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDemo = window.location.hostname.includes("vercel.app") || window.location.search.includes("demo=true");
      setIsVercelDemo(isDemo);
    }

    const savedPassword = localStorage.getItem("sarihan_admin_password");
    if (savedPassword) {
      setPassword(savedPassword);
      testAuth(savedPassword);
    } else {
      setLoading(false);
    }
  }, []);

  // Şifreyi sunucuda test et
  const testAuth = async (pwdToTest: string) => {
    try {
      const res = await fetch("/api/admin/menu", {
        headers: { "x-admin-password": pwdToTest },
      });
      if (res.ok) {
        setIsAuthenticated(true);
        localStorage.setItem("sarihan_admin_password", pwdToTest);
        fetchMenu(pwdToTest);
      } else {
        localStorage.removeItem("sarihan_admin_password");
        setLoading(false);
      }
    } catch (err) {
      console.error("Giriş testi hatası:", err);
      setLoading(false);
    }
  };

  // Giriş İşlemi
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setAuthError("Lütfen bir şifre giriniz.");
      return;
    }
    setAuthError("");
    setLoading(true);
    
    // Doğrula
    fetch("/api/admin/menu", {
      headers: { "x-admin-password": password },
    })
      .then((res) => {
        setLoading(false);
        if (res.ok) {
          setIsAuthenticated(true);
          localStorage.setItem("sarihan_admin_password", password);
          fetchMenu(password);
          showToast("Sarıhan Gusto Yönetim Paneline Başarıyla Giriş Yapıldı.", "success");
        } else {
          setAuthError("Geçersiz şifre! Lütfen restoran yönetim şifresini girin.");
        }
      })
      .catch((err) => {
        setLoading(false);
        setAuthError("Sunucu bağlantı hatası.");
      });
  };

  // Çıkış İşlemi
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    localStorage.removeItem("sarihan_admin_password");
    showToast("Güvenli çıkış yapıldı.", "info");
  };

  // Menü Verilerini Çek (LocalStorage veya API)
  const fetchMenu = async (pwd: string) => {
    setLoading(true);
    try {
      // 1. ADIM: LocalStorage'da demo verisi varsa öncelikle onu yükle
      const localData = localStorage.getItem("sarihan_menu_data");
      if (localData) {
        setMenuItems(JSON.parse(localData));
        setLoading(false);
        return;
      }

      // 2. ADIM: Yoksa API'den orijinal veriyi çek
      const res = await fetch("/api/admin/menu", {
        headers: { "x-admin-password": pwd },
      });
      const json = await res.json();
      if (json.success) {
        setMenuItems(json.data);
        // Canlıda demo modundaysak, ilk verileri de localstorage'a yazalım ki üzerinde işlem yapılabilsin
        const isDemo = window.location.hostname.includes("vercel.app") || window.location.search.includes("demo=true");
        if (isDemo) {
          localStorage.setItem("sarihan_menu_data", JSON.stringify(json.data));
        }
      } else {
        showToast("Menü listesi çekilemedi: " + json.error, "error");
      }
    } catch (err) {
      showToast("Menü yüklenirken kritik hata oluştu.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Düzenleme / Ekleme Modalı Aç
  const openModal = (item: MenuItem | null = null) => {
    setEditingItem(item);
    if (item) {
      setFormName(item.name);
      setFormNameEn(item.nameEn);
      setFormPrice(item.price.toString());
      setFormCategory(item.category);
      setFormDescription(item.description);
      setFormDescriptionEn(item.descriptionEn);
      setFormImage(item.image);
      setFormAllergens(item.allergens);
      setFormActive(item.active);
    } else {
      setFormName("");
      setFormNameEn("");
      setFormPrice("");
      setFormCategory("corbalar");
      setFormDescription("");
      setFormDescriptionEn("");
      setFormImage("");
      setFormAllergens([]);
      setFormActive(true);
    }
    setIsModalOpen(true);
  };

  // Dosya Seçildiğinde Görsel Yükle
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vercel Demosunda Görsel Dosya Yüklemeyi Simüle Et
    if (isVercelDemo) {
      setUploadingImage(true);
      setTimeout(() => {
        // Rastgele şık bir demo görsel yolu ata veya varsayılan ata
        const demoImages = [
          "/images/menu/iskembe.webp",
          "/images/menu/kellepaca.webp",
          "/images/menu/adana.webp",
          "/images/menu/alinazik.webp",
          "/images/menu/humus.webp",
          "/images/menu/haydari.webp",
          "/images/menu/katmer.webp",
          "/images/menu/sutlac.webp",
          "/images/menu/ayran.webp"
        ];
        const randomImage = demoImages[Math.floor(Math.random() * demoImages.length)];
        setFormImage(randomImage);
        setUploadingImage(false);
        showToast("Görsel başarıyla simüle edilerek yüklendi! (Demo Modu)", "success");
      }, 1000);
      return;
    }

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          "x-admin-password": password,
        },
        body: formData,
      });

      const json = await res.json();
      if (json.success) {
        setFormImage(json.url);
        showToast("Görsel sunucuya başarıyla yüklendi.", "success");
      } else {
        showToast("Görsel yüklenemedi: " + json.error, "error");
      }
    } catch (err) {
      showToast("Görsel yükleme sunucu hatası.", "error");
    } finally {
      setUploadingImage(false);
    }
  };

  // Form Gönderimi (Ekleme / Güncelleme)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formName || !formPrice) {
      showToast("Lütfen gerekli alanları doldurunuz.", "error");
      return;
    }

    setFormLoading(true);

    const generatedId = editingItem?.id || (formCategory + "-" + formName.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-") + "-" + Date.now().toString().slice(-4));

    const newItemPayload: MenuItem = {
      id: generatedId,
      name: formName,
      nameEn: formNameEn || formName,
      price: Number(formPrice),
      category: formCategory,
      description: formDescription,
      descriptionEn: formDescriptionEn,
      allergens: formAllergens,
      image: formImage || "/images/menu/default.webp",
      active: formActive,
    };

    // 1. VERCEL DEMO MODU KAYDI
    if (isVercelDemo) {
      let updatedMenu = [...menuItems];
      if (editingItem) {
        updatedMenu = updatedMenu.map(i => i.id === editingItem.id ? newItemPayload : i);
      } else {
        updatedMenu.push(newItemPayload);
      }
      setMenuItems(updatedMenu);
      localStorage.setItem("sarihan_menu_data", JSON.stringify(updatedMenu));
      setFormLoading(false);
      setIsModalOpen(false);
      showToast(
        editingItem ? "Yemek bilgileri başarıyla güncellendi (Demo Belleği)." : "Yeni yemek başarıyla menüye eklendi (Demo Belleği).",
        "success"
      );
      return;
    }

    // 2. SUNUCU (LOCALHOST) KAYDI
    try {
      const method = editingItem ? "PUT" : "POST";
      const res = await fetch("/api/admin/menu", {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify(newItemPayload),
      });

      const json = await res.json();
      if (json.success) {
        showToast(
          editingItem ? "Lezzet başarıyla güncellendi." : "Yeni lezzet başarıyla eklendi.",
          "success"
        );
        fetchMenu(password);
        setIsModalOpen(false);
      } else {
        showToast("Kayıt işlemi başarısız: " + json.error, "error");
      }
    } catch (err) {
      showToast("Sunucuyla bağlantı kurulamadı.", "error");
    } finally {
      setFormLoading(false);
    }
  };

  // Hızlı Satır-İçi (Inline) Fiyat Güncelleme
  const handleInlinePriceSave = async (item: MenuItem, newPrice: number) => {
    if (isNaN(newPrice) || newPrice < 0) {
      showToast("Lütfen geçerli bir fiyat giriniz.", "error");
      return;
    }

    const updatedItem = { ...item, price: newPrice };

    // Vercel Demosunda LocalStorage Güncellemesi
    if (isVercelDemo) {
      const updatedMenu = menuItems.map(i => i.id === item.id ? updatedItem : i);
      setMenuItems(updatedMenu);
      localStorage.setItem("sarihan_menu_data", JSON.stringify(updatedMenu));
      setEditingPriceId(null);
      showToast(`"${item.name}" fiyatı ${newPrice} ₺ olarak güncellendi (Demo Modu).`, "success");
      return;
    }

    // Sunucu Güncellemesi
    try {
      const res = await fetch("/api/admin/menu", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({
          id: item.id,
          price: newPrice
        }),
      });

      const json = await res.json();
      if (json.success) {
        setMenuItems(prev => prev.map(i => i.id === item.id ? updatedItem : i));
        setEditingPriceId(null);
        showToast(`"${item.name}" fiyatı ${newPrice} ₺ olarak güncellendi.`, "success");
      } else {
        showToast("Fiyat güncellenemedi: " + json.error, "error");
      }
    } catch (err) {
      showToast("Fiyat güncellenirken sunucu bağlantı hatası.", "error");
    }
  };

  // Hızlı Aktif/Pasif Değiştirme
  const toggleItemActive = async (item: MenuItem) => {
    const updatedItem = { ...item, active: !item.active };

    // Vercel Demosunda LocalStorage Güncellemesi
    if (isVercelDemo) {
      const updatedMenu = menuItems.map(i => i.id === item.id ? updatedItem : i);
      setMenuItems(updatedMenu);
      localStorage.setItem("sarihan_menu_data", JSON.stringify(updatedMenu));
      showToast(`Durum değiştirildi: "${item.name}" ${!item.active ? "Aktif" : "Pasif"} (Demo Modu).`, "success");
      return;
    }

    // Sunucu Güncellemesi
    try {
      const res = await fetch("/api/admin/menu", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({
          id: item.id,
          active: !item.active,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setMenuItems((prev) =>
          prev.map((i) => (i.id === item.id ? updatedItem : i))
        );
        showToast(`Durum değiştirildi: "${item.name}" ${!item.active ? "Aktif" : "Pasif"}`, "success");
      } else {
        showToast("Durum güncellenemedi: " + json.error, "error");
      }
    } catch (err) {
      showToast("Durum değiştirilirken sunucu bağlantı hatası.", "error");
    }
  };

  // Ürün Silme
  const deleteItem = async (id: string) => {
    const itemToDelete = menuItems.find(i => i.id === id);
    if (!itemToDelete) return;
    
    if (!window.confirm(`"${itemToDelete.name}" lezzetini menüden tamamen kaldırmak istediğinizden emin misiniz?`)) return;

    // Vercel Demosunda LocalStorage Silme
    if (isVercelDemo) {
      const updatedMenu = menuItems.filter(item => item.id !== id);
      setMenuItems(updatedMenu);
      localStorage.setItem("sarihan_menu_data", JSON.stringify(updatedMenu));
      showToast(`"${itemToDelete.name}" menüden kaldırıldı (Demo Modu).`, "success");
      return;
    }

    // Sunucu Silme
    try {
      const res = await fetch(`/api/admin/menu?id=${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": password,
        },
      });

      const json = await res.json();
      if (json.success) {
        showToast(`"${itemToDelete.name}" menüden silindi.`, "success");
        setMenuItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        showToast("Silme işlemi başarısız: " + json.error, "error");
      }
    } catch (err) {
      showToast("Silme işlemi sırasında sunucu bağlantı hatası.", "error");
    }
  };

  // Alerjen Ekleme/Çıkarma
  const toggleAllergen = (allergen: string) => {
    setFormAllergens((prev) =>
      prev.includes(allergen) ? prev.filter((a) => a !== allergen) : [...prev, allergen]
    );
  };

  // Demo Verilerini Sıfırlama
  const resetDemoData = () => {
    if (window.confirm("Yaptığınız tüm demo değişiklikleri silinecek ve orijinal menü listesi yüklenecektir. Emin misiniz?")) {
      localStorage.removeItem("sarihan_menu_data");
      showToast("Demo verileri sıfırlandı, orijinal menü yükleniyor...", "info");
      fetchMenu(password);
    }
  };

  // Filtrelenmiş ve Aranmış Yemek Listesi
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // İstatistikler
  const totalCount = menuItems.length;
  const activeCount = menuItems.filter((i) => i.active).length;
  const inactiveCount = totalCount - activeCount;

  // Yükleme Ekranı
  if (loading && menuItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#1A0C0A] flex flex-col items-center justify-center text-foreground font-sans">
        <Loader2 className="w-12 h-12 text-[#E2C569] animate-spin mb-4" />
        <p className="text-[#EDE8DF] text-sm tracking-[0.25em] font-semibold">SARIHAN GUSTO GURME PANELİ YÜKLENİYOR...</p>
      </div>
    );
  }

  // 1. Giriş Ekranı (Login Screen)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1A0C0A] flex flex-col items-center justify-center px-4 font-sans relative overflow-hidden">
        {/* Dekoratif Arka Plan Işıkları */}
        <div className="absolute top-[-25%] left-[-25%] w-[70%] h-[70%] rounded-full bg-[#E2C569]/5 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[-25%] right-[-25%] w-[70%] h-[70%] rounded-full bg-amber-900/10 blur-[150px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-lg bg-[#261411]/90 backdrop-blur-2xl border border-[#E2C569]/15 p-10 rounded-[2.5rem] shadow-2xl relative z-10 text-center"
        >
          {/* Logo / Başlık */}
          <div className="space-y-3 mb-10">
            <div className="w-20 h-20 rounded-3xl bg-[#E2C569]/10 border border-[#E2C569]/25 flex items-center justify-center mx-auto text-[#E2C569] mb-3 shadow-inner">
              <ChefHat className="w-10 h-10" />
            </div>
            <span className="text-[11px] tracking-[0.4em] text-[#E2C569] font-extrabold uppercase block">Sarıhan Gusto</span>
            <h1 className="font-serif text-4xl font-extrabold text-[#EDE8DF] tracking-wide">Yönetim Paneli</h1>
            <p className="text-sm text-stone-400 max-w-sm mx-auto">
              Geliştirici kontrolleri, gurme menü yönetimi ve dinamik veri yönetim merkezi.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6 text-left">
            <div className="space-y-2.5">
              <label className="text-[11px] font-bold uppercase tracking-widest text-[#EDE8DF]/75">Yönetici Şifresi</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-[#E2C569]/60 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Restoran ana şifresini girin..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4.5 bg-[#381F1A] border border-[#E2C569]/15 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E2C569]/40 focus:border-[#E2C569] transition-all text-[#EDE8DF] placeholder-stone-600 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-[#E2C569] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {authError && (
                <div className="flex items-center space-x-2 text-red-400 text-xs font-semibold pt-1 animate-pulse">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4.5 rounded-2xl bg-gradient-to-r from-[#E2C569] to-[#CBB057] text-[#1A0C0A] font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#E2C569]/15 hover:shadow-[#E2C569]/25 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Panel Girişi Yap</span>}
            </button>
          </form>

          <p className="text-center text-[10px] text-stone-600 mt-10 tracking-widest font-semibold uppercase">
            Sarıhan Gusto Gastronomi A.Ş. — 2026
          </p>
        </motion.div>
      </div>
    );
  }

  // 2. Dashboard Arayüzü (Authenticated Admin Screen)
  return (
    <div className="min-h-screen bg-[#1A0C0A] text-[#EDE8DF] font-sans pb-28">
      {/* Toast Bildirimleri */}
      <div className="fixed top-6 right-6 z-50 space-y-3 pointer-events-none max-w-md w-full">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              className={`p-4.5 rounded-2xl flex items-center space-x-3.5 shadow-2xl backdrop-blur-md border ${
                toast.type === "success"
                  ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-200"
                  : toast.type === "error"
                  ? "bg-red-950/90 border-red-500/30 text-red-200"
                  : "bg-stone-900/95 border-[#E2C569]/30 text-[#EDE8DF]"
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                toast.type === "success" ? "bg-emerald-500/20" : toast.type === "error" ? "bg-red-500/20" : "bg-[#E2C569]/20"
              }`}>
                {toast.type === "success" ? <Check className="w-4 h-4 text-emerald-400" /> : toast.type === "error" ? <X className="w-4 h-4 text-red-400" /> : <Sparkles className="w-4 h-4 text-[#E2C569]" />}
              </div>
              <span className="text-xs font-bold leading-normal">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Navigasyon Bar */}
      <nav className="bg-[#261411]/90 backdrop-blur-md border-b border-[#E2C569]/10 sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#E2C569]/10 border border-[#E2C569]/20 flex items-center justify-center text-[#E2C569] shadow-inner">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-extrabold tracking-wide text-[#EDE8DF]">Sarıhan Gusto</h2>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] text-[#E2C569] uppercase tracking-widest font-bold">Yönetim Paneli</span>
                {isVercelDemo && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-[8px] font-extrabold uppercase text-amber-500 tracking-wider">
                    DİNAMİK DEMO
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Müşteri Menüsüne Git Butonu */}
            <a
              href="/menu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-4 py-2.5 border border-[#E2C569]/20 text-[#E2C569] rounded-xl text-xs font-bold hover:bg-[#E2C569]/10 hover:border-[#E2C569]/45 transition-all cursor-pointer bg-[#E2C569]/5 active:scale-95"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Müşteri Menüsü</span>
            </a>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-1.5 px-4 py-2.5 border border-stone-800 rounded-xl text-xs font-bold text-stone-400 hover:border-red-500/30 hover:text-red-400 transition-all cursor-pointer bg-stone-950/40"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Güvenli Çıkış</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Ana Gövde */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">
        
        {/* Vercel Demo Modu Bilgilendirme Bannerı */}
        {isVercelDemo && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5.5 bg-gradient-to-r from-amber-950/30 to-amber-900/10 border border-amber-500/20 rounded-[2rem] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-xl"
          >
            <div className="flex items-start space-x-3 text-stone-300">
              <Sparkles className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Müşteri Tanıtım ve Demo Modu Aktif</h4>
                <p className="text-xs leading-relaxed max-w-4xl text-stone-200">
                  Vercel sunucusuz platformunda çalıştığınız için yaptığınız tüm ekleme, çıkarma, aktiflik kilitleme ve **hızlı fiyat değişiklikleri** tarayıcınızın yerel belleğine (localStorage) anında kaydedilir. Canlıdaki müşteri menüsü sayfasına geçtiğinizde eklediğiniz yeni yemekler ve değişiklikler anlık olarak render edilecektir!
                </p>
              </div>
            </div>
            <button
              onClick={resetDemoData}
              className="px-4 py-2 bg-amber-500/15 border border-amber-500/30 hover:bg-amber-500/25 text-amber-400 text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer transition-all shrink-0 active:scale-95 text-center"
            >
              Demo Veriyi Sıfırla
            </button>
          </motion.div>
        )}

        {/* Üst İstatistik Kartları */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6.5 bg-[#261411] border border-[#E2C569]/10 rounded-[2rem] flex items-center justify-between shadow-md"
          >
            <div className="space-y-1.5">
              <span className="text-stone-400 text-[10px] uppercase font-extrabold tracking-widest block">Toplam Gurme Lezzet</span>
              <h3 className="text-4xl font-serif font-extrabold text-[#EDE8DF]">{totalCount}</h3>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-stone-950 flex items-center justify-center text-[#E2C569] border border-[#E2C569]/10 shadow-inner">
              <ChefHat className="w-7 h-7" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-6.5 bg-[#261411] border border-[#E2C569]/10 rounded-[2rem] flex items-center justify-between shadow-md"
          >
            <div className="space-y-1.5">
              <span className="text-stone-400 text-[10px] uppercase font-extrabold tracking-widest block">Aktif Satışta Olan</span>
              <h3 className="text-4xl font-serif font-extrabold text-emerald-400">{activeCount}</h3>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-950/15 border border-emerald-500/15 flex items-center justify-center text-emerald-400">
              <Check className="w-7 h-7" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-6.5 bg-[#261411] border border-[#E2C569]/10 rounded-[2rem] flex items-center justify-between shadow-md"
          >
            <div className="space-y-1.5">
              <span className="text-stone-400 text-[10px] uppercase font-extrabold tracking-widest block">Pasif (Gizlenmiş)</span>
              <h3 className="text-4xl font-serif font-extrabold text-amber-500">{inactiveCount}</h3>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-amber-950/15 border border-amber-500/15 flex items-center justify-center text-amber-500">
              <AlertTriangle className="w-7 h-7" />
            </div>
          </motion.div>
        </div>

        {/* Kontrol Alanı (Arama, Filtre, Ekle Butonu) */}
        <div className="bg-[#261411] border border-[#E2C569]/10 rounded-[2rem] p-6.5 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
          <div className="flex flex-col sm:flex-row gap-4 flex-grow max-w-3xl">
            {/* Arama */}
            <div className="relative flex-grow">
              <Search className="w-4.5 h-4.5 text-[#E2C569]/50 absolute left-4.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Yemek adı, ID veya açıklamaya göre ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-950 border border-stone-850 rounded-2xl py-3.5 pl-12 pr-4 text-xs font-bold text-stone-200 placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-[#E2C569] focus:border-[#E2C569]"
              />
            </div>

            {/* Kategori Seçici */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-stone-950 border border-stone-850 rounded-2xl py-3.5 px-4 text-xs font-extrabold text-stone-200 focus:outline-none focus:ring-1 focus:ring-[#E2C569] cursor-pointer"
            >
              <option value="all">Tüm Kategoriler</option>
              {KATEGORILER.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => openModal(null)}
            className="bg-gradient-to-r from-[#E2C569] to-[#CBB057] text-[#1A0C0A] px-7 py-3.5 rounded-2xl font-extrabold text-xs uppercase tracking-widest shadow-lg shadow-[#E2C569]/10 hover:shadow-[#E2C569]/20 flex items-center justify-center space-x-2 cursor-pointer transition-all active:scale-95 shrink-0"
          >
            <Plus className="w-4.5 h-4.5" />
            <span>Yeni Lezzet Ekle</span>
          </button>
        </div>

        {/* Yemek Listesi Tablosu */}
        <div className="bg-[#261411] border border-[#E2C569]/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-stone-900 bg-stone-950/60 text-[#EDE8DF] uppercase text-[10px] font-extrabold tracking-widest">
                  <th className="py-6 px-7 w-[18%]">Görsel / ID</th>
                  <th className="py-6 px-7 w-[28%]">Lezzet Adı & Açıklama</th>
                  <th className="py-6 px-7 w-[16%]">Kategori</th>
                  <th className="py-6 px-7 w-[12%] text-right">Fiyat (TL)</th>
                  <th className="py-6 px-7 w-[10%] text-center">Durum</th>
                  <th className="py-6 px-7 w-[10%] text-center">Alerjenler</th>
                  <th className="py-6 px-7 w-[10%] text-center">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-900 text-stone-200">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-stone-950/30 transition-all">
                      {/* Görsel ve ID */}
                      <td className="py-6 px-7">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-12 rounded-xl overflow-hidden border border-stone-850 bg-[#381F1A] flex items-center justify-center relative shrink-0">
                            {item.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = "none";
                                }}
                              />
                            ) : null}
                            <ChefHat className="w-5 h-5 text-stone-750 absolute" />
                          </div>
                          <span className="font-mono text-[11px] text-stone-500 font-semibold">{item.id}</span>
                        </div>
                      </td>

                      {/* Lezzet Adı & Açıklama */}
                      <td className="py-6 px-7">
                        <div className="space-y-1 max-w-sm">
                          <p className="font-serif text-[15px] font-extrabold text-[#EDE8DF] leading-tight">{item.name}</p>
                          <p className="text-[11px] text-[#E2C569]/80 font-bold">{item.nameEn}</p>
                          <p className="text-[11px] text-stone-400 leading-relaxed line-clamp-2">{item.description}</p>
                        </div>
                      </td>

                      {/* Kategori */}
                      <td className="py-6 px-7">
                        <span className="px-3 py-1.5 bg-stone-950 border border-stone-850 rounded-full text-[10px] uppercase font-extrabold text-[#E2C569] tracking-wider">
                          {KATEGORILER.find((cat) => cat.id === item.category)?.label || item.category}
                        </span>
                      </td>

                      {/* Fiyat (Inline Düzenlenebilir) */}
                      <td className="py-6 px-7 text-right">
                        {editingPriceId === item.id ? (
                          <div className="flex items-center justify-end space-x-1.5">
                            <input
                              type="number"
                              value={inlinePriceVal}
                              onChange={(e) => setInlinePriceVal(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleInlinePriceSave(item, Number(inlinePriceVal));
                                if (e.key === "Escape") setEditingPriceId(null);
                              }}
                              className="w-20 bg-stone-950 border border-[#E2C569] rounded-lg py-1 px-1.5 text-xs text-right focus:outline-none text-[#EDE8DF] font-bold"
                              autoFocus
                            />
                            <button
                              onClick={() => handleInlinePriceSave(item, Number(inlinePriceVal))}
                              className="p-1 text-emerald-400 hover:bg-emerald-500/10 rounded-md cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setEditingPriceId(null)}
                              className="p-1 text-red-400 hover:bg-red-500/10 rounded-md cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div 
                            onClick={() => {
                              setEditingPriceId(item.id);
                              setInlinePriceVal(item.price.toString());
                            }}
                            className="group flex items-center justify-end space-x-1.5 cursor-pointer hover:text-[#E2C569]"
                            title="Hızlı Fiyat Güncelle"
                          >
                            <span className="font-serif text-[15px] font-extrabold text-[#EDE8DF] group-hover:text-[#E2C569] transition-all">
                              {item.price} ₺
                            </span>
                            <Edit3 className="w-3.5 h-3.5 text-stone-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                          </div>
                        )}
                      </td>

                      {/* Aktiflik Durumu */}
                      <td className="py-6 px-7 text-center">
                        <button
                          onClick={() => toggleItemActive(item)}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            item.active ? "bg-emerald-500" : "bg-stone-850"
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-stone-950 shadow-md ring-0 transition duration-200 ease-in-out ${
                              item.active ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </td>

                      {/* Alerjenler */}
                      <td className="py-6 px-7 text-center">
                        {item.allergens.length > 0 ? (
                          <div className="flex flex-wrap gap-1 justify-center max-w-[140px] mx-auto">
                            {item.allergens.slice(0, 3).map((a) => (
                              <span key={a} className="px-2 py-0.5 bg-red-950/20 border border-red-500/10 text-red-400 rounded-md text-[9px] font-bold">
                                {a}
                              </span>
                            ))}
                            {item.allergens.length > 3 && (
                              <span className="text-[9px] text-stone-400 font-bold">+{item.allergens.length - 3}</span>
                            )}
                          </div>
                        ) : (
                          <span className="text-stone-600 font-bold">-</span>
                        )}
                      </td>

                      {/* İşlemler (Düzenle & Sil) */}
                      <td className="py-6 px-7">
                        <div className="flex items-center justify-center space-x-2.5">
                          <button
                            onClick={() => openModal(item)}
                            className="p-2.5 border border-stone-850 rounded-xl text-stone-300 hover:border-[#E2C569]/30 hover:text-[#E2C569] bg-stone-950/40 cursor-pointer transition-all active:scale-95"
                            title="Yemek Bilgilerini Düzenle"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="p-2.5 border border-stone-850 rounded-xl text-stone-300 hover:border-red-500/30 hover:text-red-400 bg-stone-950/40 cursor-pointer transition-all active:scale-95"
                            title="Yemeği Menüden Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-stone-500 font-bold text-sm">
                      Kriterlere uygun hiçbir gurme yemek bulunamadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal Arayüzü (Ekleme ve Düzenleme) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-3xl bg-[#261411] border border-[#E2C569]/20 rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Başlık */}
              <div className="p-6 border-b border-stone-900 flex items-center justify-between bg-stone-950/40">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E2C569]/10 border border-[#E2C569]/20 flex items-center justify-center text-[#E2C569]">
                    <ChefHat className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl font-extrabold text-[#EDE8DF]">
                    {editingItem ? "Gurme Lezzeti Düzenle" : "Yeni Gurme Lezzet Ekle"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 border border-stone-850 rounded-xl text-stone-400 hover:text-foreground hover:border-stone-700 transition-all cursor-pointer bg-stone-950/50"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Modal Form Gövdesi */}
              <form onSubmit={handleFormSubmit} className="p-6 overflow-y-auto space-y-6 flex-grow text-stone-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* İsim TR */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#EDE8DF]/80">Lezzet Adı (TR) *</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Örn: Kral Kuzu Kelle Paça"
                      className="w-full bg-stone-950 border border-stone-850 rounded-xl py-3.5 px-4 text-xs font-bold text-stone-200 focus:outline-none focus:ring-1 focus:ring-[#E2C569]"
                    />
                  </div>

                  {/* İsim EN */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#EDE8DF]/80">Lezzet Adı (EN)</label>
                    <input
                      type="text"
                      value={formNameEn}
                      onChange={(e) => setFormNameEn(e.target.value)}
                      placeholder="Örn: Royal LambTroter Soup"
                      className="w-full bg-stone-950 border border-stone-850 rounded-xl py-3.5 px-4 text-xs font-bold text-stone-200 focus:outline-none focus:ring-1 focus:ring-[#E2C569]"
                    />
                  </div>

                  {/* Fiyat */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#EDE8DF]/80">Fiyat (TL) *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      placeholder="Örn: 280"
                      className="w-full bg-stone-950 border border-stone-850 rounded-xl py-3.5 px-4 text-xs font-bold text-stone-200 focus:outline-none focus:ring-1 focus:ring-[#E2C569]"
                    />
                  </div>

                  {/* Kategori */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#EDE8DF]/80">Kategori *</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-850 rounded-xl py-3.5 px-4 text-xs font-bold text-stone-200 focus:outline-none focus:ring-1 focus:ring-[#E2C569] cursor-pointer"
                    >
                      {KATEGORILER.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Açıklama TR */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#EDE8DF]/80">Açıklama (TR)</label>
                  <textarea
                    rows={3}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Sarıhan usulü geleneksel hazırlanış şeklini yazın..."
                    className="w-full bg-stone-950 border border-stone-850 rounded-xl py-3.5 px-4 text-xs font-bold text-stone-200 leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#E2C569]"
                  />
                </div>

                {/* Açıklama EN */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#EDE8DF]/80">Açıklama (EN)</label>
                  <textarea
                    rows={3}
                    value={formDescriptionEn}
                    onChange={(e) => setFormDescriptionEn(e.target.value)}
                    placeholder="Describe the dish preparation and ingredients in English..."
                    className="w-full bg-stone-950 border border-stone-850 rounded-xl py-3.5 px-4 text-xs font-bold text-stone-200 leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#E2C569]"
                  />
                </div>

                {/* Görsel Yükleyici */}
                <div className="space-y-2.5">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#EDE8DF]/80">Gurme Yemek Görseli</label>
                  <div className="flex flex-col sm:flex-row gap-5 items-center bg-stone-950 p-5 border border-stone-850 rounded-2xl">
                    <div className="w-28 h-20 rounded-xl overflow-hidden border border-stone-800 bg-[#381F1A] flex items-center justify-center relative shrink-0">
                      {formImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={formImage} alt="Önizleme" className="w-full h-full object-cover animate-fade-in" />
                      ) : (
                        <ChefHat className="w-7 h-7 text-stone-800" />
                      )}
                    </div>
                    
                    <div className="flex-grow space-y-2 text-center sm:text-left w-full">
                      <div className="flex flex-col sm:flex-row gap-2.5">
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploadingImage}
                          className="px-5 py-3 border border-[#E2C569]/35 rounded-xl text-xs font-bold uppercase tracking-wider text-[#E2C569] hover:border-[#E2C569]/65 hover:bg-[#E2C569]/5 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                        >
                          {uploadingImage ? (
                            <Loader2 className="w-4.5 h-4.5 animate-spin text-[#E2C569]" />
                          ) : (
                            <>
                              <Upload className="w-4.5 h-4.5" />
                              <span>Bilgisayardan Seç</span>
                            </>
                          )}
                        </button>

                        <input
                          type="text"
                          value={formImage}
                          onChange={(e) => setFormImage(e.target.value)}
                          placeholder="Dosya yolu veya görsel URL (Örn: /images/menu/iskembe.webp)"
                          className="bg-stone-900 border border-stone-800 rounded-xl py-2.5 px-3.5 text-xs text-stone-300 focus:outline-none flex-grow"
                        />
                      </div>
                      <p className="text-[10px] text-stone-500 font-bold">
                        Lüks gurme yemek fotoğrafları için ideal çözünürlük 800x600 WebP formatıdır.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Alerjenler */}
                <div className="space-y-2.5">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-[#EDE8DF]/80">Alerjenler (Tüm Seçenekler)</label>
                  <div className="flex flex-wrap gap-2">
                    {ALERJENLER.map((a) => {
                      const isSelected = formAllergens.includes(a);
                      return (
                        <button
                          type="button"
                          key={a}
                          onClick={() => toggleAllergen(a)}
                          className={`px-3.5 py-2 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
                            isSelected
                              ? "bg-red-950/20 border-red-500/40 text-red-400 shadow-md"
                              : "bg-stone-950 border-stone-850 text-stone-400 hover:border-stone-750"
                          }`}
                        >
                          {a}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Aktiflik Durumu */}
                <div className="flex items-center space-x-3.5 p-4.5 bg-stone-950 rounded-2xl border border-stone-850">
                  <button
                    type="button"
                    onClick={() => setFormActive(!formActive)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      formActive ? "bg-emerald-500" : "bg-stone-800"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-stone-950 shadow ring-0 transition duration-200 ease-in-out ${
                        formActive ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <div>
                    <p className="text-xs font-bold text-[#EDE8DF]">Lezzet Satışta ve Menüde Gösteriliyor</p>
                    <p className="text-[10px] text-stone-500 font-semibold">Kapatıldığında müşterileriniz bu yemeği menüde göremez.</p>
                  </div>
                </div>

                {/* Kaydet Butonları */}
                <div className="pt-4.5 border-t border-stone-900 flex justify-end space-x-3 bg-stone-950/40 -mx-6 -mb-6 p-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3.5 border border-stone-850 rounded-xl text-xs font-bold uppercase tracking-wider text-stone-400 hover:border-stone-750 hover:text-foreground cursor-pointer transition-all bg-stone-950/50"
                  >
                    Kapat
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading || uploadingImage}
                    className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#E2C569] to-[#CBB057] text-[#1A0C0A] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#E2C569]/15 hover:shadow-[#E2C569]/25 flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {formLoading ? (
                      <Loader2 className="w-4.5 h-4.5 animate-spin text-stone-950" />
                    ) : (
                      <>
                        <Check className="w-4.5 h-4.5" />
                        <span>Gurme Lezzeti Kaydet</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
