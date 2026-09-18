import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "../components/product-grid";
import { Reveal } from "../components/reveal";
import { PublicNav } from "../components/public-nav";
import { Icon, type IconName } from "../components/icons";
import { categories, shopGallery } from "../components/site-data";
import { SiteFooter } from "../components/site-footer";
import { getCatalogProducts } from "../lib/catalog-repository";

// แคช 5 นาที แล้วให้ revalidatePath() ใน /api/admin/products ล้างแคชทันทีที่เพิ่มสินค้าใหม่
// (เดิมเป็น force-dynamic จึงยิงคิวรีฐานข้อมูลใหม่ทุก request ทั้งที่ข้อมูลแทบไม่เปลี่ยน)
export const revalidate = 300;

const heroHighlights: Array<{ icon: IconName; label: string }> = [
  { icon: "shield-check", label: "ตรวจสอบองค์จริงโดยทีมงานผู้เชี่ยวชาญ" },
  { icon: "truck", label: "รับซื้อ–ขายทุกวัน จัดส่งทั่วประเทศ" },
  { icon: "map-pin", label: "นัดหมายเข้าชมร้านได้โดยตรง" },
];

export default async function HomePage() {
  const catalogProducts = await getCatalogProducts();
  const featuredProducts = catalogProducts.slice(0, 6);

  return (
    <div className="antialiased min-h-screen">
      <PublicNav active="home" mobileMenu searchProducts={catalogProducts} />

      <main>
        <section className="relative w-full border-b border-outline-variant overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
            <div className="relative z-10 flex flex-col justify-center gap-stack-lg bg-surface px-margin-mobile md:px-margin-desktop py-16 lg:py-24 order-2 lg:order-1">
              <div aria-hidden="true" className="pointer-events-none absolute -top-16 -left-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
              <Reveal as="p" className="relative font-label-caps text-label-caps text-primary tracking-[0.2em] font-thai-support">
                KORN &amp; COINS · ศูนย์รวมของสะสม
              </Reveal>
              <Reveal as="h1" className="relative font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface font-thai-support max-w-xl">
                คุณค่าที่กาลเวลาไม่อาจลดทอน
              </Reveal>
              <Reveal
                as="p"
                className="relative font-body-lg text-body-lg text-on-surface-variant max-w-md font-thai-support"
                style={{ transitionDelay: "0.2s" }}
              >
                ศูนย์รวมทองคำ เหรียญ ธนบัตร พระเครื่อง และเครื่องประดับ ผ่านการคัดสรร ตรวจสอบ และส่งต่อระหว่างนักสะสม
              </Reveal>
              <Reveal as="div" className="relative flex flex-wrap gap-4" style={{ transitionDelay: "0.4s" }}>
                <Link className="btn-primary" href="#categories">
                  เลือกชมของสะสม
                </Link>
                <Link className="btn-ghost" href="/contact">
                  นัดหมายเข้าชมร้าน
                </Link>
              </Reveal>
              <Reveal
                as="div"
                className="relative grid grid-cols-1 sm:grid-cols-3 gap-stack-md pt-stack-lg mt-stack-sm border-t border-outline-variant"
                style={{ transitionDelay: "0.5s" }}
              >
                {heroHighlights.map((item) => (
                  <div className="flex items-start gap-3" key={item.label}>
                    <Icon name={item.icon} className="mt-0.5 shrink-0 text-primary" size={18} />
                    <p className="font-body-md text-sm leading-6 text-on-surface-variant font-thai-support">{item.label}</p>
                  </div>
                ))}
              </Reveal>
            </div>

            <div className="relative min-h-[380px] lg:min-h-0 order-1 lg:order-2">
              <Image
                priority
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 50vw, 100vw"
                src="/images/shop-owner.jpg"
                alt="เจ้าของร้าน KORN & COINS นั่งอยู่ท่ามกลางเหรียญและพระเครื่องสะสม"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-surface/70 via-transparent to-surface/20 lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-surface/10" />
              <div aria-hidden="true" className="absolute inset-0 hidden lg:block bg-gradient-to-r from-surface via-surface/0 to-transparent w-24" />
            </div>
          </div>
        </section>

        <section id="categories" className="py-12 md:py-stack-xl px-gutter max-w-container mx-auto">
          <div className="flex flex-col gap-4 mb-stack-lg md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-label-caps text-label-caps text-primary">หมวดหมู่ยอดนิยม</p>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mt-2">เลือกชมคอลเลกชัน</h2>
            </div>
            <Link className="inline-flex items-center gap-2 font-label-caps text-label-caps text-primary hover:text-on-surface" href="/watches/rolex-submariner">
              ดูสินค้าทั้งหมด <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Reveal key={category.id} className="h-80" style={{ transitionDelay: `${category.id - 1}00ms` }}>
                <Link className="group relative h-80 overflow-hidden block border border-outline-variant transition-colors duration-300 hover:border-primary" href={category.href}>
                  <Image
                    fill
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    src={category.image}
                    alt={category.alt}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <span className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center border border-on-surface/30 bg-surface-dim/80 text-on-surface opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Icon name="arrow-right" size={16} />
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-headline-md text-headline-md text-on-surface mb-2">{category.name}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">{category.description}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="products" className="border-y border-outline-variant bg-surface-container-low py-12 md:py-stack-xl px-gutter">
          <div className="max-w-container mx-auto">
            <div className="flex flex-col gap-4 mb-stack-lg md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-label-caps text-label-caps text-primary">KORN &amp; COINS MARKET</p>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mt-2">สินค้าที่คัดสรรไว้ให้ชม</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl">ชมทองคำ เหรียญ ธนบัตร พระเครื่อง และเครื่องประดับหลายรายการในสไตล์แคตตาล็อก พร้อมกดดูรายละเอียดและสอบถามทีมงานได้ทันที</p>
              </div>
              <Link className="inline-flex items-center gap-2 font-label-caps text-label-caps text-primary hover:text-on-surface" href="/watches/rolex-submariner">
                ดูสินค้าทั้งหมด <span aria-hidden="true">→</span>
              </Link>
            </div>
            <ProductGrid products={featuredProducts} />
          </div>
        </section>

        <section id="gallery" className="bg-surface-container-low py-12 md:py-stack-xl px-gutter">
          <div className="max-w-container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-stack-lg items-start mb-stack-lg">
              <Reveal className="bg-surface-container-lowest p-5 border border-outline-variant text-center">
                <Image className="mx-auto w-36 h-36 object-contain" src="/images/brand-logo.jpg" alt="โลโก้ KORN & COINS" width={360} height={360} />
              </Reveal>
              <Reveal>
                <p className="font-label-caps text-label-caps text-primary">KORN &amp; COINS</p>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mt-2">เรื่องราวจากหน้าร้านของเรา</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mt-3">เราเชื่อว่าของสะสมที่ดีไม่ได้มีแค่ราคา แต่มีเรื่องราว ที่มา และความผูกพันของผู้คนอยู่ในทุกชิ้น</p>
              </Reveal>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {shopGallery.map((image) => (
                <Reveal key={image.id} className="group relative h-56 overflow-hidden bg-surface-container-lowest" style={{ transitionDelay: `${image.id * 50}ms` }}>
                  <Image fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" src={image.src} alt={image.alt} />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-4 pt-10 pb-4">
                    <p className="font-body-md text-body-md text-on-surface">{image.caption}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter variant="home" />
    </div>
  );
}
