import { useFunctionsGeneral } from "@/hooks/functions/useFunctionsGeneral";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useColorModeValue,
} from "@chakra-ui/react";

export const TableSelectProduct = ({ index, data, isStay, onClick }) => {
 
  const {convertPrice} = useFunctionsGeneral()
  // const convertPrice = (percent, price) => {
  //   const number = (price * percent) / 100 + price;
  //   return redondeo(number)
  // }
  
  return (
    <TableContainer
    mt={"40px"}
    w={"70%"}
      justifySelf={"center"}
      position={"absolute"}
      zIndex={1}
      borderRadius={9}
      p={2}
      borderTop={"1px solid"}
      borderBottom={"1px solid"}
      bg={"whiteAlpha.900"}
    >
      <Table size="md">
        <Thead>
          <Tr>
            {index.map((element, i) => (
              <Th key={i}>{element}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((element, i) => (
            <Tr
            borderRadius={9}
            bg={element.amount > 0 ?"transparent":"red"}
            color={element.amount > 0 ?"black":"white"}
              cursor={"pointer"}
              key={i}
              onClick={() => {
                onClick({
                  _id: element._id,
                  name: element.name,
                  price: isStay
                    ? convertPrice(element.isStay, element.price)
                    : convertPrice(element.isLeave, element.price),
                  amount: 1,
                  image: element.image,
                  remaining: element.amount,
                });
              }}
            >
              <Td>{element.amount}</Td>
              <Td>{element.name}</Td>
              {/* <Td>{element.isLeave}</Td> */}
              <Td>
                {isStay
                  ? convertPrice(element.isStay, element.price).toLocaleString()
                  : convertPrice(element.isLeave, element.price).toLocaleString()}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
