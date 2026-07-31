import { MetadataRoute } from "next";
import { getCategories, getProducts } from "@/lib/api";

export const dynamic = "force-dynamic"; // always fresh — reflects new admin content immediately

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/products`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/faqs`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/returns-refunds`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/terms-conditions`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/refund-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/medical-disclaimer`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${siteUrl}/products/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${siteUrl}/products/${p.category.slug}/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}