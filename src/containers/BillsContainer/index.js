import { ButtonGeneral } from "@/components/ButtonGeneral";
import { CardSelectionGeneral } from "@/components/CardSelectionGeneral";
import { useBillsPage } from "@/hooks/useBillsPage";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { GiReturnArrow } from "react-icons/gi";

export const BillsContainer = () => {
  const {
    options,
    handleShowBills,
    showBills,
    handleDefaultBills,
  } = useBillsPage();

  return (
    <Grid gap={100}>
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
        <Flex justifyContent={"space-around"}>
          {options.map((opt, i) => (
            <Grid
              onClick={() => {
                handleShowBills(opt.id === "Ventas" ? true : false);
              }}
              key={i}
            >
              <CardSelectionGeneral icono={opt.icono} texto={opt.texto} />
            </Grid>
          ))}
        </Flex>
      )}
      {showBills.compras && !showBills.ventas && <Grid>Compras</Grid>}
      {!showBills.compras && showBills.ventas && <Grid>Ventas</Grid>}
    </Grid>
  );
};
