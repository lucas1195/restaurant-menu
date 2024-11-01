import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { addToBasket } from "../../features/basket/basketSlice"
import { MenuItem } from "../../types/MenuItem"
import "./ItemModal.css"

interface ItemModalProps {
  item: MenuItem
  onClose: () => void
}

const ItemModal: React.FC<ItemModalProps> = ({ item, onClose }) => {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)

  const handleAddToBasket = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToBasket(item.id))
    }
    onClose()
  }

  const handleIncrease = () => {
    setQuantity(prev => prev + 1)
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const totalPrice = (item.price * quantity).toFixed(2)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        {item.images.length > 0 && (
          <div className="modal-image-container">
            <img
              src={item.images[0].image}
              alt={item.name}
              className="modal-image"
            />
          </div>
        )}

        <div className="modal-text-content">
          <h2 className="product-name">{item.name}</h2>
          <p className="product-description">{item.description}</p>

          <div className="size-selection">
            <h3>Choose your size</h3>
            <p>Select 1 option</p>

            {item.modifiers && item.modifiers.length > 0 ? (
              item.modifiers.map(modifier => (
                <div key={modifier.id}>
                  {modifier.items.map(item => (
                    <div key={item.id} className="size-option">
                      <span>{item.name}</span>
                      <span>R$ {item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p>No size options available.</p>
            )}
          </div>

          <div className="quantity-selector">
            <button onClick={handleDecrease}>-</button>
            <span>{quantity}</span>
            <button onClick={handleIncrease}>+</button>
          </div>

          <button className="add-to-order" onClick={handleAddToBasket}>
            Add to Order - R$ {totalPrice}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ItemModal
