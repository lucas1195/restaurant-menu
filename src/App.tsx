import React from "react"
import Header from "./features/header/Header"
import SearchBar from "./components/SearchBar/SearchBar"
import { Menu } from "./features/menu/Menu"
import { Basket } from "./features/basket/Basket"

const App: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        padding: "0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%" }}>
        <Header />
      </div>
      <div style={{ width: "75%", padding: "6px" }}>
        <SearchBar />
      </div>
      <div
        style={{
          display: "flex",
          padding: "30px",
          width: "100%",
          backgroundColor: "#f5f5f5",
          borderRadius: "2px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          maxWidth: "1150px",
          justifyContent: "center",
          marginBottom: "20px",
          gap: "12px",
        }}
      >
        <div style={{ marginRight: "5px" }}>
          {" "}
          {/* Espaço entre Menu e Basket */}
          <Menu />
        </div>
        <Basket />
      </div>
    </div>
  )
}

export default App
