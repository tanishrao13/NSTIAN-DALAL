"use client"

import { useApp } from "@/context/AppContext"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const { state, dispatch } = useApp()

  const removeFromCart = (propertyId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: propertyId })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const getTotalValue = () => {
    return state.cart.reduce((total, item) => total + item.property.price, 0)
  }

  const handleCheckout = () => {
    if (!state.user) {
      alert("Please login to proceed with checkout")
      return
    }

    if (state.cart.length === 0) {
      alert("Your cart is empty")
      return
    }

    alert(`Checkout successful! Total: $${getTotalValue().toLocaleString()}`)
    clearCart()
  }

  if (!state.user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">Please login to view your cart</p>
          <Link
            href="/auth"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    )
  }

  if (state.cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
          <Link
            href="/properties"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Browse Properties
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Shopping Cart ({state.cart.length})</h1>
        <button
          onClick={clearCart}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {state.cart.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-48">
                  <Image
                    src={item.property.image || "/placeholder.svg"}
                    alt={item.property.title}
                    width={200}
                    height={150}
                    className="w-full h-32 object-cover rounded"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{item.property.title}</h3>
                    <button
                      onClick={() => removeFromCart(item.property.id)}
                      className="text-red-500 hover:text-red-700 text-xl"
                    >
                      ×
                    </button>
                  </div>

                  <p className="text-gray-600 mb-2">{item.property.location}</p>
                  <p className="text-2xl font-bold text-blue-600 mb-2">${item.property.price.toLocaleString()}</p>

                  <div className="flex justify-between text-sm text-gray-500 mb-3">
                    <span>{item.property.bedrooms} bed</span>
                    <span>{item.property.bathrooms} bath</span>
                    <span>{item.property.area} sqft</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-sm">{item.property.rating}</span>
                    </div>
                    <p className="text-sm text-gray-500">Added: {new Date(item.addedAt).toLocaleDateString()}</p>
                  </div>

                  <div className="mt-3">
                    <Link
                      href={`/properties/${item.property.id}`}
                      className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Items:</span>
                <span>{state.cart.length}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t pt-3">
                <span>Total Value:</span>
                <span className="text-blue-600">${getTotalValue().toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              Proceed to Checkout
            </button>

            <div className="mt-4 text-center">
              <Link href="/properties" className="text-blue-500 hover:text-blue-700 text-sm">
                Continue Shopping
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
