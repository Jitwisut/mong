import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSession,
  getAdminCookieOptions,
  isAdminAuthConfigured,
  isAdminPinValid,
} from "../../../../lib/admin-auth";

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

  const body: unknown = await request.json().catch(() => null);
  if (!isAdminPinValid(readPin(body))) {
    return NextResponse.json({ message: "PIN ไม่ถูกต้อง" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSession(), getAdminCookieOptions());
  return response;
}
