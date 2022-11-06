import { useDrop } from "react-dnd";
import { useProducts } from "../context/productsContext"
import { useProductWidget } from "../context/productWidgetContext";
import Product from "./Product";
import './Products.css'

// const products = [
//   { id: 1, name: 'name1', category: 'cat1', price: 500, },
//   { id: 2, name: 'name2', category: 'cat2', price: 200, },
// ]

function Products() {
  const { products } = useProducts();
  const { productWidget } = useProductWidget();

  console.log(products);

  const [{ isOver, itemType, item }, drop] = useDrop(() => ({
    accept: 'widget',
    drop: (item, monitor) => {
      console.log('widget dropped');
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      itemType: monitor.getItemType(),
      item: monitor.getItem(),
    }),
  }), []);


  if (!productWidget) {
    return <p>A Product widget should be next!</p>;
  }

  return (
    <div className="products">
      {
        products.map(p => <Product {...p} key={p.id} />)
      }
    </div>
  )
}

export default Products