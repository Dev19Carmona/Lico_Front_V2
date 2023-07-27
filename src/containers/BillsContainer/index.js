import { BillList } from "@/components/BillList";
import { ButtonGeneral } from "@/components/ButtonGeneral";
import { CardSelectionGeneral } from "@/components/CardSelectionGeneral";
import { useBillsPage } from "@/hooks/useBillsPage";
import { Box, Flex, Grid, SimpleGrid } from "@chakra-ui/react";
import { GiReturnArrow } from "react-icons/gi";

export const BillsContainer = () => {
  const {
    options,
    handleShowBills,
    showBills,
    handleDefaultBills,
    handleSetType,
    bills,
  } = useBillsPage();
console.log(bills);
  return (
    <Grid gap={6}>
      <Box
        borderRadius={10}
        boxShadow={"xl"}
        justifyContent={"space-around"}
        key={1}
        p={4}
        display="flex"
        gridTemplateColumns="1fr"
      >
        {
          !showBills.compras && !showBills.ventas?<Box></Box>:
        <Box>
          <ButtonGeneral
            onClick={() => {
              handleDefaultBills();
            }}
            title={<GiReturnArrow />}
          />
        </Box>
        }
        <Box letterSpacing={2} fontSize={30} fontFamily={"mono"}>
          {!showBills.compras && !showBills.ventas
            ? "Facturas"
            : showBills.compras && !showBills.ventas
            ? "Compras"
            : !showBills.compras && showBills.ventas && "Ventas"}
        </Box>
        <Box></Box>
      </Box>

      {!showBills.compras && !showBills.ventas && (
        <SimpleGrid columns={{base:1, md:2, lg:2}} gap={10}>
          {options.map((opt, i) => (
            <Grid
              onClick={() => {
                handleSetType(opt.id)
                handleShowBills(opt.id === "Venta" ? true : false);
              }}
              key={i}
              
            >
              <CardSelectionGeneral icono={opt.icono} texto={opt.texto} />
            </Grid>
          ))}
        </SimpleGrid>
      )}
      {showBills.compras && !showBills.ventas && <Grid><BillList data={bills?.Bills}/></Grid>}
      {!showBills.compras && showBills.ventas && <Grid><BillList data={bills?.Bills}/></Grid>}
    </Grid>
  );
};
