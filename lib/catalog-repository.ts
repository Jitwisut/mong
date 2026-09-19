import "server-only";

import type { ProductImage } from "../components/site-data";
import {
  catalogProducts,
  getProductBySlug,
  getRelatedProducts,
  type CatalogProduct,
  type ProductCategory,
} from "../components/catalog-data";
import { postgresPool } from "./postgres";

interface ProductRow {
  id: string;
  slug: string;
  category: ProductCategory;
  name: string;
  eyebrow: string;
  short_description: string;
  description: string;
  price: string;
  status: string;
  image: string;
  gallery: unknown;
  year: string;
  material: string;
  condition: string;
  provenance: string;
}

export interface CreateCatalogProductInput {
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

function isProductImage(value: unknown): value is ProductImage {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const image = value as Record<string, unknown>;
  return typeof image.id === "number" && typeof image.src === "string" && typeof image.alt === "string";
}

function readGallery(value: unknown, image: string, name: string) {
  const gallery = Array.isArray(value) ? value.filter(isProductImage) : [];

  return gallery.length > 0
    ? gallery
    : [{ id: 0, src: image, alt: name }];
}

function rowToProduct(row: ProductRow): CatalogProduct {
  return {
    id: row.id,
    slug: row.slug,
    category: row.category,
    name: row.name,
    eyebrow: row.eyebrow,
    shortDescription: row.short_description,
    description: row.description,
    price: row.price,
    status: row.status,
    image: row.image,
    gallery: readGallery(row.gallery, row.image, row.name),
    year: row.year,
    material: row.material,
    condition: row.condition,
    provenance: row.provenance,
  };
}

const productColumns = `
  id, slug, category, name, eyebrow, short_description, description,
  price, status, image, gallery, year, material, condition, provenance
`;

export async function getCatalogProducts(): Promise<CatalogProduct[]> {
  if (!postgresPool) {
    return catalogProducts;
  }

  try {
    const result = await postgresPool.query<ProductRow>(
      `SELECT ${productColumns} FROM products ORDER BY created_at DESC, id ASC`,
    );

    return result.rows.map(rowToProduct);
  } catch (error) {
    console.error("Catalog database read failed; using static catalog fallback.", error);
    return catalogProducts;
  }
}

export async function getCatalogProductBySlug(slug: string): Promise<CatalogProduct | undefined> {
  if (!postgresPool) {
    return getProductBySlug(slug);
  }

  try {
    const result = await postgresPool.query<ProductRow>(
      `SELECT ${productColumns} FROM products WHERE slug = $1 LIMIT 1`,
      [slug],
    );

    return result.rows[0] ? rowToProduct(result.rows[0]) : undefined;
  } catch (error) {
    console.error("Catalog product read failed; using static catalog fallback.", error);
    return getProductBySlug(slug);
  }
}

export async function getFeaturedCatalogProducts(limit = 6): Promise<CatalogProduct[]> {
  const products = await getCatalogProducts();
  return products.slice(0, limit);
}

export async function getRelatedCatalogProducts(product: CatalogProduct, limit = 4): Promise<CatalogProduct[]> {
  if (!postgresPool) {
    return getRelatedProducts(product, limit);
  }

  try {
    const result = await postgresPool.query<ProductRow>(
      `SELECT ${productColumns}
       FROM products
       WHERE category = $1 AND id <> $2
       ORDER BY created_at DESC, id ASC
       LIMIT $3`,
      [product.category, product.id, limit],
    );

    return result.rows.map(rowToProduct);
  } catch (error) {
    console.error("Related catalog read failed; using static catalog fallback.", error);
    return getRelatedProducts(product, limit);
  }
}

export async function createCatalogProduct(input: CreateCatalogProductInput): Promise<CatalogProduct> {
  if (!postgresPool) {
    throw new Error("DATABASE_NOT_CONFIGURED");
  }

  const result = await postgresPool.query<ProductRow>(
    `INSERT INTO products (
      id, slug, category, name, eyebrow, short_description, description,
      price, status, image, gallery, year, material, condition, provenance
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::jsonb, $12, $13, $14, $15)
    RETURNING ${productColumns}`,
    [
      input.id,
      input.slug,
      input.category,
      input.name,
      input.eyebrow,
      input.shortDescription,
      input.description,
      input.price,
      input.status,
      input.image,
      JSON.stringify(input.gallery),
      input.year,
      input.material,
      input.condition,
      input.provenance,
    ],
  );

  return rowToProduct(result.rows[0]);
}

export async function deleteCatalogProduct(id: string): Promise<CatalogProduct | null> {
  if (!postgresPool) {
    throw new Error("DATABASE_NOT_CONFIGURED");
  }

  const result = await postgresPool.query<ProductRow>(
    `DELETE FROM products WHERE id = $1 RETURNING ${productColumns}`,
    [id],
  );

  return result.rows[0] ? rowToProduct(result.rows[0]) : null;
}
