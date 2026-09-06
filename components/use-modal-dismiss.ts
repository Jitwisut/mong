"use client";

import { useEffect } from "react";

/**
 * พฤติกรรมพื้นฐานที่ทุก modal ควรมี: กด Escape เพื่อปิด และล็อกไม่ให้พื้นหลังเลื่อน
 * ระหว่างที่เปิดอยู่ (สำคัญมากบนมือถือ เพราะพื้นหลังจะเลื่อนหนีใต้ modal)
 */
export function useModalDismiss(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    // ชดเชยความกว้างของ scrollbar ที่หายไป เพื่อไม่ให้เนื้อหากระตุกตอนเปิด modal
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [open, onClose]);
}
