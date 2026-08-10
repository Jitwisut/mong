"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { catalogProducts, categoryLabels, type CatalogProduct } from "./catalog-data";
import { Icon } from "./icons";
import { WishlistPanel, useWishlist } from "./wishlist";

export type ActiveNav = "home" | "amulets" | "coins" | "collectibles" | null;
export type PublicNavVariant = "home" | "product" | "contact";

interface PublicNavProps {
  active?: ActiveNav;
  mobileMenu?: boolean;
  variant?: PublicNavVariant;
  searchProducts?: CatalogProduct[];
}

const navItems = [
  { label: "หน้าแรก", href: "/", key: "home" },
  { label: "พระเครื่อง", href: "/watches/rolex-submariner?category=amulets", key: "amulets" },
  { label: "เหรียญ", href: "/watches/rolex-submariner?category=coins", key: "coins" },
  { label: "ของสะสม", href: "/watches/rolex-submariner?category=collectibles", key: "collectibles" },
  { label: "บริการ", href: "/contact", key: "services" },
  { label: "ติดต่อเรา", href: "/contact", key: "contact" },
] as const;

const baseSearchItems = [
  { label: "พระเครื่อง", description: "พระพิมพ์ไทยและวัตถุมงคลคัดสรร", href: "/watches/rolex-submariner?category=amulets" },
  { label: "เหรียญ", description: "เหรียญไทย เหรียญกษาปณ์ และเหรียญที่ระลึก", href: "/watches/rolex-submariner?category=coins" },
  { label: "ของสะสม", description: "ของเก่า ของหายาก และของสะสมจากหลายยุคสมัย", href: "/watches/rolex-submariner?category=collectibles" },
  { label: "บริการรับซื้อ–ขาย", description: "ประเมิน ตรวจสอบ และให้คำปรึกษา", href: "/contact" },
  { label: "ติดต่อ KORN & COINS", description: "สอบถามข้อมูลและนัดหมายเข้าชมร้าน", href: "/contact" },
];

