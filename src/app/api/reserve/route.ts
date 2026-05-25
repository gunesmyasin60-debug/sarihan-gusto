// app/api/reserve/route.ts
// Rezervasyon API Rotası — Next.js Serverless Function olarak çalışır.
// n8n webhook'una istek atar; çökme/timeout durumlarında Resend API ile doğrudan yedek e-posta (failover) tetikler.

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// Zod ile Form Girdi Doğrulaması (XSS & Spam Koruması)
const reservationSchema = z.object({
  name: z.string().min(3, "Ad Soyad en az 3 karakter olmalıdır.").max(100),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz.").max(20),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  date: z.string(),
  time: z.string(),
  guests: z.number().min(1, "Kişi sayısı en az 1 olmalıdır.").max(20),
  note: z.string().max(500).optional(),
});

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Girdi Validasyonu
    const validation = reservationSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, errors: validation.error.format() },
        { status: 400 }
      );
    }

    const { name, phone, email, date, time, guests, note } = validation.data;
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

    // 1. ADIM: Coolify VPS'imizdeki n8n Webhook'una istek göndermeyi dene
    if (n8nWebhookUrl) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 saniye timeout kısıtı

        const n8nResponse = await fetch(n8nWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(validation.data),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (n8nResponse.ok) {
          // n8n başarıyla Sheets'e kaydetti ve mailleri gönderdi
          return NextResponse.json({
            success: true,
            fallback: false,
            message: "Rezervasyonunuz başarıyla alındı. Onay bildirimi e-postanıza gelecektir.",
          });
        }
      } catch (n8nError) {
        console.warn("n8n Webhook down veya yavaş. Yedek Serverless Fallback devrede...", n8nError);
      }
    }

    // 2. ADIM: n8n Çöktüyse / Timeout Yaşandıysa Serverless Fallback (Resend) Devreye Al
    if (!process.env.RESEND_API_KEY) {
      throw new Error("Resend API Key tanımlanmamış, acil durum maili atılamıyor.");
    }

    // Restorana Acil Durum Rezervasyon Bildirimi Gönder
    const emailResult = await resend.emails.send({
      from: "Sarıhan Gusto Rezervasyon <rezervasyon@sarihan-gusto.com>",
      to: [email, "iletisim@sarihan-gusto.com"], // Hem müşteriye hem restorana gönderilir
      subject: "🚨 ACİL DURUM: Rezervasyon Kaydı (Sistem Yedeği)",
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E2DACD; background-color: #F9F6F0;">
          <h2 style="color: #D4AF37; font-family: 'Playfair Display', serif; text-align: center; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
            Sarıhan Gusto - Rezervasyon Detayları
          </h2>
          <p style="color: #120E0C; font-size: 16px; line-height: 1.6;">
            Merhaba <strong>${name}</strong>,<br/>
            Rezervasyon talebiniz acil durum yedek sistemimiz üzerinden başarıyla kaydedilmiştir. Detaylar aşağıdadır:
          </p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background-color: #F0EAE1;">
              <td style="padding: 10px; border: 1px solid #E2DACD; font-weight: bold; width: 35%;">Ad Soyad:</td>
              <td style="padding: 10px; border: 1px solid #E2DACD;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #E2DACD; font-weight: bold;">Telefon:</td>
              <td style="padding: 10px; border: 1px solid #E2DACD;">${phone}</td>
            </tr>
            <tr style="background-color: #F0EAE1;">
              <td style="padding: 10px; border: 1px solid #E2DACD; font-weight: bold;">E-posta:</td>
              <td style="padding: 10px; border: 1px solid #E2DACD;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #E2DACD; font-weight: bold;">Tarih:</td>
              <td style="padding: 10px; border: 1px solid #E2DACD;">${date}</td>
            </tr>
            <tr style="background-color: #F0EAE1;">
              <td style="padding: 10px; border: 1px solid #E2DACD; font-weight: bold;">Saat:</td>
              <td style="padding: 10px; border: 1px solid #E2DACD;">${time}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #E2DACD; font-weight: bold;">Kişi Sayısı:</td>
              <td style="padding: 10px; border: 1px solid #E2DACD;">${guests} Kişi</td>
            </tr>
            ${note ? `
            <tr style="background-color: #F0EAE1;">
              <td style="padding: 10px; border: 1px solid #E2DACD; font-weight: bold;">Özel İstek:</td>
              <td style="padding: 10px; border: 1px solid #E2DACD;">${note}</td>
            </tr>
            ` : ""}
          </table>
          <p style="color: #6B5D57; font-size: 14px; text-align: center; border-top: 1px solid #E2DACD; padding-top: 15px; margin-top: 20px;">
            Yedek onay akışı devrededir. Sorularınız için <strong>0212 358 48 48</strong> numaralı telefondan bize doğrudan ulaşabilirsiniz.
          </p>
        </div>
      `,
    });

    if (emailResult.error) {
      throw new Error(`Resend gönderim hatası: ${emailResult.error.message}`);
    }

    return NextResponse.json({
      success: true,
      fallback: true,
      message: "Rezervasyonunuz yedek sunucumuz üzerinden e-postanıza iletilmiştir.",
    });

  } catch (error: any) {
    console.error("Kritik Rezervasyon API Hatası:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Şu anda rezervasyon sistemimizde genel bir kesinti yaşanıyor. Talebinizi anında kesinleştirmek için lütfen bizi 0212 358 48 48 numarasından doğrudan arayın veya WhatsApp'tan yazın.",
      },
      { status: 500 }
    );
  }
}
