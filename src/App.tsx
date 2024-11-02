import React from "react"
import Header from "./features/header/Header"
import SearchBar from "./components/SearchBar/SearchBar"
import { Menu } from "./features/menu/Menu"
import { Basket } from "./features/basket/Basket"
import "./app.css"

const App: React.FC = () => {
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

        <Basket />
      </div>
    </div>
  )
}

export default App
