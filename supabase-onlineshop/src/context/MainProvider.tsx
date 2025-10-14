import React, { createContext, useEffect, useState } from "react"
import type { Product } from "../interfaces/Product"
import { getProducts_store } from "../functions/getProduct"
import type { Cart } from "../interfaces/Cart"
import type { User } from "../interfaces/User"

export interface MainContextProps {
  products: Product[]
  cart: Cart[] | null | undefined | unknown
  setCart: React.Dispatch<React.SetStateAction<Cart[] | null | undefined | unknown>>

  // % NEW
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
}

export const mainContext = createContext<MainContextProps | null>(null)

export default function MainProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<Cart[] | null | undefined | unknown>([])

  // % NEW
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getData_In_useEffect = async () => {
      const proucts_Variable_von_der_function = await getProducts_store()
      // await getProductAndCategories()
      // await getCart()
      // await getCategory()
      // const products_category_von_der_function = await getProductAndCategories()
      // console.log(products_category_von_der_function);
      setProducts(proucts_Variable_von_der_function)
    }

    getData_In_useEffect()
  }, [])

  const value: MainContextProps = {
    products,
    cart,
    setCart,
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    loading,
  }
  return <mainContext.Provider value={value}>{children}</mainContext.Provider>
}
