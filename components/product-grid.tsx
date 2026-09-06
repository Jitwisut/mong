import type { CatalogProduct } from "./catalog-data";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: CatalogProduct[];
  emptyMessage?: string;
}

export function ProductGrid({ products, emptyMessage = "ยังไม่มีรายการในหมวดนี้" }: ProductGridProps) {
  if (products.length === 0) {
    return <p className="border border-dashed border-outline-variant px-6 py-12 text-center font-body-md text-on-surface-variant">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => <ProductCard key={product.id} product={product} priority={index < 3} />)}
    </div>
  );
}
