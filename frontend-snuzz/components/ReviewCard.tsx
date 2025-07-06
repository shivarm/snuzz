"use client";

import { Star, CircleUserRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

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
  {
    name: "M.B",
    review: "best price but delivery time take long",
    rating: 5,
  },
];

export default function ReviewCard({ testimonials = defaultTestimonials }: ReviewCardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const testimonialsToShow = isMobile ? testimonials.slice(0, 2) : testimonials;

  return (
    <section className="px-5 py-20 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-5xl font-bold text-gray-900 text-center mb-20">Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-4 justify-items-center">
          {testimonialsToShow.map((testimonial, i) => (
            <Card
              key={i}
              className="border-0 transition-all duration-300 bg-gradient-to-br from-gray-100 to-[#F0F1F1] w-full max-w-[284px] rounded-[19px]"
            >
              <CardContent className="px-5 py-2">
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
