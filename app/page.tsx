import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "../components/product-grid";
import { Reveal } from "../components/reveal";
import { PublicNav } from "../components/public-nav";
import { categories, shopGallery } from "../components/site-data";
import { SiteFooter } from "../components/site-footer";
import { getCatalogProducts } from "../lib/catalog-repository";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const catalogProducts = await getCatalogProducts();
  const featuredProducts = catalogProducts.slice(0, 6);

  return (
    <div className="antialiased min-h-screen">
      <PublicNav active="home" mobileMenu searchProducts={catalogProducts} />

      <main>
        <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat object-cover brightness-[0.42] z-0">
            <Image
              priority
              fill
              className="object-cover object-center"
              sizes="100vw"
              src="/images/shop-owner.jpg"
              alt="เจ้าของร้าน KORN & COINS นั่งอยู่ท่ามกลางเหรียญและพระเครื่องสะสม"
            />
          </div>

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
            <Reveal as="h1" className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-primary mb-6 font-thai-support">
              คุณค่าที่กาลเวลาไม่อาจลดทอน
            </Reveal>
            <Reveal
              as="p"
              className="font-body-lg text-body-lg text-on-secondary/90 mb-10 max-w-2xl font-thai-support"
              style={{ transitionDelay: "0.2s" }}
            >
              ศูนย์รวมพระเครื่อง เหรียญ และของสะสม ผ่านการคัดสรร ตรวจสอบ และส่งต่อระหว่างนักสะสม
            </Reveal>
            <Reveal as="div" className="flex flex-col sm:flex-row gap-4" style={{ transitionDelay: "0.4s" }}>
              <Link className="bg-primary-fixed-dim text-on-surface font-label-caps text-label-caps px-8 py-4 hover:bg-on-surface hover:text-on-primary transition-colors duration-300 font-thai-support" href="#categories">
                เลือกชมของสะสม
              </Link>
            </Reveal>
          </div>

          <div className="absolute bottom-10 left-0 w-full px-gutter z-10 hidden md:flex justify-between max-w-container mx-auto text-on-primary font-label-caps text-label-caps opacity-90">
            <div>รับซื้อ–ขายทุกวัน</div>
            <div>ตรวจสอบโดยทีมงาน</div>
            <div>สอบถามได้ทั่วประเทศ</div>
          </div>
        </section>

        <section id="categories" className="py-stack-xl px-gutter max-w-container mx-auto">
          <Reveal as="h2" className="font-headline-lg text-headline-lg text-center mb-stack-lg">
            เลือกชมคอลเลกชัน
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Reveal key={category.id} className="h-80" style={{ transitionDelay: `${category.id - 1}00ms` }}>
                <Link className="group relative h-80 overflow-hidden block" href={category.href}>
                  <Image
                    fill
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    src={category.image}
                    alt={category.alt}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/85 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="font-headline-md text-headline-md text-on-primary mb-2">{category.name}</h3>
                    <p className="font-body-md text-body-md text-on-secondary/80">{category.description}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="products" className="border-y border-outline-variant bg-surface-container-low py-stack-xl px-gutter">
          <div className="max-w-container mx-auto">
            <div className="flex flex-col gap-4 mb-stack-lg md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-label-caps text-label-caps text-primary">KORN &amp; COINS MARKET</p>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mt-2">สินค้าที่คัดสรรไว้ให้ชม</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl">ชมพระเครื่อง เหรียญ และของสะสมหลายรายการในสไตล์แคตตาล็อก พร้อมกดดูรายละเอียดและสอบถามทีมงานได้ทันที</p>
              </div>
              <Link className="inline-flex items-center gap-2 font-label-caps text-label-caps text-primary hover:text-on-surface" href="/watches/rolex-submariner">
                ดูสินค้าทั้งหมด <span aria-hidden="true">→</span>
              </Link>
            </div>
            <ProductGrid products={featuredProducts} />
          </div>
        </section>

        <section id="gallery" className="bg-surface-container-low py-stack-xl px-gutter">
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
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-on-surface/90 to-transparent px-4 pt-10 pb-4">
                    <p className="font-body-md text-body-md text-on-primary">{image.caption}</p>
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
