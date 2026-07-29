import { ProductSummary } from "@/lib/api";

export default function ProductJsonLd({ product }: { product: ProductSummary }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription || product.description,
    image: product.images.map((img) => img.url),
    brand: { "@type": "Brand", name: product.brand },
    url: `${siteUrl}/products/${product.category.slug}/${product.slug}`,
    ...(product.price && {
      offers: {
        "@type": "Offer",
        priceCurrency: "PKR",
        price: product.price,
        availability: product.inStock
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      },
    }),
    ...(product.rating > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviewsCount || 1,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}