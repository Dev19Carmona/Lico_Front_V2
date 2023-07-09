import { ButtonGeneral } from "@/components/ButtonGeneral";
import { TabsGeneral } from "@/components/TabsGeneral";
import { useTablePage } from "@/hooks/useTablePage";
import { Grid } from "@chakra-ui/react";
import { useEffect } from "react";

export const TableContainer = ({tableId}) => {
  const {index, components, handleBillSave, bills} = useTablePage(tableId)
  return (
    <Grid gap={5} m={5}>
      {
        bills?.Bills.length === 0 &&
      <ButtonGeneral title={"Iniciar Venta"} onClick={handleBillSave}/>
      }
      <TabsGeneral index={index} components={components} opacity={bills?.Bills.length === 0 ? "0.2" :"1"}/>
      <Grid>{ bills?.Bills[0]?.tableId}</Grid>
    </Grid>
  );
};
