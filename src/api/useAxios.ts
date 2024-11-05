import axios from "axios"

export const useAxios = () => {
  const baseURL =
    "https://restaurant-menu-api-1342ee0a9c4d.herokuapp.com/api/RestaurantDetails"

  const $axios = axios.create({
    baseURL,
  })

  return { $axios }
}
