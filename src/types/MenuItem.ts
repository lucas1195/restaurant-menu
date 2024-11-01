import { Image } from "./Image"

export interface ModifierItem {
  id: number
  name: string
  price: number
  maxChoices: number
  position: number
  visible: number
  availabilityType: string
  available: boolean
  qty?: number
}

export interface Modifier {
  id: number
  name: string
  minChoices: number
  maxChoices: number
  items: ModifierItem[]
}

export interface MenuItem {
  id: number
  name: string
  description?: string
  alcoholic: number
  price: number
  position: number
  visible: number
  availabilityType: string
  sku: string
  available: boolean
  images: Image[]
  modifiers?: Modifier[]
}
