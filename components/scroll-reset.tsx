"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function ScrollResetInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cameFromPopState = useRef(false);

  useEffect(() => {
    const markPopState = () => {
      cameFromPopState.current = true;
    };

    window.addEventListener("popstate", markPopState);
    return () => window.removeEventListener("popstate", markPopState);
  }, []);

  useEffect(() => {
    if (cameFromPopState.current) {
      cameFromPopState.current = false;
      return;
    }

    // เดิมโค้ดนี้บังคับเลื่อนขึ้นบนใหม่ทุกเฟรมนาน 260ms ซึ่งฝืนผู้ใช้ที่เลื่อนจอทันทีหลังเปลี่ยนหน้า
    // ตอนนี้เลื่อนครั้งเดียว แล้วยืนยันอีกครั้งในเฟรมถัดไปเผื่อเนื้อหายังโหลดไม่เสร็จ
    // และยกเลิกทันทีถ้าผู้ใช้เริ่มเลื่อนเอง
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    let cancelled = false;
    const cancel = () => {
      cancelled = true;
    };

    window.addEventListener("wheel", cancel, { passive: true, once: true });
    window.addEventListener("touchstart", cancel, { passive: true, once: true });
    window.addEventListener("keydown", cancel, { once: true });

    const frame = requestAnimationFrame(() => {
      if (!cancelled) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
    };
  }, [pathname, searchParams]);

  return null;
}

export function ScrollReset() {
  return (
    <Suspense fallback={null}>
      <ScrollResetInner />
    </Suspense>
  );
}
