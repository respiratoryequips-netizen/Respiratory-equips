import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategories, getCategoryBySlug, getProducts } from "@/lib/api";
import ProductCard from "@/components/ui/ProductCard";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export const revalidate = 3600;
export const dynamicParams = true; // new categories added later still render on first request

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: category.metaTitle || `${category.name} | Respiratory Equips`,
    description: category.metaDescription || category.description,
    alternates: { canonical: `/products/${category.slug}` },
    openGraph: {
      title: category.metaTitle || category.name,
      description: category.metaDescription || category.description,
      images: category.image?.url ? [category.image.url] : [],
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const products = await getProducts(slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${siteUrl}/` },
          { name: "Products", url: `${siteUrl}/products` },
          { name: category.name, url: `${siteUrl}/products/${category.slug}` },
        ]}
      />

      <h1 className="text-3xl font-bold text-primary mb-2">{category.name}</h1>
      {category.description && <p className="text-gray-500 mb-10 max-w-2xl">{category.description}</p>}

      {products.length === 0 ? (
        <p className="text-gray-400">No products available in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-stretch">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              href={`/products/${category.slug}/${product.slug}`}
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
      )}
    </section>
  );
}