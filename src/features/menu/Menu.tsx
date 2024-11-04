import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchMenuItems } from "./menuSlice"
import { RootState } from "../../app/store"
import "./menu.css"

import CategoryTabs from "../../components/CategoryTabs/CategoryTabs"
import { MenuItem } from "../../types/MenuItem"
import ItemModal from "../../components/ItemModal/ItemModal"
import { selectBasketItems } from "../basket/basketSlice"
import { useAppSelector } from "../../app/hooks"

export const Menu = () => {
  const dispatch = useDispatch()
  const { sections, loading, error } = useSelector(
    (state: RootState) => state.menu,
  )
  const [expandedSections, setExpandedSections] = useState<number[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const basketItems = useAppSelector(selectBasketItems)

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchMenuItems())
  }, [dispatch])

  const openModal = (item: MenuItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedItem(null)
    setIsModalOpen(false)
  }

  const getItemQuantityInBasket = (itemId: number) => {
    const basketItem = basketItems.find(basketItem => basketItem.id === itemId)
    return basketItem ? basketItem.quantity : 0
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  const images = sections.map(section => ({
    id: section.id,
    name: section.name,
    imageUrl: section.images[0].image || "",
  }))

  const truncatedText = (description: string) => {
    return description.length > 60
      ? description.slice(0, 58) + "..."
      : description
  }

  function updateTextForMobile(description: string | undefined) {
    const isMobile = window.innerWidth <= 600

    if (isMobile && description !== undefined && description !== "") {
      return truncatedText(String(description))
    }

    return description !== undefined ? description : ""
  }

  return (
    <div className="menu-card">
      <CategoryTabs images={images} />
      <ul className="menu-items">
        {sections.map(section => (
          <li key={section.id}>
            <p className="section-name">{section.name}</p>
            <div>
              <ul className="menu-item-list">
                {section.items.map(item => (
                  <li
                    key={item.id}
                    className="menu-item-info"
                    onClick={() => openModal(item)}
                  >
                    <div>
                      <h4>
                        {getItemQuantityInBasket(item.id) > 0 && (
                          <span className="item-quantity-icon">
                            {getItemQuantityInBasket(item.id)}
                          </span>
                        )}
                        {item.name}
                      </h4>
                      <p>{`${updateTextForMobile(item.description)}`}</p>
                      <span>
                        R${" "}
                        {item.modifiers && item.modifiers.length > 0
                          ? item.modifiers[0].items[0].price.toFixed(2)
                          : item.price.toFixed(2)}
                      </span>
                    </div>
                    {item.images?.[0]?.image && (
                      <img
                        src={item.images[0].image}
                        alt={item.name}
                        className="menu-item-image"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
      <div className="spacer" />
      {isModalOpen && selectedItem && (
        <ItemModal item={selectedItem} onClose={closeModal} />
      )}
    </div>
  )
}
