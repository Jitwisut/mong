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
  sampleSrc?: string;
  sampleAlt?: string;
}

export function UploadArea({ className = "", icon = "add-circle", label, detail, large = false, sampleSrc, sampleAlt = "ภาพตัวอย่าง" }: UploadAreaProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(URL.createObjectURL(file));
  };

  const imageSrc = previewUrl ?? sampleSrc;

  return (
    <div className={`${className} border border-dashed border-outline-variant bg-surface-container-low hover:bg-surface-container transition-colors relative flex flex-col items-center justify-center cursor-pointer group/upload overflow-hidden`}>
      {imageSrc ? <Image priority fill className="object-cover opacity-25 group-hover/upload:opacity-40 transition-opacity" sizes="(min-width: 768px) 30vw, 100vw" src={imageSrc} alt={previewUrl ? "ภาพที่เลือกสำหรับอัปโหลด" : sampleAlt} /> : null}
      <input accept="image/*" aria-label={label} className="absolute inset-0 opacity-0 cursor-pointer z-20" onChange={handleFileChange} type="file" />
      <div className="relative z-10 flex flex-col items-center text-center px-3">
        <Icon name={icon} size={large ? 48 : 24} className={`${large ? "mb-4" : ""} text-outline-variant group-hover/upload:text-primary transition-colors`} />
        <p className={`${large ? "font-semibold" : "mt-2"} font-body-md text-body-md text-on-surface`}>{previewUrl ? "เลือกภาพนี้แล้ว" : label}</p>
        {detail ? <p className="font-label-caps text-label-caps text-on-surface-variant mt-2">{detail}</p> : null}
      </div>
    </div>
  );
}
