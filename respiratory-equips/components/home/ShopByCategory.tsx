import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { getCategories } from "@/lib/api";
import CategoryCard from "@/components/ui/CategoryCard";

export default async function ShopByCategory() {
  const allCategories = await getCategories();
  const categories = allCategories.slice(0, 5);

  if (categories.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-accent font-semibold tracking-wide text-sm">SHOP BY CATEGORY</h2>
        {allCategories.length > 5 && (
          <Link href="/products" className="flex items-center gap-1 text-accent text-sm font-medium hover:gap-2 transition-all">
            View All Categories <FaArrowRight className="text-xs" />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            category={{
              title: category.name,
              description: category.description,
              image: category.image.url,
              href: `/products/${category.slug}`,
            }}
          />
        ))}
      </div>
    </section>
  );
}