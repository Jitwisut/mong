"use client";

import { FormEvent, useState } from "react";
import { Icon } from "./icons";
import { WishlistToggle } from "./wishlist";

interface ProductActionsProps {
  product: {
    id: string;
    slug?: string;
    name: string;
    price: string;
    image: string;
  };
}

type DialogMode = "purchase" | "offer" | null;

export function ProductActions({ product }: ProductActionsProps) {
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [submitted, setSubmitted] = useState(false);

  const closeDialog = () => {
    setDialogMode(null);
    setSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <div className="flex flex-col gap-stack-md mt-auto">
        <button className="btn-primary w-full" onClick={() => setDialogMode("purchase")} type="button">สอบถามเพื่อสั่งซื้อ</button>
        <div className="grid grid-cols-2 gap-stack-md">
          <button className="btn-ghost w-full" onClick={() => setDialogMode("offer")} type="button">ขอประเมินราคา</button>
          <WishlistToggle item={product} className="btn-ghost w-full flex items-center justify-center gap-2 group" />
        </div>
      </div>

      {dialogMode ? (
        <div className="fixed inset-0 z-[80] bg-on-surface/60 p-4 md:p-10 flex items-center justify-center" onClick={closeDialog}>
          <section aria-label={dialogMode === "purchase" ? "สอบถามเพื่อสั่งซื้อ" : "ขอประเมินราคา"} aria-modal="true" className="w-full max-w-lg bg-surface-container-lowest border border-outline-variant shadow-2xl" onClick={(event) => event.stopPropagation()} role="dialog">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <div>
                <p className="font-label-caps text-label-caps text-primary">KORN &amp; COINS</p>
                <h2 className="font-headline-md text-headline-md text-on-surface mt-1">{dialogMode === "purchase" ? "สอบถามเพื่อสั่งซื้อ" : "ขอประเมินราคา"}</h2>
              </div>
              <button aria-label="ปิดหน้าต่าง" className="text-on-surface-variant hover:text-primary" onClick={closeDialog} type="button">
                <Icon name="close" />
              </button>
            </div>
            {submitted ? (
              <div className="p-8 text-center">
                <Icon name="check" className="mx-auto text-primary" size={42} />
                <h3 className="font-headline-md text-headline-md text-on-surface mt-4">ส่งข้อมูลเรียบร้อยแล้ว</h3>
                <p className="font-body-md text-on-surface-variant mt-2">ทีมงานจะติดต่อกลับโดยเร็วที่สุดที่หมายเลขหรืออีเมลที่แจ้งไว้</p>
                <button className="mt-6 btn-ghost" onClick={closeDialog} type="button">ปิดหน้าต่าง</button>
              </div>
            ) : (
              <form className="p-5 space-y-5" onSubmit={handleSubmit}>
                <div className="bg-surface-container-low p-4">
                  <p className="font-label-caps text-label-caps text-on-surface-variant">รายการที่สนใจ</p>
                  <p className="font-body-md font-semibold text-on-surface mt-1">{product.name}</p>
                  <p className="font-body-md text-primary mt-1">{product.price}</p>
                </div>
                <label className="block">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">ชื่อผู้ติดต่อ</span>
                  <input required className="input-minimal w-full text-body-md text-on-surface mt-2 focus:ring-0" placeholder="เช่น คุณกมล" type="text" />
                </label>
                <label className="block">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">เบอร์โทรศัพท์</span>
                  <input required className="input-minimal w-full text-body-md text-on-surface mt-2 focus:ring-0" placeholder="08x-xxx-xxxx" type="tel" />
                </label>
                <label className="block">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">ข้อความเพิ่มเติม</span>
                  <textarea className="input-minimal w-full text-body-md text-on-surface mt-2 focus:ring-0 resize-y" placeholder="ระบุรุ่นหรือรายละเอียดที่ต้องการสอบถาม" rows={3} />
                </label>
                <button className="btn-primary w-full flex items-center justify-center gap-2" type="submit">
                  ส่งข้อมูลให้ทีมงาน <Icon name="send" size={16} />
                </button>
              </form>
            )}
          </section>
        </div>
      ) : null}
    </>
  );
}
