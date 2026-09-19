import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminSessionValid, ADMIN_SESSION_COOKIE } from "../../../../../lib/admin-auth";
import { deleteCatalogProduct } from "../../../../../lib/catalog-repository";

export const runtime = "nodejs";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();

  if (!isAdminSessionValid(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "ไม่ได้รับอนุญาต" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const product = await deleteCatalogProduct(id);

    if (!product) {
      return NextResponse.json({ error: "ไม่พบสินค้าที่ต้องการลบ" }, { status: 404 });
    }

    revalidatePath("/");
    revalidatePath("/watches/rolex-submariner");
    revalidatePath(`/products/${product.slug}`);
    revalidatePath("/admin");

    return NextResponse.json({ product });
  } catch (error) {
    if (error instanceof Error && error.message === "DATABASE_NOT_CONFIGURED") {
      return NextResponse.json({ error: "ยังไม่ได้ตั้งค่า DATABASE_URL" }, { status: 503 });
    }

    console.error("Admin product delete failed.", error);
    return NextResponse.json({ error: "ลบสินค้าไม่สำเร็จ กรุณาลองใหม่" }, { status: 500 });
  }
}
