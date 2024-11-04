import React from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

import "./basketMobile.css"
import {
  removeFromBasket,
  selectBasketItems,
  updateQuantity,
} from "../../features/basket/basketSlice"
import { selectMenuSections } from "../../features/menu/menuSlice"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { useTranslation } from "react-i18next"

interface BasketMobileProps {
  onClose: () => void
}

export const BasketMobile: React.FC<BasketMobileProps> = ({ onClose }) => {
  const dispatch = useAppDispatch()
  const basketItems = useAppSelector(selectBasketItems)
  const menuSections = useAppSelector(selectMenuSections)
  const ccySymbol = useSelector(
    (state: RootState) => state.restaurant.details?.ccySymbol,
  )

  const { t } = useTranslation()

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
    <div className="basket-mobile">
      <div className="basket-mobile-header">
        <h3 className="basket-mobile-title">{t("Basket")}</h3>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
      <ul className="basket-mobile-items">
        {basketItems.length === 0 ? (
          <li className="empty-basket-message">{t("Your basket is empty")}</li>
        ) : (
          basketItems.map(item => {
            const menuItem = getItem(item.id)
            return menuItem ? (
              <li key={item.id} className="basket-mobile-item">
                <div className="basket-item-details">
                  <span className="basket-item-name">{menuItem.name}</span>
                  {item.modifierName !== undefined && (
                    <span className="basket-item-modifier">
                      {`${t(item.modifierName)} (+${ccySymbol}${item.price.toFixed(2)})`}
                    </span>
                  )}
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
                  {ccySymbol} {(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ) : null
          })
        )}
      </ul>
      <div className="basket-mobile-footer">
        <strong className="basket-total">
          <span className="label">Total:</span>
          <span className="amount">
            {ccySymbol} {total.toFixed(2)}
          </span>
        </strong>
        <button className="checkout-button">{t("Checkout Now")}</button>
      </div>
    </div>
  )
}
