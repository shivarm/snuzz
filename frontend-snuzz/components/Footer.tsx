"use client";

import { Button } from "@/components/ui/button";
import { Instagram, Facebook, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-white via-gray-50 to-white text-gray-900 px-4 py-8 md:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-4 md:gap-8 lg:gap-12 mb-8 md:mb-12">
          <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left">
            <img src="/logo.svg" alt="SNUZZ" className="h-8 md:h-10 w-auto mb-4 md:mb-6 mx-auto sm:mx-0 sm:mt-5 md:mt-8" />

            <div className="flex sm:gap-2 justify-center sm:justify-start">
              {[Instagram, Facebook].map((Icon, i) => (
                <div
                  key={i}
                  className="w-9 h-9 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer hover:bg-gray-100"
                >
                  <Icon className="w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-black" />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 text-base md:text-lg">Shop</h4>
            <ul className="space-y-2 md:space-y-3 text-gray-600">
              {["Brand", "Flavour", "Strength", "Snuzz Pro"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="transition-colors text-sm md:text-base hover:text-gray-900 block py-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 text-base md:text-lg">Favorites</h4>
            <ul className="space-y-2 md:space-y-3 text-gray-600">
              {["Klint Arctic Mint", "Klint Berry Blast", "Klint Cool Mint", "Klint Fresh Mint"].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="transition-colors text-sm md:text-base hover:text-gray-900 block py-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 text-base md:text-lg">
              Information
            </h4>
            <ul className="space-y-2 md:space-y-3 text-gray-600">
              {["Contact Us", "Order Status", "Shipping", "Privacy"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="transition-colors text-sm md:text-base hover:text-gray-900 block py-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 text-base md:text-lg">
              Contact Us
            </h4>
            <div className="mt-1">
              <Button 
                variant="ghost" 
                className="h-auto px-3 sm:px-6 py-2 border border-teal-400 rounded-sm text-gray-600 hover:text-gray-900 font-normal text-sm md:text-base justify-center sm:justify-start group"
              >
                Contact support
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

         <div className="border-t border-gray-300 pt-4 sm:pt-6 md:pt-8 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 md:gap-4">
            {[
              { name: "VISA", image: "/visa.png" },
              { name: "MASTERCARD", image: "/mastercard.png" },
            ].map((payment, i) => (
              <div
                key={i}
                className="w-10 sm:w-8 md:w-10 h-6 sm:h-5 md:h-6 rounded flex items-center justify-center bg-white shadow-sm border border-gray-200"
              >
                <img 
                  src={payment.image} 
                  alt={payment.name} 
                  className="size-5 object-contain"
                />
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-xs md:text-sm text-center sm:text-right">
            © Snuzz {new Date().getUTCFullYear()}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
