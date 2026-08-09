import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryLabels } from "../../../components/catalog-data";
import { Icon } from "../../../components/icons";
import { ProductActions } from "../../../components/product-actions";
import { ProductGallery } from "../../../components/product-gallery";
import { ProductGrid } from "../../../components/product-grid";
import { PublicNav } from "../../../components/public-nav";
import { SiteFooter } from "../../../components/site-footer";
import { getCatalogProductBySlug, getCatalogProducts, getRelatedCatalogProducts } from "../../../lib/catalog-repository";

export const dynamic = "force-dynamic";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getCatalogProductBySlug(slug);

  if (!product) {
    return { title: "ไม่พบสินค้า | KORN & COINS" };
  }

  return {
    title: `${product.name} | KORN & COINS`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | KORN & COINS`,
      description: product.shortDescription,
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getCatalogProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedCatalogProducts(product);
  const catalogProducts = await getCatalogProducts();

  return (
    <div className="min-h-screen flex flex-col font-body-md">
      <PublicNav active={product.category} searchProducts={catalogProducts} variant="product" mobileMenu />

      <main className="flex-grow">
        <div className="w-full max-w-container mx-auto px-gutter py-5">
          <Link className="inline-flex items-center gap-2 font-label-caps text-label-caps text-on-surface-variant transition-colors hover:text-primary" href={`/watches/rolex-submariner?category=${product.category}`}>
            <Icon name="arrow-right" className="rotate-180" size={16} />
            กลับไปดู{categoryLabels[product.category]}ทั้งหมด
          </Link>
        </div>

        <section className="w-full max-w-container mx-auto px-gutter pb-stack-xl">
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 lg:gap-margin-desktop">
            <ProductGallery images={product.gallery} title={product.name} />

            <div className="flex flex-col py-stack-md lg:col-span-5 lg:py-0">
              <div className="mb-stack-md flex items-center gap-2">
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">{product.eyebrow}</span>
                <span className="h-1 w-1 rounded-full bg-outline" />
                <span className="inline-flex items-center gap-1 border border-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                  <Icon name="verified" size={12} /> {product.status}
                </span>
              </div>
              <h1 className="font-display-lg text-display-lg-mobile text-on-surface md:text-display-lg">{product.name}</h1>
              <p className="mt-stack-sm font-body-lg text-body-lg text-on-surface-variant">{product.shortDescription}</p>

              <div className="my-stack-xl">
                <p className="font-headline-lg text-headline-lg text-on-surface">{product.price}</p>
                <p className="mt-1 font-body-md text-sm text-on-surface-variant">ราคาขึ้นอยู่กับรุ่น สภาพ และผลการตรวจสอบองค์จริง</p>
              </div>

              <div className="mb-stack-xl grid grid-cols-2 gap-x-gutter gap-y-stack-md border-y border-outline-variant py-stack-lg">
                <ProductSpec label="หมวดหมู่" value={categoryLabels[product.category]} />
                <ProductSpec label="ปี / รุ่น" value={product.year} />
                <ProductSpec label="วัสดุ" value={product.material} />
                <ProductSpec label="สภาพ" value={product.condition} />
              </div>

              <p className="mb-stack-lg font-body-md leading-7 text-on-surface-variant">{product.description}</p>
              <ProductActions product={product} />

              <div className="mt-stack-xl flex flex-col gap-stack-sm border-t border-outline-variant pt-stack-md text-on-surface-variant">
                <div className="flex items-start gap-3">
                  <Icon name="shield-check" className="mt-0.5 shrink-0 text-primary" />
                  <p className="font-body-md text-body-md">{product.provenance}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="truck" className="mt-0.5 shrink-0" />
                  <p className="font-body-md text-body-md">จัดส่งทั่วประเทศ พร้อมแพ็กสินค้าอย่างเหมาะสมกับของสะสม</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 ? (
          <section className="border-t border-outline-variant bg-surface-container-low px-gutter py-stack-xl">
            <div className="mx-auto w-full max-w-container">
              <div className="mb-stack-lg">
                <p className="font-label-caps text-label-caps text-primary">เลือกชมต่อ</p>
                <h2 className="mt-2 font-headline-lg text-headline-lg text-on-surface">รายการใกล้เคียง</h2>
              </div>
              <ProductGrid products={relatedProducts} />
            </div>
          </section>
        ) : null}
      </main>

      <SiteFooter variant="product" />
    </div>
  );
}

function ProductSpec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 font-label-caps text-label-caps uppercase text-on-surface-variant">{label}</p>
      <p className="font-body-md text-body-md font-medium text-on-surface">{value}</p>
    </div>
  );
}
