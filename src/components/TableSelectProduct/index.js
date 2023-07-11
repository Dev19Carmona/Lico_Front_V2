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
} from "@chakra-ui/react";

export const TableSelectProduct = ({ index, data, isStay, onClick }) => {
  const convertPrice = (percent, price) => (price * percent)/100+price
  return (
    <TableContainer
    
      borderRadius={9}
      p={2}
      border={"1px solid"}
      
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
              cursor={"pointer"}
              key={i}
              onClick={() => {
                onClick({
                  _id: element._id,
                  name: element.name,
                  price: isStay ? convertPrice(element.isStay, element.price) : convertPrice(element.isLeave, element.price),
                  amount: 1,
                  image: element.image,
                });
              }}
            >
              <Td>{element.amount}</Td>
              <Td>{element.name}</Td>
              {/* <Td>{element.isLeave}</Td> */}
              <Td>
                {isStay
                  ? Math.floor(convertPrice(element.isStay, element.price)).toLocaleString()
                  : Math.floor(convertPrice(element.isLeave, element.price)).toLocaleString()}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
