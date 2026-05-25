// src/app/admin/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Plus, Search, Edit2, Trash2, Lock, LogOut, Check, X, 
  Upload, AlertTriangle, Sparkles, ChefHat, Eye, EyeOff, Loader2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItem } from "@/types";

const KATEGORILER = [
  { id: "corbalar", label: "Çorbalar" },
  { id: "kebaplar", label: "Kebaplar & Izgaralar" },
  { id: "baslangiclar", label: "Mezeler & Başlangıçlar" },
  { id: "tatlilar", label: "Geleneksel Tatlılar" },
  { id: "icecekler", label: "İçecekler" },
];

const ALERJENLER = ["Gluten", "Sarımsak", "Süt Ürünleri", "Kuruyemiş", "Susam", "Deniz Ürünleri"];

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
  const [toasts, setToasts] = useState<{ id: number; message: string; type: "success" | "error" }[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Toast Ekleme Yardımcısı
  const showToast = (message: string, type: "success" | "error" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // localStorage'da kayıtlı şifre varsa otomatik giriş yapmayı dene
  useEffect(() => {
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
          showToast("Başarıyla giriş yapıldı.", "success");
        } else {
          setAuthError("Geçersiz şifre! Lütfen tekrar deneyin.");
        }
      })
      .catch((err) => {
        setLoading(false);
        setAuthError("Sunucuya bağlanılamadı.");
      });
  };

  // Çıkış İşlemi
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    localStorage.removeItem("sarihan_admin_password");
    showToast("Oturum kapatıldı.", "success");
  };

  // Menü Verilerini Çek
  const fetchMenu = async (pwd: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/menu", {
        headers: { "x-admin-password": pwd },
      });
      const json = await res.json();
      if (json.success) {
        setMenuItems(json.data);
      } else {
        showToast("Menü verileri çekilemedi: " + json.error, "error");
      }
    } catch (err) {
      showToast("Menü yüklenirken hata oluştu.", "error");
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
        showToast("Görsel başarıyla yüklendi.", "success");
      } else {
        showToast("Görsel yüklenemedi: " + json.error, "error");
      }
    } catch (err) {
      showToast("Görsel yüklenirken bir ağ hatası oluştu.", "error");
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

    const payload = {
      id: editingItem?.id,
      name: formName,
      nameEn: formNameEn,
      price: Number(formPrice),
      category: formCategory,
      description: formDescription,
      descriptionEn: formDescriptionEn,
      allergens: formAllergens,
      image: formImage,
      active: formActive,
    };

    try {
      const method = editingItem ? "PUT" : "POST";
      const res = await fetch("/api/admin/menu", {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        showToast(
          editingItem ? "Yemek başarıyla güncellendi." : "Yeni yemek başarıyla eklendi.",
          "success"
        );
        fetchMenu(password);
        setIsModalOpen(false);
      } else {
        showToast("İşlem başarısız: " + json.error, "error");
      }
    } catch (err) {
      showToast("Sunucuyla iletişim kurulurken bir hata oluştu.", "error");
    } finally {
      setFormLoading(false);
    }
  };

  // Hızlı Aktif/Pasif Değiştirme
  const toggleItemActive = async (item: MenuItem) => {
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
          prev.map((i) => (i.id === item.id ? { ...i, active: !i.active } : i))
        );
        showToast(`Durum başarıyla değiştirildi. (${!item.active ? "Aktif" : "Pasif"})`, "success");
      } else {
        showToast("Durum güncellenemedi: " + json.error, "error");
      }
    } catch (err) {
      showToast("Durum değiştirilirken hata oluştu.", "error");
    }
  };

  // Ürün Silme
  const deleteItem = async (id: string) => {
    if (!window.confirm("Bu lezzeti menüden tamamen kaldırmak istediğinizden emin misiniz?")) return;

    try {
      const res = await fetch(`/api/admin/menu?id=${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": password,
        },
      });

      const json = await res.json();
      if (json.success) {
        showToast("Yemek menüden silindi.", "success");
        setMenuItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        showToast("Silme işlemi başarısız: " + json.error, "error");
      }
    } catch (err) {
      showToast("Silme işlemi sırasında hata oluştu.", "error");
    }
  };

  // Alerjen Ekleme/Çıkarma
  const toggleAllergen = (allergen: string) => {
    setFormAllergens((prev) =>
      prev.includes(allergen) ? prev.filter((a) => a !== allergen) : [...prev, allergen]
    );
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
      <div className="min-h-screen bg-[#0C0907] flex flex-col items-center justify-center text-foreground font-sans">
        <Loader2 className="w-12 h-12 text-[#D4AF37] animate-spin mb-4" />
        <p className="text-stone-400 text-sm tracking-widest">SARIHAN GUSTO YÜKLENİYOR...</p>
      </div>
    );
  }

  // Giriş Ekranı (Login Screen)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0C0907] flex flex-col items-center justify-center px-4 font-sans relative overflow-hidden">
        {/* Dekoratif Arka Plan Işıkları */}
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-amber-900/10 blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-[#130E0B]/85 backdrop-blur-xl border border-stone-800/80 p-8 rounded-[2rem] shadow-2xl relative z-10"
        >
          {/* Logo / Başlık */}
          <div className="text-center space-y-2 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mx-auto text-[#D4AF37] mb-2 shadow-inner">
              <ChefHat className="w-8 h-8" />
            </div>
            <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] font-bold uppercase">Sarıhan Gusto</span>
            <h1 className="font-serif text-3xl font-bold text-foreground">Yönetim Paneli</h1>
            <p className="text-xs text-stone-500">Geliştirici & Restoran Kontrolü</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-400">Giriş Şifresi</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-stone-600 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Yönetim şifrenizi girin..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-[#1C1511] border border-stone-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all text-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-600 hover:text-stone-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {authError && (
                <div className="flex items-center space-x-1.5 text-red-500 text-xs font-medium pt-1">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{authError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B38F1E] text-[#0C0907] font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#D4AF37]/15 hover:shadow-[#D4AF37]/25 hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Panel Girişi Yap</span>}
            </button>
          </form>

          <p className="text-center text-[10px] text-stone-600 mt-8">
            Yetkisiz erişim kesinlikle yasaktır. Yapılan tüm işlemler kayıt altına alınır.
          </p>
        </motion.div>
      </div>
    );
  }

  // Dashboard Arayüzü (Authenticated Admin Screen)
  return (
    <div className="min-h-screen bg-[#0C0907] text-[#EDE8DF] font-sans pb-24">
      {/* Toast Bildirimleri */}
      <div className="fixed top-6 right-6 z-50 space-y-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              className={`p-4 rounded-2xl flex items-center space-x-3 shadow-xl backdrop-blur-md border ${
                toast.type === "success"
                  ? "bg-emerald-950/80 border-emerald-500/30 text-emerald-300"
                  : "bg-red-950/80 border-red-500/30 text-red-300"
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                toast.type === "success" ? "bg-emerald-500/20" : "bg-red-500/20"
              }`}>
                {toast.type === "success" ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
              </div>
              <span className="text-xs font-semibold">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Navigasyon Bar */}
      <nav className="bg-[#130E0B]/80 backdrop-blur-md border-b border-stone-900 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold tracking-wide">Sarıhan Gusto</h2>
              <p className="text-[9px] text-[#D4AF37] uppercase tracking-widest font-bold">Yönetici Paneli</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 border border-stone-800 rounded-xl text-xs font-semibold hover:border-red-500/30 hover:text-red-400 transition-all cursor-pointer bg-stone-950/50"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Oturumu Kapat</span>
          </button>
        </div>
      </nav>

      {/* Ana Gövde */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">
        
        {/* Üst Kartlar / İstatistikler */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 bg-[#130E0B] border border-stone-900 rounded-3xl flex items-center justify-between"
          >
            <div className="space-y-1">
              <span className="text-stone-500 text-[10px] uppercase font-bold tracking-wider">Toplam Lezzet</span>
              <h3 className="text-3xl font-serif font-extrabold text-foreground">{totalCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-stone-950 flex items-center justify-center text-[#D4AF37]">
              <ChefHat className="w-6 h-6" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 bg-[#130E0B] border border-stone-900 rounded-3xl flex items-center justify-between"
          >
            <div className="space-y-1">
              <span className="text-stone-500 text-[10px] uppercase font-bold tracking-wider">Aktif Çeşit</span>
              <h3 className="text-3xl font-serif font-extrabold text-emerald-400">{activeCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/10 border border-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Check className="w-6 h-6" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 bg-[#130E0B] border border-stone-900 rounded-3xl flex items-center justify-between"
          >
            <div className="space-y-1">
              <span className="text-stone-500 text-[10px] uppercase font-bold tracking-wider">Pasif (Kapalı)</span>
              <h3 className="text-3xl font-serif font-extrabold text-amber-500">{inactiveCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-950/10 border border-amber-500/10 flex items-center justify-center text-amber-500">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </motion.div>
        </div>

        {/* Kontrol Alanı (Arama, Filtre, Ekle Butonu) */}
        <div className="bg-[#130E0B] border border-stone-900 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row gap-4 flex-grow max-w-2xl">
            {/* Arama */}
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Yemek adı veya içeriğe göre ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-2xl py-3 pl-11 pr-4 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
              />
            </div>

            {/* Kategori Seçici */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-stone-950 border border-stone-800 rounded-2xl py-3 px-4 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-[#D4AF37] cursor-pointer"
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
            className="bg-gradient-to-r from-[#D4AF37] to-[#B38F1E] text-[#0C0907] px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#D4AF37]/10 hover:shadow-[#D4AF37]/20 flex items-center justify-center space-x-2 cursor-pointer transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Lezzet Ekle</span>
          </button>
        </div>

        {/* Yemek Listesi Tablosu */}
        <div className="bg-[#130E0B] border border-stone-900 rounded-[2rem] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-stone-900 bg-stone-950/40 text-stone-400 uppercase text-[9px] font-bold tracking-widest">
                  <th className="py-5 px-6">Görsel / ID</th>
                  <th className="py-5 px-6">Lezzet Adı</th>
                  <th className="py-5 px-6">Kategori</th>
                  <th className="py-5 px-6 text-right">Fiyat</th>
                  <th className="py-5 px-6 text-center">Durum</th>
                  <th className="py-5 px-6 text-center">Alerjenler</th>
                  <th className="py-5 px-6 text-center">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-900 text-xs">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-stone-950/20 transition-all">
                      <td className="py-5 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-9 rounded-lg overflow-hidden border border-stone-800 bg-[#1C1511] flex items-center justify-center relative">
                            {item.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  // Kırık resim durumunda alev ikonu göster
                                  (e.target as HTMLElement).style.display = "none";
                                }}
                              />
                            ) : null}
                            <ChefHat className="w-4 h-4 text-stone-700 absolute" />
                          </div>
                          <span className="font-mono text-[10px] text-stone-500">{item.id}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div>
                          <p className="font-serif text-sm font-bold text-foreground">{item.name}</p>
                          <p className="text-[10px] text-stone-500 font-semibold">{item.nameEn}</p>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <span className="px-2.5 py-1 bg-stone-950 border border-stone-800 rounded-full text-[10px] uppercase font-bold text-[#D4AF37]/90 tracking-wider">
                          {KATEGORILER.find((cat) => cat.id === item.category)?.label || item.category}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-right font-bold text-foreground text-sm">
                        {item.price} ₺
                      </td>
                      <td className="py-5 px-6 text-center">
                        <button
                          onClick={() => toggleItemActive(item)}
                          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            item.active ? "bg-emerald-500" : "bg-stone-800"
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-stone-950 shadow ring-0 transition duration-200 ease-in-out ${
                              item.active ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </td>
                      <td className="py-5 px-6 text-center">
                        {item.allergens.length > 0 ? (
                          <div className="flex flex-wrap gap-1 justify-center max-w-[120px] mx-auto">
                            {item.allergens.slice(0, 2).map((a) => (
                              <span key={a} className="px-1.5 py-0.5 bg-red-950/20 border border-red-500/10 text-red-400 rounded-md text-[9px] font-bold">
                                {a}
                              </span>
                            ))}
                            {item.allergens.length > 2 && (
                              <span className="text-[9px] text-stone-500">+{item.allergens.length - 2}</span>
                            )}
                          </div>
                        ) : (
                          <span className="text-stone-600">-</span>
                        )}
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => openModal(item)}
                            className="p-2 border border-stone-800 rounded-xl text-stone-400 hover:border-[#D4AF37]/30 hover:text-[#D4AF37] bg-stone-950/50 cursor-pointer transition-all"
                            title="Düzenle"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="p-2 border border-stone-800 rounded-xl text-stone-400 hover:border-red-500/30 hover:text-red-400 bg-stone-950/50 cursor-pointer transition-all"
                            title="Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-stone-500">
                      Hiçbir yemek bulunamadı.
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
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-2xl bg-[#130E0B] border border-stone-800/80 rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Başlık */}
              <div className="p-6 border-b border-stone-900 flex items-center justify-between bg-stone-950/30">
                <div className="flex items-center space-x-2.5">
                  <ChefHat className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="font-serif text-lg font-bold">
                    {editingItem ? "Lezzeti Düzenle" : "Yeni Lezzet Ekle"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 border border-stone-800 rounded-xl text-stone-400 hover:text-foreground hover:border-stone-700 transition-all cursor-pointer bg-stone-950/50"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Form Gövdesi */}
              <form onSubmit={handleFormSubmit} className="p-6 overflow-y-auto space-y-6 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* İsim TR */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Lezzet Adı (TR) *</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Örn: Tereyağlı Yaprak Ciğer"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl py-3 px-4 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                    />
                  </div>

                  {/* İsim EN */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Lezzet Adı (EN)</label>
                    <input
                      type="text"
                      value={formNameEn}
                      onChange={(e) => setFormNameEn(e.target.value)}
                      placeholder="Örn: Buttered Sliced Liver"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl py-3 px-4 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                    />
                  </div>

                  {/* Fiyat */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Fiyat (TL) *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      placeholder="Örn: 320"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl py-3 px-4 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                    />
                  </div>

                  {/* Kategori */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Kategori *</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl py-3 px-4 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
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
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Açıklama (TR)</label>
                  <textarea
                    rows={3}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Yemeğin yapılışını, içeriğini yazın..."
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl py-3 px-4 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>

                {/* Açıklama EN */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Açıklama (EN)</label>
                  <textarea
                    rows={3}
                    value={formDescriptionEn}
                    onChange={(e) => setFormDescriptionEn(e.target.value)}
                    placeholder="Write the description in English..."
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl py-3 px-4 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>

                {/* Görsel Yükleyici Alanı */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Yemek Görseli</label>
                  <div className="flex flex-col sm:flex-row gap-4 items-center bg-stone-950 p-4 border border-stone-850 rounded-2xl">
                    <div className="w-24 h-18 rounded-lg overflow-hidden border border-stone-800 bg-[#1C1511] flex items-center justify-center relative shrink-0">
                      {formImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={formImage} alt="Önizleme" className="w-full h-full object-cover" />
                      ) : (
                        <ChefHat className="w-6 h-6 text-stone-800" />
                      )}
                    </div>
                    
                    <div className="flex-grow space-y-2 text-center sm:text-left w-full">
                      <div className="flex flex-col sm:flex-row gap-2">
                        {/* Gizli file input */}
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
                          className="px-4 py-2 border border-stone-800 rounded-xl text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
                        >
                          {uploadingImage ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <Upload className="w-3.5 h-3.5" />
                              <span>Bilgisayardan Yükle</span>
                            </>
                          )}
                        </button>

                        <input
                          type="text"
                          value={formImage}
                          onChange={(e) => setFormImage(e.target.value)}
                          placeholder="Dosya yolu veya URL (örn: /images/menu/adana.webp)"
                          className="bg-stone-900 border border-stone-800 rounded-xl py-2 px-3 text-[11px] text-foreground focus:outline-none flex-grow"
                        />
                      </div>
                      <p className="text-[10px] text-stone-500 font-semibold">
                        Sadece .jpg, .png veya .webp. Maksimum 5MB dosya boyutu.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Alerjenler */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Alerjenler (Varsa Seçin)</label>
                  <div className="flex flex-wrap gap-2">
                    {ALERJENLER.map((a) => {
                      const isSelected = formAllergens.includes(a);
                      return (
                        <button
                          type="button"
                          key={a}
                          onClick={() => toggleAllergen(a)}
                          className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
                            isSelected
                              ? "bg-red-950/20 border-red-500/40 text-red-400"
                              : "bg-stone-950 border-stone-850 text-stone-400 hover:border-stone-700"
                          }`}
                        >
                          {a}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Aktiflik Durumu */}
                <div className="flex items-center space-x-3 p-4 bg-stone-950 rounded-2xl border border-stone-850">
                  <button
                    type="button"
                    onClick={() => setFormActive(!formActive)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      formActive ? "bg-emerald-500" : "bg-stone-800"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-stone-950 shadow ring-0 transition duration-200 ease-in-out ${
                        formActive ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <div>
                    <p className="text-xs font-bold">Lezzet Satışta (Aktif)</p>
                    <p className="text-[10px] text-stone-500">Pasif yapıldığında yemek, müşteri menüsünde listelenmez.</p>
                  </div>
                </div>

                {/* Kaydet Butonları */}
                <div className="pt-4 border-t border-stone-900 flex justify-end space-x-3 bg-stone-950/30 -mx-6 -mb-6 p-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-3 border border-stone-800 rounded-xl text-xs font-bold uppercase tracking-wider text-stone-400 hover:border-stone-700 hover:text-foreground cursor-pointer transition-all bg-stone-950/50"
                  >
                    Vazgeç
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading || uploadingImage}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F1E] text-[#0C0907] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#D4AF37]/10 hover:shadow-[#D4AF37]/20 flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {formLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Lezzeti Kaydet</span>
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
