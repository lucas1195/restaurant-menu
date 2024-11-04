import axios from "axios"

export const useAxios = () => {
  const baseURL = "https://localhost:7143/api/RestaurantDetails"

  const $axios = axios.create({
    baseURL,
  })

  return { $axios }
}
