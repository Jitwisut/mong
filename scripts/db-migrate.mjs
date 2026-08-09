import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import pg from "pg";

const { Client } = pg;
const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("ตั้งค่า DATABASE_URL หรือ DIRECT_URL ก่อนรัน npm run db:migrate");
}

const migrationPath = resolve(process.cwd(), "db/migrations/001_create_products.sql");
const migration = await readFile(migrationPath, "utf8");
const statements = migration
  .split(/;\s*(?:\n|$)/)
  .map((statement) => statement.trim())
  .filter(Boolean);

const client = new Client({
  connectionString,
  ssl: process.env.DATABASE_SSL === "false" || /localhost|127\.0\.0\.1/i.test(connectionString)
    ? undefined
    : { rejectUnauthorized: false },
});

try {
  await client.connect();

  for (const statement of statements) {
    await client.query(statement);
  }

  console.log(`PostgreSQL migration complete: ${statements.length} statements applied.`);
} finally {
  await client.end();
}
