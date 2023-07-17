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
  Flex,
  Box,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";

export const ProductTable = ({ index, data, onDelete, onUpdate }) => {
  const { convertPriceWithPercent } = useFunctionsGeneral();
  
  return (
    <TableContainer border={"1px solid black"} borderRadius={9}>
      <Table variant="simple">
        <Thead>
          <Tr>
            {index.map((element, i) => (
              <Th style={{ textAlign: "center" }} key={i}>
                {element}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((element, i) => (
            <Tr key={i}>
              <Td style={{ textAlign: "center" }}>
                {Math.floor(element.amount).toLocaleString()}
              </Td>
              <Td style={{ textAlign: "center" }}>{element.name}</Td>
              <Td style={{ textAlign: "center" }}>{element.category?.name}</Td>
              <Td style={{ textAlign: "center" }}>
                {Math.floor(element.price).toLocaleString()}
              </Td>
              <Td style={{ textAlign: "center" }}>
                {Math.floor(
                  convertPriceWithPercent(element.isLeave, element.price)
                ).toLocaleString()}
              </Td>
              <Td style={{ textAlign: "center" }}>
                {Math.floor(
                  convertPriceWithPercent(element.isStay, element.price)
                ).toLocaleString()}
              </Td>
              <Td>
                <Flex justifyContent={"space-around"}>
                  <Box
                    onClick={() => {
                      onUpdate(element);
                    }}
                    cursor={'pointer'}
                  >
                    <FaEdit fontSize={18} />
                  </Box>
                  <Box
                    onClick={() => {
                      onDelete(element);
                    }}
                    cursor={'pointer'}
                  >
                    <FiDelete fontSize={18} />
                  </Box>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
