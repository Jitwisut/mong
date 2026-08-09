import "server-only";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "korn_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 12;

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "";
}

function signPayload(payload: string) {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
}

function signaturesMatch(actual: string, expected: string) {
  const actualBuffer = Buffer.from(actual, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");

  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

export function isAdminAuthConfigured() {
  return Boolean(process.env.ADMIN_PIN && getSessionSecret());
}

export function isAdminPinValid(pin: string) {
  const expectedPin = process.env.ADMIN_PIN ?? "";
  const actualBuffer = Buffer.from(pin, "utf8");
  const expectedBuffer = Buffer.from(expectedPin, "utf8");

  return expectedBuffer.length > 0 && actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

export function createAdminSession() {
  const expiresAt = Date.now() + ADMIN_SESSION_MAX_AGE * 1000;
  const payload = `v1.${expiresAt}.${randomBytes(16).toString("hex")}`;

  return `${payload}.${signPayload(payload)}`;
}

export function isAdminSessionValid(token: string | undefined) {
  if (!token || !isAdminAuthConfigured()) {
    return false;
  }

  const parts = token.split(".");
  if (parts.length !== 4 || parts[0] !== "v1") {
    return false;
  }

  const expiresAt = Number(parts[1]);
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
    return false;
  }

  const payload = parts.slice(0, 3).join(".");
  return signaturesMatch(parts[3], signPayload(payload));
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  };
}
