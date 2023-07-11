import { CardHorizontal } from "@/components/CardHorizontal";
import { InputSearchGeneral } from "@/components/InputSearchGeneral";
import { TableSelectProduct } from "@/components/TableSelectProduct";
import { Bill_save, Bills } from "@/graphql/Bill";
import { Products } from "@/graphql/Product";
import { Tables } from "@/graphql/Table";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Flex, Grid, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const useTablePage = (tableId) => {
  //States
  const [productSearch, setProductSearch] = useState("");
  const [productList, setProductList] = useState([]);
  const [productListSwitch, setProductListSwitch] = useState(false);

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

  //Effects
  useEffect(() => {
    if (localStorage.getItem(tableId)) {
      setProductList(JSON.parse(localStorage.getItem(tableId)));
    }
  }, [tableId, productListSwitch]);

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
  //Functions
  const handleTotal = () => {
    const totalArray = productList.map(
      (product) => product.amount * product.price
    );
    const total = totalArray.reduce((ac, total) => (ac += total));
    return Math.floor(total).toLocaleString();
  };
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
        };
      } else {
        productList.push(newProduct);
      }
      
      localStorage.setItem(tableId, JSON.stringify(productList));
      
     
    } else {
      let newProductList = [];
      newProductList.push(newProduct);
      localStorage.setItem(tableId, JSON.stringify(newProductList));
    }
    setProductListSwitch(!productListSwitch);
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
    <Grid gap={1} position={"relative"}>
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
      {productList.map((product, i) => (
        <CardHorizontal
          onClick={handleProductSelect}
          parameter={{
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            amount: 1,
          }}
          data={{
            head: product.name,
            image: product.image,
            body: product.amount,
            title: Math.floor(product.price).toLocaleString(),
            secondTitle: Math.floor(
              product.amount * product.price
            ).toLocaleString(),
          }}
          key={i}
        />
      ))}
      {productList.length > 0 && (
        <Flex
          bg={useColorModeValue("gray.100", "gray.800")}
          borderRadius={5}
          p={5}
          mb={3}
          justifyContent="space-between"
        >
          <Text>Total:</Text>
          <Text textAlign="center">{`$ ${handleTotal()}`}</Text>
        </Flex>
      )}
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
