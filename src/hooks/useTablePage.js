import { BillTable } from "@/components/BillTable";
import { CardHorizontal } from "@/components/CardHorizontal";
import { InputSearchGeneral } from "@/components/InputSearchGeneral";
import { TableSelectProduct } from "@/components/TableSelectProduct";
import { Bill_save, Bills } from "@/graphql/Bill";
import { Products } from "@/graphql/Product";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Icon,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { useFunctionsGeneral } from "./functions/useFunctionsGeneral";
import { useProductList } from "./functions/useProductList";
import { Companies } from "@/graphql/Company";
import { LoginContext } from "@/context/login";
import { GridSelectProduct } from "@/components/GridSelectProduct";
import { SubtitleGeneral } from "@/components/SubtitleGeneral";
import { GiBoxTrap } from "react-icons/gi";
import { useRouter } from "next/router";
//import { viewportHeight, viewportWidth } from "../../config/Constants";

export const useTablePage = (tableId) => {
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
  //context
  //HookFunctions
  const { chekSwitch, radioPayment, handlePaymentMethod, shelledDate, stylizeDate } =
    useFunctionsGeneral();
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
    allProducts = [],
  } = useProductList(tableId);
  //States

  const [alertSaveTrue, setalertSaveTrue] = useState(false);
  const [alertSaveFalse, setalertSaveFalse] = useState(false);
  const [fullProducts, setFullProducts] = useState([]);
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
  const [billSave, { data: isBillSave, loading: loadSaveBill }] = useMutation(
    Bill_save,
    // {
    //   refetchQueries:[
    //     {
    //       query:Products,
    //         variables: {
    //           filters: {
    //             search: productSearch,
    //           },
    //         },
    //     },
    //     {
    //       query:Bills,
    //       variables:{
    //         filters:[
    //           {
    //             key: "type",
    //             value: "Compra"
    //           },
    //           {
    //             key: "type",
    //             value: "Venta"
    //           },
    //         ]
    //       }
    //     }
    //   ]
    // }
  );

  //Effects

  useEffect(() => {
    let matriz = [];
    let productsOfTables = [];
    if (allProducts.length > 0) {
      matriz.push(products?.Products, allProducts);
      for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i]?.length; j++) {
          const element = matriz[i][j];
          productsOfTables.push(element);
        }
      }
      const sumarAmounts = productsOfTables.reduce((acc, obj) => {
        if (acc[obj._id]) {
          acc[obj._id].amount -= obj.amount;
        } else {
          acc[obj._id] = { ...obj };
        }
        return acc;
      }, {});

      const uniqueObjects = Object.values(sumarAmounts);
      setFullProducts(uniqueObjects);
    }
  }, [productList, allProducts, products]);

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


  //Handles

  //Functions
  //Handles Mutations
  const handleBillSave = (obj) => {
    const sellProductList = productList.map((product) => {
      delete product.image;
      delete product.remaining;
      return product;
    });

    billSave({
      variables: {
        billData: {
          tableId: tableId ? tableId : "Fast Sell",
          products: sellProductList,
          paymentMethod: radioPayment,
          total: obj.total,
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

  const handleProductSearch = (e) => {
    setProductSearch(e.target.value);
  };

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
    <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} key="products" gap={5}>
      <Box p={3} bg={"gray.200"} borderRadius={9} w={"full"} h={"full"}>
        <SubtitleGeneral color="black" data={"Seleccionar Productos"} />
        <InputSearchGeneral
          value={productSearch}
          onChange={handleProductSearch}
        />
        <GridSelectProduct
          isStay={chekSwitch}
          onClick={handleProductSelect}
          data={allProducts.length > 0 ? fullProducts : products?.Products}
        />
      </Box>
      {productList.length > 0 ? (
        <Box
          mt={{ base: 2, md: 0, lg: 0 }}
          bg={{ base: "transparent", md: "gray.200", lg: "gray.200" }}
          borderRadius={9}
          w={"100%"}
          h={"full"}
          p={3}
          gap={5}
        >
          <SubtitleGeneral data={"Productos Seleccionados"} />
          <Flex
            bg={"gray.100"}
            borderRadius={9}
            p={2}
            //mb={1}
            justifyContent="space-around"
          >
            <Text
              fontSize={"lg"}
              letterSpacing={2}
              fontWeight={"extrabold"}
            >
              Total:
            </Text>
            <Text
              fontWeight={"extrabold"}
              color={"cyan.700"}
              textAlign="center"
            >{`$ ${Math.floor(handleTotal()).toLocaleString()}`}</Text>
          </Flex>
          {productList
            .slice()
            .reverse()
            .map((product, i) => (
              <Box mt={5} key={i}>
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
                />
              </Box>
            ))}
        </Box>
      ) : (
        <Box
        borderRadius={9}
        bg={{ base: "transparent", md: "gray.200", lg: "gray.200" }}
      w="full"  // Ancho del componente al tamaño completo de la pantalla
      h="full"  // Alto del componente al tamaño completo de la pantalla
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w="30%"   // Ancho del ícono al 40% del contenedor padre
        h="30%"   // Alto del ícono al 40% del contenedor padre
        position="relative"
      >
        <Icon as={GiBoxTrap} boxSize="100%" />
        <SubtitleGeneral size="sm" data={'No se han registrado productos aún...'}/>
      </Box>
    </Box>
      )}
    </SimpleGrid>,
    //----------------------------------------------------------//
    <Grid key="bill" gap={5}>
      {productList.length > 0 && (
        <BillTable
          companyData={{
            name: company?.Companies[0].name,
            address: company?.Companies[0].address,
            email: company?.Companies[0].email,
          }}
          handlePaymentMethod={handlePaymentMethod}
          total={handleTotal()}
          productList={productList}
          date={stylizeDate()}
          user={localSession?.localSession.fullName}
          // date={`${shelledDate()
          //   .day.toString()
          //   .padStart(2, "0")}-${shelledDate()
          //   .month.toString()
          //   .padStart(2, "0")}-${shelledDate().year}`}
          handleBillSave={handleBillSave}
          loadSaveBill={loadSaveBill}
          alertSaveTrue={alertSaveTrue}
          alertSaveFalse={alertSaveFalse}
        />
      )}
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
