import { useState, useEffect } from "react";

export const useProductList = (tableId) => {
  const [productListSwitch, setProductListSwitch] = useState(false);
  const [productList, setProductList] = useState([]);
  const [productSearch, setProductSearch] = useState("");

  useEffect(() => {
    if (localStorage.getItem(tableId)) {
      setProductList(JSON.parse(localStorage.getItem(tableId)));
    }
  }, [tableId, productListSwitch]);
  const handleProductSelect = (newProduct) => {
    setProductSearch("");
    let productList = [];
    if (localStorage.getItem(tableId)) {
      productList = JSON.parse(localStorage.getItem(tableId));

      const productFound = productList.find(
        (product) => product._id === newProduct._id
      );
      const productFoundIndex = productList.findIndex(
        (product) => product._id === newProduct._id
      );
      if (productFound) {
        productList[productFoundIndex] = {
          _id: productFound._id,
          name: productFound.name,
          price: productFound.price,
          amount: productFound.amount + newProduct.amount,
          image: productFound.image,
          remaining: productFound.remaining,
        };
      } else {
        productList.push(newProduct);
      }
      if (productFound) {
        if (
          productFound.remaining > productFound.amount &&
          newProduct.amount === 1
        ) {
          localStorage.setItem(tableId, JSON.stringify(productList));
        } else if (newProduct.amount === -1) {
          localStorage.setItem(tableId, JSON.stringify(productList));
        }
      } else {
        localStorage.setItem(tableId, JSON.stringify(productList));
      }
    } else {
      let newProductList = [];
      newProductList.push(newProduct);

      localStorage.setItem(tableId, JSON.stringify(newProductList));
    }
    setProductListSwitch(!productListSwitch);
  };
  return {
    productList,
    handleProductSelect,
    productSearch,
    setProductSearch,
    setProductListSwitch,
    productListSwitch,
  };
};
