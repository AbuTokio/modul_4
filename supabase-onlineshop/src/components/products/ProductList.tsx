import { useContext } from "react"
import { mainContext, type MainContextProps } from "../../context/MainProvider"
import type { Product } from "../../interfaces/Product"
import ProductItem from "./ProductItem"

export default function ProductList() {
  const { products } = useContext(mainContext) as MainContextProps

  return (
    <div>
      {products.map((product: Product) => {
        return (
          <div key={product.id}>
            <ProductItem product={product} />
          </div>
        )
      })}
    </div>
  )
}
