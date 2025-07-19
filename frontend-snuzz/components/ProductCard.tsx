"use client";

import Image from "next/image";
import { getDiscountPercentage } from "@/lib/utils";
import Link from "next/link";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    salePrice: number;
    image: string;
    brand: string;
  };
  onAddToCart: (product: any) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div
      className="group relative bg-gradient-to-b from-[#CEF6F8] to-[#F0F1F1] rounded-lg sm:rounded-xl p-2 sm:p-3 flex flex-col justify-between w-full h-full aspect-[3/4] sm:aspect-[3/4] cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col items-center w-full flex-1">
        <div className="flex flex-row justify-between items-center w-full z-10">
          {product.salePrice < product.price ? (
            <span className="bg-white text-[9px] sm:text-[10px] md:text-[11px] font-bold italic text-red-500 px-1 sm:px-1.5 py-0.5 rounded-sm shadow border border-red-100 whitespace-nowrap">
              Sale {getDiscountPercentage(product.price, product.salePrice)}%
            </span>
          ) : (
            <span className="invisible"></span>
          )}
          <span className="bg-white text-[9px] sm:text-[10px] md:text-[11px] font-bold italic text-black px-1 sm:px-1.5 py-0.5 rounded-sm shadow border border-gray-200 whitespace-nowrap">
            Free shipping
          </span>
        </div>
        <Link href={`/product/${product.id}`} className="flex items-center justify-center w-full flex-1 min-h-0 mt-1">
          <Image
            src="/mint.png"
            alt={product.name}
            className="object-contain drop-shadow-xl [filter:drop-shadow(0_8px_16px_rgba(0,0,0,0.10)] w-auto h-auto max-h-[80%] transition-transform group-hover:scale-105"
            width={180}
            height={132}
          />
        </Link>
      </div>

      <div className="flex w-full items-end justify-between mt-1 min-h-0">
        <Link href={`/product/${product.id}`} className="text-left flex-1 min-w-0">
          <h3 className="font-normal text-[12px] sm:text-[13px] md:text-[14px] text-black leading-tight truncate group-hover:text-teal-700 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 flex-wrap mt-0.5">
            <span className="text-[#e74c3c] font-bold text-[13px] sm:text-[14px] md:text-[15px] whitespace-nowrap">
              € {product.salePrice.toFixed(2)}
            </span>
            {product.salePrice < product.price && (
              <span className="text-gray-500 line-through text-[11px] sm:text-[12px] md:text-[13px] whitespace-nowrap">
                € {product.price.toFixed(2)}
              </span>
            )}
          </div>
        </Link>
        <button
          onClick={() => onAddToCart(product)}
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center bg-[#CEF6F8]/80 shadow flex-shrink-0 [box-shadow:0_2px_8px_0_rgba(58,240,247,0.10)]"
        >
          <Image
            src="/cart.png"
            alt="Add to cart"
            className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4"
            width={4}
            height={4}
          />
        </button>
      </div>
    </div>
  );
}