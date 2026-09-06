import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSession,
  getAdminCookieOptions,
  isAdminAuthConfigured,
  isAdminPinValid,
} from "../../../../lib/admin-auth";
import { checkRateLimit, clearRateLimit, readClientKey } from "../../../../lib/rate-limit";

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function readPin(body: unknown) {
  if (typeof body !== "object" || body === null || !("pin" in body) || typeof body.pin !== "string") {
    return "";
  }

  return body.pin;
}

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json({ message: "ระบบผู้ดูแลยังไม่ได้ตั้งค่า PIN" }, { status: 503 });
  }

  // PIN สั้นและเดาได้ง่าย จึงต้องจำกัดจำนวนครั้งไม่ให้ยิงสุ่มรัวๆ
  const clientKey = readClientKey(request);
  const rateLimit = checkRateLimit(`admin-login:${clientKey}`, MAX_ATTEMPTS, WINDOW_MS);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { message: `ลองผิดหลายครั้งเกินไป กรุณารออีก ${Math.ceil(rateLimit.retryAfterSeconds / 60)} นาที` },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
    );
  }

  const body: unknown = await request.json().catch(() => null);
  if (!isAdminPinValid(readPin(body))) {
    return NextResponse.json({ message: "PIN ไม่ถูกต้อง" }, { status: 401 });
  }

  clearRateLimit(`admin-login:${clientKey}`);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSession(), getAdminCookieOptions());
  return response;
}
