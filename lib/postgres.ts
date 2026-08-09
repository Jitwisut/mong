import "server-only";

import { Pool } from "pg";

type GlobalWithPostgresPool = typeof globalThis & {
  __kornCoinsPostgresPool?: Pool;
};

const globalForPostgres = globalThis as GlobalWithPostgresPool;

function shouldUseSsl(connectionString: string) {
  if (process.env.DATABASE_SSL === "false") {
    return false;
  }

  if (process.env.DATABASE_SSL === "true") {
    return true;
  }

  if (/sslmode=(disable|allow)/i.test(connectionString)) {
    return false;
  }

  return !/(localhost|127\.0\.0\.1)/i.test(connectionString);
}

function createPool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    return null;
  }

  return new Pool({
    connectionString,
    max: Number(process.env.DATABASE_POOL_MAX ?? 5),
    ssl: shouldUseSsl(connectionString) ? { rejectUnauthorized: false } : undefined,
  });
}

export const postgresPool =
  globalForPostgres.__kornCoinsPostgresPool ?? createPool();

if (process.env.NODE_ENV !== "production" && postgresPool) {
  globalForPostgres.__kornCoinsPostgresPool = postgresPool;
}

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}
