"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent, type RefObject } from "react";
import { categoryLabels, type CatalogProduct, type ProductCategory } from "./catalog-data";
import { DashboardActions } from "./dashboard-actions";
import { Icon, type IconName } from "./icons";
import { MobileDashboardMenu } from "./mobile-dashboard-menu";
import { UploadArea } from "./upload-area";
import type { Inquiry, InquiryCounts } from "../lib/inquiry-repository";

const inquiryKindLabels: Record<Inquiry["kind"], string> = {
  contact: "ติดต่อทั่วไป",
  purchase: "สอบถามเพื่อสั่งซื้อ",
  offer: "ขอประเมินราคา",
};

const sectionLabels = {
  overview: "ภาพรวมผู้ดูแล",
  "add-item": "เพิ่มรายการใหม่",
  inventory: "รายการสินค้า",
  sales: "การขาย",
  settings: "ตั้งค่า",
} as const;

type AdminSection = keyof typeof sectionLabels;

const sectionDescriptions: Record<AdminSection, string> = {
  overview: "จัดการร้านค้าและตรวจสอบรายการจากพื้นที่เดียว",
  "add-item": "เพิ่มข้อมูลของสะสมเข้าสู่รายการเพื่อให้ทีมงานตรวจสอบ",
  inventory: "ดูรายการสินค้าที่แสดงอยู่ในแคตตาล็อกปัจจุบัน",
  sales: "ติดตามคำถาม การนัดหมาย และรายการที่รอการตรวจสอบ",
  settings: "จัดการข้อมูลร้านค้าที่ใช้ในแผงผู้ดูแล",
};

const sidebarItems: Array<{ label: string; section: AdminSection; icon: IconName }> = [
  { label: "ภาพรวม", section: "overview", icon: "dashboard" },
  { label: "เพิ่มรายการใหม่", section: "add-item", icon: "add-circle" },
  { label: "รายการสินค้า", section: "inventory", icon: "inventory" },
  { label: "การขาย", section: "sales", icon: "receipt" },
  { label: "ตั้งค่า", section: "settings", icon: "settings" },
];

function isAdminSection(value: string): value is AdminSection {
  return value in sectionLabels;
}

interface AdminDashboardProps {
  products: CatalogProduct[];
  databaseConfigured: boolean;
  inquiries: Inquiry[];
  inquiryCounts: InquiryCounts;
}

