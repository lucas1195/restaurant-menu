import React from "react"
import "./BasketMenuFooter.css"
import { useTranslation } from "react-i18next"

interface BasketMenuProps {
  basketCount: number
  openBasketMobile: () => void
}

const BasketMenuFooter: React.FC<BasketMenuProps> = ({
  openBasketMobile,
  basketCount,
}) => {
  const { t } = useTranslation()
  return (
    <div className="basket-menu-footer">
      <button onClick={openBasketMobile}>
        {t("Your basket")}&nbsp;&nbsp;&bull;&nbsp;{basketCount}
        &nbsp;&nbsp;{basketCount > 1 ? "items" : "item"}
      </button>
    </div>
  )
}

export default BasketMenuFooter
