import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  selectBasketItems,
  removeFromBasket,
  updateQuantity,
} from "./basketSlice"
import { selectMenuSections } from "../menu/menuSlice"
import "./basket.css"

export const Basket = () => {
  const dispatch = useAppDispatch()
  const basketItems = useAppSelector(selectBasketItems)
  const menuSections = useAppSelector(selectMenuSections)

  const getItem = (id: number) => {
    for (const section of menuSections) {
      const item = section.items.find(item => item.id === id)
      if (item) return item
    }
    return null
  }

  const handleDecrease = (id: number) => {
    const item = basketItems.find(item => item.id === id)
    if (item && item.quantity > 1) {
      dispatch(updateQuantity({ id, quantity: item.quantity - 1 }))
    } else {
      dispatch(removeFromBasket(id))
    }
  }

  const handleIncrease = (id: number) => {
    const item = basketItems.find(item => item.id === id)
    if (item) {
      dispatch(updateQuantity({ id, quantity: item.quantity + 1 }))
    }
  }

  const total = basketItems.reduce((acc, item) => {
    return acc + (item ? item.price * item.quantity : 0)
  }, 0)

  return (
    <div className="basket">
      <div className="basket-header">
        <h3 className="basket-title">Carrinho</h3>
      </div>
      <ul className="basket-items">
        {basketItems.length === 0 ? (
          <li className="empty-basket-message">Seu carrinho está vazio</li>
        ) : (
          basketItems.map(item => {
            const menuItem = getItem(item.id)
            return menuItem ? (
              <li key={item.id} className="basket-item">
                <div className="basket-item-details">
                  <span className="basket-item-name">{menuItem.name}</span>
                  <span className="basket-item-quantity">
                    <button
                      className="quantity-button"
                      onClick={() => handleDecrease(item.id)}
                    >
                      &minus;
                    </button>
                    <p className="qtd-number">{item.quantity}</p>
                    <button
                      className="quantity-button"
                      onClick={() => handleIncrease(item.id)}
                    >
                      +
                    </button>
                  </span>
                </div>
                <span className="basket-item-price">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ) : null
          })
        )}
      </ul>
      <div
        className={`basket-footer ${basketItems.length === 0 ? "hidden" : ""}`}
      >
        <strong className="basket-subtotal">
          <span className="label">Sub total</span>
          <span className="amount">R$ {total.toFixed(2)}</span>
        </strong>
        <strong className="basket-total">
          <span className="label">Total:</span>
          <span className="amount">R$ {total.toFixed(2)}</span>
        </strong>
      </div>
    </div>
  )
}
