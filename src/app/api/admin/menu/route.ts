// src/app/api/admin/menu/route.ts
// Menu API Rotaları — Yerel menu.json dosyasını okur, yazar ve düzenler.
// x-admin-password başlığı ile yetki doğrulaması yapar.

import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { MenuItem } from "@/types";

const JSON_FILE_PATH = path.join(process.cwd(), "src/data/menu.json");

// Yardımcı Fonksiyon: Menü dosyasını diskten oku
async function readMenu(): Promise<MenuItem[]> {
  try {
    const fileContent = await fs.readFile(JSON_FILE_PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Menü dosyası okunamadı, boş dizi dönülüyor:", error);
    return [];
  }
}

// Yardımcı Fonksiyon: Menüyü diske yaz
async function writeMenu(data: MenuItem[]): Promise<void> {
  await fs.writeFile(JSON_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// Yardımcı Fonksiyon: Şifre Doğrulaması
function checkAuth(request: NextRequest): boolean {
  const reqPassword = request.headers.get("x-admin-password");
  const expectedPassword = process.env.ADMIN_PASSWORD || "Sarihan123!";
  return reqPassword === expectedPassword;
}

// 1. GET: Menü Listesini Getir (Herkes erişebilir, cache-control kapalıdır)
export async function GET() {
  try {
    const menu = await readMenu();
    return NextResponse.json(
      { success: true, data: menu },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// 2. POST: Yeni Ürün Ekle (Şifre Korumalı)
export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ success: false, error: "Yetkisiz erişim. Geçersiz admin şifresi." }, { status: 401 });
  }

  if (process.env.VERCEL === "1") {
    return NextResponse.json({ 
      success: false, 
      error: "Vercel (Serverless) üzerinde dosya yazma yetkisi kısıtlıdır. Lütfen yeni lezzet ekleme işlemini yerel bilgisayarınızda (localhost) yaptıktan sonra Git ile canlıya gönderin." 
    }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { name, nameEn, price, category, description, descriptionEn, allergens, image, active } = body;

    // Girdi kontrolleri
    if (!name || !price || !category) {
      return NextResponse.json({ success: false, error: "İsim, kategori ve fiyat alanları zorunludur." }, { status: 400 });
    }

    const menu = await readMenu();

    // Benzersiz ID oluştur
    const baseId = category + "-" + name.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    let finalId = baseId;
    let counter = 1;
    while (menu.some(item => item.id === finalId)) {
      finalId = `${baseId}-${counter}`;
      counter++;
    }

    const newItem: MenuItem = {
      id: finalId,
      name,
      nameEn: nameEn || name,
      price: Number(price),
      category,
      description: description || "",
      descriptionEn: descriptionEn || "",
      allergens: Array.isArray(allergens) ? allergens : [],
      image: image || "/images/menu/default.webp",
      active: active !== undefined ? active : true,
    };

    menu.push(newItem);
    await writeMenu(menu);

    return NextResponse.json({ success: true, data: newItem });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 3. PUT: Ürün Güncelle (Şifre Korumalı)
export async function PUT(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ success: false, error: "Yetkisiz erişim. Geçersiz admin şifresi." }, { status: 401 });
  }

  if (process.env.VERCEL === "1") {
    return NextResponse.json({ 
      success: false, 
      error: "Vercel (Serverless) üzerinde dosya yazma yetkisi kısıtlıdır. Lütfen güncelleme işlemini yerel bilgisayarınızda (localhost) yaptıktan sonra Git ile canlıya gönderin." 
    }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { id, name, nameEn, price, category, description, descriptionEn, allergens, image, active } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Güncellenecek ürünün ID'si belirtilmelidir." }, { status: 400 });
    }

    const menu = await readMenu();
    const itemIndex = menu.findIndex(item => item.id === id);

    if (itemIndex === -1) {
      return NextResponse.json({ success: false, error: "Güncellenecek ürün bulunamadı." }, { status: 404 });
    }

    // Mevcut değerlerle birleştir ve güncelle
    const updatedItem: MenuItem = {
      ...menu[itemIndex],
      ...(name && { name }),
      ...(nameEn && { nameEn }),
      ...(price !== undefined && { price: Number(price) }),
      ...(category && { category }),
      ...(description !== undefined && { description }),
      ...(descriptionEn !== undefined && { descriptionEn }),
      ...(allergens && { allergens }),
      ...(image !== undefined && { image }),
      ...(active !== undefined && { active }),
    };

    menu[itemIndex] = updatedItem;
    await writeMenu(menu);

    return NextResponse.json({ success: true, data: updatedItem });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 4. DELETE: Ürün Sil (Şifre Korumalı)
export async function DELETE(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ success: false, error: "Yetkisiz erişim. Geçersiz admin şifresi." }, { status: 401 });
  }

  if (process.env.VERCEL === "1") {
    return NextResponse.json({ 
      success: false, 
      error: "Vercel (Serverless) üzerinde dosya silme yetkisi kısıtlıdır. Lütfen silme işlemini yerel bilgisayarınızda (localhost) yaptıktan sonra Git ile canlıya gönderin." 
    }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Silinecek ürünün ID'si belirtilmelidir." }, { status: 400 });
    }

    const menu = await readMenu();
    const itemExists = menu.some(item => item.id === id);

    if (!itemExists) {
      return NextResponse.json({ success: false, error: "Silinecek ürün bulunamadı." }, { status: 404 });
    }

    const updatedMenu = menu.filter(item => item.id !== id);
    await writeMenu(updatedMenu);

    return NextResponse.json({ success: true, message: "Ürün başarıyla silindi." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
