import { Section } from "./Section"

export interface MenuResponse {
  id: number
  name: string
  type: string
  collapse: number
  sections: Section[]
}
