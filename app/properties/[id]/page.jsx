"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { fetchPropertyById } from "@/lib/api"
import { useApp } from "@/context/AppContext"

export default function PropertyDetailPage() {
  const params = useParams()
  const { state, dispatch } = useApp()
  const [property, setProperty] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      loadProperty(params.id)
    }
  }, [params.id])

  const loadProperty = async (id) => {
    setIsLoading(true)
    try {
      const data = await fetchPropertyById(id)
      setProperty(data)
    } catch (error) {
      console.error("Error loading property:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleFavorite = () => {
    if (!state.user) {
      alert("Please login to add favorites")
      return
    }

    if (!property) return

    const isFavorite = state.favorites.some((p) => p.id === property.id)

    if (isFavorite) {
      dispatch({ type: "REMOVE_FROM_FAVORITES", payload: property.id })
    } else {
      dispatch({ type: "ADD_TO_FAVORITES", payload: property })
    }
  }

  const addToCompare = () => {
    if (!property) return
    dispatch({ type: "ADD_TO_COMPARE", payload: property })
  }

  const toggleCart = () => {
    if (!state.user) {
      alert("Please login to add to cart")
      return
    }

    if (!property) return

    const isInCart = state.cart.some((item) => item.property.id === property.id)

    if (isInCart) {
      dispatch({ type: "REMOVE_FROM_CART", payload: property.id })
    } else {
      dispatch({ type: "ADD_TO_CART", payload: property })
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2">Loading property details...</p>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-500">Property not found.</p>
        </div>
      </div>
    )
  }

  const isFavorite = state.favorites.some((p) => p.id === property.id)
  const isInCompare = state.compareList.some((p) => p.id === property.id)
  const isInCart = state.cart.some((item) => item.property.id === property.id)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <Image
            src={property.image || "/placeholder.svg"}
            alt={property.title}
            width={800}
            height={400}
            className="w-full h-96 object-cover"
          />
        </div>

        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{property.title}</h1>
              <p className="text-xl text-gray-600 mb-4">{property.location}</p>
              <p className="text-3xl font-bold text-blue-600">${property.price.toLocaleString()}</p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={addToCompare}
                disabled={isInCompare}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  isInCompare
                    ? "bg-green-500 text-white cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {isInCompare ? "Added to Compare" : "Add to Compare"}
              </button>
              <button
                onClick={toggleCart}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  isInCart
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                {isInCart ? "✓ In Cart" : "🛒 Add to Cart"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Property Details</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Type:</span> {property.type}
                </p>
                <p>
                  <span className="font-medium">Bedrooms:</span> {property.bedrooms}
                </p>
                <p>
                  <span className="font-medium">Bathrooms:</span> {property.bathrooms}
                </p>
                <p>
                  <span className="font-medium">Area:</span> {property.area} sqft
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Rating</h3>
              <div className="flex items-center mb-2">
                <span className="text-yellow-500 text-2xl">★</span>
                <span className="ml-2 text-xl font-bold">{property.rating}</span>
              </div>
              <p className="text-gray-600">{property.reviews.length} reviews</p>
            </div>

           
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Description</h3>
            <p className="text-gray-700 leading-relaxed">{property.description}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Reviews ({property.reviews.length})</h3>
            {property.reviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet.</p>
            ) : (
              <div className="space-y-4">
                {property.reviews.map((review) => (
                  <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{review.userName}</span>
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                    <p className="text-sm text-gray-500 mt-2">{review.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
