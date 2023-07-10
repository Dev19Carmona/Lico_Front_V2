import { CardHorizontal } from "@/components/CardHorizontal";
import { InputSearchGeneral } from "@/components/InputSearchGeneral";
import { TableSelectProduct } from "@/components/TableSelectProduct";
import { Bill_save, Bills } from "@/graphql/Bill";
import { Products } from "@/graphql/Product";
import { Tables } from "@/graphql/Table";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const useTablePage = (tableId) => {
  //States
  const [productSearch, setProductSearch] = useState("");
  // const [newProduct, setNewProduct] = useState({})

  //Queries
  const [getBills, { data: bills, loading: loadBills }] = useLazyQuery(Bills);
  const { data: products } = useQuery(Products, {
    variables: {
      filters: {
        search: productSearch,
      },
    },
  });
  const [getProduct, { data: product }] = useLazyQuery(Products);

  //Mutations
  const [billSave, { data: isBillSave, loading: loadSaveBill }] = useMutation(
    Bill_save,
    {
      refetchQueries: [
        {
          query: Bills,
          variables: {
            filters: {
              tableId,
            },
          },
        },
        {
          query: Tables,
        },
      ],
    }
  );
  //Constants
  const productsFormFieldProps = {
    data: products?.Products,
    name: "name",
    labelField: "name",
    valueField: "_id",
  };

  //Effects
  useEffect(() => {
    if (tableId) {
      getBills({
        variables: {
          filters: {
            tableId,
          },
        },
      });
    }
  }, [getBills, tableId]);

  //Initial Values
  const initialValuesProductSelect = {
    name: "",
  };

  //Handles
  //Handles Mutations
  const handleBillSave = () => {
    billSave({
      variables: {
        billData: {
          tableId,
        },
      },
    });
  };

  const handleProductSearch = (e) => {
    setProductSearch(e.target.value);
  };

  //Handles states

  const handleProductSelect = (newProduct) => {
    // console.log(product);
    const _id = bills?.Bills[0]?._id;
    if (localStorage.getItem(_id)) {
      let productList = JSON.parse(localStorage.getItem(_id));
      //console.log(productList);
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
        };
        console.log("-----",productList);
      }else{
        productList.push(newProduct)
      }
      // console.log(productList);
    } else {
      let newProductList = [];
      newProductList.push(newProduct);
      localStorage.setItem(_id, JSON.stringify(newProductList));
    }
    // getProduct({
    //   variables:{
    //     filters:{
    //       _id:productId
    //     }
    //   }
    // })
    // setNewProduct(product?.Products[0])

    //newProduct.amount = 1

    // billSave({
    //   variables: {
    //     billData: {
    //       _id,
    //       productId,
    //       amount:1
    //     },
    //   },
    // });
  };

  //TableProductsSelect Settings
  const indexProductsSelect = ["Cantidad", "Nombre", "Precio"];
  //TabsSettings
  const indexTabsTable = [
    {
      name: "Productos",
    },
    {
      name: "Factura",
    },
  ];
  const components = [
    <Grid gap={5}>
      {bills?.Bills.length > 0 && (
        <>
          <InputSearchGeneral onChange={handleProductSearch} />
          {productSearch !== "" && (
            <TableSelectProduct
              onClick={handleProductSelect}
              isStay={bills?.Bills[0]?.table.isStay}
              data={products?.Products}
              index={indexProductsSelect}
            />
          )}
        </>
      )}
      {bills?.Bills[0]?.products.map((product, i) => (
        <CardHorizontal
          data={{
            head: product.name,
            image: product.image,
            body: product.amount,
          }}
          key={i}
        />
      ))}
    </Grid>,
    <Grid gap={5}></Grid>,
  ];

  return {
    indexTabsTable,
    components,
    handleBillSave,
    bills,
  };
};
