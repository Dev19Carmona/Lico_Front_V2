import { Tables } from "@/graphql/Table";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

export const useProductList = (id) => {
  const [productListSwitch, setProductListSwitch] = useState(false);
  const [productList, setProductList] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [productData, setProductData] = useState({});
  const [allProducts, setAllProducts] = useState();
  const [alertDeleteProduct, setAlertDeleteProduct] = useState(false);
  const { data: tables } = useQuery(Tables);
  useEffect(() => {
    let matriz = [];
    let productsOfTables = [];
    tables?.Tables.map((table) => {
      if (localStorage.getItem(table._id)) {
        matriz.push(JSON.parse(localStorage.getItem(table._id)));
      }
    });
    if (localStorage.getItem("fastSell")) {
      matriz.push(JSON.parse(localStorage.getItem("fastSell")));
    }

    for (let i = 0; i < matriz.length; i++) {
      for (let j = 0; j < matriz[i].length; j++) {
        const element = matriz[i][j];
        productsOfTables.push(element);
      }
    }
    const sumarAmounts = productsOfTables.reduce((acc, obj) => {
      if (acc[obj._id]) {
        acc[obj._id].amount += obj.amount;
      } else {
        acc[obj._id] = { ...obj };
      }
      return acc;
    }, {});
    
    const uniqueObjects = Object.values(sumarAmounts);
    
    setAllProducts(uniqueObjects);
  }, [productList, alertDeleteProduct, tables?.Tables]);

  useEffect(() => {
    if (localStorage.getItem(id ? id : "fastSell")) {
      setProductList(JSON.parse(localStorage.getItem(id ? id : "fastSell")));
    }
  }, [id, productListSwitch]);

  const handleProductSelect = (newProduct) => {
    if (newProduct.remaining > 0) {
      setProductSearch("");
      let productList = [];

      if (localStorage.getItem(id || "fastSell")) {
        productList = JSON.parse(localStorage.getItem(id ? id : "fastSell"));
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
            localStorage.setItem(
              id ? id : "fastSell",
              JSON.stringify(productList)
            );
          } else if (newProduct.amount === -1) {
            localStorage.setItem(
              id ? id : "fastSell",
              JSON.stringify(productList)
            );
          }
        } else {
          localStorage.setItem(
            id ? id : "fastSell",
            JSON.stringify(productList)
          );
        }
      } else {
        let newProductList = [];
        newProductList.push(newProduct);
        localStorage.setItem(
          id ? id : "fastSell",
          JSON.stringify(newProductList)
        );
      }
      setProductListSwitch(!productListSwitch);
    }
  };
  const handleProductSelectExpenses = (newProduct) => {
    setProductSearch("");
    let productList = [];
    if (localStorage.getItem(id || "fastSell")) {
      productList = JSON.parse(localStorage.getItem(id ? id : "fastSell"));
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
        if (newProduct.amount === 1) {
          localStorage.setItem(
            id ? id : "fastSell",
            JSON.stringify(productList)
          );
        } else if (newProduct.amount === -1) {
          localStorage.setItem(
            id ? id : "fastSell",
            JSON.stringify(productList)
          );
        }
      } else {
        localStorage.setItem(id ? id : "fastSell", JSON.stringify(productList));
      }
    } else {
      let newProductList = [];
      newProductList.push(newProduct);
      localStorage.setItem(
        id ? id : "fastSell",
        JSON.stringify(newProductList)
      );
    }
    setProductListSwitch(!productListSwitch);
  };
  const handleDeleteProductList = () => {
    if (localStorage.getItem(id ? id : "fastSell")) {
      localStorage.removeItem(id ? id : "fastSell");
    }
  };
  const handleDeleteProduct = () => {
    const productFoundIndex = productList.findIndex(
      (product) => product._id === productData._id
    );
    productList.splice(productFoundIndex, 1);
    setAlertDeleteProduct(!alertDeleteProduct);
    localStorage.setItem(id ? id : "fastSell", JSON.stringify(productList));
  };
  const handleTotal = () => {
    if (productList.length > 0) {
      const totalArray = productList.map(
        (product) => product.amount * product.price
      );
      const total = totalArray.reduce((ac, total) => (ac += total));
      return total;
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
    handleDeleteProductList,
    productData,
    setProductData,
    handleDeleteProduct,
    handleTotal,
    handleProductSelectExpenses,
    allProducts,
  };
};
