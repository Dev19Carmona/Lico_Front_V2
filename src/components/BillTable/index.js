import { Fragment, useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Divider,
  Button,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Thead,
  Spinner,
  RadioGroup,
  SimpleGrid,
  Radio,
  Center,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { LoginContext } from "@/context/login";
import { Companies } from "@/graphql/Company";

export const BillTable = ({date, productList, total}) => {
  const localSession = useContext(LoginContext);
  const { data: company } = useQuery(Companies);
  // const [currentTime, setCurrentTime] = useState("");
  // const [formattedDate, setFormattedDate] = useState("");

  // useEffect(() => {
  //   const currentDate = new Date(parseInt(billTable?.createdAt));
  //   const utcOffset = -5;
  //   const localOffset = currentDate.getTimezoneOffset() / 60;
  //   const currentHour =
  //     (currentDate.getHours() + (utcOffset + localOffset) + 12) % 12 || 12;
  //   const currentMinute = currentDate.getMinutes().toString().padStart(2, "0");
  //   const currentSecond = currentDate.getSeconds().toString().padStart(2, "0");
  //   const period = currentDate.getHours() < 12 ? "AM" : "PM";

  //   setCurrentTime(
  //     `Hora: ${currentHour}:${currentMinute}:${currentSecond} ${period}`
  //   );

  //   const year = currentDate.getFullYear();
  //   const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  //   const day = String(currentDate.getDate()).padStart(2, "0");
  //   setFormattedDate(`Fecha: ${day}-${month}-${year}`);
  // }, [billTable]);

  return (
    <Box
      maxW="700px"
      mx="auto"
      mb={8}
      p={6}
      mt={6}
      bg="blue.50"
      boxShadow="lg"
      rounded="md"
    >
      <Flex justify="space-between" align="center">
        <Box>
          <Heading as="h1" size="lg" mb={2}>
            {company?.Companies[0]?.name}
          </Heading>
          <Text color="gray.600">{`${company?.Companies[0]?.address}`}</Text>
          <Text color="gray.600">{`${company?.Companies[0]?.email} `}</Text>
        </Box>
        <Box textAlign="right">
          <Heading as="h2" size="lg" mb={2}>
            Factura
          </Heading>
          <Text color="gray.600" fontWeight="bold">
            {date()}
          </Text>
          
        </Box>
      </Flex>
      <Divider my={6} bg="white" />
      <Box>
        <Flex justify="space-between" mb={4}>
          <Text fontWeight="bold">Vendedor:</Text>
          <Text>{localSession?.localSession.fullName}</Text>
        </Flex>

        <TableContainer border="1px solid #b32821" borderRadius={9}>
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th fontWeight="bold">Producto</Th>
                <Th fontWeight="bold">Precio</Th>
                <Th fontWeight="bold">Cantidad</Th>
                <Th fontWeight="bold">Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {productList.map((product, i) => (
                <Fragment key={i}>
                  <Tr letterSpacing={1}>
                    <Td>{product.name}</Td>
                    <Td>{Math.floor(product.price).toLocaleString()}</Td>
                    <Td>{product.amount}</Td>
                    <Td>{Math.floor(product.price * product.amount).toLocaleString()}</Td>
                    
                  </Tr>
                  
                </Fragment>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Divider />

        <Flex justify="space-between" mt={6}>
          <Text>Total a pagar:</Text>
          <Text fontSize="lg" fontWeight="bold">
            {total}
          </Text>
        </Flex>
        {/* {!billTable?.isPaid ? (
          <Flex
            p={1.5}
            justify="space-between"
            mt={3}
            border="1px solid #b32821"
            borderRadius={5}
          >
            <Text>Método de Pago: </Text>

            <RadioGroup>
              <SimpleGrid columns={4}>
                {paymentMethod?.map((payment, i) => (
                  <Radio
                    required
                    border="2px solid #b32821"
                    key={i}
                    value={payment.id}
                    onChange={(e) => {
                      setRadioPayment(e.target.value);
                    }}
                    id={payment.id}
                    colorScheme="red"
                    _focus={{ boxShadow: "none", outline: "none" }}
                  >
                    {payment.name}
                  </Radio>
                ))}
              </SimpleGrid>
            </RadioGroup>
          </Flex>
        ) : (
          <Fragment>
            <Flex justifyContent="space-between" mt={5}>
              <Text>Método de Pago: </Text>
              <Text fontSize="lg" fontWeight="bold" color="#b32821">
                {billTable?.paymentMethod?.name}
              </Text>
            </Flex>
            <Flex justifyContent="space-between" mt={5}>
              <Text>Tipo de Compra: </Text>
              <Text fontSize="lg" fontWeight="bold" color="#b32821">
                llevar o establecimiento
              </Text>
            </Flex>
          </Fragment>
        )}

        {billTable?.isPaid === false ? (
          <Flex justify="space-between" mt={6}>
            <Button
              bg="#F1948A"
              onClick={() => {
                isOpenBill();
                setDataDeleteBill(billTable.id);
              }}
            >
              Cancelar
            </Button>
            <Text fontSize="sm" fontWeight="bold" color="#b32821" mt={15}>
              Mas copas Launge
            </Text>
            <Button
              fontSize="lg"
              fontWeight="bold"
              bg="#82E0AA"
              _hover={{ bg: "#ABEBC6" }}
              onClick={() => {
                handleUpdateBillAndProduct(
                  billTable.id,
                  true,
                  billTable?.productLists,
                  resultTableCustomerBill,
                  resultTableCustomerBill * parseFloat(company?.companys.iva) +
                    resultTableCustomerBill
                );
              }}
            >
              {isLoading ? (
                <Flex align="center" justify="center">
                  <Spinner color="white" size="sm" mr={2} />
                  Cargando...
                </Flex>
              ) : (
                "Realizar Pago"
              )}
            </Button>
          </Flex>
        ) : (
          <Fragment mt={5}>
            <Text
              textAlign="center"
              fontSize="sm"
              fontWeight="bold"
              color="#E74C3C"
              mt={15}
            >
              Mas copas Launge
            </Text>
            <Center mt={6}>
              <Button
                bg="#E74C3C "
                color="white"
                _hover={{
                  bg: "#EC7063",
                }}
                rounded="md"
                width="20%"
                onClick={() => {
                  isOpenBill();
                  setDataDeleteBill(billTable.id);
                }}
              >
                <CiTrash fontSize={27} />
              </Button>
            </Center>
          </Fragment>
        )} */}
      </Box>
    </Box>
  );
};
