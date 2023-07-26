import { Box, SimpleGrid } from "@chakra-ui/react";
import { BillTable } from "../BillTable";
import { useFunctionsGeneral } from "@/hooks/functions/useFunctionsGeneral";

export const BillList = ({ data = [] }) => {
  const{handleUnixToDDMMYYYY}=useFunctionsGeneral()
  return (
    <SimpleGrid columns={3} gap={5}>
      {data.map((element, i) => (
        <Box key={i}>
          <BillTable
            date={handleUnixToDDMMYYYY(element.createdAt)}
            productList={element.products}
            total={element.total}
            onlyWrite={true}
            companyData={element.company}
          />
        </Box>
      ))}
    </SimpleGrid>
  );
};
