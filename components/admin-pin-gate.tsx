"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./icons";

interface AdminPinGateProps {
  configured: boolean;
}

export function AdminPinGate({ configured }: AdminPinGateProps) {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      const result: unknown = await response.json().catch(() => null);
      const message = typeof result === "object" && result !== null && "message" in result && typeof result.message === "string"
        ? result.message
        : "ไม่สามารถเข้าสู่ระบบผู้ดูแลได้";

      if (!response.ok) {
        setError(message);
        return;
      }

      router.refresh();
    } catch {
      setError("เชื่อมต่อระบบผู้ดูแลไม่สำเร็จ กรุณาลองใหม่");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background px-gutter py-stack-xl text-on-background">
      <div className="mx-auto flex min-h-[70vh] w-full max-w-md items-center justify-center">
        <section className="w-full border border-outline-variant bg-surface-container-lowest p-stack-lg shadow-xl">
          <div className="mb-stack-lg text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-on-surface text-on-primary">
              <Icon name="shield-check" size={30} />
            </div>
            <p className="font-label-caps text-label-caps tracking-widest text-primary">KORN &amp; COINS ADMIN</p>
            <h1 className="mt-3 font-headline-lg text-headline-lg text-on-surface">พื้นที่ผู้ดูแล</h1>
            <p className="mt-3 font-body-md leading-7 text-on-surface-variant">กรอก PIN ของผู้ดูแลเพื่อเข้าสู่หน้าลงรายการของสะสม</p>
          </div>

          {configured ? (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block font-label-caps text-label-caps text-on-surface-variant" htmlFor="admin-pin">PIN ผู้ดูแล</label>
                <input
                  autoComplete="one-time-code"
                  autoFocus
                  className="w-full border border-outline-variant bg-transparent px-4 py-3 text-center text-xl tracking-[0.45em] text-on-surface outline-none transition-colors focus:border-primary"
                  id="admin-pin"
                  inputMode="numeric"
                  maxLength={12}
                  name="pin"
                  onChange={(event) => setPin(event.target.value.replace(/\D/g, ""))}
                  pattern="[0-9]+"
                  placeholder="••••••"
                  required
                  type="password"
                  value={pin}
                />
              </div>
              {error ? <p className="border border-red-300 bg-red-50 px-4 py-3 text-center font-body-md text-sm text-red-700" role="alert">{error}</p> : null}
              <button className="flex w-full items-center justify-center gap-2 bg-on-surface px-5 py-3 font-label-caps text-label-caps text-on-primary transition-colors hover:bg-primary hover:text-on-surface disabled:cursor-not-allowed disabled:opacity-50" disabled={isSubmitting || pin.length === 0} type="submit">
                {isSubmitting ? "กำลังตรวจสอบ..." : "เข้าสู่พื้นที่ผู้ดูแล"}
                <Icon name="arrow-right" size={16} />
              </button>
            </form>
          ) : (
            <p className="border border-amber-300 bg-amber-50 px-4 py-3 text-center font-body-md text-sm leading-6 text-amber-800" role="alert">
              ระบบผู้ดูแลยังไม่ได้ตั้งค่า PIN กรุณาตั้งค่า <code>ADMIN_PIN</code> และ <code>ADMIN_SESSION_SECRET</code> ก่อนใช้งาน
            </p>
          )}

          <Link className="mt-6 block text-center font-label-caps text-label-caps text-on-surface-variant transition-colors hover:text-primary" href="/">
            กลับหน้าร้าน
          </Link>
        </section>
      </div>
    </main>
  );
}
