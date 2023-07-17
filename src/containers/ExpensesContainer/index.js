import { ProviderList } from "@/components/ProviderList";
import { TabsGeneral } from "@/components/TabsGeneral";
import { useExpensesPage } from "@/hooks/useExpensesPage";
import { Flex, Grid, Heading } from "@chakra-ui/react";

export const ExpensesContainer = () => {
  const { providers } = useExpensesPage();
  const disguiseBack = true;
  return (
    <Flex mt={5} direction={'column'} >
      <Heading m={'auto'}>Elige un proveedor</Heading>
      <ProviderList  disguiseBack={disguiseBack} providers={providers} />
    </Flex>
  );
};
