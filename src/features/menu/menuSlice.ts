import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import axios from "axios"
import { MenuResponse } from "../../types/MenuResponse"
import { MenuItem } from "../../types/MenuItem"
import { Section } from "../../types/Section"
import { MenuState } from "../../types/MenuState"

const initialState: MenuState = {
  sections: [],
  loading: false,
  error: null,
}

export const fetchMenuItems = createAsyncThunk<Section[]>(
  "menu/fetchMenuItems",
  async () => {
    const response = await axios.get<MenuResponse>(
      "https://localhost:7092/api/transferencia/ExternalMenu",
    )

    return response.data.sections.map(section => ({
      ...section,
      imageUrl:
        Array.isArray(section.images) && section.images.length > 0
          ? section.images[0].image
          : "",
      items: section.items.map(item => ({
        ...item,
        imageUrl:
          Array.isArray(item.images) && item.images.length > 0
            ? item.images[0].image
            : "",
      })),
    }))
  },
)

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<MenuItem>) => {
      const section = state.sections.find(sec => sec.id === action.payload.id)
      if (section) {
        section.items.push(action.payload)
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.sections.forEach(section => {
        section.items = section.items.filter(item => item.id !== action.payload)
      })
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMenuItems.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchMenuItems.fulfilled,
        (state, action: PayloadAction<Section[]>) => {
          state.loading = false
          state.sections = action.payload
        },
      )
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch menu items"
      })
  },
})

export const { addItem, removeItem } = menuSlice.actions

export const selectMenuSections = (state: RootState) => state.menu.sections
export const selectMenuLoading = (state: RootState) => state.menu.loading
export const selectMenuError = (state: RootState) => state.menu.error

export default menuSlice.reducer
