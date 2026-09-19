import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isAdminSessionValid, ADMIN_SESSION_COOKIE } from "../../../../lib/admin-auth";
import { saveProductImage } from "../../../../lib/product-image-repository";

export const runtime = "nodejs";

// Vercel ตัด request body ที่ใหญ่เกิน ~4.5MB ฝั่งฟอร์มจึงย่อภาพก่อนส่งเสมอ
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  const cookieStore = await cookies();

  if (!isAdminSessionValid(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "ไม่ได้รับอนุญาต" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "ไม่พบไฟล์รูปภาพ" }, { status: 400 });
    }

    if (!allowedMimeTypes.has(file.type)) {
      return NextResponse.json({ error: "รองรับเฉพาะไฟล์ JPEG, PNG และ WebP" }, { status: 415 });
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: "ไฟล์ใหญ่เกิน 4MB กรุณาย่อขนาดก่อนอัปโหลด" }, { status: 413 });
    }

    const id = randomUUID();
    await saveProductImage(id, {
      mimeType: file.type,
      bytes: Buffer.from(await file.arrayBuffer()),
    });

    return NextResponse.json({ url: `/api/images/${id}` }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "DATABASE_NOT_CONFIGURED") {
      return NextResponse.json({ error: "ยังไม่ได้ตั้งค่า DATABASE_URL" }, { status: 503 });
    }

    console.error("Admin image upload failed.", error);
    return NextResponse.json({ error: "อัปโหลดรูปภาพไม่สำเร็จ กรุณาลองใหม่" }, { status: 500 });
  }
}
