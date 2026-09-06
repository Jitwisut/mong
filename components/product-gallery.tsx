"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./icons";
import type { ProductImage } from "./site-data";

interface ProductGalleryProps {
  images: ProductImage[];
  title: string;
}

const isVideo = (item: ProductImage) => item.kind === "video";

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const activeImage = images[selectedImage] ?? images[0];

  // Reset the play overlay whenever a different gallery item is selected.
  useEffect(() => {
    setIsPlaying(false);
  }, [selectedImage]);

  if (!activeImage) {
    return null;
  }

  const startVideo = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    void video.play().catch(() => {
      /* ผู้ใช้ยังกดเล่นจากปุ่มควบคุมของวิดีโอได้ */
    });
  };

  return (
    <div className="lg:col-span-7 flex flex-col gap-stack-sm relative">
      <div
        className={`w-full bg-surface-container-low aspect-[4/3] sm:aspect-square md:aspect-[4/5] lg:aspect-square flex items-center justify-center overflow-hidden border border-transparent hover:border-outline-variant transition-colors duration-500 group relative ${isVideo(activeImage) ? "" : "cursor-zoom-in"}`}
      >
        {isVideo(activeImage) ? (
          <>
            <video
              key={activeImage.src}
              ref={videoRef}
              className="h-full w-full object-contain p-4"
              controls
              playsInline
              preload="metadata"
              poster={activeImage.poster}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            >
              <source src={activeImage.src} type="video/mp4" />
            </video>
            {isPlaying ? null : (
              <button
                type="button"
                aria-label={`เล่นวิดีโอ ${title}`}
                onClick={startVideo}
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-surface-dim/35 text-on-surface transition-colors hover:bg-surface-dim/20"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-dim/80 text-on-surface">
                  <Icon name="play-circle" size={40} />
                </span>
                <span className="font-label-caps text-label-caps">เล่นวิดีโอ</span>
              </button>
            )}
          </>
        ) : (
          <>
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
          </>
        )}
      </div>

      <div className="grid grid-cols-5 gap-stack-sm" aria-label="เลือกรูปภาพและวิดีโอสินค้า">
        {images.map((image, index) => (
          <button
            key={image.id}
            aria-label={`${isVideo(image) ? "ดูวิดีโอที่" : "ดูรูปที่"} ${index + 1}`}
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
              src={isVideo(image) ? image.poster ?? image.src : image.src}
              alt={image.alt}
            />
            {isVideo(image) ? (
              <span className="absolute inset-0 flex items-center justify-center bg-surface-dim/30 text-on-surface">
                <Icon name="play-circle" size={26} />
              </span>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}
