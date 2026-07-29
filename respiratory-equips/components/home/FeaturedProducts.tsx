import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";

export default function FeaturedProducts() {
  return (
    <section id="products" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-accent font-semibold tracking-wide text-sm">
            SHOP BY CATEGORY
          </h2>
          <Link
            href="/products"
            className="flex items-center gap-1 text-accent text-sm font-medium hover:gap-2 transition-all"
          >
            View All Products <FaArrowRight className="text-xs" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-stretch">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
