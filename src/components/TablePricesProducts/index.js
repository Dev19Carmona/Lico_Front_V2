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

export const TablePricesProducts = ({ index, data }) => {
  return (
    <TableContainer >
      <Table size="sm">
        <Thead>
          <Tr>
            {index.map((element, i) => (
              <Th key={i}>{element}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((element, i) => (
            <Tr key={i}>
              <Td>{element.compra}</Td>
              <Td>{Math.round(parseInt(element.llevar) )+".000"}</Td>
              <Td>{Math.round(parseInt(element.establecimiento))+".000"}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
