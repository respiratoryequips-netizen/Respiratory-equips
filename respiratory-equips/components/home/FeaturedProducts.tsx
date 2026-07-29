import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ui/ProductCard";

export default async function FeaturedProducts() {
  const products = await getProducts(undefined, 5);

  if (products.length === 0) return null;

  return (
    <section id="products" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-accent font-semibold tracking-wide text-sm">Products</h2>
          <Link href="/products" className="flex items-center gap-1 text-accent text-sm font-medium hover:gap-2 transition-all">
            View All Products <FaArrowRight className="text-xs" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-stretch">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              href={`/products/${product.category.slug}/${product.slug}`}
              product={{
                id: product.slug,
                brand: product.brand,
                name: product.name,
                tagline: product.tagline,
                price: product.price || 0,
                rating: product.rating,
                reviews: product.reviewsCount,
                inStock: product.inStock,
                image: product.images[0]?.url || "",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}