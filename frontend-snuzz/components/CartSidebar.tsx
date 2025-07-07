"use client";

import { useCart } from "@/contexts/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CartSidebar() {
  const { cartItems, cartOpen, setCartOpen, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop with smooth fade */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          cartOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setCartOpen(false)}
      ></div>

      {/* Cart Sidebar with smooth slide animation */}
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-6 h-6 text-[#3AF0F7]" />
              <h2 className="text-xl font-bold text-gray-900">
                Shopping Cart ({getTotalItems()})
              </h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCartOpen(false)}
              className="hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg font-medium mb-2">Your cart is empty</p>
                <p className="text-gray-400 text-sm">Add some products to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-[#8cedf8] to-[#3AF0F7]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-gray-800 font-bold text-sm">{item.image}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.brand}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[#3AF0F7] font-bold">€{item.price.toFixed(2)}</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-[#3AF0F7] hover:bg-[#2de0e7] flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-4 h-4 text-black" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4">
              <div className="flex items-center justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-[#3AF0F7]">€{getTotalPrice().toFixed(2)}</span>
              </div>
              <Button className="w-full bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] hover:from-[#2de0e7] hover:to-[#7ee6ea] text-black font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
