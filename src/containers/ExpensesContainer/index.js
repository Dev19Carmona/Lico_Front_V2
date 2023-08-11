import { ProviderList } from "@/components/ProviderList";
import { TabsGeneral } from "@/components/TabsGeneral";
import { useExpensesPage } from "@/hooks/useExpensesPage";
import { Box, Flex, Grid, Heading } from "@chakra-ui/react";

export const ExpensesContainer = () => {
  const { providers } = useExpensesPage();
  const disguiseBack = true;
  return (
    <Flex mt={5} direction={'column'} >
      <Heading m={'auto'}></Heading>
      <Box
        borderRadius={10}
        boxShadow={"xl"}
        justifyContent={"center"}
        key={1}
        p={4}
        display="flex"
        gridTemplateColumns="1fr"
      >
        <Box letterSpacing={2} fontSize={30}>
        Elige un proveedor
        </Box>
        
      </Box>
      <ProviderList showAdd={false}  disguiseBack={disguiseBack} providers={providers} />
    </Flex>
  );
};
