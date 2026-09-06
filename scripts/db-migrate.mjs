import { readdir, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import pg from "pg";

const { Client } = pg;
const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("ตั้งค่า DATABASE_URL หรือ DIRECT_URL ก่อนรัน npm run db:migrate");
}

// รันทุกไฟล์ .sql ในโฟลเดอร์ migrations เรียงตามชื่อ เพื่อให้ migration ที่เพิ่มใหม่ถูกรันด้วย
const migrationsDir = resolve(process.cwd(), "db/migrations");
const migrationFiles = (await readdir(migrationsDir))
  .filter((file) => file.endsWith(".sql"))
  .sort();

if (migrationFiles.length === 0) {
  throw new Error(`ไม่พบไฟล์ migration ใน ${migrationsDir}`);
}

const migrations = await Promise.all(
  migrationFiles.map(async (file) => ({
    file,
    statements: (await readFile(join(migrationsDir, file), "utf8"))
      .split(/;\s*(?:\n|$)/)
      .map((statement) => statement.trim())
      .filter(Boolean),
  })),
);

const client = new Client({
  connectionString,
  ssl: process.env.DATABASE_SSL === "false" || /localhost|127\.0\.0\.1/i.test(connectionString)
    ? undefined
    : { rejectUnauthorized: false },
});

try {
  await client.connect();

  let applied = 0;

  for (const { file, statements } of migrations) {
    for (const statement of statements) {
      await client.query(statement);
    }

    applied += statements.length;
    console.log(`  ${file}: ${statements.length} statements`);
  }

  console.log(`PostgreSQL migration complete: ${applied} statements from ${migrations.length} files applied.`);
} finally {
  await client.end();
}
