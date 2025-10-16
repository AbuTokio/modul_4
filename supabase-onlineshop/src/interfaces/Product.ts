import type { Category } from "./Category"

export interface Product {
  id: number
  title: string
  price: number
  quality: string
  category: Category
}
