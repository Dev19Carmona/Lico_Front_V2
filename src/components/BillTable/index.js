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
import {paymentMethods} from "../../../config/Constants.js"
import { ButtonGeneral } from "../ButtonGeneral/index.js";

export const BillTable = ({date, productList, total, setRadioPayment}) => {
  const localSession = useContext(LoginContext);
  const { data: company } = useQuery(Companies);
  

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
      <Box >
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
                {paymentMethods?.map((payment, i) => (
                  <Radio
                  autoFocus={i === 0} 
                    required
                    border="2px solid #b32821"
                    key={i}
                    value={payment.name}
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
          <Flex mt={5} justifyContent={"center"}>
            <ButtonGeneral title={"PAGAR"}/>
          </Flex>
      </Box>
    </Box>
  );
};
