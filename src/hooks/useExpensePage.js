import { CardHorizontal } from "@/components/CardHorizontal";
import { CardImage } from "@/components/CardImage";
import { InputSearchGeneral } from "@/components/InputSearchGeneral";
import { ProductList } from "@/components/ProductList";
import { TableSelectProduct } from "@/components/TableSelectProduct";
import { Products } from "@/graphql/Product";
import { useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useProductList } from "./functions/useProductList";
import React,{useEffect, useState} from "react";
import { useFunctionsGeneral } from "./functions/useFunctionsGeneral";
import { useExpensesFunctions } from "./functions/useExpensesFunctions";
import { BillTable } from "@/components/BillTable";
import { Bill_save } from "@/graphql/Bill";

export const useExpensePage = (providerId) => {
  
  //STATES
  const [alertSaveTrue, setalertSaveTrue] = useState(false);
  const [alertSaveFalse, setalertSaveFalse] = useState(false);

  //Hooks
  const {
    handleProductSelectExpenses,
    productList,
    setProductData,
    handleDeleteProduct,
    handleTotal,
    handleDeleteProductList,
    setProductList,
  } = useProductList(providerId);
  const { handleDateToday, radioPayment, handlePaymentMethod } =
    useFunctionsGeneral();
    const {} = useExpensesFunctions()
  //Queries
  const { data: productsByProvider } = useQuery(Products, {
    variables: {
      filters: {
        providerId,
      },
    },
  });
  
  //Mutations
  const [billSave, { data: isBillSave, loading: loadSaveBill }] =
    useMutation(Bill_save,{
      refetchQueries:[
        {
          query: Products
        }
      ]
    });
    const handleBillSave = (total) => {
      const sellProductList = productList.map((product) => {
        delete product.image;
        delete product.remaining;
        return product;
      });
      billSave({
        variables: {
          billData: {
            tableId:providerId?providerId:"Fast Sell",
            products: sellProductList,
            paymentMethod: radioPayment,
            total,
            type:"Compra",
            providerId
          },
        },
      });
      handleDeleteProductList();
      setTimeout(() => {
        setProductList([])
      }, 3000);
    };

    //EFFECTS
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

  //Modal Settings
  const settingsModalDeleteProduct = useDisclosure();
  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );
  const [overlay, setOverlay] = React.useState(<OverlayTwo />);
  2;
  //TabsSettings
  const index = [
    {
      name: "Productos",
    },
    {
      name: "Factura",
    },
  ];
  //Handles
  //Handle Modals
  const handleOpenModalDeleteProduct = (product) => {
    setProductData(product);
    setOverlay(<OverlayTwo />);
    settingsModalDeleteProduct.onOpen();
  };
  const components = [
    <Grid key="products" gap={10}>
      <Grid p={5} border={"0.1px solid"} borderRadius={9}>
      <Box
        borderRadius={10}
        boxShadow={"xl"}
        justifyContent={"center"}
        key={1}
        p={4}
        display="flex"
        gridTemplateColumns="1fr"
      >
        <Box letterSpacing={2} fontSize={30} fontFamily={"mono"}>
        Seleccionar productos
        </Box>
        
      </Box>
        <SimpleGrid
          
          columns={5}
          templateColumns={"1fr 1fr 1fr 1fr"}
          templateRows={"5fr"}
        >
          {productsByProvider?.Products.map((product, i) => (
            <GridItem
              key={i}
              onClick={() => {
                handleProductSelectExpenses({
                  _id: product._id,
                  name: product.name,
                  price: product.price,
                  amount: 1,
                  image: product.image,
                  remaining: product.amount,
                });
              }}
            >
              <CardImage
                data={{
                  image: product.image,
                  title: product.name,
                  subTitle: product.amount,
                  bodyBold: `$${Math.floor(product.price).toLocaleString()}`}}
              />
            </GridItem>
          ))}
        </SimpleGrid>
      </Grid>
      <Grid p={5} border={"0.1px solid"} borderRadius={9}>
        {productList.map((product, i) => (
          <CardHorizontal
            onDelete={() => {
              handleOpenModalDeleteProduct(product);
            }}
            onClick={handleProductSelectExpenses}
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
            <Text textAlign="center">{`$ ${Math.floor(
              handleTotal()
            ).toLocaleString()}`}</Text>
          </Flex>
        )}
      </Grid>
    </Grid>,
    <Grid key="bill" gap={5}>
      {productList.length > 0 && (
        <BillTable
          companyData={{
            name: productsByProvider?.Products[0].provider.name,
            address: productsByProvider?.Products[0].provider.address,
            email: productsByProvider?.Products[0].provider.email,
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
      )}
    </Grid>,
  ];
  return {
    index,
    components,
    overlay,
    settingsModalDeleteProduct,
    handleDeleteProduct,
  };
};
