import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaStar, FaCheckCircle, FaTimesCircle, FaWhatsapp  } from "react-icons/fa";
import { getProducts, getProductBySlug } from "@/lib/api";
import ProductJsonLd from "@/components/seo/ProductJsonLd";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import ProductImageGallery from "@/components/product/ProductImageGallery";

export const revalidate = 3600;
export const dynamicParams = true; // new products added later still render on first request

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ category: p.category.slug, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.metaTitle || `${product.name} | Respiratory Equips`,
    description: product.metaDescription || product.shortDescription,
    alternates: {
      canonical: `/products/${product.category.slug}/${product.slug}`,
    },
    openGraph: {
      title: product.metaTitle || product.name,
      description: product.metaDescription || product.shortDescription,
      images: product.images.map((img) => img.url),
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: `${siteUrl}/` },
          { name: "Products", url: `${siteUrl}/products` },
          {
            name: product.category.name,
            url: `${siteUrl}/products/${product.category.slug}`,
          },
          {
            name: product.name,
            url: `${siteUrl}/products/${product.category.slug}/${product.slug}`,
          },
        ]}
      />

      {/* Breadcrumb (visible) */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-accent">
          Products
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/products/${product.category.slug}`}
          className="hover:text-accent"
        >
          {product.category.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-primary font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <ProductImageGallery
          images={product.images}
          productName={product.name}
        />

        {/* Details */}
        <div>
          <p className="text-accent font-medium text-sm">{product.brand}</p>
          <h1 className="text-3xl font-bold text-primary mt-1">
            {product.name}
          </h1>
          <p className="text-gray-500 mt-1">{product.tagline}</p>

          {product.rating > 0 && (
            <div className="flex items-center gap-1 mt-3 text-sm text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.round(product.rating) ? "" : "text-gray-200"
                  }
                />
              ))}
              <span className="text-gray-400 ml-1">
                ({product.reviewsCount} reviews)
              </span>
            </div>
          )}

          {product.price ? (
            <p className="text-2xl font-bold text-primary mt-4">
              PKR {product.price.toLocaleString()}
            </p>
          ) : (
            ""
          )}

          <div className="flex items-center gap-2 mt-2">
            {product.inStock ? (
              <>
                <FaCheckCircle className="text-green-600" />
                <span className="text-green-600 text-sm font-medium">
                  In Stock
                </span>
              </>
            ) : (
              <>
                <FaTimesCircle className="text-red-500" />
                <span className="text-red-500 text-sm font-medium">
                  Out of Stock
                </span>
              </>
            )}
          </div>

          {product.shortDescription && (
            <p className="text-gray-600 mt-5">{product.shortDescription}</p>
          )}

          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Request a Consultation
            </Link>
            <a
              href={`https://wa.me/923162568654?text=${encodeURIComponent(`Hi, I'm interested in ${product.name}. Can you share more details?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-green-500 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <FaWhatsapp /> WhatsApp Us
            </a>
          </div>

          {product.specifications.length > 0 && (
            <div className="mt-8">
              <h2 className="font-semibold text-primary mb-3">
                Specifications
              </h2>
              <div className="bg-white border border-gray-100 rounded-xl divide-y divide-gray-100">
                {product.specifications.map((spec) => (
                  <div
                    key={spec.key}
                    className="flex justify-between px-4 py-3 text-sm"
                  >
                    <span className="text-gray-500">{spec.key}</span>
                    <span className="text-primary font-medium">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {product.description && (
        <div className="mt-16 max-w-3xl">
          <h2 className="text-xl font-bold text-primary mb-4">
            Product Details
          </h2>
          <p className="text-gray-600 whitespace-pre-line">
            {product.description}
          </p>
        </div>
      )}
    </section>
  );
}
