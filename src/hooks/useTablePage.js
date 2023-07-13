import { BillTable } from "@/components/BillTable";
import { CardHorizontal } from "@/components/CardHorizontal";
import { InputSearchGeneral } from "@/components/InputSearchGeneral";
import { TableSelectProduct } from "@/components/TableSelectProduct";
import { Bill_save, Bills } from "@/graphql/Bill";
import { Products } from "@/graphql/Product";
import { Tables } from "@/graphql/Table";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Flex, Grid, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTableSwitch } from "./functions/useTableSwitch";

export const useTablePage = (tableId) => {
  //States

  const [productSearch, setProductSearch] = useState("");
  const [productList, setProductList] = useState([]);
  const [productListSwitch, setProductListSwitch] = useState(false);
  const [productData, setProductData] = useState({})
  
  //console.log("------",productList);
  //Modal Settings
  
  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="70%"
      backdropBlur="2px"
    />
  );
  const [overlay, setOverlay] = useState(<OverlayTwo />);

  const settingsModalDeleteProduct = useDisclosure();
  const handleOpenModalDeleteProduct = (product) => {
    setProductData(product);
    setOverlay(<OverlayTwo />);
    settingsModalDeleteProduct.onOpen();
  };
  //console.log(productList);
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
  //HookFunctions
  const { chekSwitch } = useTableSwitch();
  //Functions
  const handleIsStay = () => {
    const switchFound = chekSwitch.find((checked) => checked._id === tableId);
    return switchFound.checked;
  };
  const handleTotal = () => {
    if (productList.length > 0) {
      const totalArray = productList.map(
        (product) => product.amount * product.price
      );
      const total = totalArray.reduce((ac, total) => (ac += total));
      return Math.floor(total).toLocaleString();
    }
  };
  const handleDateBill = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (day < 10) {
      day = "0" + dia;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return day + "/" + month + "/" + year;
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
  const handleDeleteProduct = () => {
    const productFoundIndex = productList.findIndex(product=>product._id===productData._id)
    productList.splice(productFoundIndex,1)
    localStorage.setItem(tableId, JSON.stringify(productList));
    setProductListSwitch(!productListSwitch)
    settingsModalDeleteProduct.onClose()
  }
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
    <Grid key="products" gap={1}>
      <>
        <InputSearchGeneral
          value={productSearch}
          onChange={handleProductSearch}
        />
        {productSearch !== "" && (
          <TableSelectProduct
            onClick={handleProductSelect}
            isStay={handleIsStay}
            data={products?.Products}
            index={indexProductsSelect}
          />
        )}
      </>
      {productList.map((product, i) => (
        <CardHorizontal
          onDelete={()=>{handleOpenModalDeleteProduct(product)}}
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
          bg={"gray.100"}
          borderRadius={9}
          p={5}
          mb={1}
          justifyContent="space-around"
        >
          <Text>Total:</Text>
          <Text textAlign="center">{`$ ${handleTotal()}`}</Text>
        </Flex>
      )}
    </Grid>,
    <Grid key="bill" gap={5}>
      <BillTable
        total={handleTotal()}
        productList={productList}
        date={handleDateBill}
      />
    </Grid>,
  ];

  return {
    indexTabsTable,
    components,
    handleBillSave,
    bills,
    settingsModalDeleteProduct,
    overlay,
    handleDeleteProduct,
  };
};
