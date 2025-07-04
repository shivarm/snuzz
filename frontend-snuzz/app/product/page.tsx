"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CartSidebar from "@/components/cart-sidebar"
import { Star, Plus, ChevronDown, Truck } from "lucide-react"
import { useState, useEffect } from "react"

// Add this CSS for blinking animation
const blinkingStyles = `
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0.3; }
  }
  .blink {
    animation: blink 1.5s infinite;
  }
`

// Add the InStockIndicator component
const InStockIndicator = () => (
  <div className="flex items-center space-x-2 mb-4">
    <div className="w-2 h-2 bg-green-500 rounded-full blink"></div>
    <span className="text-sm font-medium text-green-600">In stock</span>
  </div>
)

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  brand: string
}

const productData = {
  id: 1,
  name: "77 Valtteri Bottas Edition Arctic Berry Light",
  brand: "KLINT",
  price: 4.99,
  salePrice: 3.6,
  rating: 4.8,
  reviews: 2116,
  image: "KLINT",
  description:
    "Experience the refreshing burst of berry flavor with the 77 VB Edition Arctic Berry Light! Enjoy a balanced nicotine pouch with a delightful berry flavor. Perfect for any occasion—order now and elevate your experience!",
  specifications: {
    strength: "MEDIUM",
    flavor: "BERRY",
    productType: "NICOTINE POUCHES",
    format: "SLIM",
    nicotineMgPerGram: "8",
    nicotineMgPerPouch: "12",
    nicotineMgPerPouch2: "8",
    contentPerCanGram: "0.5",
  },
}

const relatedProducts = [
  { id: 2, name: "Klint Arctic Mint", price: 4.99, salePrice: 3.6, image: "KLINT" },
  { id: 3, name: "Klint Arctic Mint", price: 4.99, salePrice: 3.6, image: "KLINT" },
  { id: 4, name: "Klint Arctic Mint", price: 4.99, salePrice: 3.6, image: "KLINT" },
  { id: 5, name: "Klint Arctic Mint", price: 4.99, salePrice: 3.6, image: "KLINT" },
]

const testimonials = [
  {
    name: "Lorem Ipsum",
    review:
      "Lorem ipsum dolor sit amet consectetur. Condimentum quis lacinia lobortis egestas aliquam placerat at dolor. Diam feugiat nisl montes vel orci lorem elementum.",
    rating: 5,
  },
  {
    name: "Lorem Ipsum",
    review:
      "Lorem ipsum dolor sit amet consectetur. Condimentum quis lacinia lobortis egestas aliquam placerat at dolor. Diam feugiat nisl montes vel orci lorem elementum.",
    rating: 5,
  },
  {
    name: "Lorem Ipsum",
    review:
      "Lorem ipsum dolor sit amet consectetur. Condimentum quis lacinia lobortis egestas aliquam placerat at dolor. Diam feugiat nisl montes vel orci lorem elementum.",
    rating: 5,
  },
]

