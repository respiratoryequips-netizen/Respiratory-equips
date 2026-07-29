import { features } from "@/data/features";
import { testimonials } from "@/data/testimonials";
import FeatureCard from "@/components/ui/FeatureCard";
import TestimonialCard from "@/components/ui/TestimonialCard";

export default function WhyUsAndTestimonials() {
  return (
    <section id="why-us" className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-14">
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>

      <div id="testimonials">
        <h2 className="text-center text-accent font-semibold tracking-wide text-sm mb-8">
          WHAT OUR CUSTOMERS SAY
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}