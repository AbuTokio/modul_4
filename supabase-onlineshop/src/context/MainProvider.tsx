import React, { createContext, useEffect, useState } from "react"
import type { Product } from "../interfaces/Product"
import { getProducts_store } from "../functions/getProduct"
import type { Cart } from "../interfaces/Cart"

export interface MainContextProps {
  products: Product[]
  cart: Cart[] | null | undefined | unknown
  setCart: React.Dispatch<React.SetStateAction<Cart[] | null | undefined | unknown>>
}

// eslint-disable-next-line react-refresh/only-export-components
export const mainContext = createContext<MainContextProps | null>(null)

export default function MainProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<Cart[] | null | undefined | unknown>([])

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
  }
  return <mainContext.Provider value={value}>{children}</mainContext.Provider>
}
