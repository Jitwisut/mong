"use client";

import Image from "next/image";
import Link from "next/link";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Icon } from "./icons";

export interface WishlistItem {
  id: string;
  name: string;
  price: string;
  image: string;
  slug?: string;
}

interface WishlistContextValue {
  items: WishlistItem[];
  isSaved: (id: string) => boolean;
  toggleItem: (item: WishlistItem) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);
const storageKey = "korn-coins-wishlist";

function isWishlistItem(value: unknown): value is WishlistItem {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;
  return typeof item.id === "string"
    && typeof item.name === "string"
    && typeof item.price === "string"
    && typeof item.image === "string"
    && (item.slug === undefined || typeof item.slug === "string");
}

// localStorage ใช้ไม่ได้ในโหมดส่วนตัวหรือเมื่อเบราว์เซอร์บล็อกการเก็บข้อมูล และค่าที่เก็บไว้
// อาจเสียหายได้ ทุกการอ่าน–เขียนจึงต้องกันพลาดไว้ ไม่เช่นนั้นทั้งเว็บจะพังทั้งหน้า
function readStoredItems(): WishlistItem[] {
  let raw: string | null = null;

  try {
    raw = window.localStorage.getItem(storageKey);
  } catch {
    return [];
  }

  if (!raw) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      throw new Error("รูปแบบข้อมูลรายการโปรดไม่ถูกต้อง");
    }

    return parsed.filter(isWishlistItem);
  } catch {
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      /* ไม่มีอะไรให้ทำต่อถ้าลบไม่ได้ */
    }

    return [];
  }
}

function writeStoredItems(items: WishlistItem[]) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  } catch {
    /* เต็มโควตาหรือถูกบล็อก — รายการโปรดยังใช้ได้ในหน้านี้ */
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  // ต้องเป็น state ไม่ใช่ ref: ถ้าใช้ ref ค่าจะเป็น true ตั้งแต่ effect รอบแรก
  // ทำให้ effect ที่เขียนลง storage เขียนอาเรย์ว่างทับของเดิมก่อนที่ค่าที่โหลดมาจะ render
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readStoredItems());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    writeStoredItems(items);
  }, [hydrated, items]);

  const value = useMemo<WishlistContextValue>(() => ({
    items,
    isSaved: (id) => items.some((item) => item.id === id),
    toggleItem: (item) => {
      setItems((currentItems) => currentItems.some((currentItem) => currentItem.id === item.id)
        ? currentItems.filter((currentItem) => currentItem.id !== item.id)
        : [...currentItems, item]);
    },
  }), [items]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  return context;
}

export function WishlistToggle({
  item,
  className = "",
  ariaLabel,
  showLabel = true,
}: {
  item: WishlistItem;
  className?: string;
  ariaLabel?: string;
  showLabel?: boolean;
}) {
  const { isSaved, toggleItem } = useWishlist();
  const saved = isSaved(item.id);

  return (
    <button aria-label={ariaLabel ?? `${saved ? "นำออกจาก" : "เพิ่มใน"}รายการโปรด: ${item.name}`} aria-pressed={saved} className={`${className} ${saved ? "text-primary" : ""}`} onClick={() => toggleItem(item)} type="button">
      <Icon name="heart" className={saved ? "fill-primary" : ""} />
      {showLabel ? <span>{saved ? "บันทึกแล้ว" : "รายการโปรด"}</span> : null}
    </button>
  );
}

export function WishlistPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items } = useWishlist();

  if (!open) {
    return null;
  }

  return (
    <div className="fixed right-4 top-20 z-[65] w-[min(360px,calc(100vw-2rem))] bg-surface-container-lowest border border-outline-variant shadow-2xl" role="dialog" aria-label="รายการโปรด">
      <div className="flex justify-between items-center p-4 border-b border-outline-variant">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface">รายการโปรด</h2>
          <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">{items.length} รายการ</p>
        </div>
        <button aria-label="ปิดรายการโปรด" className="text-on-surface-variant hover:text-primary" onClick={onClose} type="button">
          <Icon name="close" />
        </button>
      </div>
      <div className="p-4">
        {items.length === 0 ? (
          <div className="text-center py-5">
            <Icon name="heart" className="mx-auto text-primary" size={30} />
            <p className="font-body-md text-on-surface mt-3">ยังไม่มีรายการโปรด</p>
            <p className="font-body-md text-sm text-on-surface-variant mt-1">กดหัวใจเพื่อเก็บรายการที่สนใจไว้ดูภายหลัง</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <Link key={item.id} className="flex items-center gap-3 p-2 hover:bg-surface-container-low transition-colors" href={item.slug ? `/products/${item.slug}` : "/watches/rolex-submariner"} onClick={onClose}>
                <div className="relative w-14 h-14 shrink-0 overflow-hidden bg-surface-container-low">
                  <Image fill className="object-cover" sizes="56px" src={item.image} alt={item.name} />
                </div>
                <span className="min-w-0">
                  <span className="block font-body-md font-semibold text-on-surface truncate">{item.name}</span>
                  <span className="block font-body-md text-sm text-primary mt-1">{item.price}</span>
                </span>
              </Link>
            ))}
          </div>
        )}
        <Link className="mt-4 inline-flex w-full justify-center border border-outline px-4 py-3 font-label-caps text-label-caps text-on-surface hover:bg-surface-container transition-colors" href="/watches/rolex-submariner" onClick={onClose}>
          ดูสินค้าทั้งหมด
        </Link>
      </div>
    </div>
  );
}
