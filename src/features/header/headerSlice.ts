// src/features/restaurant/restaurantSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { WebSettings } from "../../types/WebSettings"
import { RestaurantDetails } from "../../types/RestaurantDetails"
import { useAxios } from "../../api/useAxios"

interface RestaurantState {
  details: RestaurantDetails | null
  loading: boolean
  error: string | null
}

const initialState: RestaurantState = {
  details: null,
  loading: false,
  error: null,
}

const { $axios } = useAxios()

export const fetchRestaurantDetails = createAsyncThunk(
  "restaurant/fetchRestaurantDetails",
  async () => {
    const response = await $axios.get<RestaurantDetails>(
      "/RestaurantWebSettings",
    )
    if (!response.data) {
      throw new Error("Erro ao buscar os dados do restaurante")
    }
    return response.data
  },
)

export const headerSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRestaurantDetails.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRestaurantDetails.fulfilled, (state, action) => {
        state.loading = false
        state.details = action.payload
      })
      .addCase(fetchRestaurantDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Erro desconhecido"
      })
  },
})

export default headerSlice.reducer
