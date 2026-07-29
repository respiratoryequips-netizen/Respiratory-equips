"use client";

import Image from "next/image";
import { useState } from "react";

interface GalleryImage {
  url: string;
  publicId: string;
}

export default function ProductImageGallery({
  images,
  productName,
}: {
  images: GalleryImage[];
  productName: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = images[activeIndex]?.url || "/placeholder-product.png";

  return (
    <div>
      <div className="relative w-full h-80 md:h-96 bg-white rounded-xl border border-gray-100 mb-4">
        <Image
          src={activeImage}
          alt={productName}
          fill
          className="object-contain p-6"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, index) => (
            <button
              key={img.publicId}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show image ${index + 1} of ${productName}`}
              className={`relative w-full h-20 bg-white rounded-lg border cursor-pointer transition-all ${
                index === activeIndex
                  ? "border-accent ring-2 ring-accent-light"
                  : "border-gray-100 hover:border-accent/50"
              }`}
            >
              <Image src={img.url} alt={productName} fill className="object-contain p-2" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}