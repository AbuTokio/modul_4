import type { Cart } from "../interfaces/Cart"
import supabase from "../utils/supabase"

export const getCart = async (): Promise<Cart | unknown> => {
  const { data: cart, error } = await supabase
    .from("cart_items")
    .select("id, quantity, products:product_id(*)")
    .eq("cart_id", 1) // Hardcodiert da kein User-Management

  if (error) console.error("Fehler beim Laden des Warenkorbs:", error)

  return cart as unknown as Cart
}
