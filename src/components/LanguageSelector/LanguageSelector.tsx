import React from "react"
import i18n from "i18next"

const LanguageSelector: React.FC = () => {
  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedLanguage = event.target.value
    i18n.changeLanguage(selectedLanguage)
  }

  return (
    <select
      onChange={handleLanguageChange}
      style={{ padding: "5px", borderRadius: "4px" }}
    >
      <option value="pt">Português</option>
      <option value="en">English</option>
    </select>
  )
}

export default LanguageSelector
