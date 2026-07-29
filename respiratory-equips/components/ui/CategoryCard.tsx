import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { Category } from "@/data/categories";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5  hover:shadow-md transition-shadow">
      <div className="relative w-full h-24 mb-4">
        <Image src={category.image} alt={category.title} fill className="object-contain" />
      </div>
      <p className="font-semibold text-primary">{category.title}</p>
      <p className="text-gray-500 text-xs mt-1">{category.description}</p>
      <Link
        href={category.href}
        className="inline-flex items-center gap-1 text-accent text-sm font-medium mt-3 hover:gap-2 transition-all"
      >
        Explore <FaArrowRight className="text-xs" />
      </Link>
    </div>
  );
}