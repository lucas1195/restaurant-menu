import { Section } from "./Section"

export interface MenuState {
  sections: Section[]
  loading: boolean
  error: string | null
}
