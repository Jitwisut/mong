"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "./icons";

interface DashboardActionsProps {
  title?: string;
  description?: string;
  showListingActions?: boolean;
  onPublish?: () => void;
}

export function DashboardActions({ title = "ลงรายการใหม่", description, showListingActions = true, onPublish }: DashboardActionsProps) {
  // เดิมบรรทัดคำอธิบายเป็น `description ?? status` ซึ่ง description มีค่าเสมอ
  // ทำให้ข้อความตอบกลับของปุ่ม "บันทึกร่าง" ไม่เคยแสดงเลย
  const [status, setStatus] = useState<string | null>(null);

  // ล้างข้อความตอบกลับเมื่อเปลี่ยนหมวด เพื่อไม่ให้ค้างข้ามหน้า
  useEffect(() => {
    setStatus(null);
  }, [title]);

  const saveDraft = () => {
    try {
      window.localStorage.setItem("korn-coins-draft", new Date().toISOString());
      setStatus("บันทึกร่างเรียบร้อยแล้ว");
    } catch {
      setStatus("บันทึกร่างไม่สำเร็จ เบราว์เซอร์ไม่อนุญาตให้เก็บข้อมูล");
    }
  };

  const publishListing = () => {
    if (onPublish) {
      onPublish();
      return;
    }

    setStatus("ส่งรายการให้ทีมงานตรวจสอบแล้ว");
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.assign("/");
  };

  // บนมือถือแถบนี้สูงกว่า 200px และ MobileDashboardMenu ก็ปักที่ top-0 อยู่แล้ว
  // ถ้าปักทั้งคู่จะซ้อนกัน (z-40 มุดใต้ z-50) จึงให้ปักเฉพาะจอ md ขึ้นไป
  return (
    <div className="flex-shrink-0 px-gutter py-stack-md border-b border-outline-variant flex flex-col items-start gap-3 bg-surface-container-lowest static z-40 shadow-[0_4px_40px_-10px_rgba(0,0,0,0.04)] sm:flex-row sm:items-center sm:justify-between md:sticky md:top-0">
      <div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">{title}</h2>
        <p className={`mt-1 font-body-md text-body-md ${status ? "text-primary" : "text-on-surface-variant"}`} role="status">{status ?? description}</p>
      </div>
      <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
        <button className="order-last inline-flex min-h-11 items-center px-3 py-2 font-label-caps text-label-caps tracking-widest text-on-surface-variant transition-colors hover:text-primary sm:order-none" onClick={logout} type="button">ออกจากระบบ</button>
        {showListingActions ? (
          <>
            <button className="flex-1 whitespace-nowrap px-6 py-3 border border-outline text-on-surface font-label-caps text-label-caps hover:bg-surface-container transition-colors sm:flex-none" onClick={saveDraft} type="button">บันทึกร่าง</button>
            <button className="flex-1 inline-flex items-center justify-center gap-2 whitespace-nowrap px-6 py-3 bg-primary text-on-primary font-label-caps text-label-caps hover:bg-primary-container hover:text-on-primary-container transition-colors sm:flex-none" onClick={publishListing} type="button">
              เผยแพร่รายการ <Icon name="arrow-right" size={16} />
            </button>
          </>
        ) : (
          <Link className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap bg-primary px-5 py-3 font-label-caps text-label-caps text-on-primary transition-colors hover:bg-primary-container hover:text-on-primary-container sm:w-auto" href="/admin#add-item">
            เพิ่มรายการใหม่ <Icon name="arrow-right" size={16} />
          </Link>
        )}
      </div>
    </div>
  );
}
