import React from "react"
import "./CategoryTabs.css"
import { useTranslation } from "react-i18next"

interface CategoryImage {
  id: number
  name: string
  imageUrl: string
}

interface CategoryTabsProps {
  images: CategoryImage[]
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ images }) => {
  const { t } = useTranslation()

  return (
    <div className="category-tabs">
      {images.map(image => (
        <div key={image.id} className="category-tab-container">
          <button
            className="category-tab"
            style={{ backgroundImage: `url(${image.imageUrl})` }}
          ></button>
          <span className="category-tab-name">{t(image.name)}</span>{" "}
        </div>
      ))}
    </div>
  )
}

export default CategoryTabs
