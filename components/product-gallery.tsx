"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "./icons";
import type { ProductImage } from "./site-data";

interface ProductGalleryProps {
  images: ProductImage[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const activeImage = images[selectedImage] ?? images[0];

  if (!activeImage) {
    return null;
  }

  return (
    <div className="lg:col-span-7 flex flex-col gap-stack-sm relative">
      <div className="w-full bg-surface-container-low aspect-[4/3] sm:aspect-square md:aspect-[4/5] lg:aspect-square flex items-center justify-center overflow-hidden border border-transparent hover:border-outline-variant transition-colors duration-500 group relative cursor-zoom-in">
        <Image
          priority
          fill
          className="object-contain w-full h-full p-4 group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(min-width: 1024px) 58vw, 100vw"
          src={activeImage.src}
          alt={`${title}: ${activeImage.alt}`}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-surface-dim/85 text-on-surface px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Icon name="search" size={16} />
          <span className="font-label-caps text-label-caps">ขยายภาพ</span>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-stack-sm" aria-label="เลือกรูปภาพสินค้า">
        {images.map((image, index) => (
          <button
            key={image.id}
            aria-label={`ดูรูปที่ ${index + 1}`}
            aria-pressed={selectedImage === index}
            className={`relative bg-surface-container-low aspect-square border ${selectedImage === index ? "border-primary" : "border-transparent hover:border-outline-variant"} cursor-pointer overflow-hidden group`}
            onClick={() => setSelectedImage(index)}
            type="button"
          >
            <Image
              priority={index === 0}
              fill
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              sizes="(min-width: 1024px) 12vw, 20vw"
              src={image.src}
              alt={image.alt}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
