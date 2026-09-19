import { NextResponse } from "next/server";
import { getProductImage } from "../../../../lib/product-image-repository";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const image = await getProductImage(id);

    if (!image) {
      return new NextResponse(null, { status: 404 });
    }

    return new NextResponse(new Uint8Array(image.bytes), {
      headers: {
        "Content-Type": image.mimeType,
        "Content-Length": String(image.bytes.byteLength),
        // รูปหนึ่ง id ผูกกับไฟล์เดียวตลอดอายุ แก้รูปคือได้ id ใหม่ จึงแคชยาวได้
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Product image read failed.", error);
    return new NextResponse(null, { status: 500 });
  }
}
