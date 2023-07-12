import { useState } from "react";

export const useSwitchProductList = () => {
  const [productListSwitch, setProductListSwitch] = useState(false);
  return {
    setProductListSwitch,
    productListSwitch
  }
}