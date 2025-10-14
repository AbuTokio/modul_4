import type { Cart } from "../interfaces/Cart"
import supabase from "../utils/supabase"

export const getCart_v2 = async (userId: string | undefined): Promise<Cart[] | unknown> => {
  const { data: cart } = await supabase.from("carts").select("*").eq("customer_id", userId).single()

  const { data: items, error } = await supabase
    .from("cart_items")
    .select("id, quantity, products:product_id(*)")
    .eq("cart_id", cart?.id)

  if (error) console.error("Fehler beim Laden des Warenkorbs:", error)

  return items
}
