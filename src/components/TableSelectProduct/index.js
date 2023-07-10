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
  const priceProductByState = (price, percent) =>{
    const priceProduct = price * (percent/100)+price
    return Math.floor(priceProduct).toLocaleString()
  }
  return (
    <TableContainer borderRadius={9} p={2} border={'1px solid'}>
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
            <Tr cursor={'pointer'} key={i} onClick={()=>{onClick({_id:element._id,name:element.name, price:priceProductByState(element.price,isStay?element.isStay:element.isLeave), amount:1})}}>
              <Td>{element.amount}</Td>
              <Td>{element.name}</Td>
              {/* <Td>{element.isLeave}</Td> */}
               <Td>{priceProductByState(element.price,isStay?element.isStay:element.isLeave)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
