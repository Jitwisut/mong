import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { categoryLabels, isProductCategory, type ProductCategory } from "../../../../components/catalog-data";
import { isAdminSessionValid, ADMIN_SESSION_COOKIE } from "../../../../lib/admin-auth";
import { createCatalogProduct } from "../../../../lib/catalog-repository";

export const runtime = "nodejs";

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(body: JsonRecord, ...keys: string[]) {
  for (const key of keys) {
    const value = body[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

function createSlug(value: string) {
  const slug = value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9ก-๙]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);

  return slug || `product-${randomUUID().slice(0, 8)}`;
}

function readCategory(value: string): ProductCategory | null {
  const categoryMap: Record<string, ProductCategory> = {
    gold: "gold",
    coins: "coins",
    amulets: "amulets",
    jewelry: "jewelry",
    ทองคำ: "gold",
    เหรียญ: "coins",
    ธนบัตร: "coins",
    พระเครื่อง: "amulets",
    วัตถุมงคล: "amulets",
    เครื่องประดับ: "jewelry",
  };

  return categoryMap[value] ?? (isProductCategory(value) ? value : null);
}

function readGallery(body: JsonRecord, image: string, name: string) {
  const value = body.gallery;

  if (!Array.isArray(value)) {
    return [{ id: 0, src: image, alt: name }];
  }

  const gallery = value.flatMap((entry, index) => {
    if (!isRecord(entry) || typeof entry.src !== "string" || typeof entry.alt !== "string") {
      return [];
    }

    return [{ id: typeof entry.id === "number" ? entry.id : index, src: entry.src, alt: entry.alt }];
  });

  return gallery.length > 0 ? gallery : [{ id: 0, src: image, alt: name }];
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!isAdminSessionValid(sessionToken)) {
    return NextResponse.json({ error: "ไม่ได้รับอนุญาต" }, { status: 401 });
  }

  try {
    const rawBody: unknown = await request.json();

    if (!isRecord(rawBody)) {
      return NextResponse.json({ error: "ข้อมูลสินค้าไม่ถูกต้อง" }, { status: 400 });
    }

    const name = readString(rawBody, "name", "title");
    const category = readCategory(readString(rawBody, "category"));

    if (!name || !category) {
      return NextResponse.json({ error: "กรุณาระบุชื่อสินค้าและหมวดหมู่" }, { status: 400 });
    }

    const image = readString(rawBody, "image") || "/images/coins-overhead.jpg";
    const description = readString(rawBody, "description") || `รายละเอียดของ ${name}`;
    const product = await createCatalogProduct({
      id: readString(rawBody, "id") || randomUUID(),
      slug: createSlug(readString(rawBody, "slug") || name),
      category,
      name,
      eyebrow: readString(rawBody, "eyebrow") || `${categoryLabels[category]} · รายการใหม่`,
      shortDescription: readString(rawBody, "shortDescription", "short_description") || description,
      description,
      price: readString(rawBody, "price") || "สอบถามราคา",
      status: readString(rawBody, "status") || "รอตรวจสอบ",
      image,
      gallery: readGallery(rawBody, image, name),
      year: readString(rawBody, "year") || "รอตรวจสอบจากองค์จริง",
      material: readString(rawBody, "material") || "รอตรวจสอบ",
      condition: readString(rawBody, "condition") || "รอตรวจสอบองค์จริง",
      provenance: readString(rawBody, "provenance") || "สอบถามประวัติและรายละเอียดเพิ่มเติมได้",
    });

    revalidatePath("/");
    revalidatePath("/watches/rolex-submariner");
    revalidatePath(`/products/${product.slug}`);
    revalidatePath("/admin");

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "DATABASE_NOT_CONFIGURED") {
      return NextResponse.json({ error: "ยังไม่ได้ตั้งค่า DATABASE_URL ใน .env.local" }, { status: 503 });
    }

    if (typeof error === "object" && error !== null && "code" in error && error.code === "23505") {
      return NextResponse.json({ error: "Slug นี้มีอยู่แล้ว กรุณาใช้ slug อื่น" }, { status: 409 });
    }

    console.error("Admin product creation failed.", error);
    return NextResponse.json({ error: "บันทึกสินค้าไม่สำเร็จ กรุณาตรวจสอบการเชื่อมต่อฐานข้อมูล" }, { status: 500 });
  }
}
