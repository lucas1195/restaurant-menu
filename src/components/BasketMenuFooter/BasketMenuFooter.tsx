import React from "react"
import "./BasketMenuFooter.css"

interface BasketMenuProps {
  basketCount: number
  openBasketMobile: () => void
}

const BasketMenuFooter: React.FC<BasketMenuProps> = ({
  openBasketMobile,
  basketCount,
}) => {
  return (
    <div className="basket-menu-footer">
      <button onClick={openBasketMobile}>
        Your basket&nbsp;&nbsp;&bull;&nbsp;{basketCount}
        &nbsp;&nbsp;{basketCount > 1 ? "items" : "item"}
      </button>
    </div>
  )
}

export default BasketMenuFooter
