import { useProducts } from "../context/productsContext"

function Products() {
  const { products } = useProducts();

  console.log(products);

  return (
    <div>Products</div>
  )
}

export default Products