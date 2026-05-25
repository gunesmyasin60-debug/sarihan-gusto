// src/app/api/admin/upload/route.ts
// Upload API Rotası — Admin panelinden yüklenen görselleri sunucuya kaydeder.
// Görseller 'public/images/menu/' altına kaydedilir.

import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Yardımcı Fonksiyon: Şifre Doğrulaması
function checkAuth(request: NextRequest): boolean {
  const reqPassword = request.headers.get("x-admin-password");
  const expectedPassword = process.env.ADMIN_PASSWORD || "Sarihan123!";
  return reqPassword === expectedPassword;
}

export async function POST(request: NextRequest) {
  // Şifre kontrolü
  if (!checkAuth(request)) {
    return NextResponse.json({ success: false, error: "Yetkisiz erişim. Geçersiz admin şifresi." }, { status: 401 });
  }

  if (process.env.VERCEL === "1") {
    return NextResponse.json({ 
      success: false, 
      error: "Vercel (Serverless) üzerinde görsel yükleme yetkisi kısıtlıdır. Lütfen yeni görselleri yerel bilgisayarınızda (localhost) yükledikten sonra Git ile canlıya gönderin." 
    }, { status: 403 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "Yüklenecek dosya bulunamadı." }, { status: 400 });
    }

    // Dosya boyutu sınırı (Maks 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ success: false, error: "Dosya boyutu çok büyük. Maksimum limit 5MB'dır." }, { status: 400 });
    }

    // İzin verilen formatlar
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".svg"];
    const fileExtension = path.extname(file.name).toLowerCase();
    
    if (!allowedExtensions.includes(fileExtension)) {
      return NextResponse.json({
        success: false, 
        error: `İzin verilmeyen dosya formatı. Sadece şu formatlar desteklenir: ${allowedExtensions.join(", ")}`
      }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // public/images/menu klasörünün varlığını kontrol et, yoksa oluştur
    const uploadDir = path.join(process.cwd(), "public", "images", "menu");
    await fs.mkdir(uploadDir, { recursive: true });

    // Benzersiz ve güvenli bir dosya adı oluştur
    const sanitizedBase = file.name
      .replace(fileExtension, "")
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "")
      .slice(0, 30);
    const uniqueFilename = `${sanitizedBase}-${Date.now()}${fileExtension}`;
    const filePath = path.join(uploadDir, uniqueFilename);

    // Dosyayı diske yaz
    await fs.writeFile(filePath, buffer);

    const relativeUrl = `/images/menu/${uniqueFilename}`;

    return NextResponse.json({
      success: true,
      message: "Görsel başarıyla yüklendi.",
      url: relativeUrl
    });

  } catch (error: any) {
    console.error("Görsel yükleme hatası:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
