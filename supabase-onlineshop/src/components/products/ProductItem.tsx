import { useNavigate } from "react-router"
import type { Product } from "../../interfaces/Product"
import { addCart } from "../../functions/addCart"

interface ProductItemProps {
  product: Product
}

export default function ProductItem({ product }: ProductItemProps) {
  const navigate = useNavigate()

  const handleToCart = async () => {
    await addCart(product.id)
    navigate("/cart")
  }

  return (
    <div>
      <p>Title {product?.title}</p>
      <p>Price: {product?.price}</p>
      <p>Quality: {product?.quality}</p>
      <button onClick={handleToCart}>Add to Cart</button>
    </div>
  )
}
