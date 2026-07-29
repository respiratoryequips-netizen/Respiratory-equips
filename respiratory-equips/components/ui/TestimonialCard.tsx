import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { Testimonial } from "@/data/testimonials";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex gap-1 text-yellow-500 mb-3">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <FaStar key={i} />
        ))}
      </div>
      <p className="text-gray-600 text-sm mb-5">{testimonial.review}</p>
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100">
          <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
        </div>
        <div>
          <p className="font-semibold text-primary text-sm">{testimonial.name}</p>
          <p className="text-gray-400 text-xs">{testimonial.city}</p>
        </div>
      </div>
    </div>
  );
}