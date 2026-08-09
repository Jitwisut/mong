import { Pool } from "pg";
import { catalogProducts } from "../components/catalog-data";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("ตั้งค่า DATABASE_URL ก่อนรัน npm run db:seed");
}

const pool = new Pool({
  connectionString,
  ssl: process.env.DATABASE_SSL === "false" || /localhost|127\.0\.0\.1/i.test(connectionString)
    ? undefined
    : { rejectUnauthorized: false },
});

const query = `
  INSERT INTO products (
    id, slug, category, name, eyebrow, short_description, description,
    price, status, image, gallery, year, material, condition, provenance
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::jsonb, $12, $13, $14, $15)
  ON CONFLICT (slug) DO UPDATE SET
    category = EXCLUDED.category,
    name = EXCLUDED.name,
    eyebrow = EXCLUDED.eyebrow,
    short_description = EXCLUDED.short_description,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    status = EXCLUDED.status,
    image = EXCLUDED.image,
    gallery = EXCLUDED.gallery,
    year = EXCLUDED.year,
    material = EXCLUDED.material,
    condition = EXCLUDED.condition,
    provenance = EXCLUDED.provenance,
    updated_at = NOW()
`;

try {
  for (const product of catalogProducts) {
    await pool.query(query, [
      product.id,
      product.slug,
      product.category,
      product.name,
      product.eyebrow,
      product.shortDescription,
      product.description,
      product.price,
      product.status,
      product.image,
      JSON.stringify(product.gallery),
      product.year,
      product.material,
      product.condition,
      product.provenance,
    ]);
  }

  console.log(`PostgreSQL seed complete: ${catalogProducts.length} products upserted.`);
} finally {
  await pool.end();
}
