"use client";

import { useState } from "react";
import { Icon } from "./icons";
import { shopContact } from "./site-data";

/**
 * แผนที่ร้าน
 *
 * กล่อง embed บนมือถือกว้างแค่ ~267px ซึ่งเล็กเกินกว่าที่แผงเส้นทางของ Google
 * จะกางได้ พอกด "เส้นทาง" ในตัว embed มันจึงทับแผนที่จนหมดและโดนตัด ใช้งานไม่ได้จริง
 * งานที่ลูกค้าต้องการคือ "ไปยังไง" จึงส่งต่อให้แอป Google Maps ในเครื่องแทน
 * ซึ่งทำเรื่องนี้ได้ดีกว่ากล่องเล็กๆ บนหน้าเว็บ
 *
 * อีกปัญหาคือ iframe กินการลากนิ้ว ทำให้เลื่อนหน้าเว็บไม่ได้เวลานิ้วอยู่บนแผนที่
 * จึงล็อกไม่ให้รับ pointer ไว้ก่อน แล้วให้ผู้ใช้กดเปิดเองเมื่ออยากเลื่อนแผนที่
 */
export function ShopMap() {
  const [interactive, setInteractive] = useState(false);

  return (
    <div className="relative mt-5 -mx-stack-lg -mb-stack-lg border-y border-outline-variant sm:mx-0 sm:mb-0 sm:border">
      <iframe
        className={`block h-[19rem] w-full sm:h-64 ${interactive ? "" : "pointer-events-none"}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={shopContact.mapEmbedUrl}
        title={`แผนที่ร้าน KORN & COINS ${shopContact.addressPlace}`}
      />

      {/* ขอบทองบางๆ ให้แผนที่กลมกลืนกับหน้าโทนเข้ม ไม่บังการกด */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-primary/25" />

      {interactive ? (
        <button
          className="absolute right-3 top-3 inline-flex min-h-11 items-center gap-2 border border-primary/40 bg-surface-dim/90 px-3 font-label-caps text-label-caps text-on-surface backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
          onClick={() => setInteractive(false)}
          type="button"
        >
          <Icon name="close" size={14} /> ล็อกแผนที่
        </button>
      ) : (
        <button
          aria-label="เปิดให้เลื่อนแผนที่ในหน้านี้"
          className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-surface-dim/45 text-on-surface backdrop-blur-[1px] transition-colors hover:bg-surface-dim/30"
          onClick={() => setInteractive(true)}
          type="button"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/50 bg-surface-dim/80 text-primary">
            <Icon name="map-pin" size={20} />
          </span>
          <span className="mt-1 font-label-caps text-label-caps">แตะเพื่อเลื่อนแผนที่</span>
        </button>
      )}

      {/* ปุ่มนำทางอยู่เหนือ overlay เสมอ กดได้ทันทีโดยไม่ต้องปลดล็อกแผนที่ก่อน */}
      <a
        className="absolute inset-x-3 bottom-3 inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-4 font-label-caps text-label-caps text-on-primary shadow-lg transition-colors hover:bg-primary-container hover:text-on-primary-container sm:inset-x-auto sm:left-3"
        href={shopContact.mapDirectionsUrl}
        rel="noreferrer"
        target="_blank"
      >
        <Icon name="map-pin" size={16} /> นำทางไปที่ร้าน
      </a>
    </div>
  );
}
