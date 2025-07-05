"use client";

import Image from "next/image";

export default function FeatureCard() {
  return (
     <>
      <section className="px-4 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
            <div className="flex flex-col items-center text-center space-y-4 flex-1 max-w-xs group  transform translate-y-12">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/dollar.svg"
                  alt="Best Price on Market"
                  className="shadow-xl transition-transform duration-300 group-hover:scale-110"
                  width={180}
                  height={160}
                />
               </div>
              <div className="space-y-1">
                <p className="text-2xl italic font-bold text-gray-900 leading-tight">Best Price on</p>
                <span className="text-2xl italic font-bold text-gray-900 leading-tight">Market</span>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-0 flex-1 max-w-xs group">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/icon3-clean.svg"
                  alt="Free Shipping"
                  className="shadow-xl transition-transform duration-300 group-hover:scale-110"
                  width={200}
                  height={160}
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-gray-900 leading-tight">Free Shipping in EU</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center flex-1 max-w-xs group">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/icon2-clean.svg"
                  alt="Exclusive Brands"
                  className="shadow-xl transition-transform duration-300 group-hover:scale-110"
                  width={200}
                  height={160}
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-gray-900 leading-tight">Exclusive Brands</p>
              </div>
            </div>
          </div>
        </div>
      </section>
     </>
  )
}