export function AdminDashboard({ products, databaseConfigured, inquiries, inquiryCounts }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState<AdminSection>("overview");
  const addItemFormRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    const syncSectionFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (isAdminSection(hash)) {
        setActiveSection(hash);
      }
    };

    syncSectionFromHash();
    window.addEventListener("hashchange", syncSectionFromHash);
    return () => window.removeEventListener("hashchange", syncSectionFromHash);
  }, []);

  const selectSection = (section: AdminSection) => {
    setActiveSection(section);
  };

  const submitAddItem = () => {
    addItemFormRef.current?.requestSubmit();
  };

  const handleProductCreated = () => {
    setActiveSection("inventory");
    window.history.replaceState(null, "", "#inventory");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-body-md text-on-background antialiased md:flex-row">
      <aside className="hidden w-64 flex-shrink-0 flex-col border-r border-outline-variant bg-surface-container-low md:flex">
        <div className="border-b border-outline-variant p-gutter">
          <h1 className="font-display-lg text-headline-md tracking-tight text-primary">KORN &amp; COINS</h1>
          <p className="mt-2 font-label-caps text-label-caps text-on-surface-variant">พื้นที่ผู้ดูแล</p>
        </div>
        <nav aria-label="เมนูผู้ดูแล" className="flex-1 space-y-1 p-3">
          {sidebarItems.map((item) => {
            const isActive = activeSection === item.section;

            return (
              <Link
                key={item.section}
                aria-current={isActive ? "page" : undefined}
                className={`group flex items-center gap-3 border-l-2 py-2.5 pl-4 pr-3 font-body-md text-body-md transition-colors ${
                  isActive
                    ? "border-primary bg-surface-container text-primary font-semibold"
                    : "border-transparent text-on-surface-variant hover:border-outline-variant hover:bg-surface-container hover:text-primary"
                }`}
                href={`/admin#${item.section}`}
                onClick={() => selectSection(item.section)}
              >
                <Icon name={item.icon} className={isActive ? "text-primary" : "transition-colors group-hover:text-primary"} size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-outline-variant p-gutter">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-outline-variant bg-surface-container-high">
              <Image fill className="object-cover" sizes="40px" src="/images/shop-owner.jpg" alt="เจ้าของร้าน KORN & COINS" />
            </div>
            <div>
              <p className="font-body-md text-body-md font-semibold text-on-surface">ทีมงาน KORN &amp; COINS</p>
              <Link className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary" href="/contact">ติดต่อทีมงาน</Link>
            </div>
          </div>
        </div>
      </aside>

      <MobileDashboardMenu />

      <main className="flex min-h-0 flex-1 flex-col bg-background">
        <DashboardActions
          description={sectionDescriptions[activeSection]}
          onPublish={activeSection === "add-item" ? submitAddItem : undefined}
          showListingActions={activeSection === "add-item"}
          title={sectionLabels[activeSection]}
        />
        <div className="flex-1 overflow-y-auto p-gutter md:p-margin-desktop">
          <div className="mx-auto max-w-5xl pb-stack-xl">
            {activeSection === "overview" ? <AdminOverview onSelect={selectSection} products={products} databaseConfigured={databaseConfigured} /> : null}
            {activeSection === "add-item" ? <AdminAddItemPanel formRef={addItemFormRef} onCreated={handleProductCreated} /> : null}
            {activeSection === "inventory" ? <AdminInventory products={products} /> : null}
            {activeSection === "sales" ? <AdminSales counts={inquiryCounts} databaseConfigured={databaseConfigured} inquiries={inquiries} /> : null}
            {activeSection === "settings" ? <AdminSettings /> : null}
          </div>
        </div>
      </main>
    </div>
  );
}

function AdminOverview({
  onSelect,
  products,
  databaseConfigured,
}: {
  onSelect: (section: AdminSection) => void;
  products: CatalogProduct[];
  databaseConfigured: boolean;
}) {
  const goldCount = products.filter((product) => product.category === "gold").length;
  const coinCount = products.filter((product) => product.category === "coins").length;
  const amuletCount = products.filter((product) => product.category === "amulets").length;
  const jewelryCount = products.filter((product) => product.category === "jewelry").length;
  const watchCount = products.filter((product) => product.category === "watches").length;

  return (
    <section className="space-y-stack-lg" id="overview">
      <div>
        <p className="font-label-caps text-label-caps tracking-widest text-primary">KORN &amp; COINS CONTROL ROOM</p>
        <h2 className="mt-2 font-display-lg text-display-lg-mobile text-on-surface md:text-display-lg">ภาพรวมร้านค้า</h2>
        <p className="mt-3 max-w-2xl font-body-lg text-body-lg leading-7 text-on-surface-variant">เลือกเมนูด้านซ้ายเพื่อจัดการรายการสินค้า ดูข้อมูลการขาย หรือแก้ไขข้อมูลร้านค้าได้ทันที</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <AdminStat icon="inventory" label="รายการทั้งหมด" value={products.length} detail="รายการในแคตตาล็อก" />
        <AdminStat icon="shield" label="ทองคำ" value={goldCount} detail="รายการพร้อมชม" />
        <AdminStat icon="tag" label="เหรียญ,ธนบัตร" value={coinCount} detail="รายการพร้อมชม" />
        <AdminStat icon="landmark" label="พระเครื่อง" value={amuletCount} detail="รายการพร้อมชม" />
        <AdminStat icon="images" label="เครื่องประดับ" value={jewelryCount} detail="รายการพร้อมชม" />
        <AdminStat icon="history" label="นาฬิกา" value={watchCount} detail="รายการพร้อมชม" />
      </div>

      <div className="grid grid-cols-1 gap-gutter lg:grid-cols-2">
        <div className="border border-outline-variant bg-surface-container-lowest p-stack-lg">
          <div className="flex items-center gap-3">
            <Icon name="inventory" className="text-primary" size={24} />
            <h3 className="font-headline-md text-headline-md text-on-surface">ทางลัดสำหรับผู้ดูแล</h3>
          </div>
          <div className="mt-stack-md grid gap-3 sm:grid-cols-2">
            <button className="flex items-center justify-between border border-outline-variant p-4 text-left font-body-md text-on-surface transition-colors hover:border-primary hover:text-primary" onClick={() => onSelect("add-item")} type="button">
              เพิ่มสินค้าใหม่ <Icon name="arrow-right" size={16} />
            </button>
            <button className="flex items-center justify-between border border-outline-variant p-4 text-left font-body-md text-on-surface transition-colors hover:border-primary hover:text-primary" onClick={() => onSelect("inventory")} type="button">
              เปิดรายการสินค้า <Icon name="arrow-right" size={16} />
            </button>
          </div>
        </div>
        <div className="border border-outline-variant bg-surface-container p-stack-lg">
          <div className="flex items-center gap-3">
            <Icon name="shield-check" className="text-primary" size={24} />
            <h3 className="font-headline-md text-headline-md text-on-surface">สถานะระบบ</h3>
          </div>
          <ul className="mt-stack-md space-y-3 font-body-md text-on-surface-variant">
            <li className="flex items-center gap-2"><Icon name="check" className="text-tertiary" size={17} /> PIN ผู้ดูแลทำงานอยู่</li>
            <li className="flex items-center gap-2"><Icon name="check" className="text-tertiary" size={17} /> แคตตาล็อกสินค้าออนไลน์พร้อมใช้งาน</li>
            <li className="flex items-center gap-2"><Icon name="check" className="text-tertiary" size={17} /> {databaseConfigured ? "ตั้งค่า PostgreSQL แล้ว" : "ใช้ข้อมูลตัวอย่างจนกว่าจะตั้งค่า PostgreSQL"}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function AdminStat({ icon, label, value, detail }: { icon: IconName; label: string; value: number; detail: string }) {
  return (
    <div className="border border-outline-variant bg-surface-container-lowest p-5">
      <div className="flex items-start justify-between">
        <p className="font-label-caps text-label-caps tracking-widest text-on-surface-variant">{label}</p>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-primary/30 bg-primary/10 text-primary">
          <Icon name={icon} size={16} />
        </span>
      </div>
      <p className="mt-3 font-display-lg text-display-lg-mobile text-primary">{value}</p>
      <p className="mt-1 font-body-md text-sm text-on-surface-variant">{detail}</p>
    </div>
  );
}

function AdminAddItemPanel({
  formRef,
  onCreated,
}: {
  formRef: RefObject<HTMLFormElement | null>;
  onCreated: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: "success" | "error"; message: string } | null>(null);

  const submitProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    // React ตั้ง event.currentTarget เป็น null หลัง handler จบ จึงต้องเก็บฟอร์มไว้ก่อน await
    const form = event.currentTarget;
    const formData = new FormData(form);
    const categoryMap: Record<string, ProductCategory> = {
      ทองคำ: "gold",
      เหรียญ: "coins",
      ธนบัตร: "coins",
      พระเครื่อง: "amulets",
      วัตถุมงคล: "amulets",
      เครื่องประดับ: "jewelry",
      นาฬิกา: "watches",
    };
    const categoryLabel = String(formData.get("category") ?? "");
    const name = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const category = categoryMap[categoryLabel] ?? categoryLabel;
    // ก่อนหน้านี้สองช่องนี้ถูกกรอกแล้วทิ้งไปเงียบๆ เพราะไม่เคยถูกส่งไปกับคำขอ
    const subcategory = String(formData.get("subcategory") ?? "").trim();
    const listingType = String(formData.get("listing_type") ?? "").trim();
    const rawPrice = String(formData.get("price") ?? "").trim();
    const priceNumber = Number(rawPrice);
    const price = rawPrice && Number.isFinite(priceNumber) && priceNumber > 0
      ? `฿${new Intl.NumberFormat("th-TH").format(priceNumber)}`
      : "สอบถามราคา";

    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: String(formData.get("slug") ?? "").trim(),
          category,
          name,
          eyebrow: [categoryLabel, subcategory].filter(Boolean).join(" · "),
          shortDescription: String(formData.get("shortDescription") ?? "").trim(),
          description,
          image: String(formData.get("image") ?? "").trim(),
          year: String(formData.get("year") ?? "").trim(),
          material: String(formData.get("material") ?? "").trim(),
          condition: String(formData.get("condition") ?? "").trim(),
          status: listingType === "auction" ? "เปิดประมูล" : "ราคาคงที่",
          price,
        }),
      });
      const result: unknown = await response.json().catch(() => null);
      const resultMessage = typeof result === "object" && result !== null && "error" in result && typeof result.error === "string"
        ? result.error
        : "บันทึกสินค้าไม่สำเร็จ";

      if (!response.ok) {
        setFeedback({ tone: "error", message: resultMessage });
        return;
      }

      setFeedback({ tone: "success", message: "เพิ่มสินค้าเข้าสู่ PostgreSQL แล้ว" });
      form.reset();
      onCreated();
    } catch {
      setFeedback({ tone: "error", message: "เชื่อมต่อเซิร์ฟเวอร์ไม่สำเร็จ กรุณาลองใหม่" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="space-y-stack-xl" id="add-item">
      <div>
        <p className="font-label-caps text-label-caps tracking-widest text-primary">รายการใหม่</p>
        <h2 className="mt-2 font-headline-lg text-headline-lg text-on-surface">เพิ่มข้อมูลของสะสม</h2>
        <p className="mt-2 max-w-2xl font-body-md leading-7 text-on-surface-variant">กรอกข้อมูลและเตรียมรูปภาพ จากนั้นกดเผยแพร่เพื่อบันทึกสินค้าเข้าสู่ PostgreSQL</p>
      </div>
      <form ref={formRef} className="space-y-stack-xl" onSubmit={submitProduct}>
        <FormSection icon="category" title="01. การจัดหมวดหมู่">
          <div className="grid grid-cols-1 gap-gutter pt-stack-sm md:grid-cols-2">
            <SelectField id="category" label="หมวดหมู่หลัก" placeholder="เลือกหมวดหมู่..." options={["ทองคำ", "เหรียญ", "ธนบัตร", "พระเครื่อง", "วัตถุมงคล", "เครื่องประดับ", "นาฬิกา"]} required />
            <SelectField id="subcategory" label="หมวดหมู่ย่อย" placeholder="เลือกหมวดหมู่ย่อย..." options={["เหรียญทอง", "เหรียญที่ระลึก", "พระเนื้อผง", "พระเนื้อโลหะ"]} />
          </div>
        </FormSection>

        <FormSection icon="images" title="02. รูปภาพสินค้า" aside="แนะนำภาพความละเอียดสูง">
          <div className="grid h-[400px] grid-cols-3 gap-4 pt-stack-sm">
            <UploadArea className="col-span-2 row-span-2" icon="image-plus" label="อัปโหลดภาพหลัก" detail="JPEG, PNG ไม่เกิน 20MB" large sampleSrc="/images/coins-overhead.jpg" sampleAlt="ภาพตัวอย่างเหรียญสะสม" />
            <UploadArea label="ภาพรายละเอียด" sampleSrc="/images/amulet-closeup.jpg" sampleAlt="ภาพตัวอย่างพระเครื่อง" />
            <UploadArea label="ภาพประกอบ" sampleSrc="/images/coin-medallion.jpg" sampleAlt="ภาพตัวอย่างเหรียญในกล่อง" />
          </div>
          <div className="mt-stack-md">
            <TextField id="image" label="พาธรูปหลักใน public" placeholder="เช่น /images/amulet-closeup.jpg" defaultValue="/images/coins-overhead.jpg" required />
            <p className="mt-2 font-body-md text-sm leading-6 text-on-surface-variant">ตอนนี้ช่องอัปโหลดใช้สำหรับดูตัวอย่างหน้าจอ ให้ใส่พาธรูปที่อยู่ในโฟลเดอร์ <code>public/</code> เพื่อบันทึกลงรายการ</p>
          </div>
        </FormSection>

        <FormSection icon="info" title="03. รายละเอียดวัตถุสะสม">
          <div className="space-y-stack-md pt-stack-sm">
            <TextField id="title" label="ชื่อรายการ" placeholder="เช่น เหรียญทองคำรุ่นหายาก" large required />
            <TextField id="slug" label="Slug สำหรับ URL" placeholder="เช่น phra-somdej-รุ่นพิเศษ" required />
            <TextField id="shortDescription" label="คำอธิบายสั้น" placeholder="ข้อความสั้นสำหรับการ์ดสินค้า" />
            <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
              <TextField id="year" label="ยุค / ปี" placeholder="เช่น พ.ศ. 2500" />
              <TextField id="material" label="วัสดุหลัก" placeholder="เช่น ทองคำ 96.5%" />
              <SelectField id="condition" label="สภาพสินค้า" placeholder="เลือกสภาพสินค้า..." options={["ใหม่ / ไม่ผ่านการใช้งาน", "ดีเยี่ยม", "ดีตามอายุ", "ต้องบูรณะ"]} />
            </div>
          </div>
        </FormSection>

        <FormSection icon="history" title="04. ที่มาและประวัติ">
          <div className="relative pt-stack-sm">
            <label className="absolute left-0 top-0 font-label-caps text-label-caps text-on-surface-variant" htmlFor="description">รายละเอียดและเรื่องราวของชิ้นงาน</label>
            <textarea className="mt-6 w-full resize-y border border-outline-variant bg-transparent p-4 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-0" id="description" name="description" placeholder="เล่าที่มา ประวัติการครอบครอง และจุดเด่นของชิ้นงาน เพื่อช่วยให้นักสะสมตัดสินใจได้อย่างมั่นใจ" rows={6} />
          </div>
        </FormSection>

        <FormSection icon="landmark" title="05. รูปแบบการขาย">
          <div className="grid grid-cols-1 gap-gutter pt-stack-sm md:grid-cols-2">
            <ListingType value="fixed" title="ราคาคงที่" icon="tag" description="กำหนดราคาที่ชัดเจน เหมาะสำหรับชิ้นงานที่มีมูลค่าอ้างอิง" defaultChecked />
            <ListingType value="auction" title="เปิดประมูล" icon="gavel" description="ให้ตลาดเป็นผู้กำหนดราคา พร้อมนัดหมายรอบประมูล" />
          </div>
          <div className="mt-stack-md grid grid-cols-1 gap-gutter md:grid-cols-2">
            <div className="relative pt-6">
              <label className="absolute left-0 top-0 font-label-caps text-label-caps text-on-surface-variant" htmlFor="price">ราคาประเมิน / ราคาที่ต้องการ (บาท)</label>
              <div className="relative flex items-center border-b border-outline-variant focus-within:border-primary">
                <span aria-hidden="true" className="shrink-0 font-headline-lg text-headline-lg text-on-surface-variant">฿</span>
                <input className="admin-price-input w-full border-0 bg-transparent py-2 pl-3 font-headline-lg text-headline-lg text-on-surface focus:border-0 focus:ring-0" id="price" name="price" placeholder="0.00" min="0" step="0.01" type="number" />
              </div>
            </div>
          </div>
        </FormSection>

        {feedback ? <p className={`border-l-2 px-4 py-3 font-body-md text-sm ${feedback.tone === "success" ? "border-primary text-primary" : "border-error text-error"}`} role="status">{feedback.message}</p> : null}
        <button className="inline-flex items-center gap-2 bg-primary px-6 py-3 font-label-caps text-label-caps text-on-primary transition-colors hover:bg-primary-container hover:text-on-primary-container disabled:cursor-wait disabled:opacity-60" disabled={isSubmitting} type="submit">
          {isSubmitting ? "กำลังบันทึก..." : "บันทึกสินค้า"} <Icon name="arrow-right" size={16} />
        </button>
      </form>
    </section>
  );
}

function AdminInventory({ products }: { products: CatalogProduct[] }) {
  return (
    <section className="space-y-stack-lg" id="inventory">
      <div>
        <p className="font-label-caps text-label-caps tracking-widest text-primary">CATALOG INVENTORY</p>
        <h2 className="mt-2 font-display-lg text-display-lg-mobile text-on-surface md:text-display-lg">รายการสินค้าปัจจุบัน</h2>
        <p className="mt-3 max-w-2xl font-body-lg text-body-lg leading-7 text-on-surface-variant">ตรวจสอบรายการที่แสดงอยู่ในหน้าร้าน และกดชื่อสินค้าเพื่อดูหน้ารายละเอียดสาธารณะ</p>
      </div>
      <div className="overflow-x-auto border border-outline-variant bg-surface-container-lowest">
        <table className="min-w-full text-left">
          <thead className="border-b border-outline-variant bg-surface-container-low">
            <tr className="font-label-caps text-label-caps tracking-widest text-on-surface-variant">
              <th className="px-5 py-4">รายการ</th>
              <th className="px-5 py-4">หมวดหมู่</th>
              <th className="px-5 py-4">สถานะ</th>
              <th className="px-5 py-4 text-right">ราคา</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr className="border-b border-outline-variant/70 last:border-0" key={product.id}>
                <td className="px-5 py-4">
                  <Link className="font-body-md font-semibold text-on-surface transition-colors hover:text-primary" href={`/products/${product.slug}`}>{product.name}</Link>
                  <p className="mt-1 max-w-md text-sm text-on-surface-variant">{product.shortDescription}</p>
                </td>
                <td className="whitespace-nowrap px-5 py-4 font-body-md text-sm text-on-surface-variant">{categoryLabels[product.category]}</td>
                <td className="whitespace-nowrap px-5 py-4"><span className="bg-secondary px-2 py-1 font-label-caps text-label-caps tracking-wider text-on-secondary">{product.status}</span></td>
                <td className="whitespace-nowrap px-5 py-4 text-right font-body-md font-semibold text-primary">{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function AdminSales({
  counts,
  inquiries,
  databaseConfigured,
}: {
  counts: InquiryCounts;
  inquiries: Inquiry[];
  databaseConfigured: boolean;
}) {
  return (
    <section className="space-y-stack-lg" id="sales">
      <div>
        <p className="font-label-caps text-label-caps tracking-widest text-primary">SALES WORKSPACE</p>
        <h2 className="mt-2 font-display-lg text-display-lg-mobile text-on-surface md:text-display-lg">การขายและการติดต่อ</h2>
        <p className="mt-3 max-w-2xl font-body-lg text-body-lg leading-7 text-on-surface-variant">ข้อความที่ลูกค้าส่งผ่านหน้าติดต่อและปุ่มสอบถามสินค้าจะมาแสดงที่นี่</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <AdminStat icon="mail" label="สอบถามใหม่" value={counts.new} detail="รอตอบกลับ" />
        <AdminStat icon="receipt" label="ข้อความทั้งหมด" value={counts.total} detail="ตั้งแต่เริ่มใช้งาน" />
        <AdminStat icon="map-pin" label="นัดหมายเข้าชม" value={counts.appointments} detail="รอยืนยันเวลา" />
      </div>

      {!databaseConfigured ? (
        <p className="border-l-2 border-error px-4 py-3 font-body-md text-sm leading-6 text-on-surface-variant" role="alert">
          ยังไม่ได้ตั้งค่า <code>DATABASE_URL</code> ระบบจึงยังรับข้อความจากลูกค้าไม่ได้ — หน้าเว็บจะแจ้งลูกค้าให้ติดต่อร้านโดยตรงแทน
        </p>
      ) : null}

      <div className="overflow-x-auto border border-outline-variant bg-surface-container-lowest">
        <table className="min-w-full text-left">
          <thead className="border-b border-outline-variant bg-surface-container-low">
            <tr className="font-label-caps text-label-caps tracking-widest text-on-surface-variant">
              <th className="px-5 py-4">ผู้ติดต่อ</th>
              <th className="px-5 py-4">ประเภท</th>
              <th className="px-5 py-4">รายการที่สนใจ</th>
              <th className="whitespace-nowrap px-5 py-4 text-right">เมื่อ</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 ? (
              <tr>
                <td className="px-5 py-8 text-center font-body-md text-on-surface-variant" colSpan={4}>ยังไม่มีข้อความจากลูกค้า</td>
              </tr>
            ) : inquiries.map((inquiry) => (
              <tr className="border-b border-outline-variant/70 last:border-0" key={inquiry.id}>
                <td className="px-5 py-4">
                  <p className="font-body-md font-semibold text-on-surface">{inquiry.name}</p>
                  <p className="mt-1 text-sm text-on-surface-variant">
                    {[inquiry.phone, inquiry.email].filter(Boolean).join(" · ") || "ไม่ได้ระบุช่องทางติดต่อ"}
                  </p>
                  {inquiry.message ? <p className="mt-2 max-w-md text-sm text-on-surface-variant">{inquiry.message}</p> : null}
                </td>
                <td className="whitespace-nowrap px-5 py-4 font-body-md text-sm text-on-surface-variant">{inquiryKindLabels[inquiry.kind]}</td>
                <td className="px-5 py-4 font-body-md text-sm text-on-surface-variant">
                  {inquiry.productSlug
                    ? <Link className="text-primary hover:underline" href={`/products/${inquiry.productSlug}`}>{inquiry.productName}</Link>
                    : inquiry.productName || "—"}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-right font-body-md text-sm text-on-surface-variant">
                  {new Date(inquiry.createdAt).toLocaleString("th-TH", { dateStyle: "short", timeStyle: "short" })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function AdminSettings() {
  const [saved, setSaved] = useState(false);

  return (
    <section className="space-y-stack-lg" id="settings">
      <div>
        <p className="font-label-caps text-label-caps tracking-widest text-primary">STORE SETTINGS</p>
        <h2 className="mt-2 font-display-lg text-display-lg-mobile text-on-surface md:text-display-lg">ตั้งค่าข้อมูลร้าน</h2>
        <p className="mt-3 max-w-2xl font-body-lg text-body-lg leading-7 text-on-surface-variant">แก้ไขข้อมูลสำหรับเตรียมเชื่อมเข้าฐานข้อมูลร้านค้าในขั้นถัดไป</p>
      </div>
      <form className="max-w-2xl space-y-stack-lg border border-outline-variant bg-surface-container-lowest p-stack-lg" onSubmit={(event) => { event.preventDefault(); setSaved(true); }}>
        <TextField id="store-name" label="ชื่อร้าน" placeholder="KORN & COINS" />
        <TextField id="store-phone" label="เบอร์โทรศัพท์" placeholder="097-879-8996" />
        <TextField id="store-email" label="อีเมล" placeholder="amkorn.n@gmail.com" />
        <div className="flex flex-wrap items-center gap-4">
          <button className="bg-primary px-5 py-3 font-label-caps text-label-caps text-on-primary transition-colors hover:bg-primary-container hover:text-on-primary-container" type="submit">บันทึกการตั้งค่า</button>
          {saved ? <p className="font-body-md text-sm text-primary" role="status">บันทึกข้อมูลในหน้าจอนี้แล้ว</p> : null}
        </div>
        <p className="border-l-2 border-primary px-4 font-body-md text-sm leading-6 text-on-surface-variant">หมายเหตุ: ตอนนี้ปุ่มนี้เป็นการทำงานระดับหน้าจอเท่านั้น หากต้องการให้ข้อมูลคงอยู่ทุกเครื่อง ต้องเชื่อมฐานข้อมูล</p>
      </form>
    </section>
  );
}

function FormSection({ icon, title, aside, children }: { icon: IconName; title: string; aside?: string; children: React.ReactNode }) {
  return (
    <section className="group space-y-stack-md">
      <div className="flex items-end justify-between border-b border-outline-variant pb-2">
        <h3 className="flex items-center gap-3 font-headline-md text-headline-md text-on-surface"><Icon name={icon} className="text-outline-variant transition-colors group-hover:text-primary" />{title}</h3>
        {aside ? <span className="font-label-caps text-label-caps text-on-surface-variant">{aside}</span> : null}
      </div>
      {children}
    </section>
  );
}

function SelectField({ id, label, placeholder, options, required = false }: { id: string; label: string; placeholder: string; options: string[]; required?: boolean }) {
  return (
    <div className="relative pt-6">
      <label className="absolute left-0 top-0 font-label-caps text-label-caps text-on-surface-variant" htmlFor={id}>{label}</label>
      <select required={required} className="w-full cursor-pointer appearance-none border-b border-outline-variant bg-transparent py-2 font-body-lg text-body-lg text-on-surface focus:border-primary focus:ring-0" defaultValue="" id={id} name={id}>
        <option disabled value="">{placeholder}</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
      <Icon name="chevron-down" className="pointer-events-none absolute right-0 top-8 text-on-surface-variant" />
    </div>
  );
}

function TextField({ id, label, placeholder, large = false, defaultValue, required = false }: { id: string; label: string; placeholder: string; large?: boolean; defaultValue?: string; required?: boolean }) {
  return (
    <div className="relative pt-6">
      <label className="absolute left-0 top-0 font-label-caps text-label-caps text-on-surface-variant" htmlFor={id}>{label}</label>
      <input required={required} defaultValue={defaultValue} className={`w-full border-b border-outline-variant bg-transparent py-2 text-on-surface placeholder:text-outline-variant focus:border-primary focus:ring-0 ${large ? "font-headline-lg text-headline-lg placeholder:font-body-lg placeholder:font-normal" : "font-body-lg text-body-lg"}`} id={id} name={id} placeholder={placeholder} type="text" />
    </div>
  );
}

function ListingType({ value, title, icon, description, defaultChecked = false }: { value: string; title: string; icon: IconName; description: string; defaultChecked?: boolean }) {
  return (
    <label className="cursor-pointer">
      <input defaultChecked={defaultChecked} className="peer sr-only" name="listing_type" type="radio" value={value} />
      <div className="flex h-full flex-col gap-4 border border-outline-variant p-6 transition-all peer-checked:border-primary peer-checked:bg-surface-container-low">
        <div className="flex items-center justify-between"><span className="font-body-md text-body-md font-semibold text-on-surface">{title}</span><Icon name={icon} className="text-outline-variant" /></div>
        <p className="font-body-md text-sm text-on-surface-variant">{description}</p>
      </div>
    </label>
  );
}
