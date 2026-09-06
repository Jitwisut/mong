import Image from "next/image";
import Link from "next/link";
import { Icon } from "./icons";
import type { CatalogProduct } from "./catalog-data";
import { WishlistToggle } from "./wishlist";

export function ProductCard({ product, priority = false }: { product: CatalogProduct; priority?: boolean }) {
  return (
    <article className="group flex h-full flex-col border border-outline-variant bg-surface-container-lowest transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-container-low">
        <Link className="absolute inset-0 z-0" href={`/products/${product.slug}`} aria-label={`ดูรายละเอียด ${product.name}`}>
          <Image
            priority={priority}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
            src={product.image}
            alt={product.name}
          />
        </Link>
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3 pointer-events-none">
          <span className="bg-secondary/95 px-2 py-1 font-label-caps text-[10px] tracking-widest text-on-secondary">
            {product.status}
          </span>
          <WishlistToggle
            item={product}
            ariaLabel={`เพิ่ม ${product.name} ในรายการโปรด`}
            showLabel={false}
            className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center border border-on-surface/30 bg-surface-dim/80 text-on-surface transition-colors hover:bg-primary hover:text-on-primary hover:border-primary"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-surface-dim/90 px-4 py-3 text-on-surface transition-transform duration-300 group-hover:translate-y-0">
          <span className="inline-flex items-center gap-2 font-label-caps text-label-caps">
            ดูรายละเอียด <Icon name="arrow-right" size={15} />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-label-caps text-[10px] tracking-widest text-primary">{product.eyebrow}</p>
        <Link href={`/products/${product.slug}`} className="mt-2 block">
          <h3 className="font-headline-md text-headline-md text-on-surface transition-colors group-hover:text-primary">{product.name}</h3>
        </Link>
        <p className="mt-2 line-clamp-2 font-body-md text-sm leading-6 text-on-surface-variant">{product.shortDescription}</p>
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-outline-variant pt-4">
          <div>
            <p className="font-label-caps text-[10px] tracking-widest text-on-surface-variant">ราคา</p>
            <p className="mt-1 font-body-md font-semibold text-primary">{product.price}</p>
          </div>
          <Link className="-my-2 inline-flex min-h-11 items-center gap-1 py-2 font-label-caps text-[10px] tracking-widest text-on-surface-variant transition-colors hover:text-primary" href={`/products/${product.slug}`}>
            เปิดรายการ <Icon name="chevron-right" size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
