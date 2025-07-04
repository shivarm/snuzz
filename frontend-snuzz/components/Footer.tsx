import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram, Facebook, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-white via-gray-50 to-white text-gray-900 px-4 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap- mb-8 md:mb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <img src="/logo.svg" alt="SNUZZ" className="h-8 md:h-10 w-auto mb-4 md:mb-6 mt-5 md:mt-8" />

            <div className="flex gap-2">
              {[Instagram, Facebook].map((Icon, i) => (
                <div
                  key={i}
                  className=" rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                >
                  <Icon className="w-4 md:w-5 h-4 md:h-5 text-black" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4 md:mb-6 text-base md:text-lg">Shop</h4>
            <ul className="space-y-2 md:space-y-3 text-gray-600">
              {["Brand", "Flavour", "Strenth", "Snuzz Pro"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="transition-colors text-sm md:text-base"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4 md:mb-6 text-base md:text-lg">Favorites</h4>
            <ul className="space-y-2 md:space-y-3 text-gray-600">
              {["Klint Artic Mint", "Klint Artic Mint", "Klint Artic Mint", "Klint Artic Mint"].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="transition-colors text-sm md:text-base"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4 md:mb-6 text-base md:text-lg">
              Information
            </h4>
            <ul className="space-y-2 md:space-y-3 text-gray-600">
              {["Contact Us", "Order Status", "Shipping", "Privacy"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="transition-colors text-sm md:text-base"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
           <div>
            <h4 className="font-bold text-gray-900 mb-4 md:mb-6 text-base md:text-lg">
              Contact Us
            </h4>
            <div className="mt-1">
              <Button 
                variant="ghost" 
                className="h-auto  px-6 py-2 border border-teal-400 rounded-sm text-gray-600 hover:text-gray-900 font-normal text-sm md:text-base justify-start group"
              >
                Contact support
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

         <div className="border-t border-gray-300 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-wrap justify-center md:justify-start mb-4 md:mb-0">
            {[
              { name: "VISA", image: "/visa.png" },
              { name: "MASTERCARD", image: "/mastercard.png" },
            ].map((payment, i) => (
              <div
                key={i}
                className="w-8 md:w-10 h-5 md:h-6 rounded flex items-center justify-center"
              >
                <img 
                  src={payment.image} 
                  alt={payment.name} 
                  className="size-5 object-contain"
                />
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-xs md:text-sm text-center md:text-right">
            © Snuzz {new Date().getUTCFullYear()}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
