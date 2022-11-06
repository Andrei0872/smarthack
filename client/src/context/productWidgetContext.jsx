import { useContext, useState } from "react";
import { createContext } from "react";

const ProductWidgetContext = createContext(null); 

export const ProductWidgetProvider = ({ children }) => {
  const [productWidget, setProductWidget] = useState(null);
  
  // TODO(perf): use memo.
  const value = {
    productWidget,
    setProductWidget,
  }

  return (
    <ProductWidgetContext.Provider value={value}>
      {children}
    </ProductWidgetContext.Provider>
  );
}

export const useProductWidget = () => {
    const context = useContext(ProductWidgetContext);
    if (context === undefined) {
        throw new Error(`'useProductWidget' must be used within an 'ProductWidgetProvider'!`);
    }

    return context;
}