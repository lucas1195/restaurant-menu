import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchRestaurantDetails } from "./headerSlice"
import "./Header.css"

const Header: React.FC = () => {
  const dispatch = useDispatch()
  const { details, loading, error } = useSelector(
    (state: any) => state.restaurant,
  )
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchRestaurantDetails())
  }, [dispatch])

  if (loading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!details) {
    return <div>Nenhum dado disponível</div>
  }

  const backgroundImage =
    details?.webSettings?.bannerImage || "/path-to-banner.png"
  const backgroundColor = details?.webSettings?.navBackgroundColour || "#3c2415"
  const buttonColor = details?.webSettings?.primaryColour || "#fff"

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header className="header">
      <nav className="header-nav" style={{ backgroundColor }}>
        <button className="menu-button" onClick={toggleMenu}>
          &#9776;
        </button>
        <a href="#">Menu</a>
        <a href="#">Entrar</a>
        <a href="#">Contato</a>
      </nav>

      {menuOpen && (
        <div className="sidebar">
          <a href="#">Menu</a>
          <a href="#">Entrar</a>
          <a href="#">Contato</a>
        </div>
      )}
      <img
        src={backgroundImage}
        alt="Background"
        className="header-image"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
    </header>
  )
}

export default Header
