import { useContext, useState } from "react";
import { createContext } from "react";

const ProductsContext = createContext(undefined); 

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  
  // TODO(perf): use memo.
  const value = {
    products,
    setProducts
  }

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (context === undefined) {
        throw new Error(`'useProducts' must be used within an 'ProductsProvider'!`);
    }

    return context;
}