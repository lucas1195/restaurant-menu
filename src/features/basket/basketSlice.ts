import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

interface BasketItem {
  id: number
  quantity: number
}

interface BasketState {
  items: BasketItem[]
}

const initialState: BasketState = {
  items: [],
}

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload)
      if (item) {
        item.quantity += 1
      } else {
        state.items.push({ id: action.payload, quantity: 1 })
      }
    },
    removeFromBasket: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    clearBasket: state => {
      state.items = []
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) => {
      const item = state.items.find(item => item.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
      }
    },
  },
})

export const { addToBasket, removeFromBasket, clearBasket, updateQuantity } =
  basketSlice.actions

export const selectBasketItems = (state: RootState) => state.basket.items

export default basketSlice.reducer
