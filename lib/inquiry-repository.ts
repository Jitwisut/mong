import "server-only";

import { postgresPool } from "./postgres";

export type InquiryKind = "contact" | "purchase" | "offer";
export type InquiryStatus = "new" | "read" | "done";

export interface Inquiry {
  id: string;
  kind: InquiryKind;
  topic: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  productId: string;
  productName: string;
  productSlug: string;
  status: InquiryStatus;
  createdAt: string;
}

export interface CreateInquiryInput {
  kind: InquiryKind;
  topic: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  productId: string;
  productName: string;
  productSlug: string;
}

export interface InquiryCounts {
  total: number;
  new: number;
  appointments: number;
}

interface InquiryRow {
  id: string;
  kind: InquiryKind;
  topic: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  product_id: string;
  product_name: string;
  product_slug: string;
  status: InquiryStatus;
  created_at: Date | string;
}

export const inquiryKinds: InquiryKind[] = ["contact", "purchase", "offer"];

export const inquiryKindLabels: Record<InquiryKind, string> = {
  contact: "ติดต่อทั่วไป",
  purchase: "สอบถามเพื่อสั่งซื้อ",
  offer: "ขอประเมินราคา",
};

const inquiryColumns = `
  id, kind, topic, name, email, phone, message,
  product_id, product_name, product_slug, status, created_at
`;

function rowToInquiry(row: InquiryRow): Inquiry {
  return {
    id: row.id,
    kind: row.kind,
    topic: row.topic,
    name: row.name,
    email: row.email,
    phone: row.phone,
    message: row.message,
    productId: row.product_id,
    productName: row.product_name,
    productSlug: row.product_slug,
    status: row.status,
    createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at),
  };
}

export function isInquiryKind(value: string): value is InquiryKind {
  return inquiryKinds.includes(value as InquiryKind);
}

export async function createInquiry(input: CreateInquiryInput): Promise<Inquiry> {
  if (!postgresPool) {
    throw new Error("DATABASE_NOT_CONFIGURED");
  }

  const result = await postgresPool.query<InquiryRow>(
    `INSERT INTO inquiries (
      id, kind, topic, name, email, phone, message,
      product_id, product_name, product_slug
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING ${inquiryColumns}`,
    [
      crypto.randomUUID(),
      input.kind,
      input.topic,
      input.name,
      input.email,
      input.phone,
      input.message,
      input.productId,
      input.productName,
      input.productSlug,
    ],
  );

  return rowToInquiry(result.rows[0]);
}

export async function getInquiries(limit = 25): Promise<Inquiry[]> {
  if (!postgresPool) {
    return [];
  }

  try {
    const result = await postgresPool.query<InquiryRow>(
      `SELECT ${inquiryColumns} FROM inquiries ORDER BY created_at DESC LIMIT $1`,
      [limit],
    );

    return result.rows.map(rowToInquiry);
  } catch (error) {
    console.error("Inquiry read failed.", error);
    return [];
  }
}

export async function getInquiryCounts(): Promise<InquiryCounts> {
  const empty: InquiryCounts = { total: 0, new: 0, appointments: 0 };

  if (!postgresPool) {
    return empty;
  }

  try {
    const result = await postgresPool.query<{ total: string; new_count: string; appointments: string }>(
      `SELECT
         COUNT(*)::text AS total,
         COUNT(*) FILTER (WHERE status = 'new')::text AS new_count,
         COUNT(*) FILTER (WHERE topic = 'visit')::text AS appointments
       FROM inquiries`,
    );

    const row = result.rows[0];

    return row
      ? { total: Number(row.total), new: Number(row.new_count), appointments: Number(row.appointments) }
      : empty;
  } catch (error) {
    console.error("Inquiry count read failed.", error);
    return empty;
  }
}
