import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToBasket } from "../../features/basket/basketSlice"
import { MenuItem, ModifierItem } from "../../types/MenuItem"
import "./ItemModal.css"
import { RootState } from "../../app/store"

interface ItemModalProps {
  item: MenuItem
  onClose: () => void
}

const ItemModal: React.FC<ItemModalProps> = ({ item, onClose }) => {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const initialModifier = item.modifiers?.[0]?.items[0].price ?? null
  const [selectedModifier, setSelectedModifier] = useState<ModifierItem | null>(
    null,
  )
  const ccySymbol = useSelector(
    (state: RootState) => state.restaurant.details?.ccySymbol,
  )

  const handleModifierToggle = (modifierItem: ModifierItem) => {
    if (selectedModifier?.id === modifierItem.id) {
      setSelectedModifier(null)
    } else {
      setSelectedModifier(modifierItem)
    }
  }

  const handleAddToBasket = () => {
    const modifiedUnitPrice = item.price + (selectedModifier?.price || 0)
    const price = modifiedUnitPrice
    const id = item.id
    const modifierName = selectedModifier?.name
    dispatch(addToBasket({ id, quantity, price, modifierName }))
    onClose()
  }

  const checkClassName = (item: MenuItem, type: string): string => {
    if (type == "minus") {
      return quantity === 1 ? "disabled-button" : ""
    }
    return item.modifiers &&
      item.modifiers.length > 0 &&
      item.modifiers.some(modifier => modifier.items.length > 0) &&
      quantity === 1 &&
      selectedModifier == null
      ? "disabled-button"
      : ""
  }

  const checkDisbledButtons = (
    item: MenuItem,
    type: string,
  ): boolean | undefined => {
    if (type === "minus") {
      return quantity === 1
    }

    return (
      item.modifiers &&
      item.modifiers.length > 0 &&
      item.modifiers.some(modifier => modifier.items.length > 0) &&
      quantity === 1 &&
      selectedModifier == null
    )
  }

  const checkDisabledAddToOrder = (item: MenuItem): string => {
    return item.modifiers &&
      item.modifiers.length > 0 &&
      item.modifiers.some(modifier => modifier.items.length > 0) &&
      quantity === 1 &&
      selectedModifier == null
      ? "add-to-order-disabled"
      : "add-to-order"
  }

  const checkClassNameAddToOrder = (item: MenuItem): boolean | undefined => {
    return (
      item.modifiers &&
      item.modifiers.length > 0 &&
      item.modifiers.some(modifier => modifier.items.length > 0) &&
      quantity === 1 &&
      selectedModifier == null
    )
  }

  const handleIncrease = () => {
    setQuantity(prev => prev + 1)
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const handleSelectPrice = (price: number): number => {
    if (price == 0 && selectedModifier == null) {
      return Number(initialModifier)
    } else if (price == 0 && selectedModifier !== null) {
      return Number(selectedModifier?.price)
    }

    return price
  }

  const totalPrice = (handleSelectPrice(item.price) * quantity).toFixed(2)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${item.images && item.images.length > 0 ? "modal-content-with-image" : "modal-content-without-image"}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          {item.images && item.images.length > 0 ? (
            <div className="modal-image-container">
              <img
                src={item.images[0].image}
                alt={item.name}
                className="modal-image"
              />
              <button className="modal-close" onClick={onClose}>
                &times;
              </button>
            </div>
          ) : (
            <div className="modal-image-placeholder">
              <button className="modal-close" onClick={onClose}>
                &times;
              </button>
              <div style={{ height: "100px" }} />
              <hr />
            </div>
          )}
        </div>
        <div className="modal-text-content">
          <div className="modal-title">
            <span className="product-name">{item.name}</span>
            <span>{item.description}</span>
          </div>

          {item.modifiers &&
            item.modifiers.length > 0 &&
            item.modifiers.some(modifier => modifier.items.length > 0) && (
              <div>
                <div className="size-selection">
                  <div className="choose-option">
                    <p>Choose your size</p>
                    <p>Select 1 option</p>
                  </div>
                  {item.modifiers.map(modifier => (
                    <div key={modifier.id}>
                      {modifier.items.map(modItem => (
                        <div className="size-option" key={modItem.id}>
                          <div className="option-details">
                            <span className="modifier-name">
                              {modItem.name}
                            </span>
                            <span>
                              {ccySymbol} {modItem.price.toFixed(2)}
                            </span>
                          </div>
                          <label
                            className={`checkbox-label ${selectedModifier?.id === modItem.id ? "selected" : ""}`}
                          >
                            <div className="checkbox-custom" />
                            <input
                              type="checkbox"
                              checked={selectedModifier?.id === modItem.id}
                              onChange={() => handleModifierToggle(modItem)}
                            />
                          </label>
                        </div>
                      ))}
                    </div>
                  ))}
                  <div className="spacer" />
                </div>
              </div>
            )}

          <div className="modal-footer">
            <div className="quantity-selector">
              <button
                className={checkClassName(item, "minus")}
                disabled={checkDisbledButtons(item, "minus")}
                onClick={handleDecrease}
              >
                &minus;
              </button>
              <span>{quantity}</span>
              <button
                onClick={handleIncrease}
                className={checkClassName(item, "")}
                disabled={checkDisbledButtons(item, "")}
              >
                +
              </button>
            </div>

            <button
              className={checkDisabledAddToOrder(item)}
              onClick={handleAddToBasket}
              disabled={checkClassNameAddToOrder(item)}
            >
              Add to Order&nbsp;&nbsp;&bull;&nbsp;&nbsp;{ccySymbol} {totalPrice}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemModal
