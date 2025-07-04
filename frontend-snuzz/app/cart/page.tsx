"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Lock,
  CreditCard,
  Truck,
  Shield,
  Tag,
  Star,
  Heart,
} from "lucide-react"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  brand: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      price: 29.99,
      quantity: 2,
      image: "👕",
      brand: "StyleCo",
    },
    {
      id: 2,
      name: "Classic Black Hoodie",
      price: 59.99,
      quantity: 1,
      image: "🧥",
      brand: "ComfortWear",
    },
    {
      id: 3,
      name: "Casual Denim Jeans",
      price: 79.99,
      quantity: 1,
      image: "👖",
      brand: "DenimCo",
    },
  ])

  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [cartOpen, setCartOpen] = useState(false)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setAppliedPromo("SAVE10")
      setPromoCode("")
    }
  }

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getDiscount = () => {
    return appliedPromo === "SAVE10" ? getSubtotal() * 0.1 : 0
  }

  const getShipping = () => {
    return getSubtotal() > 100 ? 0 : 9.99
  }

  const getTax = () => {
    return (getSubtotal() - getDiscount()) * 0.08
  }

  const getTotal = () => {
    return getSubtotal() - getDiscount() + getShipping() + getTax()
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <Header cartItems={cartItems} setCartItems={setCartItems} cartOpen={cartOpen} setCartOpen={setCartOpen} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
          <div className="text-center py-20">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-[#3AF0F7]/10 via-[#8ef7fb]/20 to-[#3AF0F7]/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <div className="w-24 h-24 bg-gradient-to-br from-[#3AF0F7]/20 to-[#8ef7fb]/30 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-gray-400" />
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Your cart is empty</h2>
            <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto leading-relaxed">
              Discover our curated collection of premium products and start building your perfect order.
            </p>
            <Link href="/">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] hover:from-[#2de0e7] hover:to-[#7ee6ea] text-black font-semibold px-8 py-3 text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Explore Products
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header cartItems={cartItems} setCartItems={setCartItems} cartOpen={cartOpen} setCartOpen={setCartOpen} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-6">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Shopping Cart</h1>
              <p className="text-gray-600 mt-1">Review your items and proceed to checkout</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{getTotalItems()}</div>
            <div className="text-sm text-gray-500">items</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
              <div className="p-8">
                <div className="space-y-8">
                  {cartItems.map((item, index) => (
                    <div key={item.id} className="group">
                      <div className="flex items-start space-x-6">
                        {/* Product Image */}
                        <div className="relative">
                          <div className="w-24 h-24 bg-gradient-to-br from-[#8cedf8]/30 via-white to-[#3AF0F7]/20 rounded-2xl flex items-center justify-center shadow-lg border border-gray-100 group-hover:shadow-xl transition-all duration-300">
                            <div className="text-3xl">{item.image}</div>
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#3AF0F7] transition-colors duration-200">
                                  {item.name}
                                </h3>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-red-500"
                                >
                                  <Heart className="w-4 h-4" />
                                </Button>
                              </div>
                              <div className="flex items-center space-x-3 mb-3">
                                <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                                  {item.brand}
                                </span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl font-bold text-[#3AF0F7]">€{item.price.toFixed(2)}</span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full p-2 transition-all duration-200"
                            >
                              <Trash2 className="w-5 h-5" />
                            </Button>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-3 bg-gray-50 rounded-xl p-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="w-10 h-10 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className="w-12 text-center font-bold text-lg text-gray-900">
                                  {item.quantity}
                                </span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="w-10 h-10 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500 mb-1">Item Total</p>
                              <p className="text-xl font-bold text-gray-900">
                                €{(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < cartItems.length - 1 && (
                        <div className="mt-8">
                          <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Promo Code */}
            <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] rounded-full flex items-center justify-center">
                  <Tag className="w-5 h-5 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Promo Code</h3>
              </div>
              <div className="flex space-x-3">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 border-gray-200 focus:border-[#3AF0F7] focus:ring-[#3AF0F7]/20 rounded-xl"
                />
                <Button
                  onClick={applyPromoCode}
                  className="bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] hover:from-[#2de0e7] hover:to-[#7ee6ea] text-black font-semibold px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Apply
                </Button>
              </div>
              {appliedPromo && (
                <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                  <p className="text-sm text-green-800 font-medium flex items-center">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    Promo code "{appliedPromo}" applied! You saved €{getDiscount().toFixed(2)}
                  </p>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-3 flex items-center">
                <span className="w-2 h-2 bg-[#3AF0F7] rounded-full mr-2"></span>
                Try "SAVE10" for 10% off your order
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 sticky top-8 overflow-hidden">
              <div className="bg-gradient-to-r from-[#3AF0F7]/10 to-[#8ef7fb]/10 p-6 border-b border-gray-200/50">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] rounded-full flex items-center justify-center mr-3">
                    <ShoppingBag className="w-4 h-4 text-black" />
                  </div>
                  Order Summary
                </h2>
              </div>

              <div className="p-6">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center text-gray-700">
                    <span className="font-medium">Subtotal ({getTotalItems()} items)</span>
                    <span className="font-semibold">€{getSubtotal().toFixed(2)}</span>
                  </div>

                  {appliedPromo && (
                    <div className="flex justify-between items-center text-green-600 bg-green-50 p-3 rounded-xl">
                      <span className="font-medium">Discount ({appliedPromo})</span>
                      <span className="font-bold">-€{getDiscount().toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-gray-700">
                    <span className="font-medium flex items-center">
                      <Truck className="w-4 h-4 mr-2" />
                      Shipping
                    </span>
                    <span className="font-semibold">
                      {getShipping() === 0 ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Free</Badge>
                      ) : (
                        `€${getShipping().toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-gray-700">
                    <span className="font-medium">Tax</span>
                    <span className="font-semibold">€{getTax().toFixed(2)}</span>
                  </div>

                  <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl">
                    <Separator className="mb-4 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-[#3AF0F7]">€{getTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-[#3AF0F7] to-[#8ef7fb] hover:from-[#2de0e7] hover:to-[#7ee6ea] text-black font-bold py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] rounded-xl relative overflow-hidden group">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  <span className="relative flex items-center justify-center">
                    <Lock className="w-5 h-5 mr-3" />
                    Secure Checkout
                  </span>
                </Button>

                {/* Trust Badges */}
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <Shield className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-medium">256-bit SSL Encryption</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <Truck className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium">Free shipping on orders over €100</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <CreditCard className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="font-medium">All major cards accepted</span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-4">Accepted Payment Methods</p>
                  <div className="grid grid-cols-4 gap-3">
                    <div className="aspect-[3/2] bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg text-white text-xs flex items-center justify-center font-bold shadow-lg">
                      VISA
                    </div>
                    <div className="aspect-[3/2] bg-gradient-to-br from-red-500 to-red-600 rounded-lg text-white text-xs flex items-center justify-center font-bold shadow-lg">
                      MC
                    </div>
                    <div className="aspect-[3/2] bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white text-xs flex items-center justify-center font-bold shadow-lg">
                      AMEX
                    </div>
                    <div className="aspect-[3/2] bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg text-black text-xs flex items-center justify-center font-bold shadow-lg">
                      PP
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
