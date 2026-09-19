import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "../../../components/icons";
import { CatalogFilter } from "../../../components/catalog-filter";
import { ProductGrid } from "../../../components/product-grid";
import { PublicNav } from "../../../components/public-nav";
import {
  categoryDescriptions,
  categoryLabels,
  isProductCategory,
  type ProductCategory,
} from "../../../components/catalog-data";
import { SiteFooter } from "../../../components/site-footer";
import { getCatalogProducts } from "../../../lib/catalog-repository";

type CatalogPageProps = {
  searchParams: Promise<{ category?: string | string[] }>;
};

function readCategory(value: string | string[] | undefined): ProductCategory | null {
  const category = Array.isArray(value) ? value[0] : value;
  return isProductCategory(category) ? category : null;
}

export async function generateMetadata({ searchParams }: CatalogPageProps): Promise<Metadata> {
  const params = await searchParams;
  const category = readCategory(params.category);
  const title = category ? `${categoryLabels[category]} | KORN & COINS` : "สินค้าทั้งหมด | KORN & COINS";

  return {
    title,
    description: category ? categoryDescriptions[category] : "เลือกชมทองคำ เหรียญ ธนบัตร พระเครื่อง เครื่องประดับ และนาฬิกาหลายรายการจาก KORN & COINS",
  };
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  const selectedCategory = readCategory(params.category);
  const catalogProducts = await getCatalogProducts();
  const products = selectedCategory
    ? catalogProducts.filter((product) => product.category === selectedCategory)
    : catalogProducts;
  const heading = selectedCategory ? categoryLabels[selectedCategory] : "สินค้าทั้งหมด";
  const intro = selectedCategory
    ? categoryDescriptions[selectedCategory]
    : "เลือกชมทองคำ เหรียญ ธนบัตร พระเครื่อง เครื่องประดับ และนาฬิกาหลายรายการ พร้อมรายละเอียดและช่องทางสอบถามกับทีมงาน";

  return (
    <div className="min-h-screen flex flex-col font-body-md">
      <PublicNav active={selectedCategory} searchProducts={catalogProducts} variant="product" mobileMenu />

      <main className="flex-grow">
        <section className="border-b border-outline-variant bg-surface-container-low px-gutter py-12 md:py-stack-xl">
          <div className="mx-auto grid w-full max-w-container grid-cols-1 items-end gap-stack-lg lg:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-stack-md flex items-center gap-2 font-label-caps text-label-caps text-primary">
                <Icon name="category" size={16} />
                <span>KORN &amp; COINS MARKET</span>
              </div>
              <h1 className="font-display-lg text-display-lg-mobile text-on-surface md:text-display-lg">{heading}</h1>
              <p className="mt-stack-sm max-w-2xl font-body-lg text-body-lg text-on-surface-variant">{intro}</p>

              <div className="mt-5 inline-flex items-center gap-2 border border-outline-variant bg-surface-container-lowest px-4 py-2 lg:hidden">
                <Icon name="inventory" size={16} className="text-primary" />
                <p className="font-body-md text-sm text-on-surface">
                  <span className="font-semibold text-primary">{products.length}</span> รายการที่แสดง
                </p>
              </div>
            </div>
            <div className="hidden border-l border-outline-variant pl-5 text-right lg:block">
              <p className="font-label-caps text-label-caps text-on-surface-variant">รายการที่แสดง</p>
              <p className="mt-1 font-headline-lg text-headline-lg text-on-surface">{products.length} รายการ</p>
              <p className="mt-1 font-body-md text-sm text-on-surface-variant">อัปเดตและสอบถามสต็อกกับร้านได้</p>
            </div>
          </div>
        </section>

        <section className="w-full max-w-container mx-auto px-gutter py-12 md:py-stack-xl">
          <div className="mb-stack-lg flex flex-col gap-4 border-b border-outline-variant pb-stack-md md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2" aria-label="ตัวกรองหมวดสินค้า">
              <CatalogFilter href="/watches/rolex-submariner" label="ทั้งหมด" active={!selectedCategory} />
              {(Object.keys(categoryLabels) as ProductCategory[]).map((category) => (
                <CatalogFilter
                  key={category}
                  href={`/watches/rolex-submariner?category=${category}`}
                  label={categoryLabels[category]}
                  active={selectedCategory === category}
                />
              ))}
            </div>
            <Link className="inline-flex items-center gap-2 font-label-caps text-label-caps text-primary hover:text-on-surface" href="/contact">
              ต้องการให้ช่วยคัดเลือก <Icon name="arrow-right" size={16} />
            </Link>
          </div>

          <ProductGrid products={products} />
        </section>
      </main>

      <SiteFooter variant="product" />
    </div>
  );
}
