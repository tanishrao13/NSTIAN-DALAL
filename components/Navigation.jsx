"use client"

import Link from "next/link"
import { useApp } from "@/context/AppContext"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const { state, dispatch } = useApp()
  const pathname = usePathname()

  const handleLogout = () => {
    dispatch({ type: "SET_USER", payload: null })
  }

  const isActive = (path) => pathname === path

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold">
            NSTIANDALAL
          </Link>

          <div className="flex space-x-6">
            <Link href="/" className={`hover:text-blue-200 ${isActive("/") ? "text-blue-200" : ""}`}>
              Home
            </Link>
            <Link
              href="/properties"
              className={`hover:text-blue-200 ${isActive("/properties") ? "text-blue-200" : ""}`}
            >
              Properties
            </Link>
            <Link
              href="/comparison"
              className={`hover:text-blue-200 ${isActive("/comparison") ? "text-blue-200" : ""}`}
            >
              Compare ({state.compareList.length})
            </Link>
            <Link href="/cart" className={`hover:text-blue-200 ${isActive("/cart") ? "text-blue-200" : ""}`}>
              Cart ({state.cart.length})
            </Link>
            <Link href="/reviews" className={`hover:text-blue-200 ${isActive("/reviews") ? "text-blue-200" : ""}`}>
              Reviews
            </Link>
          </div>

          <div className="hidden sm:block flex items-center space-x-4">
            {state.user ? (
              <div className="flex items-center space-x-4">
                <span>Welcome, {state.user.name}</span>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/auth" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
