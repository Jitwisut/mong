"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { Icon, type IconName } from "./icons";

interface UploadAreaProps {
  className?: string;
  icon?: IconName;
  label: string;
  detail?: string;
  large?: boolean;
  name: string;
}

const MAX_EDGE = 1600;

// ย่อภาพในเบราว์เซอร์ก่อนอัปโหลด เพราะ Vercel จำกัด request body ไว้ราว 4.5MB
// และภาพจากมือถือมักใหญ่กว่านั้นหลายเท่า
async function resizeImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  if (!context) {
    bitmap.close();
    throw new Error("CANVAS_UNAVAILABLE");
  }

  // PNG โปร่งใสจะกลายเป็นพื้นดำเมื่อแปลงเป็น JPEG จึงรองพื้นขาวไว้ก่อน
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.82));

  if (!blob) {
    throw new Error("RESIZE_FAILED");
  }

  return blob;
}

export function UploadArea({ className = "", icon = "add-circle", label, detail, large = false, name }: UploadAreaProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(URL.createObjectURL(file));
    setUploadedUrl("");
    setErrorMessage("");
    setStatus("uploading");

    try {
      const resized = await resizeImage(file);
      const body = new FormData();
      body.append("file", resized, "upload.jpg");

      const response = await fetch("/api/admin/uploads", { method: "POST", body });
      const result: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const message = typeof result === "object" && result !== null && "error" in result && typeof result.error === "string"
          ? result.error
          : "อัปโหลดรูปภาพไม่สำเร็จ";
        setErrorMessage(message);
        setStatus("error");
        return;
      }

      const url = typeof result === "object" && result !== null && "url" in result && typeof result.url === "string"
        ? result.url
        : "";

      setUploadedUrl(url);
      setStatus(url ? "done" : "error");
    } catch {
      setErrorMessage("อ่านไฟล์รูปไม่สำเร็จ กรุณาลองไฟล์อื่น");
      setStatus("error");
    }
  };

  const statusLabel = status === "uploading"
    ? "กำลังอัปโหลด..."
    : status === "done"
      ? "อัปโหลดแล้ว"
      : status === "error"
        ? errorMessage
        : label;

  return (
    <div className={`${className} border border-dashed ${status === "error" ? "border-error" : "border-outline-variant"} bg-surface-container-low hover:bg-surface-container transition-colors relative flex flex-col items-center justify-center cursor-pointer group/upload overflow-hidden`}>
      {/* blob: URL อยู่ในเบราว์เซอร์เท่านั้น ตัว optimizer ฝั่งเซิร์ฟเวอร์ดึงไม่ได้ ต้องข้ามการ optimize */}
      {previewUrl ? <Image fill unoptimized className="object-cover opacity-40" sizes="(min-width: 768px) 30vw, 100vw" src={previewUrl} alt="ภาพที่เลือกสำหรับอัปโหลด" /> : null}
      <input accept="image/*" aria-label={label} className="absolute inset-0 opacity-0 cursor-pointer z-20" onChange={handleFileChange} type="file" />
      <input name={name} type="hidden" value={uploadedUrl} />
      <div className="relative z-10 flex flex-col items-center text-center px-3">
        <Icon name={status === "done" ? "check" : icon} size={large ? 48 : 24} className={`${large ? "mb-4" : ""} ${status === "done" ? "text-primary" : "text-outline-variant"} group-hover/upload:text-primary transition-colors`} />
        <p className={`${large ? "font-semibold" : "mt-2"} font-body-md text-body-md ${status === "error" ? "text-error" : "text-on-surface"}`}>{statusLabel}</p>
        {detail && status === "idle" ? <p className="font-label-caps text-label-caps text-on-surface-variant mt-2">{detail}</p> : null}
      </div>
    </div>
  );
}
