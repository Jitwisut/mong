import type { ProductImage } from "./site-data";

export type ProductCategory = "amulets" | "coins" | "collectibles";

export interface CatalogProduct {
  id: string;
  slug: string;
  category: ProductCategory;
  name: string;
  eyebrow: string;
  shortDescription: string;
  description: string;
  price: string;
  status: string;
  image: string;
  gallery: ProductImage[];
  year: string;
  material: string;
  condition: string;
  provenance: string;
}

export const categoryLabels: Record<ProductCategory, string> = {
  amulets: "พระเครื่อง",
  coins: "เหรียญ",
  collectibles: "ของสะสม",
};

export const categoryDescriptions: Record<ProductCategory, string> = {
  amulets: "พระพิมพ์ไทยและวัตถุมงคลคัดสรร พร้อมภาพประกอบสำหรับสอบถามและตรวจสอบองค์จริง",
  coins: "เหรียญไทย เหรียญกษาปณ์ และเหรียญที่ระลึกจากหลายยุคสมัย",
  collectibles: "ของเก่า ของหายาก และของสะสมที่มีเรื่องราวจากหลายยุคสมัย",
};

const galleryImage = (id: number, src: string, alt: string): ProductImage => ({ id, src, alt });

export const catalogProducts: CatalogProduct[] = [
  {
    id: "amulet-phra-pong-suphan",
    slug: "phra-pong-suphan",
    category: "amulets",
    name: "พระผงสุพรรณ พิมพ์คัดสรร",
    eyebrow: "พระเนื้อดิน · รายการอ้างอิง",
    shortDescription: "พระพิมพ์ทรงสามเหลี่ยมจากสายสุพรรณบุรี พร้อมภาพรายละเอียดทั้งด้านหน้าและด้านหลัง",
    description: "รายการภาพอ้างอิงสำหรับผู้ที่กำลังมองหาพระผงสุพรรณ ทีมงาน KORN & COINS จะตรวจสอบองค์จริง รุ่น เนื้อหา และสภาพก่อนสรุปราคาให้ทุกครั้ง",
    price: "สอบถามราคา",
    status: "คัดสรร",
    image: "/images/amulet-phra-pong-suphan.png",
    gallery: [
      galleryImage(0, "/images/amulet-phra-pong-suphan.png", "พระผงสุพรรณหลายองค์บนพื้นสีเข้ม"),
      galleryImage(1, "/images/amulet-closeup.jpg", "ภาพระยะใกล้ของพระเครื่องในตู้จัดแสดง"),
      galleryImage(2, "/images/amulet-boxes.jpg", "พระเครื่องหลายรุ่นในกล่องสะสม"),
      galleryImage(3, "/images/category-amulets-wikimedia.jpg", "พระเครื่องไทยหลายองค์จัดแสดงรวมกัน"),
    ],
    year: "รอตรวจสอบจากองค์จริง",
    material: "เนื้อดิน",
    condition: "รอตรวจสอบองค์จริง",
    provenance: "รับข้อมูลจากผู้สะสมและตรวจสอบก่อนซื้อขาย",
  },
  {
    id: "amulet-somdej-ketchaiyo",
    slug: "somdej-ketchaiyo",
    category: "amulets",
    name: "พระสมเด็จเกศไชโย",
    eyebrow: "พระเนื้อผง · รายการอ้างอิง",
    shortDescription: "พระสมเด็จทรงนิยมสำหรับนักสะสมที่ต้องการเริ่มต้นศึกษาพระเนื้อผงอย่างเป็นระบบ",
    description: "ภาพประกอบจากแหล่งเปิดเพื่อช่วยให้เห็นรูปทรงและรายละเอียดโดยรวม การซื้อขายจริงต้องอาศัยภาพองค์จริงและการตรวจสอบจากทีมงานก่อนทุกครั้ง",
    price: "สอบถามราคา",
    status: "กำลังตรวจสอบ",
    image: "/images/amulet-somdej-ketchaiyo.jpg",
    gallery: [
      galleryImage(0, "/images/amulet-somdej-ketchaiyo.jpg", "พระสมเด็จเกศไชโยในกรอบหลายองค์"),
      galleryImage(1, "/images/amulet-khun-paen-bang-krang.png", "พระเครื่องไทยหลายพิมพ์บนพื้นสีดำ"),
      galleryImage(2, "/images/amulet-boxes.jpg", "กล่องพระเครื่องและวัตถุมงคลหลายแบบ"),
    ],
    year: "รอตรวจสอบจากองค์จริง",
    material: "เนื้อผง",
    condition: "พิจารณาตามองค์จริง",
    provenance: "สอบถามประวัติและใบรับรองเพิ่มเติมได้",
  },
  {
    id: "amulet-khun-paen-bang-krang",
    slug: "khun-paen-bang-krang",
    category: "amulets",
    name: "ขุนแผนวัดบางกร่าง",
    eyebrow: "พระพิมพ์ไทย · รายการอ้างอิง",
    shortDescription: "พระพิมพ์เนื้อดินโทนเก่า เหมาะสำหรับผู้สะสมพระพิมพ์ไทยและผู้เริ่มต้นศึกษาพิมพ์ทรง",
    description: "นำเสนอเป็นรายการตัวอย่างเพื่อให้เห็นความหลากหลายของพระเครื่องในร้าน ราคาจริงขึ้นอยู่กับพิมพ์ เนื้อหา ความสมบูรณ์ และผลตรวจสอบองค์จริง",
    price: "สอบถามราคา",
    status: "มีข้อมูลให้สอบถาม",
    image: "/images/amulet-khun-paen-bang-krang.png",
    gallery: [
      galleryImage(0, "/images/amulet-khun-paen-bang-krang.png", "ขุนแผนวัดบางกร่างและพระพิมพ์ไทยหลายองค์"),
      galleryImage(1, "/images/amulet-phra-pong-suphan.png", "พระเนื้อดินสององค์สำหรับเปรียบเทียบพิมพ์"),
      galleryImage(2, "/images/amulet-closeup.jpg", "วัตถุมงคลในตู้จัดแสดงของร้าน"),
    ],
    year: "รอตรวจสอบจากองค์จริง",
    material: "เนื้อดิน",
    condition: "พิจารณาตามองค์จริง",
    provenance: "สอบถามประวัติการครอบครองได้",
  },
  {
    id: "amulet-case-selection",
    slug: "amulet-case-selection",
    category: "amulets",
    name: "ชุดพระเครื่องในกล่องสะสม",
    eyebrow: "ชุดสะสม · หลายองค์",
    shortDescription: "ชุดพระเครื่องหลายพิมพ์ในกล่อง เหมาะสำหรับผู้ที่ต้องการเริ่มจัดคอลเลกชันของตัวเอง",
    description: "คัดภาพจากบรรยากาศการจัดเก็บพระเครื่องของร้านเพื่อให้เห็นตัวเลือกหลายรูปแบบ ทีมงานช่วยแยกดูเป็นรายองค์และประเมินตามข้อมูลที่มีได้",
    price: "เริ่มต้นสอบถาม",
    status: "หลายรายการ",
    image: "/images/amulet-boxes.jpg",
    gallery: [
      galleryImage(0, "/images/amulet-boxes.jpg", "พระเครื่องหลายองค์ในกล่องกำมะหยี่"),
      galleryImage(1, "/images/shop-counter.jpg", "ตู้จัดแสดงพระและเหรียญภายในร้าน"),
      galleryImage(2, "/images/amulet-closeup.jpg", "รายละเอียดวัตถุมงคลในตู้จัดแสดง"),
    ],
    year: "หลากหลายรุ่น",
    material: "หลากหลายเนื้อ",
    condition: "แตกต่างกันตามองค์",
    provenance: "สอบถามองค์ที่สนใจและประวัติเพิ่มเติมได้",
  },
  {
    id: "amulet-display-selection",
    slug: "amulet-display-selection",
    category: "amulets",
    name: "พระเครื่องคัดสรรจากตู้จัดแสดง",
    eyebrow: "คอลเลกชันหน้าร้าน",
    shortDescription: "พระเครื่องหลายองค์จากคอลเลกชันหน้าร้าน สำหรับนัดชมและขอภาพองค์จริงเพิ่มเติม",
    description: "เลือกชมพระเครื่องหลากหลายรูปแบบจากภาพบรรยากาศหน้าร้านได้ที่นี่ หากสนใจองค์ใดเป็นพิเศษ ติดต่อทีมงานเพื่อขอภาพระยะใกล้และรายละเอียดได้",
    price: "สอบถามราคา",
    status: "นัดชมได้",
    image: "/images/amulets.jpg",
    gallery: [
      galleryImage(0, "/images/amulets.jpg", "พระเครื่องหลายองค์ในตู้จัดแสดง"),
      galleryImage(1, "/images/category-amulets-wikimedia.jpg", "พระเครื่องไทยหลายองค์แขวนเรียงกัน"),
      galleryImage(2, "/images/shop-side.jpg", "มุมจัดแสดงของสะสมภายในร้าน"),
    ],
    year: "หลากหลายยุคสมัย",
    material: "หลากหลายเนื้อ",
    condition: "ตรวจสอบแยกตามองค์",
    provenance: "มีข้อมูลประกอบตามรายการที่สอบถาม",
  },
  {
    id: "coin-red-case-selection",
    slug: "coin-red-case-selection",
    category: "coins",
    name: "เหรียญทองในตลับแดง",
    eyebrow: "เหรียญสะสม · หลายรายการ",
    shortDescription: "เหรียญทองและเหรียญที่ระลึกหลายแบบ จัดเก็บในตลับเพื่อช่วยรักษาสภาพ",
    description: "รวมภาพเหรียญในคอลเลกชันสำหรับผู้ที่กำลังมองหาเหรียญไทยและเหรียญที่ระลึก ทีมงานจะช่วยตรวจสอบปี รุ่น โลหะ และสภาพก่อนเสนอราคา",
    price: "สอบถามราคา",
    status: "หลายรายการ",
    image: "/images/coin-red-case.jpg",
    gallery: [
      galleryImage(0, "/images/coin-red-case.jpg", "เหรียญทองจำนวนมากในตลับสีแดง"),
      galleryImage(1, "/images/coins-overhead.jpg", "เหรียญสะสมจำนวนมากบนถาดสีแดง"),
      galleryImage(2, "/images/coin-medallion.jpg", "เหรียญที่ระลึกในกล่องสะสม"),
    ],
    year: "หลายยุคสมัย",
    material: "โลหะหลายชนิด",
    condition: "คัดสภาพตามรายการ",
    provenance: "สอบถามภาพและข้อมูลรายเหรียญได้",
  },
  {
    id: "thai-coin-overhead-selection",
    slug: "thai-coin-overhead-selection",
    category: "coins",
    name: "เหรียญไทยและเหรียญที่ระลึก",
    eyebrow: "เหรียญหมุนเวียน · เหรียญสะสม",
    shortDescription: "ชุดเหรียญหลากหลายขนาด เหมาะสำหรับผู้เริ่มต้นและนักสะสมที่กำลังจัดหมวดหมู่",
    description: "เหรียญแต่ละรายการมีรายละเอียดแตกต่างกันทั้งปีผลิต โลหะ และสภาพ ภาพนี้ใช้แสดงภาพรวมของสินค้าที่ร้านรับซื้อและจำหน่าย",
    price: "เริ่มต้น 250 บาท",
    status: "พร้อมสอบถาม",
    image: "/images/coins-overhead.jpg",
    gallery: [
      galleryImage(0, "/images/coins-overhead.jpg", "เหรียญไทยหลายชนิดบนถาดสีแดง"),
      galleryImage(1, "/images/category-coins-wikimedia.jpg", "เหรียญไทยหลายชนิดจัดแสดงรวมกัน"),
      galleryImage(2, "/images/coin-red-case.jpg", "เหรียญหลายแบบในตลับเก็บรักษา"),
    ],
    year: "รัชกาลและยุคสมัยหลากหลาย",
    material: "ทองแดง ทองเหลือง และโลหะผสม",
    condition: "มีทั้งหมุนเวียนและสะสม",
    provenance: "สอบถามรายละเอียดและจำนวนที่มีได้",
  },
  {
    id: "coin-medallion-collection",
    slug: "coin-medallion-collection",
    category: "coins",
    name: "เหรียญที่ระลึกในกล่องสะสม",
    eyebrow: "เหรียญที่ระลึก · พร้อมกล่อง",
    shortDescription: "เหรียญที่ระลึกพร้อมกล่อง เหมาะสำหรับเก็บเป็นของที่ระลึกหรือเริ่มสะสมตามโอกาสสำคัญ",
    description: "คัดรายการที่มีบรรจุภัณฑ์และกล่องประกอบไว้ให้เลือกหลายรูปแบบ ทีมงานช่วยตรวจสอบรายละเอียดบนเหรียญและความครบถ้วนของชุดได้",
    price: "สอบถามราคา",
    status: "มีจำนวนจำกัด",
    image: "/images/coin-medallion.jpg",
    gallery: [
      galleryImage(0, "/images/coin-medallion.jpg", "เหรียญที่ระลึกในกล่องสะสม"),
      galleryImage(1, "/images/coin-display.jpg", "เหรียญและวัตถุมงคลในตู้จัดแสดง"),
      galleryImage(2, "/images/coin-red-case.jpg", "เหรียญหลายรุ่นในตลับสีแดง"),
    ],
    year: "ตรวจสอบตามเหรียญ",
    material: "โลหะตามรุ่น",
    condition: "พร้อมกล่องตามรายการ",
    provenance: "สอบถามเอกสารและอุปกรณ์ประกอบได้",
  },
  {
    id: "coin-display-selection",
    slug: "coin-display-selection",
    category: "coins",
    name: "เหรียญสะสมจากตู้จัดแสดง",
    eyebrow: "คอลเลกชันเหรียญหน้าร้าน",
    shortDescription: "ภาพรวมเหรียญหลายชนิดที่จัดแสดงในร้าน เหมาะสำหรับนัดชมและคัดเลือกเป็นชุด",
    description: "รายการนี้ช่วยให้เห็นบรรยากาศและความหลากหลายของเหรียญภายในร้าน เมื่อต้องการซื้อขายจริงทีมงานจะส่งภาพและข้อมูลรายเหรียญให้ตรวจสอบก่อน",
    price: "สอบถามราคา",
    status: "นัดชมได้",
    image: "/images/coin-display.jpg",
    gallery: [
      galleryImage(0, "/images/coin-display.jpg", "เหรียญจำนวนมากในตู้จัดแสดง"),
      galleryImage(1, "/images/coins.jpg", "เหรียญสะสมหลากหลายรูปแบบ"),
      galleryImage(2, "/images/coins-overhead.jpg", "เหรียญสะสมบนถาดสีแดง"),
    ],
    year: "หลายยุคสมัย",
    material: "โลหะหลายชนิด",
    condition: "ตรวจสอบแยกตามรายการ",
    provenance: "นัดหมายเข้าชมและขอข้อมูลเพิ่มเติมได้",
  },
  {
    id: "collectible-amulet-cases",
    slug: "collectible-amulet-cases",
    category: "collectibles",
    name: "กล่องและตลับของสะสม",
    eyebrow: "อุปกรณ์สะสม · ของเก่า",
    shortDescription: "กล่อง ตลับ และบรรจุภัณฑ์เก่าสำหรับจัดเก็บพระเครื่องและเหรียญสะสม",
    description: "ของสะสมบางชิ้นมีคุณค่าจากกล่องและรายละเอียดงานเก็บรักษา รายการนี้รวมภาพหลายแบบเพื่อให้เลือกสอบถามตามขนาดและสภาพที่ต้องการ",
    price: "สอบถามราคา",
    status: "หลายแบบ",
    image: "/images/amulet-boxes.jpg",
    gallery: [
      galleryImage(0, "/images/amulet-boxes.jpg", "กล่องพระเครื่องหลายสีและหลายขนาด"),
      galleryImage(1, "/images/coin-red-case.jpg", "ตลับสีแดงสำหรับเก็บเหรียญ"),
      galleryImage(2, "/images/shop-counter.jpg", "ตู้จัดแสดงของสะสมภายในร้าน"),
    ],
    year: "หลากหลายช่วงเวลา",
    material: "ไม้ ผ้า และพลาสติก",
    condition: "มีทั้งเก่าและใหม่",
    provenance: "สอบถามขนาดและจำนวนที่มีได้",
  },
  {
    id: "collectible-shop-counter",
    slug: "collectible-shop-counter",
    category: "collectibles",
    name: "ของสะสมจากตู้หน้าร้าน",
    eyebrow: "ของเก่า · ของหายาก",
    shortDescription: "วัตถุสะสมหลากหลายชิ้นจากบรรยากาศหน้าร้าน สำหรับผู้ที่ชอบค้นหาของมีเรื่องราว",
    description: "คัดภาพจากหน้าร้านมาเป็นรายการตัวอย่าง ของจริงมีการหมุนเวียนอยู่เสมอ ติดต่อทีมงานเพื่อขอรายการล่าสุดและนัดชมได้",
    price: "สอบถามราคา",
    status: "หมุนเวียนทุกวัน",
    image: "/images/shop-counter.jpg",
    gallery: [
      galleryImage(0, "/images/shop-counter.jpg", "ตู้หน้าร้านที่จัดแสดงพระและเหรียญ"),
      galleryImage(1, "/images/shop-side.jpg", "มุมจัดแสดงของสะสมภายในร้าน"),
      galleryImage(2, "/images/category-collectibles-wikimedia.jpg", "ตู้ไม้โบราณสำหรับจัดแสดงของสะสม"),
    ],
    year: "หลากหลายยุคสมัย",
    material: "หลากหลายวัสดุ",
    condition: "ตรวจสอบตามชิ้นงาน",
    provenance: "แจ้งข้อมูลที่มาเท่าที่มีในแต่ละรายการ",
  },
  {
    id: "collectible-display-cabinet",
    slug: "collectible-display-cabinet",
    category: "collectibles",
    name: "ตู้จัดแสดงของสะสมวินเทจ",
    eyebrow: "เฟอร์นิเจอร์สะสม · ของเก่า",
    shortDescription: "ตู้จัดแสดงสไตล์วินเทจสำหรับผู้ที่ต้องการเพิ่มบรรยากาศให้คอลเลกชันที่บ้าน",
    description: "รายการภาพอ้างอิงสำหรับตู้และเฟอร์นิเจอร์จัดแสดงของสะสม สามารถสอบถามเรื่องขนาด วัสดุ และการขนส่งกับทีมงานได้",
    price: "สอบถามราคา",
    status: "สอบถามสต็อก",
    image: "/images/category-collectibles-wikimedia.jpg",
    gallery: [
      galleryImage(0, "/images/category-collectibles-wikimedia.jpg", "ตู้จัดแสดงไม้โบราณสไตล์วินเทจ"),
      galleryImage(1, "/images/shop-side.jpg", "บรรยากาศมุมจัดแสดงของสะสม"),
      galleryImage(2, "/images/shop-counter.jpg", "ตู้จัดแสดงภายในร้าน KORN & COINS"),
    ],
    year: "ประมาณต้นคริสต์ศตวรรษที่ 19 ตามภาพอ้างอิง",
    material: "ไม้และวัสดุตกแต่ง",
    condition: "ตรวจสอบสภาพชิ้นจริง",
    provenance: "สอบถามรายละเอียดแหล่งที่มาได้",
  },
  {
    id: "collectible-banknote-set",
    slug: "collectible-banknote-set",
    category: "collectibles",
    name: "ธนบัตรและเอกสารสะสม",
    eyebrow: "กระดาษสะสม · ของเก่า",
    shortDescription: "ธนบัตรและเอกสารสะสมสำหรับคนที่ชอบเรื่องราวทางประวัติศาสตร์และการออกแบบ",
    description: "สินค้าในหมวดนี้มีรายละเอียดเรื่องปี พิมพ์ และสภาพกระดาษที่แตกต่างกัน ติดต่อทีมงานเพื่อขอภาพหน้า–หลังและข้อมูลรายใบได้",
    price: "เริ่มต้น 300 บาท",
    status: "พร้อมสอบถาม",
    image: "/images/banknotes.jpg",
    gallery: [
      galleryImage(0, "/images/banknotes.jpg", "ธนบัตรสะสมหลายแบบ"),
      galleryImage(1, "/images/coin-display.jpg", "ของสะสมในตู้จัดแสดง"),
      galleryImage(2, "/images/shop-side.jpg", "บรรยากาศพื้นที่จัดแสดงในร้าน"),
    ],
    year: "หลายยุคสมัย",
    material: "กระดาษและวัสดุพิมพ์",
    condition: "ตรวจสอบตามสภาพกระดาษ",
    provenance: "สอบถามประวัติและรายละเอียดรายใบได้",
  },
];

export const featuredProducts = catalogProducts.slice(0, 6);

export function isProductCategory(value: string | undefined): value is ProductCategory {
  return value === "amulets" || value === "coins" || value === "collectibles";
}

export function getProductBySlug(slug: string) {
  return catalogProducts.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: CatalogProduct, limit = 4) {
  return catalogProducts
    .filter((candidate) => candidate.category === product.category && candidate.id !== product.id)
    .slice(0, limit);
}
