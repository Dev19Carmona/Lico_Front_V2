import { TabsGeneral } from "@/components/TabsGeneral";
import { useTablePage } from "@/hooks/useTablePage";
import { Grid } from "@chakra-ui/react";

export const TableContainer = () => {
  const {index, components} = useTablePage()
  return (
    <Grid>
      <TabsGeneral index={index} components={components}/>
    </Grid>
  );
};
