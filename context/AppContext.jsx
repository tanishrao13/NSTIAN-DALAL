"use client"

import { createContext, useContext, useReducer, useEffect } from "react"

const initialState = {
  user: null,
  favorites: [],
  compareList: [],
  cart: [],
  isLoading: false,
}

const AppContext = createContext(null)

function appReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload }
    case "ADD_TO_FAVORITES":
      if (state.favorites.find((p) => p.id === action.payload.id)) {
        return state
      }
      return { ...state, favorites: [...state.favorites, action.payload] }
    case "REMOVE_FROM_FAVORITES":
      return {
        ...state,
        favorites: state.favorites.filter((p) => p.id !== action.payload),
      }
    case "ADD_TO_COMPARE":
      if (state.compareList.length >= 3) {
        alert("You can only compare up to 3 properties")
        return state
      }
      if (state.compareList.find((p) => p.id === action.payload.id)) {
        return state
      }
      return { ...state, compareList: [...state.compareList, action.payload] }
    case "REMOVE_FROM_COMPARE":
      return {
        ...state,
        compareList: state.compareList.filter((p) => p.id !== action.payload),
      }
    case "CLEAR_COMPARE":
      return { ...state, compareList: [] }
    case "ADD_TO_CART":
      if (state.cart.find((item) => item.property.id === action.payload.id)) {
        return state
      }
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            property: action.payload,
            addedAt: new Date().toISOString(),
            id: Date.now().toString(),
          },
        ],
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.property.id !== action.payload),
      }
    case "CLEAR_CART":
      return { ...state, cart: [] }
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      dispatch({ type: "SET_USER", payload: JSON.parse(savedUser) })
    }

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("favorites")
    if (savedFavorites) {
      const favorites = JSON.parse(savedFavorites)
      favorites.forEach((property) => {
        dispatch({ type: "ADD_TO_FAVORITES", payload: property })
      })
    }

    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      const cartItems = JSON.parse(savedCart)
      cartItems.forEach((item) => {
        dispatch({ type: "ADD_TO_CART", payload: item.property })
      })
    }
  }, [])

  useEffect(() => {
    // Save favorites to localStorage
    localStorage.setItem("favorites", JSON.stringify(state.favorites))
  }, [state.favorites])

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(state.cart))
  }, [state.cart])

  useEffect(() => {
    // Save user to localStorage
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user))
    } else {
      localStorage.removeItem("user")
    }
  }, [state.user])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