export function PublicNav({ active = null, mobileMenu = true, variant = "home", searchProducts }: PublicNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { items } = useWishlist();
  const isProduct = variant === "product";
  const actionTextClass = variant === "home" ? "text-primary" : variant === "product" ? "text-on-surface" : "text-on-surface-variant";
  const navLinkClass = isProduct ? "hidden md:flex gap-stack-lg items-center" : variant === "contact" ? "hidden md:flex space-x-gutter" : "hidden md:flex space-x-6";
  const searchItems = useMemo(
    () => [
      ...baseSearchItems,
      ...(searchProducts ?? catalogProducts).map((product) => ({
        label: product.name,
        description: `${categoryLabels[product.category]} · ${product.shortDescription}`,
        href: `/products/${product.slug}`,
      })),
    ],
    [searchProducts],
  );
  const filteredSearchItems = useMemo(
    () => searchItems.filter((item) => `${item.label} ${item.description}`.toLowerCase().includes(query.toLowerCase())),
    [query, searchItems],
  );
  const visibleSearchItems = filteredSearchItems.slice(0, 8);

  const closeMobileMenu = () => setMenuOpen(false);
  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const links = navItems.map((item) => {
    const isActive = active === item.key;

    return (
      <Link
        key={item.key}
        className={`font-label-caps text-label-caps transition-colors ${
          isActive
            ? "text-primary border-b border-primary pb-1"
            : "text-on-surface-variant hover:text-primary nav-link"
        }`}
        href={item.href}
        onClick={closeMobileMenu}
      >
        {item.label}
      </Link>
    );
  });

  const brand = (
    <Link href="/" className="font-display-lg text-headline-md text-primary tracking-tight" onClick={closeMobileMenu}>
      KORN &amp; COINS
    </Link>
  );

  return (
    <>
      <nav className={`${variant === "home" ? "glass-nav" : "bg-surface/60 backdrop-blur-md border-b border-outline-variant"} docked full-width top-0 sticky z-50 transition-all duration-300`}>
        <div className="flex justify-between items-center px-gutter py-4 w-full max-w-container mx-auto">
          {isProduct ? (
            <div className="flex items-center gap-stack-lg">
              {brand}
              <div className={navLinkClass}>{links}</div>
            </div>
          ) : (
            <>
              {brand}
              <div className={navLinkClass}>{links}</div>
            </>
          )}

          <div className="flex items-center space-x-4">
            <div className={`${mobileMenu ? "hidden md:flex" : "flex"} space-x-2`}>
              <button aria-label="ค้นหา" className={`hover:opacity-80 transition-all duration-300 active:scale-95 ${actionTextClass}`} onClick={() => setSearchOpen(true)} type="button">
                <Icon name="search" />
              </button>
              <button aria-label="รายการโปรด" aria-expanded={wishlistOpen} className={`relative hover:opacity-80 transition-all duration-300 active:scale-95 ${actionTextClass}`} onClick={() => setWishlistOpen((open) => !open)} type="button">
                <Icon name="heart" />
                {items.length > 0 ? <span className="absolute mt-[-4px] ml-[-7px] bg-primary text-on-primary rounded-full text-[9px] leading-4 min-w-4 h-4">{items.length}</span> : null}
              </button>
              <Link aria-label="ติดต่อเรา" className={`hover:opacity-80 transition-all duration-300 active:scale-95 ${actionTextClass}`} href="/contact">
                <Icon name="user" />
              </Link>
            </div>
            {mobileMenu ? (
              <button aria-expanded={menuOpen} aria-label={menuOpen ? "ปิดเมนู" : "เปิดเมนู"} className="md:hidden text-primary" onClick={() => setMenuOpen((open) => !open)} type="button">
                <Icon name={menuOpen ? "close" : "menu"} />
              </button>
            ) : null}
          </div>
        </div>

        {mobileMenu && menuOpen ? (
          <div className="md:hidden border-t border-outline-variant bg-surface/95 backdrop-blur-md px-gutter py-5 space-y-4">
            <div className="flex flex-col gap-4">{links}</div>
          </div>
        ) : null}
      </nav>

      {searchOpen ? (
        <div className="fixed inset-0 z-[70] bg-black/65 p-4 md:p-10" onClick={closeSearch}>
          <section aria-label="ค้นหาของสะสม" aria-modal="true" className="max-w-2xl mx-auto bg-surface-container-lowest border border-outline-variant shadow-2xl" onClick={(event) => event.stopPropagation()} role="dialog">
            <div className="flex justify-between items-center p-5 border-b border-outline-variant">
              <h2 className="font-headline-md text-headline-md text-on-surface">ค้นหาของสะสม</h2>
              <button aria-label="ปิดหน้าค้นหา" className="text-on-surface-variant hover:text-primary" onClick={closeSearch} type="button">
                <Icon name="close" />
              </button>
            </div>
            <form className="p-5" onSubmit={handleSearchSubmit}>
              <div className="flex items-center gap-3 border-b border-outline-variant pb-2">
                <Icon name="search" className="text-primary" />
                <input autoFocus className="w-full bg-transparent border-0 focus:ring-0 text-body-lg text-on-surface" onChange={(event) => setQuery(event.target.value)} placeholder="เช่น เหรียญ พระเครื่อง หรือบริการ" type="search" value={query} />
              </div>
            </form>
            <div className="px-5 pb-5 space-y-2">
              {visibleSearchItems.length > 0 ? visibleSearchItems.map((item) => (
                <Link key={item.label} className="flex items-center justify-between gap-4 border border-outline-variant p-4 hover:bg-surface-container-low transition-colors" href={item.href} onClick={closeSearch}>
                  <span>
                    <span className="block font-body-md font-semibold text-on-surface">{item.label}</span>
                    <span className="block font-body-md text-sm text-on-surface-variant mt-1">{item.description}</span>
                  </span>
                  <Icon name="chevron-right" className="text-primary shrink-0" size={18} />
                </Link>
              )) : <p className="font-body-md text-on-surface-variant py-4">ไม่พบรายการที่ค้นหา</p>}
              {filteredSearchItems.length > visibleSearchItems.length ? <p className="pt-2 text-center font-label-caps text-[10px] tracking-widest text-on-surface-variant">แสดง 8 รายการแรก · พิมพ์ชื่อสินค้าเพื่อค้นหาให้เจาะจงขึ้น</p> : null}
            </div>
          </section>
        </div>
      ) : null}

      <WishlistPanel open={wishlistOpen} onClose={() => setWishlistOpen(false)} />
    </>
  );
}
