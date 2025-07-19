"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Header from "@/components/Header"
import CartSidebar from "@/components/cart-sidebar"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Clock, Truck, Home, Box, ArrowLeft, Plus, Minus } from "lucide-react"
import Link from "next/link"
import { use } from "react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  brand: string
}

interface Product {
  id: string
  name: string
  brand: string
  category: string
  price: number
  salePrice: number
  rating: number
  reviews: number
  image: string
  isHotSelling: boolean
  strength: string
  flavor: string
  nicotinePerPouch: string
  description: string
}

// Mock product data - in a real app you'd fetch this based on the ID
const productDetails: Product = {
  id: "1",
  name: "KLIN Arctic Mint",
  brand: "Klint",
  category: "Nicotine",
  price: 6.99,
  salePrice: 5.49,
  rating: 4.5,
  reviews: 128,
  image: "/mint.png",  
  isHotSelling: true,
  strength: "Medium",
  flavor: "Arctic Mint",
  nicotinePerPouch: "6 mg",
  description: "KLIN Arctic Mint offers a refreshing minty flavor with a balanced nicotine kick. Perfect for those looking for a discreet nicotine experience with a cool aftertaste."
}

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  // Properly unwrap params with React.use() to future-proof the code
  const unwrappedParams = use(params as any) as { id: string }
  const productId = unwrappedParams.id
  
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<Product | null>(null)
  
  // In a real app, you would fetch the product details based on the id
  useEffect(() => {
    // Simulating API call to get product details
    setProduct(productDetails)
    // Use productId instead of directly accessing params.id
  }, [productId])
  
  const addToCart = () => {
    if (!product) return
    
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === Number(product.id))
      if (existingItem) {
        return prev.map(item => 
          item.id === Number(product.id)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        return [...prev, {
          id: Number(product.id),
          name: product.name,
          price: product.salePrice,
          quantity: quantity,
          image: product.image,
          brand: product.brand,
        }]
      }
    })
  }

  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1))

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      <Header 
        cartItems={cartItems}
        setCartItems={setCartItems}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        allProducts={[product]}
      />
      
      <CartSidebar
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-6">
          <Link href="/product" className="flex items-center text-gray-600 hover:text-teal-500 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to products</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column - Product Image and Description */}
          <div className="flex flex-col">
            <div className="bg-gradient-to-b from-[#CEF6F8] to-[#F0F1F1] rounded-xl p-6 flex items-center justify-center mb-6">
              <Image 
                src={product.image}
                alt={product.name}
                width={350}
                height={350}
                className="object-cover"
                priority
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Product Description</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Brand:</span>
                    <p className="text-gray-800">{product.brand}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Flavor:</span>
                    <p className="text-gray-800">{product.flavor}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Strength:</span>
                    <p className="text-gray-800">{product.strength}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Nicotine per pouch:</span>
                    <p className="text-gray-800">{product.nicotinePerPouch}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">How to Use</h3>
                <p className="text-gray-600">
                  Open the can, take a pouch, and place it between your gum and upper lip. 
                  Enjoy for up to 30 minutes.
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Column - Product Info and Actions */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <span className="text-green-600 font-medium">In Stock</span>
            </div>
            
            <div className="flex items-end gap-3 mb-6">
              <span className="text-3xl font-bold">€{product.salePrice.toFixed(2)}</span>
              {product.salePrice < product.price && (
                <span className="text-lg text-gray-500 line-through">€{product.price.toFixed(2)}</span>
              )}
            </div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button 
                  className="px-3 py-2 text-gray-600 hover:text-teal-500"
                  onClick={decrementQuantity}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                <button 
                  className="px-3 py-2 text-gray-600 hover:text-teal-500"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <Button 
                className="bg-teal-500 hover:bg-teal-600 text-white rounded-md px-6 py-2"
                onClick={addToCart}
              >
                Add to Cart
              </Button>
            </div>
            
            <Button 
              className="w-full bg-black hover:bg-gray-800 text-white rounded-md py-3 mb-8"
            >
              Buy Now
            </Button>
            
            <div className="border border-gray-200 rounded-lg p-5 mb-8">
              <div className="grid grid-cols-2 gap-y-4">
                <div className="flex items-center gap-2">
                  <Box className="h-5 w-5 text-teal-500" />
                  <span className="text-sm">30 Day Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-teal-500" />
                  <span className="text-sm">Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Box className="h-5 w-5 text-teal-500" />
                  <span className="text-sm">Free Returns</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Shipping Options</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-teal-500" />
                    <div>
                      <p className="font-medium">Free shipping</p>
                      <p className="text-sm text-gray-500">2-3 business days</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">€0.00</span>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-teal-500" />
                    <div>
                      <p className="font-medium">Express shipping</p>
                      <p className="text-sm text-gray-500">Tomorrow</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">€4.99</span>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                  <div className="flex items-center gap-3">
                    <Home className="h-5 w-5 text-teal-500" />
                    <div>
                      <p className="font-medium">Pickup from warehouse</p>
                      <p className="text-sm text-gray-500">Today (Wroclaw)</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">€0.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
