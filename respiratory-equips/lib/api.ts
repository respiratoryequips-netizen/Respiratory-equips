const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface CategorySummary {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: { url: string; publicId: string };
  metaTitle: string;
  metaDescription: string;
}

export interface ProductSummary {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  tagline: string;
  shortDescription: string;
  description: string;
  images: { url: string; publicId: string }[];
  specifications: { key: string; value: string }[];
  price: number | null;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  metaTitle: string;
  metaDescription: string;
  category: { _id: string; name: string; slug: string };
}

// revalidate: seconds before Next.js will re-check this data in the background
// (ISR safety net — instant updates come from the on-demand /api/revalidate route instead).
async function fetchJSON<T>(url: string, revalidate = 3600): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getCategories(limit?: number) {
  const query = limit ? `?limit=${limit}` : "";
  const data = await fetchJSON<{ categories: CategorySummary[] }>(`${API_URL}/categories${query}`);
  return data?.categories || [];
}

export async function getCategoryBySlug(slug: string) {
  const data = await fetchJSON<{ category: CategorySummary }>(`${API_URL}/categories/${slug}`);
  return data?.category || null;
}

export async function getProducts(categorySlug?: string, limit?: number) {
  const params = new URLSearchParams();
  if (categorySlug) params.set("category", categorySlug);
  if (limit) params.set("limit", String(limit));
  const query = params.toString() ? `?${params.toString()}` : "";
  const data = await fetchJSON<{ products: ProductSummary[] }>(`${API_URL}/products${query}`);
  return data?.products || [];
}

export async function getProductBySlug(slug: string) {
  const data = await fetchJSON<{ product: ProductSummary }>(`${API_URL}/products/${slug}`);
  return data?.product || null;
}