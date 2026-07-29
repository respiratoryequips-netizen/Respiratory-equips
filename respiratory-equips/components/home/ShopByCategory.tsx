import { categories } from "@/data/categories";
import CategoryCard from "@/components/ui/CategoryCard";

export default function ShopByCategory() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <h2 className="text-center text-accent font-semibold tracking-wide text-sm mb-8">
        SHOP BY CATEGORY
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.title} category={category} />
        ))}
      </div>
    </section>
  );
}