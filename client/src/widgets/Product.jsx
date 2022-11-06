import { useEffect } from "react"
import { useProductWidget } from "../context/productWidgetContext"

function Product(props) {
  const { name, category, price } = props || {};
  console.log(props);
  
  return (
    <div className="card">
      <div className="card__header">{name}</div>
      <div className="card__body">
        <div className="card__image"></div>
        <div className="card__info">
          <div>{category}</div>
          <div>{price}</div>
        </div>
      </div>
    </div>
  )
}

export default Product