import { Metadata } from "next";
import { getCategories } from "@/lib/api";
import CategoryCard from "@/components/ui/CategoryCard";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Shop All Categories | Respiratory Equips",
  description:
    "Browse CPAP machines, BiPAP machines, oxygen concentrators, masks and accessories from Respiratory Equips.",
  alternates: { canonical: "/products" },
};

export default async function AllCategoriesPage() {
  const categories = await getCategories();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${siteUrl}/` },
          { name: "Products", url: `${siteUrl}/products` },
        ]}
      />
      <h1 className="text-3xl font-bold text-primary mb-2">Shop by Category</h1>
      <p className="text-gray-500 mb-10">
        Browse our full range of genuine respiratory care equipment.
      </p>

      {categories.length === 0 ? (
        <p className="text-gray-400">No categories available yet.</p>
      ) : (
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
      )}
    </section>
  );
}