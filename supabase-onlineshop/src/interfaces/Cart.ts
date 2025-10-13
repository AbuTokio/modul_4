import type { Product } from "./Product"

export interface Cart {
  id: number
  cart_id: number
  quantity: number
  products: Product
}
