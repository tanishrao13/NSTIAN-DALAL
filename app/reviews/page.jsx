"use client"

import { useState, useEffect } from "react"
import { fetchProperties, addReview } from "@/lib/api"
import { useApp } from "@/context/AppContext"

export default function ReviewsPage() {
  const { state } = useApp()
  const [properties, setProperties] = useState([])
  const [selectedProperty, setSelectedProperty] = useState("")
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [allReviews, setAllReviews] = useState([])

  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = async () => {
    try {
      const data = await fetchProperties()
      setProperties(data)

      // Collect all reviews
      const reviews = []
      data.forEach((property) => {
        reviews.push(...property.reviews)
      })
      setAllReviews(reviews)
    } catch (error) {
      console.error("Error loading properties:", error)
    }
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()

    if (!state.user) {
      alert("Please login to submit a review")
      return
    }

    if (!selectedProperty) {
      alert("Please select a property")
      return
    }

    setIsSubmitting(true)
    try {
      const newReview = await addReview({
        propertyId: selectedProperty,
        userName: state.user.name,
        rating,
        comment,
        date: new Date().toISOString().split("T")[0],
      })

      
      setAllReviews((prev) => [newReview, ...prev])

      
      setSelectedProperty("")
      setRating(5)
      setComment("")

      alert("Review submitted successfully!")
    } catch (error) {
      console.error("Error submitting review:", error)
      alert("Error submitting review")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getPropertyTitle = (propertyId) => {
    const property = properties.find((p) => p.id === propertyId)
    return property ? property.title : "Unknown Property"
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Property Reviews</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">




        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">All Reviews ({allReviews.length})</h2>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {allReviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet. Be the first to write one!</p>
            ) : (
              allReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{review.userName}</span>
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-blue-600 mb-2">{getPropertyTitle(review.propertyId)}</p>
                  <p className="text-gray-700 mb-2">{review.comment}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
