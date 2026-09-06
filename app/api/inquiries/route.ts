import { NextResponse } from "next/server";
import { createInquiry, isInquiryKind } from "../../../lib/inquiry-repository";
import { isDatabaseConfigured } from "../../../lib/postgres";

const FIELD_LIMITS = {
  topic: 40,
  name: 120,
  email: 200,
  phone: 40,
  message: 4000,
  productId: 120,
  productName: 200,
  productSlug: 200,
} as const;

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readField(body: JsonRecord, key: keyof typeof FIELD_LIMITS) {
  const value = body[key];
  return typeof value === "string" ? value.trim().slice(0, FIELD_LIMITS[key]) : "";
}

export async function POST(request: Request) {
  // ห้ามตอบสำเร็จถ้าไม่มีที่เก็บข้อมูล ไม่เช่นนั้นข้อความลูกค้าจะหายเงียบๆ
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "ระบบรับข้อความยังไม่พร้อมใช้งาน กรุณาติดต่อร้านโดยตรง" },
      { status: 503 },
    );
  }

  const rawBody: unknown = await request.json().catch(() => null);

  if (!isRecord(rawBody)) {
    return NextResponse.json({ error: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }

  const kind = typeof rawBody.kind === "string" && isInquiryKind(rawBody.kind) ? rawBody.kind : null;
  const name = readField(rawBody, "name");
  const email = readField(rawBody, "email");
  const phone = readField(rawBody, "phone");
  const message = readField(rawBody, "message");

  if (!kind) {
    return NextResponse.json({ error: "ประเภทคำขอไม่ถูกต้อง" }, { status: 400 });
  }

  if (!name) {
    return NextResponse.json({ error: "กรุณาระบุชื่อผู้ติดต่อ" }, { status: 400 });
  }

  if (!email && !phone) {
    return NextResponse.json({ error: "กรุณาระบุอีเมลหรือเบอร์โทรศัพท์อย่างน้อยหนึ่งช่องทาง" }, { status: 400 });
  }

  try {
    const inquiry = await createInquiry({
      kind,
      topic: readField(rawBody, "topic"),
      name,
      email,
      phone,
      message,
      productId: readField(rawBody, "productId"),
      productName: readField(rawBody, "productName"),
      productSlug: readField(rawBody, "productSlug"),
    });

    return NextResponse.json({ ok: true, id: inquiry.id }, { status: 201 });
  } catch (error) {
    console.error("Inquiry create failed.", error);
    return NextResponse.json(
      { error: "บันทึกข้อความไม่สำเร็จ กรุณาติดต่อร้านโดยตรง" },
      { status: 500 },
    );
  }
}
