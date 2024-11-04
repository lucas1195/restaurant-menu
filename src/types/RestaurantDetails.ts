import { TReturnOptionalNull } from "i18next"
import { WebSettings } from "./WebSettings"

export interface RestaurantDetails {
  id: number
  name: string
  internalName: string
  description: string | TReturnOptionalNull
  liveFlag: number
  demoFlag: number
  address1: string
  address2: string
  address3: string | null
  city: string
  county: string
  postcode: string
  country: string
  timezoneOffset: string
  locale: string
  timeZone: string
  webSettings: WebSettings
  ccy: string
  ccySymbol: string
  currency: string
}
