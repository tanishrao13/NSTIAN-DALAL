"use client"

import Image from "next/image"
import Link from "next/link"
import { useApp } from "@/context/AppContext"

export default function PropertyCard({ property }) {
  const { state, dispatch } = useApp()

  const isFavorite = state.favorites.some((p) => p.id === property.id)
  const isInCompare = state.compareList.some((p) => p.id === property.id)
  const isInCart = state.cart.some((item) => item.property.id === property.id)

  const toggleFavorite = () => {
    if (!state.user) {
      alert("Please login to add favorites")
      return
    }

    if (isFavorite) {
      dispatch({ type: "REMOVE_FROM_FAVORITES", payload: property.id })
    } else {
      dispatch({ type: "ADD_TO_FAVORITES", payload: property })
    }
  }

  const toggleCompare = () => {
    if (isInCompare) {
      dispatch({ type: "REMOVE_FROM_COMPARE", payload: property.id })
    } else {
      dispatch({ type: "ADD_TO_COMPARE", payload: property })
    }
  }

  const toggleCart = () => {
    if (!state.user) {
      alert("Please login to add to cart")
      return
    }

    if (isInCart) {
      dispatch({ type: "REMOVE_FROM_CART", payload: property.id })
    } else {
      dispatch({ type: "ADD_TO_CART", payload: property })
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Image
          src={property.image || "/placeholder.svg"}
          alt={property.title}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={toggleFavorite}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isFavorite ? "bg-red-500 text-white" : "bg-white text-gray-600"
          } hover:scale-110 transition-transform`}
        >
          ❤️
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
        <p className="text-gray-600 mb-2">{property.location}</p>
        <p className="text-2xl font-bold text-blue-600 mb-2">${property.price.toLocaleString()}</p>

        <div className="flex justify-between text-sm text-gray-500 mb-3">
          <span>{property.bedrooms} bed</span>
          <span>{property.bathrooms} bath</span>
          <span>{property.area} sqft</span>
        </div>

        <div className="flex items-center mb-3">
          <span className="text-yellow-500">★</span>
          <span className="ml-1 text-sm">{property.rating}</span>
          <span className="ml-2 text-sm text-gray-500">({property.reviews.length} reviews)</span>
        </div>

        <div className="flex space-x-2 mb-3">
          <Link
            href={`/properties/${property.id}`}
            className="flex-1 bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600 transition-colors"
          >
            View Details
          </Link>
          <button
            onClick={toggleCompare}
            className={`px-4 py-2 rounded transition-colors ${
              isInCompare ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {isInCompare ? "✓" : "+"}
          </button>
        </div>

        <button
          onClick={toggleCart}
          className={`w-full py-2 rounded transition-colors ${
            isInCart ? "bg-green-500 text-white hover:bg-green-600" : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          {isInCart ? "✓ In Cart" : "🛒 Add to Cart"}
        </button>
      </div>
    </div>
  )
}
