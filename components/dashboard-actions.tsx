"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "./icons";

interface DashboardActionsProps {
  title?: string;
  description?: string;
  showListingActions?: boolean;
  onPublish?: () => void;
}

export function DashboardActions({ title = "ลงรายการใหม่", description, showListingActions = true, onPublish }: DashboardActionsProps) {
  const [status, setStatus] = useState("บันทึกร่างล่าสุดเมื่อสักครู่");

  const saveDraft = () => {
    window.localStorage.setItem("korn-coins-draft", new Date().toISOString());
    setStatus("บันทึกร่างเรียบร้อยแล้ว");
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

  return (
    <div className="flex-shrink-0 px-gutter py-stack-md border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest sticky top-0 md:top-0 z-40 shadow-[0_4px_40px_-10px_rgba(0,0,0,0.04)]">
      <div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">{title}</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1" role="status">{description ?? status}</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="hidden px-3 py-2 font-label-caps text-[10px] tracking-widest text-on-surface-variant transition-colors hover:text-primary sm:inline-flex" onClick={logout} type="button">ออกจากระบบ</button>
        {showListingActions ? (
          <>
            <button className="px-6 py-3 border border-outline text-on-surface font-label-caps text-label-caps hover:bg-surface-container transition-colors" onClick={saveDraft} type="button">บันทึกร่าง</button>
            <button className="px-6 py-3 bg-on-surface text-on-secondary font-label-caps text-label-caps hover:bg-primary transition-colors flex items-center gap-2" onClick={publishListing} type="button">
              เผยแพร่รายการ <Icon name="arrow-right" size={16} />
            </button>
          </>
        ) : (
          <Link className="inline-flex items-center gap-2 bg-on-surface px-5 py-3 font-label-caps text-label-caps text-on-primary transition-colors hover:bg-primary hover:text-on-surface" href="/admin#add-item">
            เพิ่มรายการใหม่ <Icon name="arrow-right" size={16} />
          </Link>
        )}
      </div>
    </div>
  );
}
