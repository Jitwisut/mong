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
    <div className="flex-shrink-0 px-gutter py-stack-md border-b border-outline-variant flex flex-col items-start gap-3 bg-surface-container-lowest sticky top-0 z-40 shadow-[0_4px_40px_-10px_rgba(0,0,0,0.04)] sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">{title}</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1" role="status">{description ?? status}</p>
      </div>
      <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
        <button className="hidden px-3 py-2 font-label-caps text-[10px] tracking-widest text-on-surface-variant transition-colors hover:text-primary sm:inline-flex" onClick={logout} type="button">ออกจากระบบ</button>
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
