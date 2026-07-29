import Hero from "@/components/home/Hero";
import AboutUs from "@/components/home/AboutUs";
import ShopByCategory from "@/components/home/ShopByCategory";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TrustedBrands from "@/components/home/TrustedBrands";
import WhyUsAndTestimonials from "@/components/home/WhyUsAndTestimonials";
import ConsultationForm from "@/components/home/ConsultationForm";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <ShopByCategory />
      <FeaturedProducts />
      <TrustedBrands />
      <WhyUsAndTestimonials />
      <ConsultationForm />
    </>
  );
}