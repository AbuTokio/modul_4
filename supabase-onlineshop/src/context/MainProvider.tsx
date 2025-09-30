import { createContext, useEffect, useState } from "react"
import type { Product } from "../interfaces/Product"

export interface MainContextProps {
  products: Product[]
}

// eslint-disable-next-line react-refresh/only-export-components
export const mainContext = createContext<MainContextProps | null>(null)

export default function MainProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {}, [])

  const value: MainContextProps = {
    products,
  }
  return <mainContext.Provider value={value}>{children}</mainContext.Provider>
}
