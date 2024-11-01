import React from "react"
import "./SearchBar.css"

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search menu items"
        className="search-input"
      />
    </div>
  )
}

export default SearchBar
