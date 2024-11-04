import React, { useEffect, useState } from "react"
import Header from "./features/header/Header"
import SearchBar from "./components/SearchBar/SearchBar"
import { Menu } from "./features/menu/Menu"
import { Basket } from "./features/basket/Basket"
import "./app.css"
import { BasketMobile } from "./components/BasketMobile/BasketMobile"
import { selectBasketItems } from "./features/basket/basketSlice"
import { useAppSelector } from "./app/hooks"

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [showBasketMobile, setShowBasketMobile] = useState(false)
  const basketItems = useAppSelector(selectBasketItems)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const basketCount = basketItems.length
  const openBasketMobile = () => setShowBasketMobile(true)
  const closeBasketMobile = () => setShowBasketMobile(false)

  return (
    <div className="container">
      <div className="header-container">
        <Header />
      </div>
      <div className="searchbar-container">
        <SearchBar />
      </div>
      <div className="main-container">
        <div className="menu-container">
          <Menu />
        </div>
        {isMobile && basketCount > 0 ? (
          <>
            <div className="basket-menu-footer">
              <button onClick={openBasketMobile}>
                Your basket&nbsp;&nbsp;&bull;&nbsp;{basketCount}
                &nbsp;&nbsp;{basketCount > 1 ? "items" : "item"}
              </button>
            </div>
          </>
        ) : (
          <div className="basket-container">
            <Basket />
          </div>
        )}
        {showBasketMobile && <BasketMobile onClose={closeBasketMobile} />}
      </div>
    </div>
  )
}

export default App