export default function ProductPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  // Replace the quantity state with dropdown state
  const [quantityDropdownOpen, setQuantityDropdownOpen] = useState(false)
  const [selectedQuantity, setSelectedQuantity] = useState("1x")
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [expandedSections, setExpandedSections] = useState({
    description: true,
    howToUse: false,
    shipping: false,
    whyChoose: false,
  })

  const variants = [
    { label: "SAVE 30%", color: "bg-[#3AF0F7]" },
    { label: "SAVE 30%", color: "bg-[#3AF0F7]" },
    { label: "SAVE 30%", color: "bg-[#3AF0F7]" },
    { label: "SAVE 30%", color: "bg-[#3AF0F7]" },
  ]

  const quantityOptions = ["1x", "2x", "3x", "4x", "5x", "6x", "7x"]

  const addToCart = () => {
    const newItem: CartItem = {
      id: productData.id,
      name: productData.name,
      price: productData.salePrice,
      quantity: quantity,
      image: productData.image,
      brand: productData.brand,
    }

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === productData.id)
      if (existingItem) {
        return prev.map((item) => (item.id === productData.id ? { ...item, quantity: item.quantity + quantity } : item))
      } else {
        return [...prev, newItem]
      }
    })
  }

  const addRelatedToCart = (product: any) => {
    const newItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.salePrice,
      quantity: 1,
      image: product.image,
      brand: "KLINT",
    }

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prev, newItem]
      }
    })
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Add this useEffect to handle clicking outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (quantityDropdownOpen) {
        const target = event.target as Element
        if (!target.closest(".relative")) {
          setQuantityDropdownOpen(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [quantityDropdownOpen])

  return (
    <div className="min-h-screen bg-white">
      <Header
        cartItems={cartItems}
        setCartItems={setCartItems}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        allProducts={[]}
      />

      <CartSidebar cartOpen={cartOpen} setCartOpen={setCartOpen} cartItems={cartItems} setCartItems={setCartItems} />

      {/* Product Detail Section - Updated with sticky right panel */}
      <section className="pt-48 px-4 py-12 md:py-16">
        <style dangerouslySetInnerHTML={{ __html: blinkingStyles }} />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 pb-32">
            {/* Left Side - Product Images and Description */}
            <div className="space-y-4 md:space-y-6">
              {/* Main Product Image */}
              <div className="relative mt-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl md:rounded-3xl p-6 md:p-8 aspect-square flex items-center justify-center border-4 border-blue-400">
                <Badge className="absolute top-3 md:top-4 left-3 md:left-4 bg-red-500 text-white px-2 md:px-3 py-1 rounded-full font-bold text-xs md:text-sm">
                  Sale 30%
                </Badge>
                <Badge className="absolute top-3 md:top-4 right-3 md:right-4 bg-green-500 text-white px-2 md:px-3 py-1 rounded-full font-bold text-xs md:text-sm">
                  Free Shipping
                </Badge>
                <div className="w-64 md:w-80 h-64 md:h-80 bg-white rounded-full flex items-center justify-center shadow-2xl">
                  <div className="text-center">
                    <div className="text-gray-600 text-xs md:text-sm mb-2">ARCTIC MINT</div>
                    <div className="text-gray-600 text-xs mb-3 md:mb-4">20 POUCHES</div>
                    <div className="text-2xl md:text-4xl font-black text-gray-800 mb-3 md:mb-4">KLINT</div>
                    <div className="bg-red-500 text-white px-3 md:px-4 py-1 rounded text-xs md:text-sm font-bold mb-2">
                      EXTRA STRONG
                    </div>
                    <div className="text-gray-600 text-xs">NICOTINE POUCHES</div>
                    <div className="text-gray-600 text-xs">PEEL OPEN</div>
                    <div className="text-gray-600 text-xs">SLIM</div>
                  </div>
                </div>
              </div>
              {/* Product Description and How to Use */}
              <div className="mt-8">
                {/* Collapsible Product Description */}
                <button
                  className="w-full flex items-center justify-between border-b pb-2 focus:outline-none"
                  onClick={() => toggleSection('description')}
                >
                  <h2 className="font-bold text-xl">Product Description</h2>
                  <ChevronDown
                    className={`transition-transform duration-300 ${expandedSections.description ? '' : 'rotate-180'}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${expandedSections.description ? 'max-h-40' : 'max-h-0'}`}
                >
                  <div className="py-4 text-sm text-gray-700">
                    <div className="flex justify-between py-1 border-b"><span>Brand:</span><span>{productData.brand}</span></div>
                    <div className="flex justify-between py-1 border-b"><span>Flavor:</span><span>{productData.specifications.flavor}</span></div>
                    <div className="flex justify-between py-1 border-b"><span>Strength:</span><span>{productData.specifications.strength}</span></div>
                    <div className="flex justify-between py-1"><span>Nicotine per pouch:</span><span>{productData.specifications.nicotineMgPerPouch} mg</span></div>
                  </div>
                </div>
                {/* Collapsible How to Use */}
                <button
                  className="w-full flex items-center justify-between border-b pb-2 mt-6 focus:outline-none"
                  onClick={() => toggleSection('howToUse')}
                >
                  <h2 className="font-bold text-xl">How to Use</h2>
                  <ChevronDown
                    className={`transition-transform duration-300 ${expandedSections.howToUse ? '' : 'rotate-180'}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${expandedSections.howToUse ? 'max-h-40' : 'max-h-0'}`}
                >
                  <div className="py-4 text-sm text-gray-700">...</div>
                </div>
              </div>
            </div>
            {/* Right Side - Product Info - Make it sticky */}
            <div className="lg:sticky lg:top-32 lg:h-fit space-y-6 md:space-y-8 pb-56">
              {/* Add In Stock Indicator */}
              <InStockIndicator />

              {/* Rating and Reviews */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 md:w-5 h-4 md:h-5 fill-[#3AF0F7] text-[#3AF0F7]" />
                  ))}
                </div>
                <span className="text-xs md:text-sm text-gray-600">Based on {productData.reviews}+ reviews</span>
              </div>

              {/* Product Title and Price */}
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                  {productData.name}
                </h1>
              </div>

              {/* Variant Selection - Better mobile layout */}
              <div className="space-y-3 md:space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                  {variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVariant(index)}
                      className={`relative p-3 md:p-4 rounded-lg md:rounded-xl border-2 transition-all duration-200 ${
                        selectedVariant === index
                          ? "border-[#3AF0F7] bg-[#3AF0F7]/10"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br from-[#8cedf8] to-[#3AF0F7]/30 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2">
                        <div className="text-xs font-bold text-gray-800">KLINT</div>
                      </div>
                      <div className="text-xs font-semibold text-[#3AF0F7]">{variant.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Updated Quantity, Price, and Add to Cart with dropdown */}
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center justify-between w-full">
                  {/* Quantity Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setQuantityDropdownOpen(!quantityDropdownOpen)}
                      className="flex items-center justify-between w-20 px-3 py-2 border-2 border-gray-200 rounded-lg bg-white hover:border-gray-300 transition-colors"
                    >
                      <span className="font-semibold">{selectedQuantity}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${quantityDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {quantityDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-20 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        {quantityOptions.map((option) => (
                          <button
                            key={option}
                            onClick={() => {
                              setSelectedQuantity(option)
                              setQuantity(Number.parseInt(option.replace("x", "")))
                              setQuantityDropdownOpen(false)
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg font-semibold"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Price on the right */}
                  <div className="flex flex-col items-end ml-4">
                    <span className="text-base md:text-lg text-gray-500 line-through">€{productData.price.toFixed(2)}</span>
                    <span className="text-2xl md:text-3xl font-bold text-red-500">€{productData.salePrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Buy Now and Add to Cart Buttons - Large Icon Style */}
                <div className="flex gap-4 w-full mt-2">
                  <Button
                    onClick={addToCart}
                    className="flex-1 h-16 text-xl bg-[#3AF0F7] hover:bg-[#2de0e7] text-black font-bold rounded-xl shadow-none border-0 flex items-center justify-center"
                  >
                    Buy now
                  </Button>
                  <Button
                    onClick={addToCart}
                    variant="outline"
                    className="flex-1 h-16 text-xl bg-white hover:bg-gray-50 text-black font-bold rounded-xl border-2 border-gray-200 flex items-center justify-center"
                  >
                    Add to cart
                  </Button>
                </div>

                {/* Guarantee Badges */}
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div className="text-gray-600">30 Day Guarantee</div>
                  <div className="text-gray-600">Free Shipping</div>
                  <div className="text-gray-600">Free Returns</div>
                </div>

                {/* Shipping Options */}
                <div className="space-y-4 border-t pt-6">
                  <div className="flex items-center space-x-3">
                    <Truck className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="font-medium text-gray-900">Free shipping</div>
                      <div className="text-sm text-gray-500">2-3 business days</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <div className="w-3 h-3 bg-orange-400 rounded-sm"></div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Express shipping</div>
                      <div className="text-sm text-gray-500">Tomorrow</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-2 border-gray-400 rounded"></div>
                    <div>
                      <div className="font-medium text-gray-900">Pickup from warehouse</div>
                      <div className="text-sm text-gray-500">today (Wrocław)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add separator after Frequently Bought Together */}
      <hr className="my-12 border-gray-200" />

      {/* Frequently Bought Together - Better Mobile Layout */}
      <section className="px-4 py-12 md:py-16 bg-gray-50 mt-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
            Frequently bought together
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl md:rounded-2xl"
              >
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 h-40 md:h-48 flex items-center justify-center relative">
                    <Badge className="absolute top-2 md:top-3 left-2 md:left-3 bg-red-500 text-white px-2 py-1 rounded-full font-bold text-xs">
                      Sale 30%
                    </Badge>
                    <Badge className="absolute top-2 md:top-3 right-2 md:right-3 bg-green-500 text-white px-2 py-1 rounded-full font-bold text-xs">
                      Free Shipping
                    </Badge>
                    <div className="w-20 md:w-24 h-20 md:h-24 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <div className="text-xs md:text-sm font-black text-gray-800">{product.image}</div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-3 md:p-4">
                  <h3 className="font-bold text-base md:text-lg text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="flex items-center space-x-1 md:space-x-2">
                      <span className="text-[#3AF0F7] font-bold text-base md:text-lg">
                        € {product.salePrice.toFixed(2)}
                      </span>
                      <span className="text-gray-400 line-through text-xs md:text-sm">
                        € {product.price.toFixed(2)}
                      </span>
                    </div>
                    <Button
                      onClick={() => addRelatedToCart(product)}
                      size="icon"
                      className="bg-[#3AF0F7] hover:bg-[#2de0e7] text-black rounded-full w-7 md:w-8 h-7 md:h-8"
                    >
                      <Plus className="w-3 md:w-4 h-3 md:h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What Our Customers Are Saying</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <Card
                key={i}
                className="p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-0">
                  <h3 className="font-bold text-xl text-gray-900 mb-4">{testimonial.name}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{testimonial.review}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-[#3AF0F7] text-[#3AF0F7]" />
                      ))}
                    </div>
                    <span className="text-sm text-[#3AF0F7] font-semibold">Verified Customer</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
