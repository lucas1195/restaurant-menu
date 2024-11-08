import React from "react"
import "./SearchBar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

const SearchBar = () => {
  return (
    <div className="search-bar">
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
      <input
        type="text"
        placeholder="Search menu items"
        className="search-input"
      />
    </div>
  )
}

export default SearchBar
