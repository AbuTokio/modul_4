import supabase from "../utils/supabase"

export async function addCart(productId: number) {
  // ~ Wir prüfen, ob das Produkt bereits im Warenkorb ist

  const { data: itemExists, error: errorItem } = await supabase
    .from("cart_items")
    .select("*")
    // cart_id 1 ist hardcodiert, da wir noch kein User-Management haben.
    .eq("cart_id", 1)
    .eq("product_id", productId)

  if (errorItem) console.error("Fehler beim Prüfen des Warenkorbs:", errorItem)

  console.log(itemExists)

  const existingItem = itemExists?.[0]

  if (existingItem) {
    const { error: UpdateError } = await supabase
      .from("cart_items")
      .update({ quantity: existingItem.quantity + 1 })
      .eq("id", existingItem.id)

    if (UpdateError) console.error("Fehler beim Aktualisieren des Warenkorbs:", UpdateError)
    else console.log("Menge erhöht.")
  } else {
    // ~ Falls das Produkt noch nicht im Warenkorb ist, fügen wir es hinzu.
    const { error: insertError } = await supabase.from("cart_items").insert({
      cart_id: 1,
      product_id: productId,
      quantity: 1,
    })

    if (insertError) console.error("Fehler beim Hinzufügen zum Warenkorb:", insertError)
    else console.log("Produkt zum Warenkorb hinzugefügt.")
  }
}
