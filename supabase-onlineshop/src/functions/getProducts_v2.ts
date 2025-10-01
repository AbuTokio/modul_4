import type { Cart } from "../interfaces/Cart"
import type { Category } from "../interfaces/Category"
import type { Product } from "../interfaces/Product"
import supabase from "../utils/supabase"

export async function getProductAndCategories(): Promise<Product[]> {
  const { data: products, error } = await supabase.from("products").select(`
    id,
    title,
    price,
    quality,
    category:categories(category_name)
    `)

  if (error) console.error(error)

  console.log(products)
  return products as unknown as Product[]
}

// cart_items mit Produkten + Kategorien

export async function getCart(): Promise<Cart> {
  const { data: cart, error } = await supabase.from("cart_items").select(`
    id,
    cart_id,
    quantity,
    products:products(
      id,
      title,
      price,
      quality,
      category:categories(category_name)
      )
    `)

  if (error) console.error(error)

  console.log(cart)

  return cart as unknown as Cart
}

export async function getCategory(): Promise<Category> {
  const { data: category, error } = await supabase.from("categories").select(`
    category_name,
    id,
    products_table:products(*)
    `)

  if (error) console.error(error)

  console.log(category)

  return category as unknown as Category
}
