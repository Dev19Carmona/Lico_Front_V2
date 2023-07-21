import { BillTable } from "@/components/BillTable";
import { CardHorizontal } from "@/components/CardHorizontal";
import { InputSearchGeneral } from "@/components/InputSearchGeneral";
import { TableSelectProduct } from "@/components/TableSelectProduct";
import { Bill_save, Bills } from "@/graphql/Bill";
import { Products } from "@/graphql/Product";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  Flex,
  Grid,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { useFunctionsGeneral } from "./functions/useFunctionsGeneral";
import { useProductList } from "./functions/useProductList";
import { Companies } from "@/graphql/Company";
import { LoginContext } from "@/context/login";


export const useTablePage = (tableId) => {
  const localSession = useContext(LoginContext)
  const userSession = {
    _id: localSession?.localSession._id,
    fullName: localSession?.localSession.fullName,
    rolId: localSession?.localSession.rolId,
    email: localSession?.localSession.email,
    nit: localSession?.localSession.nit,
    phone: localSession?.localSession.phone,
    genderId: localSession?.localSession.genderId,
    password: localSession?.localSession.password,
  }
  //context
 //HookFunctions
 const { chekSwitch, radioPayment, handlePaymentMethod } = useFunctionsGeneral();
  const {
    productList,
    handleProductSelect,
    productSearch,
    setProductSearch,
    setProductList,
    handleDeleteProductList,
    productData, 
    setProductData,
    handleDeleteProduct,
    handleTotal,
  } = useProductList(tableId);
  //States
  
  const [alertSaveTrue, setalertSaveTrue] = useState(false);
  const [alertSaveFalse, setalertSaveFalse] = useState(false);

  //Functions General
  
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
  const { data: company } = useQuery(Companies);
  //Mutations
  const [billSave, { data: isBillSave, loading: loadSaveBill }] =
    useMutation(Bill_save,{
      refetchQueries:[
        {
          query: Products
        }
      ]
    });
  //Effects
  useEffect(() => {
    if (isBillSave?.Bill_save) {
      setalertSaveTrue(true);
    }
    if (isBillSave?.Bill_save === false) {
      setalertSaveFalse(true);
    }
  }, [isBillSave]);
  useEffect(() => {
    let timer;
    if (alertSaveTrue) {
      timer = setTimeout(() => {
        setalertSaveTrue(false);
      }, 3000);
    }
    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
  }, [alertSaveTrue]);

  useEffect(() => {
    let timer;
    if (alertSaveFalse) {
      timer = setTimeout(() => {
        setalertSaveFalse(false);
      }, 3000);
    }
    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
  }, [alertSaveFalse]);
  //Initial Values
  const initialValuesProductSelect = {
    name: "",
  };

  //Handles
  
  //Functions
 
  
  const { handleDateToday } = useFunctionsGeneral();

  //Handles Mutations
  const handleBillSave = (total) => {
    const sellProductList = productList.map((product) => {
      delete product.image;
      delete product.remaining;
      return product;
    });
    
    billSave({
      variables: {
        billData: {
          tableId:tableId?tableId:"Fast Sell",
          products: sellProductList,
          paymentMethod: radioPayment,
          total,
          seller: userSession
        },
      },
    });
    handleDeleteProductList();
    setTimeout(() => {
      setProductList([])
    }, 3000);
  };

  const handleProductSearch = (e) => {
    setProductSearch(e.target.value);
  };
  // const handleDeleteProduct = () => {
  //   const productFoundIndex = productList.findIndex(
  //     (product) => product._id === productData._id
  //   );
  //   productList.splice(productFoundIndex, 1);
  //   localStorage.setItem(tableId?tableId:"fastSell", JSON.stringify(productList));
    
  // };
  //TableProductsSettings
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
            isStay={chekSwitch}
            data={products?.Products}
            index={indexProductsSelect}
          />
        )}
      </>
      {productList.map((product, i) => (
        <CardHorizontal
          onDelete={() => {
            handleOpenModalDeleteProduct(product);
            
          }}
          onClick={handleProductSelect}
          parameter={{
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            remaining: product.remaining,
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
          <Text textAlign="center">{`$ ${Math.floor(handleTotal()).toLocaleString()}`}</Text>
        </Flex>
      )}
    </Grid>,
    <Grid key="bill" gap={5}>
      {
        productList.length > 0 &&
      <BillTable
      companyData={{
        name:company?.Companies[0].name,
        address: company?.Companies[0].address,
        email:company?.Companies[0].email
      }}
      handlePaymentMethod={handlePaymentMethod}
        total={handleTotal()}
        productList={productList}
        date={handleDateToday}
        handleBillSave={handleBillSave}
        loadSaveBill={loadSaveBill}
        alertSaveTrue={alertSaveTrue}
        alertSaveFalse={alertSaveFalse}
      />
      }
    </Grid>,
  ];

  return {
    indexTabsTable,
    components,
    bills,
    settingsModalDeleteProduct,
    overlay,
    handleDeleteProduct,
  };
};
