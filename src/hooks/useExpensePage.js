import { CardHorizontal } from "@/components/CardHorizontal";
import { CardImage } from "@/components/CardImage";
import { Products } from "@/graphql/Product";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useProductList } from "./functions/useProductList";
import React, { useEffect, useState, useContext } from "react";
import { useFunctionsGeneral } from "./functions/useFunctionsGeneral";
import { BillTable } from "@/components/BillTable";
import { Bill_save, Bills } from "@/graphql/Bill";
import { LoginContext } from "@/context/login";
import { CardMiniNice } from "@/components/CardMiniNice";
import { useRouter } from "next/router";
import { ButtonGeneral } from "@/components/ButtonGeneral";
import { GiReturnArrow } from "react-icons/gi";

export const useExpensePage = (providerId) => {
  const router = useRouter()
  const localSession = useContext(LoginContext);
  const userSession = {
    _id: localSession?.localSession._id,
    fullName: localSession?.localSession.fullName,
    rolId: localSession?.localSession.rolId,
    email: localSession?.localSession.email,
    nit: localSession?.localSession.nit,
    phone: localSession?.localSession.phone,
    genderId: localSession?.localSession.genderId,
    password: localSession?.localSession.password,
  };
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
  const { radioPayment, handlePaymentMethod, stylizeDate, shelledDate } =
    useFunctionsGeneral();
  //Queries
  const { data: productsByProvider } = useQuery(Products, {
    variables: {
      filters: {
        providerId,
      },
    },
  });
  const [getBills, { data: bills, loading: loadBills }] = useLazyQuery(Bills);
  //Mutations
  const [billSave, { data: isBillSave, loading: loadSaveBill }] = useMutation(
    Bill_save,
  );

  const handleBillSave = (obj) => {
    const sellProductList = productList.map((product) => {
      delete product.image;
      delete product.remaining;
      return product;
    });
    billSave({
      variables: {
        billData: {
          tableId: providerId ? providerId : "Fast Sell",
          products: sellProductList,
          paymentMethod: radioPayment,
          total: obj.total,
          type: "Compra",
          providerId,
          seller: userSession,
          company: obj.companyData,
          dateInfo: shelledDate(),
        },
      },
    });
    handleDeleteProductList();
    setTimeout(() => {
      setProductList([]);
      router.reload()
    }, 2000);
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
      <Grid gap={5} p={5} border={"0.1px solid"} borderRadius={9}>
        <Box
          borderRadius={10}
          boxShadow={"xl"}
          justifyContent={"space-around"}
          key={1}
          p={4}
          display="flex"
          gridTemplateColumns="1fr"
        >
          <Box>
          <ButtonGeneral
                onClick={() => {
                  
                  router.push("/salidas");
                }}
                title={<GiReturnArrow fontSize={25} />}
              />
          </Box>
          <Text letterSpacing={2} fontSize={30}>
            Seleccionar productos
          </Text>
          <Box>

          </Box>
        </Box>
        <SimpleGrid gap={10} columns={{ base: 1, md: 1, lg: 5 }}>
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
              <CardMiniNice
                data={{
                  image: product.image,
                  firstBox: product.amount,
                  secondBox: `$${Math.floor(product.price).toLocaleString()}`,
                  title: product.name,
                }}
              />
              {/* <CardImage
                data={{
                  image: product.image,
                  title: product.name,
                  subTitle: product.amount,
                  bodyBold: `$${Math.floor(product.price).toLocaleString()}`,
                }}
              /> */}
            </GridItem>
          ))}
        </SimpleGrid>
      </Grid>
      <Grid p={5}  borderRadius={9}>
        {productList
          .slice()
          .reverse()
          .map((product, i) => (
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
          date={stylizeDate()}
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
