import { MenuItem } from "./MenuItem"
import { Image } from "./Image"

export interface Section {
  id: number
  name: string
  description?: string
  position: number
  visible: number
  images: Image[]
  items: MenuItem[]
}
