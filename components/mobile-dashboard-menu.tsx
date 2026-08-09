"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon, type IconName } from "./icons";

const items: Array<{ label: string; href: string; icon: IconName }> = [
  { label: "ภาพรวม", href: "/admin#overview", icon: "dashboard" },
  { label: "เพิ่มรายการใหม่", href: "/admin#add-item", icon: "add-circle" },
  { label: "รายการสินค้า", href: "/admin#inventory", icon: "inventory" },
  { label: "การขาย", href: "/admin#sales", icon: "receipt" },
  { label: "ตั้งค่า", href: "/admin#settings", icon: "settings" },
];

export function MobileDashboardMenu() {
  const [open, setOpen] = useState(false);

  return (
    <header className="md:hidden flex justify-between items-center p-gutter border-b border-outline-variant bg-surface-container-low sticky top-0 z-50">
      <h1 className="font-display-lg-mobile text-headline-md text-primary tracking-tight">KORN &amp; COINS</h1>
      <button aria-expanded={open} aria-label={open ? "ปิดเมนู" : "เปิดเมนู"} className="text-on-surface" onClick={() => setOpen((currentOpen) => !currentOpen)} type="button">
        <Icon name={open ? "close" : "menu"} />
      </button>
      {open ? (
        <nav className="absolute top-full left-0 right-0 bg-surface-container-lowest border-b border-outline-variant p-gutter shadow-lg">
          <div className="space-y-3">
            {items.map((item) => (
              <Link key={item.label} className="flex items-center gap-3 font-body-md text-body-md text-on-surface-variant hover:text-primary" href={item.href} onClick={() => setOpen(false)}>
                <Icon name={item.icon} size={20} /> {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
