import { useState, useEffect } from "react";

export const useProductList = (tableId) => {
  const [productListSwitch, setProductListSwitch] = useState(false);
  const [productList, setProductList] = useState([]);
  const [productSearch, setProductSearch] = useState("");

  useEffect(() => {
    if (localStorage.getItem(tableId?tableId:"fastSell")) {
      setProductList(JSON.parse(localStorage.getItem(tableId?tableId:"fastSell")));
    }
  }, [tableId, productListSwitch]);

  const handleProductSelect = (newProduct) => {
    
    if (newProduct.remaining > 0) {
      setProductSearch("");
      let productList = [];

      if (localStorage.getItem(tableId||"fastSell")) {
        productList = JSON.parse(localStorage.getItem(tableId?tableId:"fastSell"));
        //console.log(productList);
        const productFound = productList.find(
          (product) => product._id === newProduct._id
          );
        //console.log(productFound);
        
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
            localStorage.setItem(tableId?tableId:"fastSell", JSON.stringify(productList));
          } else if (newProduct.amount === -1) {
            localStorage.setItem(tableId?tableId:"fastSell", JSON.stringify(productList));
          }
        } else {
          localStorage.setItem(tableId?tableId:"fastSell", JSON.stringify(productList));
        }
      } else {
        let newProductList = [];
        newProductList.push(newProduct);
        localStorage.setItem(tableId?tableId:"fastSell", JSON.stringify(newProductList));
      }
      setProductListSwitch(!productListSwitch);
    }
  };
  return {
    productList,
    handleProductSelect,
    productSearch,
    setProductSearch,
    setProductListSwitch,
    productListSwitch,
    setProductList,
  };
};
