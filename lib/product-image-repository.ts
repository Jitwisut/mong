import "server-only";

import { postgresPool } from "./postgres";

export interface StoredProductImage {
  mimeType: string;
  bytes: Buffer;
}

export async function saveProductImage(id: string, image: StoredProductImage): Promise<string> {
  if (!postgresPool) {
    throw new Error("DATABASE_NOT_CONFIGURED");
  }

  await postgresPool.query(
    "INSERT INTO product_images (id, mime_type, bytes) VALUES ($1, $2, $3)",
    [id, image.mimeType, image.bytes],
  );

  return id;
}

export async function getProductImage(id: string): Promise<StoredProductImage | null> {
  if (!postgresPool) {
    return null;
  }

  const result = await postgresPool.query<{ mime_type: string; bytes: Buffer }>(
    "SELECT mime_type, bytes FROM product_images WHERE id = $1 LIMIT 1",
    [id],
  );

  const row = result.rows[0];
  return row ? { mimeType: row.mime_type, bytes: row.bytes } : null;
}
