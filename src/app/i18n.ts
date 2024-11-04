import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import ptJSON from "../locale/pt/pt.json"
import enJSON from "../locale/en/en.json"

i18n.use(initReactI18next).init({
  resources: {
    pt: { translation: ptJSON },
    en: { translation: enJSON },
  },
  lng: "pt",
  fallbackLng: "en",
  debug: true,

  interpolation: {
    escapeValue: false,
  },
})

export default i18n
