"use client";

import Link, { useLinkStatus } from "next/link";

interface CatalogFilterProps {
  href: string;
  label: string;
  active: boolean;
}

/**
 * ชิปกรองหมวดสินค้า ชี้ไปหน้าแคตตาล็อกที่เรนเดอร์ฝั่งเซิร์ฟเวอร์ทุกครั้ง
 * จึงต้องมีสถานะ "กำลังโหลด" ให้เห็น ไม่งั้นกดแล้วเหมือนไม่มีอะไรเกิดขึ้น
 */
export function CatalogFilter({ href, label, active }: CatalogFilterProps) {
  return (
    <Link
      aria-current={active ? "page" : undefined}
      className={`inline-flex min-h-11 items-center gap-2 border px-4 py-2 font-label-caps text-label-caps transition-all active:scale-95 ${
        active
          ? "border-primary bg-primary text-on-primary"
          : "border-outline text-on-surface hover:border-primary hover:text-primary"
      }`}
      href={href}
    >
      <CatalogFilterLabel active={active} label={label} />
    </Link>
  );
}

function CatalogFilterLabel({ label, active }: { label: string; active: boolean }) {
  const { pending } = useLinkStatus();

  return (
    <>
      {label}
      {pending ? (
        <span
          aria-label="กำลังโหลด"
          className={`inline-block h-3 w-3 shrink-0 animate-spin rounded-full border border-t-transparent ${active ? "border-on-primary" : "border-primary"}`}
          role="status"
        />
      ) : null}
    </>
  );
}
