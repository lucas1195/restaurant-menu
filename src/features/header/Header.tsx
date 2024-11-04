import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchRestaurantDetails } from "./headerSlice"
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector"
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
        <div className="nav-content">
          <a href="#">Menu</a>
          <a href="#">Entrar</a>
          <a href="#">Contato</a>
        </div>
        <div className="language-selector">
          <LanguageSelector />
        </div>
      </nav>

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
