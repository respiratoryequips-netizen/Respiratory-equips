"use client";

import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { brands } from "@/data/brands";

export default function TrustedBrands() {
  return (
    <section id="brands" className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
      <h2 className="text-center text-accent font-semibold tracking-wide text-2xl mb-8">
        OUR TRUSTED BRANDS
      </h2>
      <div className="flex items-center gap-4 bg-white rounded-xl shadow-sm px-4 py-4">
        <button aria-label="Previous" className="text-gray-400 hover:text-accent shrink-0">
          <FaChevronLeft />
        </button>
        <div className="flex-1 flex items-center justify-between gap-8 overflow-x-auto">
          {brands.map((brand) => (
            <div key={brand.name} className="relative w-32 h-18 shrink-0">
              <Image src={brand.logo} alt={brand.name} fill className="object-contain" />
            </div>
          ))}
        </div>
        <button aria-label="Next" className="text-gray-400 hover:text-accent shrink-0">
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}