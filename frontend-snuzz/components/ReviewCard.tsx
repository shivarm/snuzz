"use client";

import { Star, CircleUserRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  name: string;
  review: string;
  rating: number;
}

interface ReviewCardProps {
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "M.B",
    review: "best price but delivery time take long",
    rating: 5,
  },
  {
    name: "M.B",
    review: "best price but delivery time take long",
    rating: 5,
  },
  {
    name: "M.B",
    review: "best price but delivery time take long",
    rating: 5,
  },
];

export default function ReviewCard({ testimonials = defaultTestimonials }: ReviewCardProps) {
  return (
    <section className="px-5 py-20 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-5xl font-bold text-gray-900 text-center mb-20">Reviews</h2>
        <div className="grid md:grid-cols-3 gap-6 justify-items-center">
          {testimonials.map((testimonial, i) => (
            <Card
              key={i}
              className="border-0 transition-all duration-300 bg-gradient-to-br from-gray-100 to-[#F0F1F1] hover:-translate-y-2 w-full max-w-[350px]"
            >
              <CardContent className="px-4 py-2">
                <div className="flex items-center space-x-1 mb-1">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className={`size-4 ${
                        j < 4 ? "fill-black text-black" : "fill-none text-black"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-1 text-sm leading-relaxed">{testimonial.review}</p>
                <div className="flex items-center">
                  <div className="flex items-center space-x-2">
                    <CircleUserRound />
                    <p className="font-semibold text-sm text-gray-900">{testimonial.name}</p>
                    <img
                      src="/signature.png"
                      alt="Verified signature"
                      className="h-4 object-contain"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
