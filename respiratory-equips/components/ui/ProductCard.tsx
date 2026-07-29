"use client";

import Image from "next/image";
import { useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 relative hover:shadow-md transition-shadow flex flex-col h-full">
      <button
        onClick={() => setWishlisted(!wishlisted)}
        aria-label="Add to wishlist"
        className="absolute top-3 right-3 text-gray-300 hover:text-red-500"
      >
        <FaHeart className={wishlisted ? "text-red-500" : ""} />
      </button>

      <div className="relative w-full h-32 mb-3 shrink-0">
        <Image src={product.image} alt={product.name} fill className="object-contain" />
      </div>

      <p className="text-xs text-accent font-medium">{product.brand}</p>
      <p className="font-semibold text-primary text-sm mt-0.5 line-clamp-2 min-h-[2.5rem]">
        {product.name}
      </p>
      <p className="text-xs text-gray-500 mt-0.5">{product.tagline}</p>

      <div className="flex items-center gap-1 mt-2 text-xs text-yellow-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar key={i} className={i < Math.round(product.rating) ? "" : "text-gray-200"} />
        ))}
        <span className="text-gray-400 ml-1">({product.reviews})</span>
      </div>

      {/* Spacer pushes price + buttons to the bottom regardless of text length above */}
      <div className="flex-1" />

      <div className="flex items-center justify-between mt-3">
        <p className="font-bold text-primary">PKR {product.price.toLocaleString()}</p>
        <span className="text-xs text-green-600 font-medium">
          {product.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <div className="flex gap-2 mt-4">
        <button className="flex-1 border border-gray-200 rounded-lg py-2 text-xs font-medium hover:bg-gray-50">
          Quick View
        </button>
        <button className="flex-1 bg-accent hover:bg-accent-dark text-white rounded-lg py-2 text-xs font-medium">
          Add to Cart
        </button>
      </div>
    </div>
  );
}