import { useContext } from "react"
import { mainContext, type MainContextProps } from "../../context/MainProvider"
import type { Product } from "../../interfaces/Product"

export default function Home() {
  const { products } = useContext(mainContext) as MainContextProps

  console.log(products)

  return (
    <div>
      {products.map((product: Product, index) => {
        return (
          <div key={index}>
            <h4>Title: {product.title}</h4>
          </div>
        )
      })}
    </div>
  )
}
