import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Respiratory Equips",
  description: "Health tips, product guides, and news from Respiratory Equips.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 lg:px-8 py-24 text-center">
      <h1 className="text-3xl font-bold text-primary mb-3">Blog</h1>
      <p className="text-gray-500">
        Our blog is coming soon — health tips, product guides, and respiratory care advice.
      </p>
    </section>
  );
}