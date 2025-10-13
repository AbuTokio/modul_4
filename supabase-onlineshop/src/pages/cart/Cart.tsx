import { useContext, useEffect } from "react"
import { mainContext } from "../../context/MainProvider"
import type { Cart } from "../../interfaces/Cart"
import { getCart_v2 } from "../../functions/getCart_v2"
import supabase from "../../utils/supabase"

interface CartProps {
  cart: Cart[]
  setCart: React.Dispatch<React.SetStateAction<Cart[]>>
}

export default function Cart() {
  const { cart, setCart } = useContext(mainContext) as CartProps

  // console.log(cart)

  useEffect(() => {
    const getCartData = async () => {
      const myCartResult = await getCart_v2()
      // console.log(myCartResult)
      setCart(myCartResult as Cart[])
    }
    getCartData()
  }, [])

  const removeItem = async (cartItemId: number) => {
    const { error: deleteError } = await supabase.from("cart_items").delete().eq("id", cartItemId)

    if (deleteError) console.error("Fehler beim Löschen des Artikels:", deleteError)

    const updatedCart = await getCart_v2()
    setCart(updatedCart as Cart[])
  }

  return (
    <div>
      <h2>Warenkorb</h2>
      <div>
        {cart.map((cartItem: Cart) => {
          return (
            <div key={cartItem.id}>
              <p>Title: {cartItem.products.title}</p>
              <p>Price: {cartItem.products.price}</p>
              <p>Menge: {cartItem.quantity}</p>
              <button onClick={() => removeItem(cartItem.id)}>Delete Product</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
