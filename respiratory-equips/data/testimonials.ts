export interface Testimonial {
  name: string;
  city: string;
  rating: number;
  review: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Ali Raza",
    city: "Lahore",
    rating: 5,
    review:
      "Excellent service and genuine products. Received my CPAP machine within 24 hours in Lahore. Highly recommended!",
    avatar: "/avatars/ali-raza.png",
  },
  {
    name: "Dr. Ahmed",
    city: "Islamabad",
    rating: 5,
    review:
      "Original ResMed machine with official warranty. The team guided me very well before purchase.",
    avatar: "/avatars/dr-ahmed.png",
  },
  {
    name: "Mrs. Sana",
    city: "Karachi",
    rating: 5,
    review:
      "Very professional team and great after sales support. Best experience!",
    avatar: "/avatars/mrs-sana.png",
  },
];