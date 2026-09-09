export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  alt: string;
  href: string;
}

export interface ProductImage {
  id: number;
  src: string;
  alt: string;
  /** ระบุ "video" เมื่อ src เป็นไฟล์วิดีโอ (ค่าเริ่มต้นคือรูปภาพ) */
  kind?: "image" | "video";
  /** รูปปกสำหรับรายการวิดีโอ ใช้แสดงเป็นภาพนิ่งก่อนกดเล่น */
  poster?: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

const mapQuery = "ห้างสรรพสินค้าพันธุ์ทิพย์ งามวงศ์วาน";

export const shopContact = {
  phone: "097-879-8996",
  phoneHref: "tel:0978798996",
  email: "amkorn.n@gmail.com",
  emailHref: "mailto:amkorn.n@gmail.com",
  addressFloor: "ชั้น 7",
  addressPlace: "ห้างสรรพสินค้าพันธุ์ทิพย์ งามวงศ์วาน",
  mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`,
  // ใช้ embed แบบไม่ต้องมี API key เพื่อไม่ต้องผูกกับบัญชี Google Cloud
  mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&hl=th&z=17&output=embed`,
  // ลิงก์นำทางตรง บนมือถือจะเปิดแอป Google Maps ซึ่งใช้ดูเส้นทางได้จริง
  // (แผงเส้นทางในกล่อง embed เล็กๆ ใช้งานไม่ได้บนจอมือถือ)
  mapDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`,
};

export interface SocialLink {
  key: string;
  label: string;
  handle: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { key: "facebook", label: "Facebook", handle: "Kornandcoins", href: "https://www.facebook.com/Kornandcoins" },
  { key: "instagram", label: "Instagram", handle: "@kornandcoins", href: "https://www.instagram.com/kornandcoins" },
  { key: "tiktok", label: "TikTok", handle: "@kornandcoins", href: "https://www.tiktok.com/@kornandcoins" },
  { key: "line", label: "LINE Official", handle: "@kornandcoins", href: "https://line.me/R/ti/p/%40kornandcoins" },
];

export const categories: Category[] = [
  {
    id: 1,
    name: "พระเครื่อง",
    description: "พระพิมพ์ไทยและวัตถุมงคลคัดสรร พร้อมคำแนะนำจากผู้เชี่ยวชาญ",
    image: "/images/category-amulets-wikimedia.jpg",
    alt: "พระพิมพ์ไทยและพระเครื่องหลายองค์แขวนเรียงกัน",
    href: "/watches/rolex-submariner?category=amulets",
  },
  {
    id: 2,
    name: "เหรียญ",
    description: "เหรียญไทย เหรียญกษาปณ์ และเหรียญที่ระลึกจากหลายยุคสมัย",
    image: "/images/category-coins-wikimedia.jpg",
    alt: "เหรียญไทยหลายชนิดจัดแสดงรวมกัน",
    href: "/watches/rolex-submariner?category=coins",
  },
  {
    id: 3,
    name: "ของสะสม",
    description: "ของเก่า ของหายาก และของสะสมที่มีเรื่องราวจากหลายยุคสมัย",
    image: "/images/category-collectibles-wikimedia.jpg",
    alt: "ตู้ไม้โบราณสำหรับจัดแสดงของสะสมและวัตถุเก่า",
    href: "/watches/rolex-submariner?category=collectibles",
  },
];

export const productImages: ProductImage[] = [
  {
    id: 0,
    src: "/images/coins-overhead.jpg",
    alt: "เหรียญสะสมจำนวนมากบนถาดสีแดง",
  },
  {
    id: 1,
    src: "/images/amulet-closeup.jpg",
    alt: "ภาพระยะใกล้ของพระเครื่องในตู้จัดแสดง",
  },
  {
    id: 2,
    src: "/images/coin-red-case.jpg",
    alt: "เหรียญทองในตลับสีแดงจำนวนมาก",
  },
  {
    id: 3,
    src: "/images/coin-medallion.jpg",
    alt: "เหรียญที่ระลึกในกล่องสะสม",
  },
  {
    id: 4,
    src: "/images/amulet-boxes.jpg",
    alt: "พระเครื่องหลายรุ่นในกล่องสะสม",
  },
  {
    id: 5,
    src: "/images/coin-display.jpg",
    alt: "เหรียญและวัตถุมงคลในตู้จัดแสดง",
  },
];

export const shopGallery: GalleryImage[] = [
  {
    id: 1,
    src: "/images/shop-owner-alt.jpg",
    alt: "เจ้าของร้าน KORN & COINS ในร้าน",
    caption: "ประสบการณ์จริงจากคนรักของสะสม",
  },
  {
    id: 2,
    src: "/images/shop-working.jpg",
    alt: "ผู้เชี่ยวชาญกำลังตรวจสอบเหรียญในร้าน",
    caption: "ตรวจสอบอย่างละเอียดก่อนส่งต่อ",
  },
  {
    id: 3,
    src: "/images/shop-side.jpg",
    alt: "บรรยากาศมุมจัดแสดงของสะสมในร้าน",
    caption: "พื้นที่สำหรับนักสะสมทุกคน",
  },
  {
    id: 4,
    src: "/images/coin-display.jpg",
    alt: "เหรียญจำนวนมากในตลับจัดแสดง",
    caption: "คัดสรรของสะสมหลากหลายประเภท",
  },
  {
    id: 5,
    src: "/images/coin-red-case.jpg",
    alt: "เหรียญทองในตลับสีแดง",
    caption: "เหรียญหายากสำหรับผู้สะสม",
  },
  {
    id: 6,
    src: "/images/amulet-boxes.jpg",
    alt: "พระเครื่องในกล่องหลายรูปแบบ",
    caption: "วัตถุมงคลพร้อมเรื่องราว",
  },
];

export const productImageDescriptions: Record<number, string> = {
  0: "เหรียญสะสมและวัตถุมงคลที่คัดเลือกจากคอลเลกชันของ KORN & COINS เหมาะสำหรับผู้เริ่มต้นและนักสะสมที่กำลังมองหาของหายาก",
  1: "รายละเอียดของวัตถุมงคลในตู้จัดแสดง เห็นพื้นผิวและองค์ประกอบของชิ้นงานอย่างชัดเจน",
  2: "เหรียญทองหลายแบบจัดเก็บในตลับอย่างเป็นระเบียบ เหมาะสำหรับการเก็บรักษาระยะยาว",
  3: "เหรียญที่ระลึกในกล่องสะสม ใช้เป็นภาพประกอบสำหรับการสอบถามรายละเอียดและประเมินราคา",
  4: "พระเครื่องหลายรุ่นในกล่องสะสม พร้อมให้ทีมงานช่วยตรวจสอบและให้คำแนะนำ",
  5: "บรรยากาศการจัดแสดงเหรียญและวัตถุมงคลภายในร้าน",
};

export const featuredProduct = {
  id: "featured-collection",
  name: "เหรียญสะสมและพระเครื่องคัดสรร",
  price: "สอบถามราคา",
  image: productImages[0].src,
};
