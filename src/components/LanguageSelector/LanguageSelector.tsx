import React from "react"
import i18n from "i18next"
import "./LanguageSelector.css"

const LanguageSelector: React.FC = () => {
  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedLanguage = event.target.value
    i18n.changeLanguage(selectedLanguage)
  }

  return (
    <select onChange={handleLanguageChange} className="language-select">
      <option value="pt">pt-BR</option>
      <option value="en">en-US</option>
    </select>
  )
}

export default LanguageSelector
