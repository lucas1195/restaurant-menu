import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchRestaurantDetails } from "./headerSlice"
import "./Header.css"

const Header: React.FC = () => {
  const dispatch = useDispatch()
  const { details, loading, error } = useSelector(
    (state: any) => state.restaurant,
  )

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

  return (
    <header
      className="header"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <nav className="header-nav" style={{ backgroundColor }}>
        <a href="#" style={{ color: "white" }}>
          Menu
        </a>
        <a href="#" style={{ color: "white" }}>
          Entrar
        </a>
        <a href="#" style={{ color: "white" }}>
          Contato
        </a>
      </nav>
    </header>
  )
}

export default Header
